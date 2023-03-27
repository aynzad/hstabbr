import prisma from "@lib/db";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const removeSearch: NextApiHandler = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(404).json({ error: 'Not found', data: null });
  }

  const session = await getSession({ req });
  const email = session?.user?.email

  if (!session || !email) {
    return res.status(403).json({ error: 'Unauthorized', data: null });
  }

  const id = (Array.isArray(req.query.id) ? req.query.id[0] : req.query.id) as string

  if (!id) {
    return res.status(401).json({ error: 'Bad Request', data: null });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(403).json({ error: 'Unauthorized', data: null });
    }

    await prisma.search.delete(
      {
        where: {
          wordId_userId: {
            userId: user.id,
            wordId: id
          }
        },
      }
    )
    return res.status(201).json({});
  } catch (e) {
    console.error(e)
    return res
      .status(501)
      .json({ error: 'Unexpected error', data: null });
  }
};

export default removeSearch;
