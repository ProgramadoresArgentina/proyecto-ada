import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export

export async function backToCero(req: NextApiRequest, res: NextApiResponse){

    try{  
        await prisma.articles.updateMany({
            data:{
                viewsPerDay: 0
            }
        });
    } catch(error){
        res.status(200).json(error.message);
    }
}