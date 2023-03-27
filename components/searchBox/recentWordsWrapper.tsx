import prisma from '@lib/db'
import RecentWords from './recentWords'
import { SimpleWord, simpleWordFields } from '@lib/db/types'

async function getRecentSearches(email: string) {
  try {
    const words: { word: SimpleWord }[] = await prisma.search.findMany({
      select: {
        word: {
          select: simpleWordFields
        }
      },
      where: {
        user: {
          email
        },
        word: {
          status: 'ACTIVE'
        }
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: 3
    })

    return words
  } catch (e) {
    console.error(e)
  }
}

interface Props {
  email: string
}

async function RecentWordsWrapper({ email }: Props) {
  const recentSearches = await getRecentSearches(email)

  if (!recentSearches || recentSearches.length === 0) {
    return null
  }

  return <RecentWords recentSearches={recentSearches} />
}

export default RecentWordsWrapper
