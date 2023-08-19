// /api/user/userprofile/url
// buscar x url de userSettings

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body, query } = req;

	switch (method) {
		case "GET":
			try {
				const { url } = query;
				const getUserID = await prisma.userSettings.findUnique({
					where: { url: String(url) },
					select: {
						userId: true,
					},
				});

				const getDataFromCv = await prisma.cv.findUnique({
					where: { userId: getUserID.userId },
					select: {
						experience: true,
						education: true,
						certifications: true,
					},
				});

				const getDataFromUserSettings =
					await prisma.userSettings.findUnique({
						where: { userId: getUserID.userId },
						select: {
							firstName: true,
							lastName: true,
							avatar: true,
							status : true,
							description: true,
						},
					});

				const getDataFromUser = await prisma.user.findUnique({
					where: { id: getUserID.userId },
					select: {
						email: true,
						createdAt: true,
						cv: true,
						achievements: true
					},
				});

				const getDataFromArticles = await prisma.articles.findMany({
					where: { userId: getUserID.userId },
					take: 5,
					select: {
						title: true,
						content: true,
						image: true,
						hashtags: true,
					},
				});

				res.json({
					getDataFromCv,
					getDataFromUserSettings,
					getDataFromUser,
					getDataFromArticles,
				});
			} catch (error: any) {
				res.status(200).json({
					message: `USER_WITH_URL: ${query.url} NOT_FOUND`,
				});
			}
			break;
	}
};
