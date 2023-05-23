import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prismaClient/db"
// import { useUser } from '@auth0/nextjs-auth0/client';

export default async function validate(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const {redirectTo, user} = req.body;

        const userExists = await prisma.user.findUnique({ where: { email: user.email } });

        if (userExists) {
            try{

                const updatedUserSettings = await prisma.userSettings.upsert({
                    where: { userId: userExists.id },
                    update: {
                        avatar: user.picture,
                      },
                    create: {
                        firstName: user.name,
                        lastName: "",
                        avatar: user.picture,
                        description: "",
                        user: { connect: { id: userExists.id } }
                      },
                });

                res.redirect(200, redirectTo || '/').json(updatedUserSettings);
                
            }
            catch(err){
                console.error(err)
                res.status(500).json({ message:"ERROR_UPDATING_USER", err });
            }
        }
        else {
            try {
                const newUser = await prisma.user.create({
                    data: {
                        email: user.email,
                        username: user.name,
                    }
                });

                const newUserSetting = await prisma.userSettings.create({
                    data: {
                        firstName: user.name,
                        lastName: "",
                        avatar: user.picture,
                        description: "",
                        user: { connect: { id: newUser.id } }
                    }
                })

                res.redirect(201, redirectTo || '/').json({ newUser, newUserSetting })

            } catch (err) {
                console.error(err)
                res.status(500).json({ message:"ERROR_CREATING_USER", err });
            }
        }
    } else {
        res.status(405).json({ message: 'METHOD_NOT_ALLOWED' });
    }
}


