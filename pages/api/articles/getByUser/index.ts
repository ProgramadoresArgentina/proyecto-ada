import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	const sessionUser = await getSession(req, res);

	if (method === "GET") {
		try {
			const getUser = await prisma.user.findUnique({
				where: { email: sessionUser.user.email },
			});

			const getBlogs = await prisma.articles.findMany({
				where: { userId: getUser.id },
                orderBy: [
                    {id: 'desc'}
                ],
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
