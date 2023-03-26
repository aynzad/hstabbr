import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@lib/auth/options'
import SearchInput from './searchInput'
import SearchItemSkeleton from './searchItemSkeleton'
import RecentWordsWrapper from './recentWordsWrapper'
import CommonWordsWrapper from './commonWordsWrapper'

async function SearchBox() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email || null

  return (
    <div className="mx-auto lg:w-full lg:max-w-lg mt-10">
      <div className="flex-col glass overflow-hidden">
        <SearchInput email={email} />
        {email && (
          <Suspense
          // fallback={
          //   <div className="border-b border-b-white py-3 px-6 border-opacity-[0.16]">
          //     <h6 className="text-left text-base font-medium text-primary-dark my-2">
          //       Most Recent
          //     </h6>
          //     <SearchItemSkeleton />
          //     <SearchItemSkeleton />
          //     <SearchItemSkeleton />
          //   </div>
          // }
          >
            {/* @ts-expect-error Server Component */}
            <RecentWordsWrapper email={email} />
          </Suspense>
        )}
        <Suspense
          fallback={
            <div className="py-3 px-6">
              <h6 className="text-left text-base font-medium text-primary-dark my-2">
                Most Common
              </h6>
              <SearchItemSkeleton />
              <SearchItemSkeleton />
              <SearchItemSkeleton />
            </div>
          }
        >
          {/* @ts-expect-error Server Component */}
          <CommonWordsWrapper />
        </Suspense>
      </div>
    </div>
  )
}

export default SearchBox
