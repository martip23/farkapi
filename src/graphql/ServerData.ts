import { extendType, nonNull, objectType, stringArg } from 'nexus'

import { getUser } from './User'

export const ServerData = objectType({
  name: 'ServerData',
  definition(t) {
    t.nonNull.string('discordId')
    t.nonNull.string('guildId')
    t.nonNull.string('serverName')
    t.nonNull.string('username')
    t.nonNull.field('user', {
      type: 'User',
      resolve(parent, args, context) {
        return getUser(parent.discordId, context)
      },
    })
  },
})

export const ServerDataQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('serverData', {
      type: 'ServerData',
      args: {
        discordId: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        return (
          context.prisma.user
            .findUnique({
              where: { discordId: args.discordId },
            })
            .serverData() ?? null
        )
      },
    })
  },
})
