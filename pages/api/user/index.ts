import { Session, getSession } from "@auth0/nextjs-auth0";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req, res);
    const { method, body } = req;
    if (!session) {res.status(500).json({ message: "ERROR" }); return;}
    switch (method) {
        case "POST": 
            try {
                const response = await onUpdateUser(session, body);
                res.status(200).json(response); 
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "ERROR" });
            }
            break;
        case "GET": 
            try {
                const response = await getUser(session);
                res.status(200).json(response); 
                return;
            } catch (error) {
                res.status(500).json({ message: "ERROR" });
                return;
            }
        default: 
            res.status(500).json({ message: "ERROR" });
        break;
    }
};


async function onUpdateUser(session: Session, body: any): Promise<{}> {
    const {id} = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {id: true}
    });
    await prisma.userSettings.update({
        where:{userId: Number(id)},
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            linkedin: body.linkedin,
            github: body.github,
            behance: body.behance,
            position: body.position,
            status: body.status,
            url: body.url,
            experienceLevel: body.experienceLevel,
            minidescription: body.minidescription,
        }
    });
    return {message: "USER_UPDATED"};
}

async function getUser(session: Session): Promise<{}> {
    const userDB = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            userSettings: {
                select: {
                    firstName: true,
                    lastName: true,
                    linkedin: true,
                    github: true,
                    behance: true,
                    position: true,
                    status: true,
                    url: true,
                    experienceLevel: true,
                    minidescription: true,
                    avatar: true
                }
            }
        }
    });
    return userDB;
}


