import * as pdf from "pdf-creator-node";
var fs = require("fs");
import path from 'path';
import { NextApiRequest, NextApiResponse } from "next";


// Read HTML Template
const jsonDirectory = path.join(process.cwd(), 'pages');
var html = fs.readFileSync(jsonDirectory +"/../pages/api/template.html", "utf8");

var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm"
};


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req;
    body.experiences.forEach((experience: any) => {
        if (experience.dateSince) {
          experience.dateSince = formatDate(experience.dateSince);
        }
        if (experience.dateTo) {
          experience.dateTo = experience.currently ? "Actualidad" : formatDate(experience.dateTo);
        }
    });
      
    body.education.forEach((education: any) => {
        if (education.dateSince) {
            education.dateSince = formatDate(education.dateSince);
        }
        if (education.dateTo) {
            education.dateTo = education.currently ? "Actualidad" : formatDate(education.dateTo);
        }
    });

    const pdfName = body.basic[0].name.replace(/\s+/g, '_') + '.pdf';
    var option={
        "phantomPath": "../../node_modules/phantomjs-prebuilt/bin/phantomjs", 
    }

    const document = {
        html: html,
        data: body,    
        path: "storage/cv/"+pdfName,
        type: "",
        options: option
    };

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
}

// To "DD MMM AAAA". ex: 15 Feb 2017
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day} ${monthNames[monthIndex]} ${year}`;
}