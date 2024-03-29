import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prismaClient/db"

export default async function articles(req:NextApiRequest, res:NextApiResponse) { 
  
    const {method} = req
    if (method == 'GET') {
        try{
            const getAllArticles = await prisma.articles.findMany({
                include : {
                    user : true,
                    hashtags : true, 
                    _count: true, 
                }  
            })
            return res.json({getAllArticles});
        }catch(error){
            res.status(404).json(`ERROR ${error}`)
        }}
    }