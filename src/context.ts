import { AuthenticationError } from 'apollo-server-express'
import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { decodeAuthHeader } from './utils/auth'
import { getSelfData } from './utils/authUser'

export const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  // user: any
}

export const context = async ({ req }: { req: Request }): Promise<Context> => {
  if (!(req.body.operationName === 'IntrospectionQuery')) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw new AuthenticationError('No Authorization header')
    }
    const decodedToken = await decodeAuthHeader(authHeader)
    if (!decodedToken || !authHeader)
      throw new AuthenticationError('Failed to authenticate user')

    const auth0User: any = await getSelfData(
      authHeader.substring(7, authHeader.length),
      decodedToken.sub
    ).catch((err: Error) => {
      throw err
    })

    // Get discord id from user_id (oauth2|discord|387378)
    console.log(auth0User.user_id.split('|'))
    const discordId: string = auth0User.user_id.split('|')[2]

    const dbUser = await prisma.user.findUnique({ where: { discordId } })

    if (dbUser) {
      console.log('Do discord stuff')
    } else {
      await prisma.user.create({
        data: {
          discordId,
          discordName: auth0User.name,
          nationVerified: false,
        },
      })
    }
  }

  return {
    prisma,
    // user: token,
  }
}
