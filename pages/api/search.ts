import prisma from "@lib/db";
import { NextApiHandler } from "next";

const search: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(404).json({ error: 'Not found', data: null });
  }

  const query = (Array.isArray(req.query.q) ? req.query.q[0] : req.query.q) as string
  const limit = (Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit)

  if (!query || (!!limit && Number.isNaN(Number(limit)))) {
    return res.status(401).json({ error: 'Bad Request', data: null });
  }

  const searchQuery = query.trim().toLocaleLowerCase()

  try {
    const result = await prisma.word.findMany(
      {
        select: {
          id: true,
          categories: true,
          abbreviation: true,
          definition: true,
          hit: true
        },
        where: {
          OR: [{
            abbreviation: {
              contains: searchQuery,
            },
          },
          {
            definition: {
              contains: searchQuery,
            },
          }],
          AND: {
            status: 'ACTIVE',
          }
        },
        take: Math.min(Number(limit) || 3, 20),
      }
    )
    return res.status(200).json({ data: result });
  } catch (e) {
    console.error(e)
    return res
      .status(501)
      .json({ error: 'Unexpected error', data: null });
  }
};

export default search;
