import { prisma } from "../../../../prismaClient/db";
import { NextApiRequest, NextApiResponse } from "next";


/**
El endpoint recibe el numero Id del blog del cual se quieren obtener los articulos relacionados 
---/api/blogs/related/<blog-id>
**/

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const blogId = Number(req.query.id) || 1; 
    const {method} = req
    
    if(method === "GET"){
        try{
            const {hashtags} = await prisma.articles.findUnique({
                where:{
                    id: blogId,
                },
                include:{
                    hashtags: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            let hashtagsNames = hashtags.map((el)=> el.name )

            const relatedPosts= await prisma.articles.findMany({
                take: 5,
                where: {
                    NOT: [{
                        id: blogId,
                    }
                    ],
                    hashtags: {
                        some: {     
                            name:{
                                in: hashtagsNames
                                //where some hashtags "name" are in this list.
                            }
                        }
                    },
                },
                include: {
                    hashtags: true
                }
            })

            res.status(200).json({blogId, hashtagsNames, relatedPosts})
        }
        catch(e){
            console.log(e)
            res.status(404).json({e})
        }
    }else{res.status(405).json("METHOD_NOT_ALLOWED") }
    
}