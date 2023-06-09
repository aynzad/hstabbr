'use client'

import superagent from 'superagent'
import { SimpleWord } from '@lib/db/types'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid'
import SearchItem from './searchItem'
import { ChangeEvent, useEffect, useState } from 'react'
import { useStore } from 'store/store'
import { useDebounce } from 'use-debounce'
import { useQuery } from 'react-query'
import SearchItemSkeleton from './searchItemSkeleton'
import { useRouter } from 'next/navigation'
import { PlusCircleIcon } from '@heroicons/react/24/solid'

interface Props {
  email: string | null
}

function SearchInput({ email }: Props) {
  const [search, setSearch] = useState('')
  const [debouncedSearchTerm, debounceState] = useDebounce(search, 250)
  const isTyping = debounceState.isPending()
  const store = useStore()
  const router = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: async (): Promise<{ data: SimpleWord[] }> => {
      if (debouncedSearchTerm) {
        const response = await superagent.get(
          `/api/search?q=${debouncedSearchTerm}`
        )
        return response.body
      }
      return { data: [] }
    },
    onSuccess: response => {
      response.data.forEach(({ abbreviation }) => {
        router.prefetch(`/${abbreviation}`)
      })
    }
  })

  const searchResults = data?.data

  const handleReset = () => {
    setSearch('')
    store.setIsSearching(false)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearch(value)
    store.setIsSearching(!!value)
  }

  const handleSearchItemClick = (query: string, abbreviation: string) => {
    if (!email) {
      return
    }
    store.saveSearch({
      query,
      abbreviation
    })
  }

  useEffect(() => {
    store.setIsSearching(false)
  }, [])

  return (
    <div className="">
      <div className="relative border-b border-b-white border-opacity-[0.16]">
        <label htmlFor="search">
          <MagnifyingGlassIcon
            width={26}
            height={26}
            className="fill-white absolute left-4 sm:left-6 top-3 z-1"
          />
        </label>
        <input
          id="search"
          name="search"
          onChange={handleChange}
          tabIndex={1}
          className="w-full pl-12 sm:pl-16 py-3 text-lg sm:text-xl font-normal text-white placeholder:text-primary-darker border-0 outline-0 bg-transparent focus:outline-0 focus:ring-0 focus:border-0"
          type="text"
          placeholder="Search an abbreviation or type a word..."
          value={search}
        />
        {search && (
          <button type="reset" className="absolute right-4 top-4 z-1">
            <XMarkIcon
              width={20}
              height={20}
              onClick={handleReset}
              className="fill-primary-lighter"
            />
          </button>
        )}
      </div>
      {(isLoading || searchResults) && !!search && (
        <div className="border-b border-b-white py-3 px-4 sm:px-6 border-opacity-[0.16]">
          <h6 className="text-left text-base font-medium text-primary-dark my-2">
            Search Results
          </h6>
          {(isLoading || isTyping) && (
            <>
              <SearchItemSkeleton />
              <SearchItemSkeleton />
              <SearchItemSkeleton />
            </>
          )}
          {!isLoading &&
            !isTyping &&
            searchResults &&
            searchResults.length > 0 && (
              <>
                {searchResults.map(word => (
                  <div
                    key={word.abbreviation}
                    onClick={event => {
                      handleSearchItemClick(search, word.abbreviation)
                    }}
                  >
                    <SearchItem {...word} type="search" />
                  </div>
                ))}
              </>
            )}
          {!isLoading &&
            !isTyping &&
            searchResults &&
            searchResults[0]?.abbreviation !== search && (
              <a
                href={`/new?abbreviation=${search}`}
                className="flex text-left mt-2 group opacity-75 hover:opacity-100"
              >
                <span className="w-6 h-6 p-1 rounded-md bg-white bg-opacity-5 group-hover:bg-opacity-25 transition-opacity">
                  <PlusCircleIcon width={16} className="text-primary-light" />
                </span>
                <b className="ml-2">
                  Add "{search.toUpperCase().trim()}" to database!
                </b>
              </a>
            )}
        </div>
      )}
    </div>
  )
}

export default SearchInput
