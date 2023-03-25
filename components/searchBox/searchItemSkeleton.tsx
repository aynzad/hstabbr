import { ReactElement } from 'react'
import {
  SparklesIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon,
  CogIcon
} from '@heroicons/react/20/solid'

type SearchItemSkeletonType = 'search' | 'common' | 'recent' | 'loading'
interface Props {
  type?: SearchItemSkeletonType
}

const ICONS_MAP: Record<SearchItemSkeletonType, ReactElement> = {
  common: <SparklesIcon width={16} className="text-primary-light" />,
  recent: <ClockIcon width={16} className="text-primary-light" />,
  search: (
    <DocumentMagnifyingGlassIcon width={16} className="text-primary-light" />
  ),
  loading: <CogIcon width={16} className="text-primary-light animate-spin" />
}

function SearchItemSkeleton({ type = 'loading' }: Props) {
  return (
    <div className="flex justify-start items-center gap-2 uppercase py-2 my-px cursor-wait">
      <span className="w-6 h-6 p-1 rounded-md bg-white bg-opacity-5">
        {ICONS_MAP[type]}
      </span>
      <div className="w-16 h-6 flex items-center ">
        <span className="w-10 animate-pulse rounded-md h-3 text-left text-base bg-primary-light" />
      </div>
      <div className="w-36 animate-pulse rounded-md h-2 text-left text-base bg-primary-darker" />
      <div className="ml-auto flex gap-1">
        <span className="w-10 animate-pulse h-3 bg-primary text-xs bg-opacity-40 py-1 px-2 rounded-md" />
      </div>
    </div>
  )
}

export default SearchItemSkeleton
