import prisma from '@lib/db'
import CommonWords from './commonWords'
import { SimpleWord, simpleWordFields } from '@lib/db/types'

async function getCommonWords() {
  try {
    const words: SimpleWord[] = await prisma.word.findMany({
      select: simpleWordFields,
      where: {
        status: 'ACTIVE'
      },
      orderBy: {
        hit: 'desc'
      },
      take: 3
    })

    return words
  } catch (e) {
    console.error(e)
  }
}

async function CommonWordsWrapper() {
  const commonWords = await getCommonWords()

  if (!commonWords || commonWords.length === 0) {
    return null
  }

  return <CommonWords words={commonWords} />
}

export default CommonWordsWrapper
