import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prismaClient/db"

// GET api/users/logged
export default async function logged(req: NextApiRequest, res: NextApiResponse){
    const {page} = req.query  
    const itemsPerPage = 20    
    const pageNumber: number = Number(page) || 1;
    try{
            const loggedUsers = await prisma.userSettings.findMany({
                skip: (pageNumber -1) * itemsPerPage,
                take: itemsPerPage,
                select : {
                    firstName: true,
                    avatar : true,
                    description : true
                },
                  orderBy: {
                    firstName: 'asc',
                  },
                })
               res.status(200).json({data: loggedUsers, itemsPerPage: itemsPerPage, page: page});    
    }catch(error:any){
        res.status(404).json(`ERROR USERS NOT FOUND ${error}`)
    }
}