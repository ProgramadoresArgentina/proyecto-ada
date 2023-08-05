import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prismaClient/db";
import findOrCreate from "../hashtags/findOrCreate"

export default async function(req:NextApiRequest, res:NextApiResponse) { 
    
    const {method} = req
    const {title, content, image, userId, hashtags} = req.body

    if (method == "POST") {
        
        try{

            const hashtagsIds = (await findOrCreate(hashtags)).map((el) => ({id: el.id}));

            
            const article = await prisma.articles.create({
                data: {
                    title: title,
                    content: content,
                    image: image,
                    userId: userId,
                    hashtags: {
                        connect: hashtagsIds
                    }
                },
                include: {
                    hashtags: true
                }
            })
            

            const resObj = {
                message: "ARTICLE_CREATED_SUCCESFULLY",
                article: article
            }

         res.status(200).json(resObj);
           
        }catch(err){
            res.status(500).json(`ERROR_CREATING_ARTICLE: ${err}`)
        }}
        else{
            res.status(405).json("METHOD_NOT_ALLOWED")
        }
    }