import { getSession } from '@lib/auth/session'
import prisma from '@lib/db'
import { RawSimpleWord } from '@lib/db/types'
import { NextApiHandler } from 'next'
import BadWordsFilter from 'bad-words'

export type CreateParams = RawSimpleWord & {
  ai: boolean
}

const create: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'Not found', data: null })
  }
  const session = await getSession(req, res)
  const email = session?.user?.email

  const body = req.body as CreateParams

  const categoriesList = (body.categories || '')
    .split(',')
    .filter(word => word.trim().length > 1 && word.trim().length < 20)
    .map(cat => cat.trim().toLowerCase())

  if (!body || !body.abbreviation || !body.definition) {
    return res.status(401).json({ error: 'Bad Request', data: null })
  }

  if (
    !body ||
    !body.abbreviation ||
    !categoriesList.length ||
    !body.definition
  ) {
    return res
      .status(401)
      .json({ error: 'Categories are not applicable', data: null })
  }

  if (!session || !email) {
    return res.status(403).json({ error: 'Unauthorized', data: null })
  }

  const filter = new BadWordsFilter({ replaceRegex: /(?!^)[\s\S]/g })
  const abbreviation = filter.clean(
    body.abbreviation.toLocaleLowerCase().trim()
  )
  const definition = filter.clean(body.definition.toLocaleLowerCase().trim())
  const description = body.description?.trim()
    ? filter.clean(body.description?.trim())
    : ''

  try {
    const existWord = await prisma.word.findUnique({ where: { abbreviation } })

    if (existWord) {
      return res.status(502).json({ error: 'Duplicated', data: null })
    }
  } catch (e) {
    console.error(e)
  }

  try {
    await prisma.category.createMany({
      data: categoriesList.map(id => ({ id })),
      skipDuplicates: true
    })
  } catch (e) {
    console.error(e)
  }

  try {
    const word = await prisma.word.create({
      data: {
        abbreviation,
        definition,
        description,
        ai: body.ai || false,
        categories: {
          create: categoriesList.map(category => ({
            category: {
              connect: {
                id: category
              }
            }
          }))
        },
        user: {
          connect: {
            email
          }
        }
      }
    })

    return res.status(201).json({ data: word })
  } catch (e) {
    console.error(e)
    return res.status(501).json({ error: 'Unexpected error', data: null })
  }
}

export default create
