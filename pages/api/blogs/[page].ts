import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prismaClient/db"

//e.g: /api/blog/<num_de_pagina>
export default async (req: NextApiRequest, res: NextApiResponse)=> {
    const {page} = req.query   
    const {method} = req
    const itemsPerPage = 20        
    const pageNumber: number = Number(page) || 1;

    if (method === "GET") {
        try{

            const allBlogs = await prisma.articles.findMany({
                skip: (pageNumber -1) * itemsPerPage,
                take: itemsPerPage
            }
            );

            res.status(200).json({result: allBlogs, itemsPerPage: itemsPerPage, page: page});
        } 
        catch (err){res.status(404).json({message:"ERROR_FINDING_BLOGS", err})};
    } else {
        res.status(405).json({message:"METHOD_NOT_ALLOWED"});
    }
}