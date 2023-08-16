import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    
    const {method} = req
    const blogId = Number(req.query.id)
    
    if(method === "GET"){
        try {

            await prisma.articles.update({
                where:{id: blogId},
                data:{
                    views: {
                        increment: 1
                    }
                }
            })

            const getBlog = await prisma.articles.findUnique({
                where:{id: blogId},
                include:{
                    user: {
                        select: {
                            username: true,
                            email: true,
                            userSettings: {
                                select: {
                                    description: true,
                                    avatar: true
                                }
                            },
                            articles:{
                                select: {
                                    id: true,
                                    title: true,
                                    image: true
                                }
                            }
                        }
                    }
                }
            })
            
            res.status(200).json(getBlog)
            
        } catch (error) {
             console.error(error)
             res.status(404).json("RESOURCE_NOT_FOUND")    
        }
    } else {
        res.status(405).json("METHOD_NOT_ALLOWED")
    }

}