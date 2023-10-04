/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	if (method === "GET") {
		try {
			const arrayOfHashtags = [];
			const arrayOfCleanHashtags = [];

			const articles = await prisma.articles.findMany({
				select: {
					hashtags: true,
					viewsPerDay: true,
				},
			});

			articles.forEach((article) => {
				article.hashtags.forEach((hash) => {
					arrayOfHashtags.push({
						name: hash.name,
						views: article.viewsPerDay,
						id: hash.id,
					});

					arrayOfHashtags.forEach((hashtag) => {
						if (arrayOfCleanHashtags.length === 9) return;
						const existingHashtag = arrayOfCleanHashtags.find(
							(hashtagSearched) =>
								hashtagSearched.id === hashtag.id
						);

						existingHashtag
							? (existingHashtag.views += hashtag.views)
							: arrayOfCleanHashtags.push(hashtag);
					});
				});
			});

			await prisma.topHashtags.deleteMany({});

			arrayOfCleanHashtags.forEach(async ({ name, views, id }) => {
				await prisma.topHashtags.create({
					data: { idHashtag: id, name, views },
				});
			});

			res.status(200).json("Top Visited Hashtag created. /topvisited");
		} catch (e) {
			console.log(e);
			res.status(404).json({ e });
		}
	} else {
		res.status(405).json("METHOD_NOT_ALLOWED");
	}
}
