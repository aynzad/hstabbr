import { Logo } from '@components/Logo'
import SearchBox from '@components/searchBox'

async function Page() {
  return (
    <div className="py-3 sm:py-4 md:py-5 mx-auto 2xl:w-full md:max-w-3xl text-center">
      <a
        className="hidden sm:flex justify-center"
        href="/"
        title="Disclaimer: This is an engineering unofficial project!"
      >
        <Logo />
      </a>
      <h1
        className="page-title"
        title="Disclaimer: This is an engineering unofficial project!"
      >
        HST ABBR
      </h1>
      <h6 className="text-sm sm:text-base md:text-xl md:leading-8 text-primary-lighter font-normal px-2 md:px-0">
        Powerful abbreviation search engine with over 4,000 abbreviations,
        because apparently googling or asking a colleague for clarification is
        too time-consuming.
      </h6>

      {/* @ts-expect-error Server Component */}
      <SearchBox />
    </div>
  )
}

export default Page
