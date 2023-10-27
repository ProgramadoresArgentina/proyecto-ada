import { Session, getSession } from "@auth0/nextjs-auth0";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function resume(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req, res);
    const { method, body } = req;
    if (!session) {res.status(500).json({ message: "ERROR" }); return;}
    const params = req.query 
    switch (method) {
        case "POST":
            try {
                const response = await createResume(session, body);
                res.status(200).json(response); 
                return;
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "ERROR" });
                return;
            }
        case "GET": 
            try {
                const response = await getResumeById(session, Number(params.id));
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

async function createResume(session: Session, body: any): Promise<{}> {
    const {id} = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {id: true}
    });
    const NewCVObject = await prisma.cv.create({
        data: {
            title: body.title,
            published: true,
            user:{ connect: { id: Number(id) }},
        },
        select: {id: true}
    });
    
    await prisma.$transaction([
        prisma.experience.createMany({
            data: body.experiences.map(e => {
                e.experienceId = { connect: { id: NewCVObject.id }};
                e.dateSince = new Date(e.dateSince);
                e.dateTo = new Date(e.dateTo);
                return e;
            })
        }),
        prisma.certifications.createMany({
            data: body.certificates.map(e => {e.certificationsId = { connect: { id: NewCVObject.id }};return e;})
        }),
        prisma.education.createMany({
            data: body.education.map(e => {
                e.educationId = { connect: { id: NewCVObject.id }};
                e.dateSince = new Date(e.dateSince);
                e.dateTo = new Date(e.dateTo);
                return e;
            })
        }),
    ]);
    return {message: "RESUME_CREATED"};
}

async function getResumeById(session: Session, resumeId: number): Promise<{}> {
    const {id} = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {id: true}
    });
    const cvList = await prisma.cv.findMany({
        where: { userId: id },
    });
    return cvList;
}


