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
            first: 'programadoresargentina.com',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};

var users = [
    {
        name: "Shyam",
        age: "26",
    },
    {
        name: "Navjot",
        age: "26",
    },
    {
        name: "Vitthal",
        age: "26",
    },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { body } = req
    console.log(JSON.stringify(body))
    res.send(body)

    const document = {
        html: html,
        data: body,
        path: './public/output.pdf',  //'./storage/cv/output.pdf', 
        type: "",
    }

    pdf
    .create(document, options)
    .then((_) => {
        const filePath = path.join(process.cwd(), 'public', 'output.pdf'); // public
        const fileStream = fs.createReadStream(filePath);
        res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        fileStream.pipe(res);
    })
    .catch((error) => {
        console.error(`Aca esta el error ${error}`);
    });
}