import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db";
import { getSession } from "@auth0/nextjs-auth0";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    
    const {method} = req
    const blogUrl = String(req.query.id) // url
	const sessionUser = await getSession(req, res);

    if(method === "GET"){
        try {

            await prisma.articles.update({
                where:{url: blogUrl},
                data:{
                    views: {
                        increment: 1
                    }
                }
            })

            const getBlog = await prisma.articles.findUnique({
                where:{
                    url: blogUrl,
                    userId: sessionUser.user.id
                },
                include:{
                    hashtags: true,
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