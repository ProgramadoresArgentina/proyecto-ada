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
            const getOneExperience = await prisma.cv.findUnique({
                    where: { id : Number(id) },
                    select:{
                        _count: true,
                        userId : true,
                        user : true,
                        title: true,
                    }
            })
                if (getOneExperience === null) {
                throw new Error()
                }
            res.json({ getOneExperience })
        }catch(e:any){
            res.status(200).json({message: `EXPERIENCES WITH THIS CV: ${query.id} NOT FOUND`})
        }
        break;
        

        case "DELETE":
            try{
                const {id} = query
                if(!id){
                    throw new Error(`User ${id} does not exist`)
                    return
                }
                const deleteOneExperience = await prisma.experience.delete({
                    where: { id : Number(id) },
                })
                res.json({ deleteOneExperience }) 
            }catch(e) {
                res.status(200).json({message: "ERROR TRYING TO DELETE USER EXPERIENCE"})
            }   
            break;
        default:
            res.status(400).json({message: "Invalid method"});
            break;
    }
}