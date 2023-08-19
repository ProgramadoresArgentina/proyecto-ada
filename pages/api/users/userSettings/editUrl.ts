import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getSession } from '@auth0/nextjs-auth0';

// /api/users/userSettings/editurl

// eslint-disable-next-line import/no-anonymous-default-export
export default async function editUrl(req: NextApiRequest, res: NextApiResponse) {

	const { method, body } = req;
	const {userLogged} = await getSession(req, res); // User is logged in 
	console.log({ userLogged }, body)
	if (userLogged && method == "PUT") {
		try {
			const newUrl = body // new url
			console.log(newUrl)
			cleanUrl(newUrl);
			const urlUploaded = await prisma.userSettings.update({
				where: { id: userLogged.user.id },
				data: {
					url: newUrl
				}
			})
			res.status(200).json(` New URL => ${urlUploaded}`)
		}
		catch (error) {
			res.status(404).json({ message: "ERROR TRYING TO UPDATE URL FROM USER " });
		}
	} else {
		res.status(404).json({ message: "INVALID METHOD" });
	}
};


function cleanUrl(url: string) {
	const finalUrl = url.replace(/[\s^*@!"#$%&/()=?¡!¿'\\]/gi, '');	
	return finalUrl;
}