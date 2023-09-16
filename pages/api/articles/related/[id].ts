import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db";
import blogsSort from "../../hashtags/blogsSort";

/**
El endpoint recibe el numero Id del blog del cual se quieren obtener los articulos relacionados 
---/api/blogs/related/<blog-id>
**/

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const blogId = req.query.id;
	const { method } = req;

	if (method === "GET") {
		try {
			const { hashtags } = await prisma.articles.findUnique({
				where: {
					url: blogId,
				},
				include: {
					hashtags: {
						select: {
							name: true,
						},
					},
				},
			});

			let hashtagsNames = hashtags.map((el) => el.name);

			const relatedPosts = await prisma.articles.findMany({
				take: 5,
				where: {
					NOT: [
						{
							url: blogId,
						},
					],
					hashtags: {
						some: {
							name: {
								in: hashtagsNames,
								//where some hashtags "name" are in this list.
							},
						},
					},
				},
				include: {
					hashtags: true,
				},
			});

			//sort
			const orderedBlogs = blogsSort(hashtagsNames, relatedPosts);

			res.status(200).json({
				blogId,
				hashtags: hashtagsNames,
				relatedBlogs: orderedBlogs,
			});
		} catch (e) {
			console.log(e);
			res.status(404).json({ e });
		}
	} else {
		res.status(405).json("METHOD_NOT_ALLOWED");
	}
};
