'server-only'

import { RawSimpleWord } from '@lib/db/types';
import { ChatGPTAPI } from 'chatgpt';

interface Input {
    abbreviation: string
    definition?: string
}

export async function generateWord(input: Input) {
    const abbreviation = input.abbreviation.toLocaleLowerCase().trim()

    const chatGPT = new ChatGPTAPI({
        apiKey: process.env.OPENAI_API_KEY as string
    })

    const definition = input.definition?.toLocaleLowerCase() ?? (await chatGPT.sendMessage(`What "${abbreviation}" is stand for? respond without any explanation , just the definition`)).text.toLocaleLowerCase()
    const descriptionResponse = await chatGPT.sendMessage(`Write a description in maximum of 3 sentences (max of 350 char) about this word:"${definition}". Try to be funny and sarcastic but keep the tune formal`)
    const categoryResponse = await chatGPT.sendMessage(`Suggest up to 3 simple categories for this word "${abbreviation}" meaning "${definition}", each category should be kebab case without space or anything, write these category in one line split them with a comma (,)`)

    const normalizedDefinition = definition.replaceAll('"', '').replaceAll("'", '').replaceAll(abbreviation, '').replaceAll('stands for', '').replaceAll('.', '').replaceAll(':', '').trim()
    const normalizedCategories = categoryResponse.text.toLocaleLowerCase().replaceAll('_', '-').trim().replaceAll(' ', '-').trim()

    const word: RawSimpleWord = {
        id: descriptionResponse.id,
        abbreviation,
        definition: normalizedDefinition,
        description: descriptionResponse.text,
        categories: normalizedCategories,
    }

    return word
}
