import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getResumeById } from "../[id]";
import * as pdf from "pdf-creator-node";
var fs = require("fs");
import path from 'path';

export default async function downloadCvById(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req, res);
    const { method, body } = req;
    if (!session) {res.status(401).json({ message: "UNATHORIZED" }); return;}
    const userDB = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {id: true}
    });
    const params = req.query;
    switch (method) {
        case "GET": 
            try {
                const resumeData = await getResumeById(userDB.id, Number(params.id));
                const {pdfName, document} = await generateCV(resumeData);

                // Download
                pdf
                .create(document, options)
                .then((_) => {
                    const filePath = path.join(process.cwd(), 'storage/cv', pdfName);
                    const fileStream = fs.createReadStream(filePath);
                    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
                    res.setHeader('Content-Type', 'application/pdf');
                    fileStream.pipe(res);
                })
                .catch((error) => {
                    console.error(error);
                });
                return;
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "ERROR" });
                return;
            }
        default: 
            res.status(500).json({ message: "ERROR2" });
        break;
    }
};


// Read HTML Template
const jsonDirectory = path.join(process.cwd(), 'pages');
var html = fs.readFileSync(jsonDirectory +"/../pages/api/template.html", "utf8");

var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm"
};
export async function generateCV(resumeData: any): Promise<{pdfName: string, document: Object}> {
    const pdfName = resumeData.title.replace(/\s+/g, '_') + '.pdf';
    var option={
        "phantomPath": "../../node_modules/phantomjs-prebuilt/bin/phantomjs", 
    }

    resumeData = {
        title: resumeData.title,
        user: {
            username: resumeData.user.username,
            email: resumeData.user.email,
            linkedin: resumeData.user.userSettings.linkedin,
            github: resumeData.user.userSettings.github,
            behance: resumeData.user.userSettings.behance,
            experienceLevel: resumeData.user.userSettings.experienceLevel,
            position: capitalizeArray(resumeData.user.userSettings.position).join(', '),
        },
        languages: resumeData.languages,
        education: resumeData.education,
        experience: resumeData.experience,
        certifications: resumeData.certifications
    }
    console.log(resumeData);

    const document = {
        html: html,
        data: resumeData,    
        path: "storage/cv/"+pdfName,
        type: "",
        options: option
    };
    return {pdfName, document}
}

function capitalizeArray(arr) {
    return arr.map(function(element) {
        return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
    });
}

