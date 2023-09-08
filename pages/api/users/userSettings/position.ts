import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db";
import { getSession } from '@auth0/nextjs-auth0';



export default async (req: NextApiRequest, res: NextApiResponse) => {

    const positions = ["FULLSTACK","FRONTEND","BACKEND","TESTER","DEVOPS","DATA_SCIENCE","LEADER","VIDEOGAMES","CRYPTO","CYBERSECURITY","UX_UI"]
    let {position} = req.body
    position = position.toUpperCase()
    
    if (req.method === "PUT" && positions.includes(position)){
        
        try {
            const {user} = await getSession(req, res);
             
            let {userSettings} = await prisma.user.findUnique({
                where: {email: user.email},
                select:{
                    userSettings: {
                        select: {id: true}
                    }
                }
            })

            const newPosition = await prisma.userSettings.update({
                where: {id: userSettings.id},
                data: {position: position}
            })
                
            res.status(200).json(`${user.name}position is now ${newPosition.position}`)
            
        } catch (err) {
            console.error(err)
            res.status(304).json("NOT_MODIFIED")
        }


    } else {
        res.status(405).json("METHOD_NOT_ALLOWED") 
    }

}