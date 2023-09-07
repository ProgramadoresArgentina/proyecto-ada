import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prismaClient/db";

// GET api/users/:id      Obtengo user
// PUT api/users/:id      Create user
// DELETE api/users/:id   Delete user

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
    const {
        method, 
        query, 
        body} = req

    switch (method) {
        case "GET":
           try{
            const {id} = query
            const getOneUser = await prisma.user.findUnique({
                    where: { id : Number(id) },
                    include: {
                        cv: true,
                        userSettings: true,
                    }
            })
                if (getOneUser === null) {
                throw new Error()
                }
            res.json({result: getOneUser})

        }catch(e:any){
            res.status(404).json({message: "USER NOT FOUND"})
        }
        break;
            
        case "PUT":
            try{
                const {username} =  body
                const updateOneUser = await prisma.user.update({
                    where: { id : Number(query.id)},
                    data: {
                        username : username,
                    }
                })
                res.json({ updateOneUser })
            }catch(e){
                res.status(404).json({message : "ERROR TRYING TO UPDATE USER"});
            }
            break;

        case "DELETE":
            try{
                const {id} = query
                if(!id){
                    throw new Error(`User ${id} does not exist`)
                    return
                }
                const deleteOneUser = await prisma.user.delete({
                    where: { id : Number(id) },
                })
                res.json({ deleteOneUser }) 
            }catch(e) {
                res.status(404).json({message: "ERROR TRYING TO DELETE USER"})
            }   
            break;
        default:
            res.status(400).json({message: "Invalid method"});
            break;
    }
}