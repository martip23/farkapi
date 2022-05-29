import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // await prisma.user.create({
  //   data: {
  //     discordId: 1,
  //     nationId: 1,
  //     discordName: 'tokey',
  //     nationName: 'nation',
  //     nationUsername: 'nationUsername',
  //   },
  // })
  // await prisma.serverUsername.create({
  //   data: {
  //     userDiscordId: 1,
  //     guildId: 1,
  //     serverName: 'Fark',
  //     serverUsername: 'Farker',
  //   },
  // })
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
  console.log(await prisma.serverUsername.findMany())
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
