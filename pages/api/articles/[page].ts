import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prismaClient/db";
import  blogsSort  from "../hashtags/blogsSort"

//endpoint para obtener todos los articulos pero paginados.
//e.g: /api/blog/<num_de_pagina>
//--
//body opcional para filtrar por hashtags,
//{hashtags: <un unico string de hashtags separado por coma>} 
//e.g: {hashtags: "javascript, typescript, css”}

export default async (req: NextApiRequest, res: NextApiResponse)=> {
    const {page} = req.query   
    const {method} = req
    const itemsPerPage = 20        
    const pageNumber: number = Number(page) || 1;
    const {hashtags} = req.body

    if (method === "GET") {
        try{    
            if (hashtags) {
                //caso con query de hashtags

                const tagsSplit = hashtags.split(",")        //separamos por coma
                const tagsArray = tagsSplit.map(tag => tag.trim())//borramos espacios


                const allBlogs = await prisma.articles.findMany({   
                    where:{
                        hashtags: {
                            some: {     
                                name:{
                                    in: tagsArray
                                    //"buscar todos los hashtags donde todos o algunos coincidan con los de esta lista o array"
                                }
                            }
                        },
                    },
                    include: {
                        hashtags: true
                    },
                    skip: (pageNumber -1) * itemsPerPage,
                    take: itemsPerPage
                }
                );
    
                //sort:
                const orderedBlogs = blogsSort(hashtags, allBlogs);

                res.status(200).json({result: orderedBlogs, itemsPerPage: itemsPerPage, page: page, filteredBy: tagsArray});
            } else {
                //caso sin query de hashtags
                const allBlogs = await prisma.articles.findMany({
                    include: {hashtags: true},
                    skip: (pageNumber -1) * itemsPerPage,
                    take: itemsPerPage
                }
                );
    
                res.status(200).json({result: allBlogs, itemsPerPage, page});
            }

        } 
        catch (err){res.status(404).json({message:"ERROR_FINDING_BLOGS", err})};
    } else {
        res.status(405).json({message:"METHOD_NOT_ALLOWED"});
    }
}