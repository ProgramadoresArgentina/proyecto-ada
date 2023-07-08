import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

const getLoginState = (req, loginOptions) => {
    return {
        returnTo: '/validate'
    };
};

export default handleAuth({
    async login(req, res) {
        try {
            await handleLogin(req, res, { getLoginState });
        } catch (err) {
            res.status(err.status ?? 500).end(err.message)
        }
    }
});


//This creates the following routes:

// - /api/auth/login    -to login
// - /api/auth/logout   -to logout
// - /api/auth/callback  -to redirect
// - /api/auth/me     -to check logged user

