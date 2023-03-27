'use client'
function PageError({ error }: { error: Error }) {
  return (
    <div className="flex flex-col justify-center h-full self-center">
      <div className="mx-auto 2xl:w-full md:max-w-3xl text-center pb-6">
        <h1 className="page-title">{error.message || 'Page Not Found!'}</h1>
      </div>
    </div>
  )
}

export default PageError
