import * as pdf from "pdf-creator-node";
var fs = require("fs");
import path from 'path';
import { NextApiRequest, NextApiResponse } from "next";


// Read HTML Template
const jsonDirectory = path.join(process.cwd(), 'json');
var html = fs.readFileSync(jsonDirectory +"/../pages/api/template.html", "utf8");

var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    footer: {
        height: "28mm",
        contents: {
            first: 'Comunidad Programadores Argentina - programadoresargentina.com',
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
var document = {
    html: html,
    data: {
        users: users,
    },
    path: "./output.pdf",
    type: "",
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    pdf
    .create(document, options)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.error(error);
    });
    res.status(200).json({ name: 'John Doe' })
}