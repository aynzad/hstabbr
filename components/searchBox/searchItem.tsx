import { Fragment, ReactElement } from 'react'
import Link from 'next/link'
import { SimpleWord } from '@lib/db/types'
import { highlightFirstLetter } from 'utils/utils'
import {
  SparklesIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/20/solid'
import RemoveSaveSearchButton from './removeSaveSearchButton'

type SearchItemType = 'search' | 'common' | 'recent'
interface Props extends SimpleWord {
  type: SearchItemType
}

const ICONS_MAP: Record<SearchItemType, ReactElement> = {
  common: <SparklesIcon width={16} className="text-primary-light" />,
  recent: <ClockIcon width={16} className="text-primary-light" />,
  search: (
    <DocumentMagnifyingGlassIcon width={16} className="text-primary-light" />
  )
}

function SearchItem({ id, abbreviation, definition, categories, type }: Props) {
  const highlightedDefinition = highlightFirstLetter(abbreviation, definition)

  return (
    <Link
      className="flex justify-start gap-2 py-2 my-px group"
      key={abbreviation}
      href={`/${abbreviation}`}
    >
      <span className="w-6 h-6 p-1 rounded-md bg-white bg-opacity-5 group-hover:bg-opacity-25 transition-opacity">
        {ICONS_MAP[type]}
      </span>
      <span className="text-left font-semibold uppercase w-16 text-base text-primary-light group-hover:text-white transition-colors">
        {abbreviation}
      </span>
      <div className="text-left text-sm text-primary-darker pt-0.5 group-hover:text-primary-light transition-colors">
        {highlightedDefinition.map((token, index) => (
          <Fragment key={`token-${index}`}>
            {token.pre}
            <strong className="font-semibold">{token.bold}</strong>
            {token.post}
            {index < highlightedDefinition.length ? ' ' : ''}
          </Fragment>
        ))}
      </div>
      <div className="ml-auto flex gap-1">
        {!!categories && categories.length && (
          <span className="bg-primary text-xs bg-opacity-40 py-1 px-2 rounded-md opacity-30  group-hover:opacity-40 group-hover:bg-opacity-60 transition-opacity">
            {categories[0].categoryId}
          </span>
        )}

        {type === 'recent' && <RemoveSaveSearchButton id={id} />}
      </div>
    </Link>
  )
}

export default SearchItem
