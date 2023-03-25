import { getSession } from "@lib/auth/session";
import prisma from "@lib/db";
import { NextApiHandler } from "next";

export type SaveSearchParams = {
  query: string
  abbreviation: string
}

const saveSearch: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(404).json({ error: 'Not found', data: null });
  }
  const session = await getSession({ req });
  const email = session?.user?.email

  const body = req.body as SaveSearchParams;

  if (!body || !body.abbreviation || !body.query) {
    return res.status(401).json({ error: 'Bad Request', data: null });
  }

  if (!session || !email) {
    return res.status(403).json({ error: 'Unauthorized', data: null });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(403).json({ error: 'Unauthorized', data: null });
    }

    const word = await prisma.word.findUnique({ where: { abbreviation: body.abbreviation } })

    if (!word) {
      return res.status(404).json({ error: 'Not found', data: null });
    }

    console.log({ userId: user.id, wordId: word.id })

    await prisma.search.upsert({
      where: {
        wordId_userId: { userId: user.id, wordId: word.id }
      },
      create: {
        query: body.query,
        userId: user.id,
        wordId: word.id
      },
      update: {
        query: body.query
      }
    })


    return res.status(201).json({});
  } catch (e) {
    console.error(e)
    return res
      .status(501)
      .json({ error: 'unexpected error', data: null });
  }
};

export default saveSearch;
