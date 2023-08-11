import { prisma } from "../../../prismaClient/db"
async function findOrCreate(hashtags: string[]){
    
    try{

        const hashtagsOnDB = await Promise.all(hashtags.map(async (tag: string) => {

            tag = tag.toLowerCase()

            const existingHashtag = await prisma.hashtags.findFirst({
                where: { name: tag },
            });
            
            if (existingHashtag === null || existingHashtag === undefined) {
                const newHashtag = await prisma.hashtags.create({
                    data: {
                        name: tag,
                    },
                });
                return newHashtag
            } else {
                return existingHashtag
            }
        }));

        return hashtagsOnDB
    
    } catch(err){
        console.error(err)
    }
}

export default findOrCreate;