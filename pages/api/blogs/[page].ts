import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prismaClient/db"

//e.g: /api/blog/<num_de_pagina>
export default async (req: NextApiRequest, res: NextApiResponse)=> {
    const {page} = req.query   
    const {method} = req
    const itemsPerPage = 20        
    
    if (method === "GET") {
        try{
            const allBlogs = await prisma.articles.findMany();
            
            const pageNumber: number = Number(page) || 1; //default to one if Number() returns NaN
            const startIndex: number = (pageNumber  - 1) * itemsPerPage;
            const endIndex: number = startIndex + itemsPerPage - 1;
            const blogs =  allBlogs.slice(startIndex, endIndex + 1);
            
            res.status(200).json({blogs});
        } 
        catch (err){res.status(404).json({message:"ERROR_FINDING_BLOGS", err})};
    } else {
        res.status(405).json({message:"METHOD_NOT_ALLOWED"});
    }
}