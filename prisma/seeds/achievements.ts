import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export async function achievementsSeed() {

    // achievements
    const miembroComunidad = await prisma.achievements.upsert({
        where: { id: 1 },
        update: {},
        create: {
            icon: "http://localhost:3000/_next/static/media/member.632d4967.svg",
            name: "Miembro de la comunidad"
        },
    })
}