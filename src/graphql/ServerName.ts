import { extendType, intArg, nonNull, objectType } from 'nexus'

import { getUser } from './User'

export const ServerName = objectType({
  name: 'ServerName',
  definition(t) {
    t.nonNull.int('discordId')
    t.nonNull.int('guildId')
    t.nonNull.string('serverName')
    t.nonNull.string('serverUsername')
    t.nonNull.field('user', {
      type: 'User',
      resolve(parent, args, context) {
        return getUser(parent.discordId, context)
      },
    })
  },
})

export const ServerNameQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('serverNames', {
      type: 'ServerName',
      args: {
        discordId: nonNull(intArg()),
      },
      async resolve(parent, args, context) {
        return context.prisma.user
          .findUnique({ where: { discordId: args.discordId } })
          .serverNames()
      },
    })
  },
})
