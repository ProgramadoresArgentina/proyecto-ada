import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prismaClient/db"
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';



export default withApiAuthRequired(async function validate(req: NextApiRequest, res: NextApiResponse) {
    
        const {redirectTo} = req.body;
        const {user} = await getSession(req, res);
        
        const userExists = await prisma.user.findUnique({ where: { email: user.email } });


        if (userExists) {
            
           res.status(200).json({});
           
        } else {
            try {
                const newUser = await prisma.user.create({
                    data: {
                        email: user.email,
                        username: user.name,
                    }
                });

                res.redirect(201, redirectTo || '/');

            } catch (err) {
                console.error(err)
                res.status(500).json({ message: "ERROR_CREATING_USER", error: err });
            }                                         
        }
}
)