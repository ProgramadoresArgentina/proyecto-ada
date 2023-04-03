import prisma from "../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const { title } = req.body;
    let response;

    switch (req.method) {
        case 'GET':
                response = await prisma.post.findMany();
                res.status(200).json(response);
            break;
            
        case 'POST':
                response = await prisma.post.create({
                    data: {
                        title: title
                    }
                });
                res.status(200).json(response);
            break;
    
        default:
            res.status(403).json({ err: `The HTTP ${req.method} method is not supported at this route.`});
    }
    
}