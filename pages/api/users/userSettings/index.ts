import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db";

// GET api/users
// POST api/users Create user

export default async function userSettings(req:NextApiRequest, res:NextApiResponse) {  
    const {method, body} = req;
    switch (method) {
        case "GET":
            try{
                 const getUserSettings = await prisma.userSettings.findMany(
                {
                     include: { user:true } 
                })
            res.json({ getUserSettings });
            }catch(e)
            {
                res.status(200).json({ message:"ERROR_FINDING_USER_SETTINGS"});
            }
            break;
    }
}