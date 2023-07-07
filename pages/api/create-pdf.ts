import * as pdf from "pdf-creator-node";
var fs = require("fs");
import path from 'path';
import { NextApiRequest, NextApiResponse } from "next";


// Read HTML Template
const jsonDirectory = path.join(process.cwd(), 'json');
var html = fs.readFileSync(jsonDirectory +"/../pages/api/template.html", "utf8");

var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    footer: {
        height: "28mm",
        contents: {
            default: 'programadoresargentina.com'
        }
    }
};


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req;
    console.log(body);
    /* const bodyParser = body.map((obj) => {
        obj.experiences = obj.experiences.map(exp => {
            exp.dateTo = exp.currently ? 'Actualidad' : exp.dateTo;
            return exp;
        });
        obj.education = obj.education.map(edu => {
            edu.dateTo = edu.currently ? 'Actualidad' : edu.dateTo;
            return edu;
        });
        obj.education = obj.education.map(edu => {
            edu.dateTo = edu.currently ? 'Actualidad' : edu.dateTo;
            return edu;
        });
        return obj;
    }); */

    const document = {
        html: html,
        data: body,
        path: "./public/output.pdf",
        type: "",
    };

    pdf
    .create(document, options)
    .then((_) => {
        const filePath = path.join(process.cwd(), 'public', 'output.pdf');
        const fileStream = fs.createReadStream(filePath);
        res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        fileStream.pipe(res);
    })
    .catch((error) => {
        console.error(error);
    });
}