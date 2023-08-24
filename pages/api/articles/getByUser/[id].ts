import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	const emailUser = req.query.id;

	if (method === "GET") {
		try {
			const getUser = await prisma.user.findUnique({
				where: { email: emailUser },
			});

			const getBlogs = await prisma.articles.findMany({
				where: { userId: getUser.id },
			});

			res.status(200).json(getBlogs);
		} catch (error) {
			console.error(error);
			res.status(404).json("RESOURCE_NOT_FOUND");
		}
	} else {
		res.status(405).json("METHOD_NOT_ALLOWED");
	}
}
