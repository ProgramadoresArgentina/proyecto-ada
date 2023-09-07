import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getSession } from '@auth0/nextjs-auth0';

// /api/users/userSettings/editurl

// eslint-disable-next-line import/no-anonymous-default-export
export default async function editUrl(req: NextApiRequest, res: NextApiResponse) {

	const { method, body } = req;
	const {user} = await getSession(req, res); // User is logged in 
    const userIdFromDB = await prisma.user.findUnique({ where: { email: user.email }, select: {id: true}  });
	console.log(user);
	if (user && method == "PUT") {
		try {
			let newUrl = body.data // new url
			newUrl = cleanUrl(newUrl);
			const urlUploaded = await prisma.userSettings.update({
				where: { userId: userIdFromDB.id },
				data: {
					url: newUrl
				}
			})
			res.status(200).json({res: 'Url updated'});
		}
		catch (error) {
            console.log(error);
			res.status(404).json({ message: "ERROR TRYING TO UPDATE URL FROM USER " });
		}
	} else {
		res.status(404).json({ message: "INVALID METHOD" });
	}
};


function cleanUrl(url: string): string {
	const finalUrl = url.replace(/[\s^*@!"#$%&/()=?¡!¿'\\]/gi, '');	
	return finalUrl;
}