import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prismaClient/db";
import findOrCreate from "../hashtags/findOrCreate"

export default async function(req:NextApiRequest, res:NextApiResponse) { 
    
    const {method} = req
    const {title, content, image, userId, hashtags} = req.body

    if (method == "POST") {
        
        try{

            //buscar o crear los hashtags, devuelve los IDs.
            const hashtagsIds = (await findOrCreate(hashtags)).map((el) => ({id: el.id}));

            //genera la custom url para el blog.
            const url = title
            .replace(/[^a-zA-Z0-9\s]+/g, '')  //remueve caracteres especiales.
            .replace(/\s+/g, '-')       //reemplaza espacios por guiones.
            .substr(0, 50)           //toma los primeros 50 caracteres.
            .replace(/-+$/, '')        //borra guiones finales
            + "-" + Math.random().toString(36).substring(2) // agrega -id_alfanumerico

            
            const article = await prisma.articles.create({
                data: {
                    title: title,
                    content: content,
                    image: image,
                    userId: userId,
                    url: url,
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