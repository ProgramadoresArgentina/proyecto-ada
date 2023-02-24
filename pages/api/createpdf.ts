import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';

const wkhtmltopdf = require('wkhtmltopdf');

const handler = async (req: NextApiRequest , res: NextApiResponse ) => {
    //Conexion a BBDD
    if(req.method === 'POST'){
        await fetch('https://www.google.com/', {  // a que URL lo queremos mandar 
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: req.body
        }) 
        return res.status(200).json({message:'recurso encontrado'})
    };

    if (req.method === 'GET'){ //Obtenemos los datos del usuario
        const link = "http://link";
        const myPath = link => {
                wkhtmltopdf(link, { pageSize: 'A4' })
                .pipe(fs.createWriteStream('CV.pdf'));
                let stream = fs.createReadStream('CV.pdf');
                return stream.path;
        };
      }
    if (!req.method){
        return res.redirect(307, '/home').end();
    }   
}

export default handler;

//Aca podemos colocar datos de autenticación ya que no seran visibles 
// export const config = {
//     BBDD:
//     PASSWORD:
//     USERNAME:
//     }
// }