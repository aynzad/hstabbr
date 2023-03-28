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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
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

export async function generateMetadata() {
  const baseUrl =
    process.env.VERCEL_URL || process.env.NEXTAUTH_URL || process.env.url

  const title = 'HST ABBR | An engineering unofficial project'
  const description =
    'A powerful abbreviation search engine, because apparently googling or asking a colleague for clarification is too time-consuming'
  return {
    title,
    description,
    creator: 'Alireza Esfahani',
    keywords: ['abbreviation', 'fun', 'nextjs', 'react', 'prisma'],
    openGraph: {
      title,
      description,
      siteName: 'HST ABBR',
      images: [
        {
          url: `${baseUrl}/api/og`,
          width: 1200,
          height: 600
        }
      ],
      locale: 'en-US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/api/og`]
    }
  }
}
