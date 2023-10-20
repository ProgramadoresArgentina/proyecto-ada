import {
	Claims,
	getSession,
	handleAuth,
	handleCallback,
	handleLogin,
} from "@auth0/nextjs-auth0";
import { prisma } from "../../../prismaClient/db";

const getLoginState = (req, loginOptions) => {
	return {
        testValue:  true
    };
};

export default handleAuth({
	async login(req, res) {
		try {
			await handleLogin(req, res, { getLoginState });
		} catch (err) {
			res.status(err.status ?? 500).end(err.message);
		}
	},
	callback: async (req, res) => {
		try {
			await handleCallback(req, res, {
				redirectUri: process.env.AUTH0_BASE_URL,
			});
			const { user } = await getSession(req, res);
			createUser(user);
		} catch (error) {
			console.error(error);
		}
	},
});

async function createUser(user: Claims) {
	const userExists = await prisma.user.findUnique({
		where: { email: user.email },
	});
	if (!userExists) {
        try {
            const userRow = await prisma.user.create({
                data: {
                    email: user.email,
                    username: user.name,
                },
            });
    
            await prisma.userSettings.create({
                data: {
                    avatar: user.picture || user.avatar,
                    description: "Soy nuevo en la comunidad!",
                    firstName: null,
                    lastName: null,
                    position: [],
                    user: {
                        connect: {
                            id: userRow.id,
                        },
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
	}
}

//This creates the following routes:

// - /api/auth/login    -to login
// - /api/auth/logout   -to logout
// - /api/auth/callback  -to redirect
// - /api/auth/me     -to check logged user
