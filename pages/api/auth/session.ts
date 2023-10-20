import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../../../lib/prisma";



export default async function session(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    switch (method) {
        case "GET":
            const session = await getSession(req, res);
            if (!session)  {
                res.status(204); return;
            }
            try {
                const userDB = await prisma.user.findUnique({
                    where: { email: session.user.email },
                    include: {
                        userSettings: true,
                    }
                });
                const userState = {
                    nickname: session.user?.nickname,
                    picture: session.user?.picture,
                    email: session.user?.email,
                    username: session.user?.username,
                    firstName: userDB.userSettings?.firstName,
                    lastName: userDB.userSettings?.lastName,
                    role: userDB.userSettings?.role,
                    avatar: userDB.userSettings?.avatar,
                    url: userDB.userSettings?.url,
                }
                res.json(userState);  
            } catch (e) {
                res.status(200).json({ message: "ERROR_FINDING_USER" });
            }
            break;
    }
}