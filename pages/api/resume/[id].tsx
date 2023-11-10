import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { formatCertifications, formatEducations, formatExperiences, formatLanguages } from "./resumeHelper";

export default async function resume(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req, res);
    const { method, body } = req;
    if (!session) {res.status(401).json({ message: "UNATHORIZED" }); return;}
    const userDB = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {id: true}
    });
    const params = req.query;
    switch (method) {
        case "POST":
            try {
                let response = {};
                if (params.id && Number(params.id) > 0) {
                    await deleteCV(userDB.id, Number(params.id)); // delete cv and create a new one on UPDATE
                }
                response = await createUpdateResume(userDB.id, body);
                res.status(200).json(response); 
                console.log('entre');
                return;
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "ERROR" });
                return;
            }
        case "GET": 
            try {
                const response = await getResumeById(userDB.id, Number(params.id));
                res.status(200).json(response); 
                return;
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "ERROR" });
                return;
            }
        case "DELETE": 
            try {
                const response = await deleteCV(userDB.id, Number(params.id));
                res.status(200).json(response); 
                return;
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "ERROR" });
                return;
            }
        default: 
            res.status(500).json({ message: "ERROR2" });
        break;
    }
};

async function createUpdateResume(userId: number, body: any): Promise<{}> {
    const NewCVObject = await prisma.cv.create({
        data: {
            title: body.title,
            published: true,
            user:{ connect: { id: userId }},
        },
        select: {id: true}
    });


    try {
        await prisma.$transaction([
            prisma.experience.createMany({
                data: formatExperiences(body.experience, NewCVObject.id)
            }),
            prisma.certifications.createMany({
                data: formatCertifications(body.certifications, NewCVObject.id)
            }),
            prisma.education.createMany({
                data: formatEducations(body.education, NewCVObject.id)
            }),
            prisma.languages.createMany({
                data: formatLanguages(body.languages, NewCVObject.id)
            })
        ]);
    } catch (error) {
        console.log(error);
        await deleteCV(userId, NewCVObject.id);
        return {message: "ERROR ON CREATE"};
    }
    return {message: "RESUME_CREATED", id: NewCVObject.id};
}


export async function getResumeById(userId: number, resumeId: number): Promise<{}> {
    const cvList = await prisma.cv.findFirst({
        where: { userId: userId, id: resumeId },
        include:{
            certifications: true,
            experience: true,
            education: true,
            languages: true,
            user: {
                include: {userSettings: true}
            }
        }
    });
    return cvList;
}


async function deleteCV(userId: number, resumeId: number): Promise<{}> {
    await prisma.cv.deleteMany({
        where: { userId: userId, id: resumeId },
    });
    return {message: "CV DELETED"};
}


