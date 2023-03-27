import prisma from '@lib/db'
import CommonWords from './commonWords'

async function getCommonWords() {
  try {
    return await prisma.word.findMany({
      select: {
        id: true,
        categories: true,
        abbreviation: true,
        definition: true,
        hit: true
      },
      where: {
        status: 'ACTIVE'
      },
      orderBy: {
        hit: 'desc'
      },
      take: 3
    })
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
