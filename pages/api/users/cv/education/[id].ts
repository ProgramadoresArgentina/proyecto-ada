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
            const getOneEducation = await prisma.cv.findUnique({
                    where: { id : Number(id) },
                    select:{
                        userId : true,
                        title: true,
                        education : true,
                    }
            })
                if (getOneEducation === null) {
                throw new Error()
                }
            res.json({ getOneEducation })
        }catch(e:any){
            res.status(200).json({message: `EDUCATION_WITH_CV_NUMBER: ${query.id} NOT_FOUND`});
        }
        break;

        case "DELETE":
            try{
                const {id} = query
                if(!id){
                    throw new Error(`User ${id} does not exist`)
                    return
                }
                const deleteOneEducation = await prisma.education.delete({
                    where: { id : Number(id) },
                })
                res.json({ deleteOneEducation }) 
            }catch(e) {
                res.status(200).json({message: "ERROR TRYING TO DELETE USER EDUCATION"})
            }   
            break;
        default:
            res.status(400).json({message: "Invalid method"});
            break;
    }
}