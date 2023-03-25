'use client'

import { ReactNode, useState } from 'react'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import { StoreProvider } from 'store/store'

interface Props {
  children: ReactNode
  session: Session | null
}

export function Providers({ session, children }: Props) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <div>{children}</div>
        </StoreProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
        />
      </QueryClientProvider>
    </SessionProvider>
  )
}
