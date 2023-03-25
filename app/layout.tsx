import { ReactNode } from 'react'
import { authOptions } from '@lib/auth/options'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { Providers } from './providers'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
})

interface Props {
  children: ReactNode
}

export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className={`${inter.variable} font-sans dark`}>
      <head>
        <meta
          content="A powerful abbreviation search engine, because apparently googling or asking a colleague for clarification is too time-consuming"
          name="description"
        />
        <title>HST ABBR</title>
        <meta name="application-name" content="HST ABBR" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HST ABBR" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000212" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
      </head>
      <body>
        <Providers session={session}>
          <Header session={session} />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
