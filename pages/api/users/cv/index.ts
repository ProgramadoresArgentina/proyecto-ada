import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db"

export default async function cv (req: NextApiRequest, res: NextApiResponse) {
    const {method, body, query} = req
    switch(method) {
        case "GET":
            try{
                const getCv = await prisma.cv.findMany({  
                    include:{
                        certifications: true,
                        experience: true,
                        education: true
                    }
                })
                res.json(getCv)
            } catch(e:any){
                res.status(404).json({message: e.message});
            }
            break;
}}