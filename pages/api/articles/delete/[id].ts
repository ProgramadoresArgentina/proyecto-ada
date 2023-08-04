import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db"
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function(req:NextApiRequest, res:NextApiResponse) {
    const {method} = req
    const blogId = Number(req.query.id)
    const sessionUser = await getSession(req, res);

    if (method == "DELETE"){

        try{
            const article = await prisma.articles.findUnique({
                where: {id : blogId},
                include: {
                    user: true
                }
            })
            
            if (article.user.email === sessionUser.user.email) {
                await prisma.articles.delete({
                    where: {id: blogId}
                })
            } else {
                res.status(401).json("USER_UNAUTHORIZED")
            }
            
            const resObj = {
                message: 'ARTICLE_DELETED_SUCCESSFULLY',
                article: article
              };

           res.status(200).json(resObj)
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