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
                select:{
                    hashtags: true,
                }
            })

            const relatedPosts= await prisma.articles.findMany({
                take: 5,
                where: {
                    hashtags: {
                        hasSome: hashtags,
                    },
                    NOT: [{
                        id: blogId,
                    }
                    ]
                },
            })
            res.status(200).json({blogId, hashtags, relatedPosts})
        }
        catch(e){
            console.log(e)
            res.status(404).json({e})
        }
    }else{res.status(405).json("METHOD_NOT_ALLOWED") }
    
}