import { Logo } from '@components/Logo'
import SearchBox from '@components/searchBox'

async function Page() {
  return (
    <div className="pt-6 mx-auto 2xl:w-full md:max-w-3xl text-center pb-6">
      <a
        className="flex justify-center"
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
      <h6 className="text-xl leading-8 text-primary-lighter font-normal">
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
