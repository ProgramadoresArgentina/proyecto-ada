
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prismaClient/db";



export default async function events(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                const getEvents = await prisma.events.findMany(
                    {
                        where: {
                            expiredAt: {
                                gte: new Date() // Filtrar eventos que ocurren después de la fecha actual
                            }
                        }
                    })
                res.json({ getEvents });
                
                
            } catch (e) {
                res.status(200).json({ message: "ERROR_FINDING_EVENTS" });
                
            }
            break;
    }
}