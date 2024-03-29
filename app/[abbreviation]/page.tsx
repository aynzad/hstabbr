import { Fragment } from 'react'
import prisma from '@lib/db'
import { highlightFirstLetter } from 'utils/utils'
import WordStatus from '@components/WordStatus'
import { SimpleWord, simpleWordFields } from '@lib/db/types'
import { getServerSession } from 'next-auth'
import { authOptions } from '@lib/auth/options'

async function getWord(abbreviation: string, shouldHit: boolean) {
  try {
    const word: SimpleWord = await prisma.word.update({
      select: simpleWordFields,
      where: {
        abbreviation
      },
      data: {
        hit: { increment: shouldHit ? 1 : 0 }
      }
    })
    if (word.status !== 'ACTIVE') {
      throw new Error(`Not active--${abbreviation}`)
    }

    return word
  } catch (e) {
    console.error(e)
    throw new Error(`Not found--${abbreviation}`)
  }
}

async function WordPage({ params }: { params: { abbreviation: string } }) {
  const session = await getServerSession(authOptions)

  const word = await getWord(params.abbreviation, true)
  const highlightedDefinition = highlightFirstLetter(
    word.abbreviation,
    word.definition
  )
  return (
    <div className="flex flex-col justify-center h-full self-center text-center">
      <div className="-mt-20 flex flex-col">
        <div>
          {word.categories.map(category => (
            <span
              className="bg-primary bg-opacity-20 mx-2 py-1 px-2 rounded-md text-opacity-40 text-xs sm:text-sm md:text-base"
              key={category.categoryId}
            >
              {category.categoryId}
            </span>
          ))}
        </div>
        <h1 className="page-title text-7xl sm:text-8xl md:text-9xl lg:text-10xl uppercase tracking-widest">
          {word.abbreviation}
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white text-opacity-70 font-medium">
          {highlightedDefinition.map((token, index) => (
            <Fragment key={`token-${index}`}>
              {token.pre}
              <strong>{token.bold}</strong>
              {token.post}
              {index < highlightedDefinition.length ? ' ' : ''}
            </Fragment>
          ))}
        </h2>
      </div>
      <div className="mx-auto 2xl:w-full md:max-w-3xl pb-6 px-3 md:px-4 lg:px-0">
        {word.description && (
          <p className="text-sm sm:text-base md:text-lg mt-8 text-left lg:text-center text-primary-lighter font-normal">
            {word.description}
          </p>
        )}
      </div>
      <WordStatus word={word} session={session} />
    </div>
  )
}

export async function generateMetadata({
  params
}: {
  params: { abbreviation: string }
}) {
  const word = await getWord(params.abbreviation, false)

  const baseUrl =
    process.env.NEXTAUTH_URL || process.env.VERCEL_URL || process.env.url || ''

  const title = `${
    word.definition.charAt(0).toUpperCase() + word.definition.slice(1)
  } (${word.abbreviation.toUpperCase()})`
  const ogImage = `${baseUrl}/api/og?abbreviation=${encodeURIComponent(
    word.abbreviation
  )}&definition=${encodeURIComponent(word.definition)}`

  return {
    metadataBase: new URL(baseUrl),
    title,
    description: word.description ?? title,
    creator: word.user.name ?? undefined,
    keywords: word.categories.map(({ categoryId }) => categoryId),
    openGraph: {
      title: title,
      description: word.description ?? title,
      siteName: 'HST ABBR',
      images: [
        {
          url: ogImage,
          width: 800,
          height: 400
        }
      ],
      locale: 'en-US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: word.description ?? title,
      images: [ogImage]
    }
  }
}

export default WordPage
