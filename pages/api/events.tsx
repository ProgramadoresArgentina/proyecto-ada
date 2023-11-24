import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prismaClient/db";


// NO devuelve eventos expirados
export default async function events(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                const getEvents = await prisma.events.findMany(
                    {
                        where: {
                            createdAt : {
                                lt: new Date(), // Evento que tengan como fecha de creacion ANTES de la fecha actual
                            },
                            expiredAt: {
                                gte: new Date() // Eventos que expiren DESPUES o IGUAL de la fecha actual
                            }
                        }
                    })
                res.json(getEvents);  
            } catch (e) {
            res.status(200).json({ message: "ERROR_FINDING_EVENTS" });
            }
            break;
    }
}