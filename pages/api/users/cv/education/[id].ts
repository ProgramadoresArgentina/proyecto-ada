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
        
        case "POST":
            try{
                const {id} = query
                const {title, startYear, endYear, description } =  body
                const createEducation = await prisma.education.create({
                  data: {
                        title,
                        startYear, //"2012-04-23T18:28:43.511Z" 
                        endYear, //"2012-04-23T18:28:43.511Z"
                        description,
                        educationId : Number(id),
                    },
                    select:{
                        education:true,  // Este es el numero de ID del CV
                        title: true,
                    }
                  }
                );
                res.json(createEducation);
            }catch(e:any){
                console.log(e.message);
                res.status(200).json("ERROR_CREATING_EDUCATION");
            }
            break;

        case "PUT":
            try{
                const {id} = query
                const {title, startYear, endYear, description } =  body
                const updateEducation = await prisma.education.update({
                    where: { id : Number(id)},
                    data: {
                            title,
                            startYear,
                            endYear,
                            description
                        },
                        select:{
                            education: true,
                            educationId: true,
                        }
                    })
                res.json({ updateEducation })
            }catch(e){
                res.status(200).json({message : "ERROR TRYING TO UPDATE EDUCATION USER"});
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