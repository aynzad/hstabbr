'use client'

import { SimpleWord } from '@lib/db/types'
import SearchItem from './searchItem'
import { useStore } from 'store/store'

interface Props {
  words: SimpleWord[]
}

function CommonWords({ words }: Props) {
  const { state } = useStore()

  if (state.isSearching) {
    return null
  }

  return (
    <div className="py-3 px-4 sm:px-6">
      <h6 className="text-left text-base font-medium text-primary-dark my-2">
        Most Common
      </h6>

      {words.map(word => (
        <SearchItem key={word.abbreviation} {...word} type="common" />
      ))}
    </div>
  )
}

export default CommonWords
