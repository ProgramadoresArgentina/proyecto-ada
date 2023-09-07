import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db";
import { getSession } from "@auth0/nextjs-auth0";

// GET /api/users/userSettings

export default async function userSettings(req:NextApiRequest, res:NextApiResponse) {  
    
    const {user} = await getSession(req, res); // User is logged in 
    const userExists = await prisma.user.findUnique({ where: { email: user.email }, select: {id: true}  });

    if(userExists){
        try{
            const urlProfile = await prisma.userSettings.findUnique({
                where: { userId: userExists.id},
                select: {
                    url : true,
                }
            })
            return res.status(200).redirect(`/pro/${urlProfile}`)
       } catch(e) {
           res.status(500).json({ message:"ERROR_FINDING_USER_URL"});
       }
    } else{
        res.status(500).json({ message:"USER_NOT_LOGGED"});
    }
}