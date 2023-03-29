'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

function PageError({ error }: { error: Error }) {
  const session = useSession()

  return (
    <div className="flex flex-col justify-center h-full self-center">
      <div className="mx-auto 2xl:w-full md:max-w-3xl text-center pb-10">
        <h1 className="page-title">Page Not Found!</h1>
        <h2 className="text-lg mt-8 text-primary-lighter font-normal">
          There's nothing to show here, <Link href="/">Go home</Link>
        </h2>
      </div>
    </div>
  )
}

export default PageError
