import { Session, getSession } from "@auth0/nextjs-auth0";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function resume(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req, res);
    const { method, body } = req;
    if (!session) {res.status(500).json({ message: "ERROR" }); return;}
    switch (method) {
        case "GET": 
            try {
                const response = await getUserCVList(session);
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



async function getUserCVList(session: Session): Promise<{}> {
    const {id} = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {id: true}
    });
    const cvList = await prisma.cv.findMany({
        where: { userId: id },
    });
    return cvList;
}


