/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	if (method === "GET") {
		try {
			const topHashtags = await prisma.topHashtags.findMany({
				orderBy: [
					{
						views: "desc",
					},
				],
				select: {
					id: true,
					views: true,
					idHashtag: true,
					name: true,
				},
			});

			res.status(200).json({
				topHashtags,
			});
		} catch (e) {
			console.log(e);
			res.status(404).json({ e });
		}
	} else {
		res.status(405).json("METHOD_NOT_ALLOWED");
	}
}
