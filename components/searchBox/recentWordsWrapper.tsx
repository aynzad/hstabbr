import prisma from '@lib/db'
import RecentWords from './recentWords'

async function getRecentSearches(email: string) {
  try {
    return await prisma.search.findMany({
      select: {
        word: {
          select: {
            id: true,
            categories: true,
            abbreviation: true,
            definition: true
          }
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
