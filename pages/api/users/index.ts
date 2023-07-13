import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prismaClient/db"

// GET api/users  Obtengo todos los usuarios
// POST api/users Create user

export default async function users(req:NextApiRequest, res:NextApiResponse) {  
    const {method, body} = req;
    switch (method) {
        case "GET":
            try{
                 const getUsers = await prisma.user.findMany(
                {
                     include: 
                     {
                        userSettings: true,
                        cv: true,
                    } 
                })
            res.json({ getUsers });
            }catch(e)
            {
                res.status(404).json({ message:"ERROR_FINDING_USERS"});
            }
            break;
        case "POST":
            try{
                const { username, email } = body
                const createUser = await prisma.user.create({
                  data:{ username , email },
                });
                res.json({ createUser });
            }catch(e:any){
                res.status(226).json("ERROR_CREATING_USER");
            }
            break;
    }
}