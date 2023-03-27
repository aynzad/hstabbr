import prisma from '@lib/db'
import { redirect } from 'next/navigation'
import AddForm from '@components/addFrom'

async function checkWordExist(abbreviation: string) {
  try {
    const word = await prisma.word.findUnique({
      select: { id: true },
      where: {
        abbreviation
      }
    })
    return !!word
  } catch (e) {
    console.error(e)
    throw new Error('Unexpected Error')
  }
}

type Props = {
  searchParams?: {
    abbreviation?: string
  }
}

async function NewPage({ searchParams }: Props) {
  const initialAbbreviation = searchParams && searchParams.abbreviation
  const isWordExist = initialAbbreviation
    ? await checkWordExist(initialAbbreviation)
    : false

  if (isWordExist && initialAbbreviation) {
    redirect(`/${initialAbbreviation}`)
  }

  return (
    <div className="flex flex-col justify-center h-full self-center">
      <div className="-mt-12 mx-auto w-full lg:max-w-4xl px-6">
        <div className="flex-col glass">
          <AddForm initialAbbreviation={initialAbbreviation} />
        </div>
      </div>
    </div>
  )
}

export default NewPage
