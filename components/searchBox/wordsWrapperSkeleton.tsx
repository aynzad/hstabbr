import SearchItemSkeleton from './searchItemSkeleton'

interface Props {
  title: string
}

function WordsWrapperSkeleton({ title }: Props) {
  return (
    <div className="border-b border-b-white py-3 px-4 sm:px-6 border-opacity-[0.16]">
      <h6 className="text-left text-base font-medium text-primary-dark my-2">
        {title}
      </h6>
      <SearchItemSkeleton />
      <SearchItemSkeleton />
      <SearchItemSkeleton />
    </div>
  )
}

export default WordsWrapperSkeleton
