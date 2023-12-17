import { NextApiRequest, NextApiResponse } from 'next'
import { DefaultSession, getServerSession } from 'next-auth'
import { authOptions } from './options'

type DefaultSessionUser = NonNullable<DefaultSession['user']>

type SessionUser = DefaultSessionUser & {
  id: string
}

export type Session = DefaultSession & {
  user?: SessionUser
}

export async function getSession(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Session | null> {
  const session = await getServerSession(req, res, authOptions)

  // that these are equal are ensured in `[...nextauth]`'s callback
  return session as Session | null
}
