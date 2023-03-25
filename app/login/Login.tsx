'use client'

import { Logo } from '@components/Logo'
import { signIn } from 'next-auth/react'

export default function Login() {
  return (
    <div className="flex flex-col justify-center h-full self-center">
      <div className="-mt-32 mx-auto 2xl:w-full md:max-w-3xl text-center pb-6">
        <a className="flex justify-center" href="/">
          <Logo />
        </a>
        <h1 className="page-title">LGN</h1>
        <h6 className="text-xl leading-8 text-primary-lighter font-normal">
          Login to the most powerful abbreviation search engine to help a
          colleague to relief from googling or searching abbreviations.
        </h6>
      </div>
      <div className="flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="mx-auto sm:w-full sm:max-w-sm">
          <div className="py-4 px-4 mx-2 rounded-sm sm:px-10">
            <section className="mt-4 text-center">
              <div className="grid grid-cols-1">
                <button
                  type="button"
                  onClick={e => {
                    e.preventDefault()
                    signIn('google')
                  }}
                  className="button button__secondary inline-flex space-x-2"
                >
                  <img className="w-6 h-6" src="/assets/google.svg" />
                  <p className="text-primary-darken">Sign in with Google</p>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
