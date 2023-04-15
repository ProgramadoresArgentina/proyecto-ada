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
        
        case "POST":
            try{
                const {id} = query
                const {title, startYear, endYear, description } =  body
                const createExperience = await prisma.experience.create({
                  data: {
                        title,
                        startYear, //"2012-04-23T18:28:43.511Z" 
                        endYear, //"2012-04-23T18:28:43.511Z"
                        description,
                        experienceId: Number(id) 
                    },select:{
                        experience: true,
                        title: true
                    }
                  }
                );
                res.json(createExperience);
            }catch(e:any){
                console.log(e.message);
                res.status(200).json("ERROR_CREATING_EXPERIENCE");
            }
            break;

        case "PUT":
            try{
                const {id} = query
                const {title, startYear, endYear, description } =  body
                const updateOneExperience = await prisma.experience.update({
                    where: { id : Number(id)},
                    data: {
                            title,
                            startYear,
                            endYear,
                            description
                        }
                    })
                res.json({ updateOneExperience })
            }catch(e){
                res.status(200).json({message : "ERROR TRYING TO UPDATE EXPERIENCE USER"});
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