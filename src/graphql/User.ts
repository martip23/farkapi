import { extendType, nonNull, objectType, stringArg } from 'nexus'

import { Context } from '../context'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('discordId')
    t.int('nationId')
    t.nonNull.string('discordName')
    t.nonNull.list.nonNull.field('serverData', {
      type: 'ServerData',
      description:
        'A list of servers and their names associated with this discord user.',
      resolve(parent, _args, context) {
        return context.prisma.user
          .findUnique({ where: { discordId: parent.discordId } })
          .serverData()
      },
    })
    t.string('nationName')
    t.string('nationUsername')
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve(parent, args, context) {
        return context.prisma.user.findMany()
      },
    })
    t.nonNull.field('user', {
      type: 'User',
      args: { discordId: nonNull(stringArg()) },
      resolve(parent, args, context) {
        return getUser(args.discordId, context)
      },
    })
  },
})

export const getUser = async (discordId: string, context: Context) => {
  const user = await context.prisma.user.findUnique({ where: { discordId } })
  if (!user) throw new Error(`Failed to find user with discord id ${discordId}`)
  return user
}
