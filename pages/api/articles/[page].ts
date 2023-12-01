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
    const itemsPerPage = 6        
    const pageNumber: number = Number(page) || 1;
    const {hashtag} = req.body

    if (method === "GET") {
        try{    
            const [allBlogs, count] = await prisma.$transaction([
                prisma.articles.findMany({
                    skip: (pageNumber -1) * itemsPerPage,
                    take: itemsPerPage,
                    orderBy: [
                        {id: 'desc'}
                    ],
                    include : {
                        user : {
                            include: {
                                userSettings: {
                                    select: {
                                        avatar: true,
                                        position: true,
                                        url: true
                                    }
                                }
                            }
                        },
                        hashtags : true, 
                    },
                }),
                prisma.articles.count()
              ]);

            res.status(200).json({result: allBlogs, itemsPerPage, page, total: count});
        } 
        catch (err){res.status(404).json({message:"ERROR_FINDING_BLOGS", err})};

    } else if (method === "POST") {
        
        if (hashtag) {
            const tagsSplit = hashtag.split(",")        //separamos por coma
            const tagsArray = tagsSplit.map(tag => tag.trim())//borramos espacios

            
            const [allBlogs, count] = await prisma.$transaction([
                prisma.articles.findMany({
                        where:{
                        hashtags: {
                            some: {     
                                name:{
                                    in: tagsArray
                                }
                            }
                        },
                    },
                    skip: (pageNumber -1) * itemsPerPage,
                    take: itemsPerPage,
                    orderBy: [
                        {id: 'desc'}
                    ],
                    include : {
                        user : {
                            include: {
                                userSettings: {
                                    select: {
                                        avatar: true,
                                        position: true,
                                        url: true
                                    }
                                }
                            }
                        },
                        hashtags : true, 
                    },
                }),
                prisma.articles.count()
            ]);

            //sort:
            const orderedBlogs = blogsSort(hashtag, allBlogs);

            res.status(200).json({result: orderedBlogs, itemsPerPage: itemsPerPage, page: page, filteredBy: tagsArray, total: count});
        }
        res.status(500).json({message:"NOT_HASHTAGS"});
    }
    
    
    else {
        res.status(405).json({message:"METHOD_NOT_ALLOWED"});
    }
}