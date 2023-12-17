import { GenerateWordInput, generateWord } from '@lib/ai/chatGPT'
import { getSession } from '@lib/auth/session'
import { NextApiHandler } from 'next'

export type GenerateAiParams = GenerateWordInput

const generateAi: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'Not found', data: null })
  }
  const session = await getSession(req, res)
  const email = session?.user?.email

  const body = req.body as GenerateAiParams

  if (!body || !body.abbreviation) {
    return res.status(401).json({ error: 'Bad Request', data: null })
  }

  if (!session || !email) {
    return res.status(403).json({ error: 'Unauthorized', data: null })
  }

  const abbreviation = body.abbreviation.trim().toLowerCase()
  const definition = body.definition?.trim().toLowerCase()
  const tune = body.tune?.trim().toLowerCase()

  try {
    const word = await generateWord({ abbreviation, definition, tune })

    return res.status(201).json({ data: word })
  } catch (e) {
    console.error(e)
    return res.status(501).json({ error: 'Unexpected error', data: null })
  }
}

export default generateAi
