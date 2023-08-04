import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db";

//recibir id del blog
//traerlo findUnique
//ver de incluir la descripcion del usuario creador
////la descripcion esta en la tabla user settings relacionada a usuario
//// en el peor de los casos hay que usar el usuario para traer su user setting y la descripcion
//y chim pum
export default async function(req: NextApiRequest, res: NextApiResponse) {
    
    const {method} = req
    const blogId = Number(req.query.id)

    if(method === "GET"){
        try {
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