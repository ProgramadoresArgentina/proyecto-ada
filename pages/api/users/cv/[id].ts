import { prisma } from "../../../../prismaClient/db";
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {method, body, query} = req;

    switch (method) {
        case "GET":
            try{
                const {id} = query
                const getOneCv = await prisma.cv.findUnique({
                    where: {
                        id: Number(id),
                    }, include: {
                        user: true,
                        certifications: true,
                        education: true,
                        experience: true,
                    },
                })
                res.json({ getOneCv })
            }catch(err:any){
                res.status(404).json(err.message);
            }
            break;

        case "POST":
            try{
                const {id} = query
                const { title } =  body
                const createCv = await prisma.cv.create({
                    data: {
                        title,
                        published: true,
                        user:{ connect: { id: Number(id) },
                    }, 
        }})
                res.json(createCv)
            }catch(err:any){
                console.log(err)
                res.status(404).json(err.message);            
            }
            break;

        case "PUT":
                try {
                    const {id} = query
                    const updatedCv = await prisma.cv.update({
                        data: {
                                title: body.title,
                                // user:{connect: {id: Number(id)}}
                        },
                        where: {
                            id: Number(id)
                        },  
                        include:{
                                certifications:true,
                                education: true,
                                experience: true,
                        }
                    })
                    res.json({updatedCv})

                }catch(err:any){
                    res.status(404).json(err.message);            
            }
            break;

        case "DELETE":
            try {
                const {id} = query
                if (!id){
                    throw new Error();
                    // return
                }
                const deleteCv = await prisma.cv.delete({
                    where: {id: Number(id)}
                }) 
                res.json(deleteCv)
            }catch(err:any){           
                res.status(404).json('ID NOT FOUND');            
            break;
                }
            default:
                res.status(400).json({message: "Invalid method"});
            break;
    }
}