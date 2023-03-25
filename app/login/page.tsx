import Login from './Login'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@lib/auth/options'

async function LoginPage() {
  const session = await getServerSession(authOptions)
  const isLoggedIn = !!session?.user

  if (isLoggedIn) {
    return redirect('/')
  }

  return <Login />
}

export default LoginPage
