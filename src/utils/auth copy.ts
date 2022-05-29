import 'dotenv/config'

import JwksClient, { JSONWebKey, SigningKey } from 'jwks-rsa'
import jwt, { Secret, VerifyOptions } from 'jsonwebtoken'

import { AuthenticationError } from 'apollo-server'

const jwksClient = JwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
})

const options: VerifyOptions = {
  audience: process.env.AUDIENCE_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
}

const getKey = (
  header: JSONWebKey,
  cb: (err?: Error | null, key?: string) => void
): Secret =>
  jwksClient.getSigningKey(header.kid, (err, key) => {
    const signingKey = key?.getPublicKey()
    cb(err, signingKey)
  }) as unknown as Secret

export const decodeAuthHeader = (authHeader: string): {} => {
  if (!authHeader) return new AuthenticationError('No authorization header')

  // Ensure value starts with "Bearer " and strip it
  let token = ''
  if (authHeader.startsWith('Bearer '))
    token = authHeader.substring(7, authHeader.length)
  else return new AuthenticationError('Invalid Authorization header')

  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, options, (err: Error, decoded: any) => {
      if (err) return reject(err)
      console.log(decoded)
      resolve(decoded?.toString)
    })
  })
}
