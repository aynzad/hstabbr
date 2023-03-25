import { Fragment } from 'react'
import prisma from '@lib/db'
import { highlightFirstLetter } from 'utils/utils'

async function getWord(abbreviation: string) {
  try {
    const word = await prisma.word.update({
      select: {
        createdAt: false,
        updatedAt: false,
        user: false,
        searches: false,
        favorites: false,
        categories: true,
        abbreviation: true,
        description: true,
        definition: true,
        status: true,
        hit: true,
        ai: true
      },
      where: {
        abbreviation
      },
      data: {
        hit: { increment: 1 }
      }
    })
    if (word.status !== 'ACTIVE') {
      throw new Error('Not found')
    }

    return word
  } catch (e) {
    console.error(e)
    throw new Error('Not found')
  }
}

async function WordPage({ params }: { params: { abbreviation: string } }) {
  const word = await getWord(params.abbreviation)
  const highlightedDefinition = highlightFirstLetter(
    word.abbreviation,
    word.definition
  )
  return (
    <div className="flex flex-col justify-center h-full self-center">
      <div className="-mt-20 mx-auto 2xl:w-full md:max-w-3xl text-center pb-6">
        <div>
          {word.categories.map(category => (
            <span
              className="bg-primary bg-opacity-20 mx-2 py-1 px-2 rounded-md text-opacity-40"
              key={category.categoryId}
            >
              {category.categoryId}
            </span>
          ))}
        </div>
        <h1 className="page-title text-10xl uppercase tracking-widest">
          {word.abbreviation}
        </h1>
        <h2 className="text-7xl text-white text-opacity-70 font-medium">
          {highlightedDefinition.map((token, index) => (
            <Fragment key={`token-${index}`}>
              {token.pre}
              <strong>{token.bold}</strong>
              {token.post}
              {index < highlightedDefinition.length ? ' ' : ''}
            </Fragment>
          ))}
        </h2>
        {word.description && (
          <p className="text-xl mt-12 text-primary-lighter font-normal">
            {word.description} hit: {word.hit} times
          </p>
        )}
      </div>
    </div>
  )
}

export default WordPage
