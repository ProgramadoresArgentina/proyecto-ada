import * as pdf from "pdf-creator-node";
var fs = require("fs");
import path from 'path';
import { NextApiRequest, NextApiResponse } from "next";


// Read HTML Template
const jsonDirectory = path.join(process.cwd(), 'pages'); //  -> 'json'
var html = fs.readFileSync(jsonDirectory +"/api/template.html", "utf8"); // ->  "/../pages/api/template.html"

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

    const document = {
        html: html,
        data: body,
        path: "./storage/cv/output.pdf", // ./public
        type: "",
    };

    pdf
    .create(document, options)
    .then((_) => {
        const filePath = path.join(process.cwd(), 'storage/cv', 'output.pdf'); //   public
        const fileStream = fs.createReadStream(filePath);
        res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        fileStream.pipe(res);
    })
    .catch((error) => {
        console.error(`ERROR ACA : ${error}`);
    });
}

// Formateo de Fecha
function dateFormat(req : NextApiRequest) {
    const {dateSince, dateTo} = req.body

    fetch('api/create-pdf', {
        method: 'POST',
        body : JSON.stringify(dateSince, dateTo)
    })
    .then(response => response.text())
    .then(result => {
        return {
            // dateSince: moment().format(‘MM YYYY’), // Enero  2020
            // dateto: moment().format(‘MM YYYY’)
            // "Jul 2021"
        }
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })
}   