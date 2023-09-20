import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prismaClient/db"

export default async function hero(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { body } = req;

        if (typeof body === 'object' && 'destacados' in body && typeof body.destacados === 'boolean') {
            res.json({ destacados: body.destacados });
        } else {
            res.status(400).json("El cuerpo de la solicitud debe contener un campo 'destacados' con un valor booleano (true/false).");
        }
    } catch (e: any) {
        res.status(500).json("ERROR_GETTING_HERO");
    }
}