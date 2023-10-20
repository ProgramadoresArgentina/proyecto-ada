import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db"
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import findOrCreate from "../../hashtags/findOrCreate"


export default withApiAuthRequired(async function(req:NextApiRequest, res:NextApiResponse) {
    const {method} = req
    const blogId = Number(req.query.id)
    const {title, content, image, userId, hashtags} = req.body
    const sessionUser = await getSession(req, res);


    if (method == "POST"){

        try{
            const article = await prisma.articles.findUnique({
                where: {id : blogId},
                include: {
                    user: true
                }
            })

            if (article.user.email == sessionUser.user.email) {
                
                const hashtagsIds = (await findOrCreate(hashtags)).map((el) => ({id: el.id}));

                const updateArticle = await prisma.articles.update({
                    where: {id: blogId},
                    data: {
                        title: title,
                        content: content,
                        image: image,
                        userId: userId,
                        hashtags: {
                            set: hashtagsIds //set sobrescribe, la lista actualizada final de tags debe venir por body.
                        }
                    },
                    include: {
                        hashtags: true
                    }
                })

                const resObj = {
                    message: 'ARTICLE_UPDATED_SUCCESSFULLY',
                    article: updateArticle
                  };
    
               res.status(200).json(resObj)

            } else {
                res.status(401).json("USER_UNAUTHORIZED")
            }
        }
        catch(err){
            console.error(err)
            res.json(err)}
    }
    else {
        res.status(405).json("METHOD_NOT_ALLOWED")
    }
 }
)