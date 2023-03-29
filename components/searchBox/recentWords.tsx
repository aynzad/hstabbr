'use client'

import { useStore } from 'store/store'
import { SimpleWord } from '@lib/db/types'
import SearchItem from './searchItem'

interface Props {
  recentSearches: { word: SimpleWord }[]
}

function RecentWords({ recentSearches }: Props) {
  const { state } = useStore()

  if (state.isSearching) {
    return null
  }

  return (
    <div className="border-b border-b-white py-3 px-4 sm:px-6 border-opacity-[0.16]">
      <h6 className="text-left text-base font-medium text-primary-dark my-2">
        Most Recent
      </h6>

      {recentSearches.map(({ word }) => (
        <SearchItem key={word.abbreviation} {...word} type="recent" />
      ))}
    </div>
  )
}

export default RecentWords
