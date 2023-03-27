import { getSession } from "@lib/auth/session";
import { NextApiHandler } from "next";
import { ChatGPTAPI } from 'chatgpt';

export type GenerateAiParams = {
  abbreviation: string
  definition?: string
}

const generateAi: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(404).json({ error: 'Not found', data: null });
  }
  const session = await getSession({ req });
  const email = session?.user?.email

  const body = req.body as GenerateAiParams;

  if (!body || !body.abbreviation) {
    return res.status(401).json({ error: 'Bad Request', data: null });
  }

  if (!session || !email) {
    return res.status(403).json({ error: 'Unauthorized', data: null });
  }

  const abbreviation = body.abbreviation.trim().toLowerCase()
  const userDefinition = body.definition?.trim().toLowerCase()

  const chatGPT = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY as string
  })

  const definition = userDefinition ?? (await chatGPT.sendMessage(`What "${abbreviation}" is stand for? respond without any explanation , just the definition`)).text
  const descriptionResponse = await chatGPT.sendMessage(`Write a description in maximum of 3 sentences about this word:"${definition}". Try to be funny and sarcastic but keep the tune formal`)
  const categoryResponse = await chatGPT.sendMessage(`Suggest up to 3 categories for this word "${abbreviation}" meaning "${definition}", each category should be kebab case without space or anything, write these category in one line split them with a comma (,)`)


  try {
    const word = {
      abbreviation,
      definition,
      description: descriptionResponse.text,
      categories: categoryResponse.text.toLocaleLowerCase(),
    }

    return res.status(201).json({ data: word });
  } catch (e) {
    console.error(e)
    return res
      .status(501)
      .json({ error: 'Unexpected error', data: null });
  }
};

export default generateAi;
