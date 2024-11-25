import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
const prisma = new PrismaClient()
async function main() {
    for (let i = 0; i < 21; i++) {
        const email = await prisma.email.upsert({
            where: { id: i },
            update: {},
            create: {
                sender: faker.internet.email(),
                receiver: faker.internet.email(),
                subject: faker.lorem.sentence(),
                content: faker.lorem.paragraph(),
            },
        })
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })