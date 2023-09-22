import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prismaClient/db";

// GET api/users/userSettings/:id      Obtengo perfil del usuario
// PUT api/users/userSettings/:id      Creo perfil del usuario
// DELETE api/users/userSettings/:id   Delete perfil del usuario

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, query, body } = req;

	switch (method) {
		case "GET":
			try {
				const { id } = query;
				const getOneUserSettings = await prisma.userSettings.findUnique(
					{
						where: { id: Number(id) },
						include: {
							user: true,
						},
					}
				);
				if (getOneUserSettings === null) {
					throw new Error();
				}
				res.json({ getOneUserSettings });
			} catch (e: any) {
				res.status(200).json({
					message: `USER SETTINGS WITH ID: ${query.id} NOT FOUND`,
				});
			}
			break;

		case "POST":
			try {
				const { id } = query;
				const { firstName, lastName, avatar, description } = body;
				const createUser = await prisma.userSettings.create({
					data: {
						firstName,
						lastName,
						avatar,
						description,
						user: { connect: { id: Number(id) } },
					},
				});
				res.json(createUser);
			} catch (e: any) {
				console.log(e.message);
				res.status(200)./*headersSent().*/ json("ERROR_CREATING_USER");
			}
			break;

		case "PUT":
			try {
				const { id } = query;
				const { firstName, lastName, avatar, description, seniority } = body;
				const updateOneUserSettings = await prisma.userSettings.update({
					where: { id: Number(id) },
					data: {
						firstName,
						lastName,
						avatar,
						description,
						seniority
					},
				});
				res.json({ updateOneUserSettings });
			} catch (e) {
				res.status(200).json({
					message: "ERROR TRYING TO UPDATE USER SETTINGS",
				});
			}
			break;

		case "DELETE":
			try {
				const { id } = query;
				if (!id) {
					throw new Error(`User ${id} does not exist`);
				}
				const deleteOneUserSettings = await prisma.userSettings.delete({
					where: { id: Number(id) },
				});
				res.json({ deleteOneUserSettings });
			} catch (e) {
				res.status(200).json({
					message: "ERROR TRYING TO DELETE USER SETTINGS",
				});
			}
			break;
		default:
			res.status(400).json({ message: "Invalid method" });
			break;
	}
};
