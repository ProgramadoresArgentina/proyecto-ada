import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prismaClient/db";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse)=>{
    const {
        method, 
        query, 
        body} = req

    switch (method) {
        case "GET":
           try{
            const {id} = query
            const getOneCertificate = await prisma.cv.findUnique({
                    where: { id : Number(id) },
                    select:{
                        _count: true,
                        userId : true,
                        user : true,
                        title: true,
                        certifications: true,
                    }
            })
                if (getOneCertificate === null) {
                throw new Error() }
            res.json({ getOneCertificate })
        }catch(e:any){
            res.status(200).json({message: `CERTIFICATES_WITH_CV_NUMBER: ${query.id} NOT_FOUND`})
        }
        break;

        case "DELETE":
            try{
                const {id} = query
                if(!id){
                    throw new Error(`User ${id} does not exist`)
                    return
                }
                const deleteOneCertificate = await prisma.certifications.delete({
                    where: { id : Number(id) },
                })
                res.json({ deleteOneCertificate }) 
            }catch(e) {
                res.status(200).json({message: "ERROR TRYING TO DELETE USER CERTIFICATE"})
            }   
            break;
        default:
            res.status(400).json({message: "Invalid method"});
            break;
    }
}