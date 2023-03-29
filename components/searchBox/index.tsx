import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@lib/auth/options'
import SearchInput from './searchInput'
import RecentWordsWrapper from './recentWordsWrapper'
import CommonWordsWrapper from './commonWordsWrapper'
import WordsWrapperSkeleton from './wordsWrapperSkeleton'

async function SearchBox() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email || null

  return (
    <div className="mx-auto w-full lg:max-w-xl mt-10 px-3 md:px-6">
      <div className="flex-col glass overflow-hidden">
        <SearchInput email={email} />
        {email && (
          <Suspense fallback={<WordsWrapperSkeleton title="Most Recent" />}>
            {/* @ts-expect-error Server Component */}
            <RecentWordsWrapper email={email} />
          </Suspense>
        )}
        <Suspense fallback={<WordsWrapperSkeleton title=" Most Common" />}>
          {/* @ts-expect-error Server Component */}
          <CommonWordsWrapper />
        </Suspense>
      </div>
    </div>
  )
}

export default SearchBox
