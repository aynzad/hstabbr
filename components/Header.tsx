'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import classNames from 'classnames'
import { UserIcon } from '@heroicons/react/24/solid'
import { Logo } from './Logo'
interface Props {
  session: Session | null
}
export function Header({ session }: Props) {
  const currentPath = usePathname()
  const NAV_ITEMS = [
    {
      title: 'login',
      href: '/login',
      guest: true
    },
    {
      title: '+ New',
      href: '/new',
      private: true
    }
  ]

  const isLogin: boolean = !!session?.user

  const handleSignOut = () => {
    signOut()
  }

  return (
    <header>
      <div className="relative flex-shrink-0 flex h-20">
        <div className="border-b border-opacity-10 border-white flex-1 px-2 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <Link
            href="/"
            className="pr-4 pl-0 text-gray-400 outline-none focus:ring-0 flex items-center"
          >
            <Logo className="fill-primary" width={54} height={26} />
          </Link>

          <nav className="md-1 sm:ml-4 flex items-center md:ml-6 gap-2">
            {NAV_ITEMS.filter(
              item => (item.private && isLogin) || (item.guest && !isLogin)
            ).map(item => (
              <Link
                key={item.title}
                href={item.href}
                className={classNames(
                  item.href === currentPath ? ' text-black' : ' text-gray-600 ',
                  'button no-underline'
                )}
                aria-current={item.href === currentPath ? 'page' : undefined}
              >
                {item.title}
              </Link>
            ))}
            {session?.user && (
              <Menu as="div" className="ml1 sm:ml-3 relative">
                <div>
                  {session.user && (
                    <Menu.Button className="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ring-indigo-500  lg:rounded-full lg:hover:ring-2">
                      {session.user.image ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={session.user.image}
                          title={session.user.name || undefined}
                          alt={`${session.user.name?.[0] || ''} image`}
                        />
                      ) : (
                        <UserIcon className="h-8 w-8 rounded-full" />
                      )}

                      <span className="hidden  text-gray-700 text-sm font-medium lg:block">
                        <span className="sr-only">Open user menu for </span>
                      </span>
                    </Menu.Button>
                  )}
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg py-1 bg-primary-glass ring-1 ring-black ring-opacity-5 focus:outline-none z-10 border border-primary-light border-opacity-10">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={handleSignOut}
                          className={classNames(
                            active ? 'text-white' : '',
                            'block px-4 py-2 text-sm text-primary-lighter cursor-pointer'
                          )}
                        >
                          Sign Out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
