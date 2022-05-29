import { AuthenticationError } from 'apollo-server-express'
import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { decodeAuthHeader } from './utils/auth'

export const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  // user: any
}

export const context = ({ req }: { req: Request }): Context => {
  if (!(req.body.operationName === 'IntrospectionQuery')) {
    const authHeader = req.headers.authorization
    const decodedToken = authHeader ? decodeAuthHeader(authHeader) : null
    console.log(decodedToken)
    if (!decodedToken)
      throw new AuthenticationError('Failed to authenticate user')
  }

  return {
    prisma,
    // user: token,
  }
}
