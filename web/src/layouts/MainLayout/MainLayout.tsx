import { NavLink, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { logOut } = useAuth()
  return (
    <div
      className="flex min-h-screen flex-col space-y-8 bg-gray-100"
      vaul-drawer-wrapper=""
    >
      <header className="flex p-6">
        <div className="flex-1" />
        <nav className="flex flex-1 justify-center space-x-6">
          <NavLink
            className="w-20 rounded-lg p-1 text-center text-gray-400"
            activeClassName="!text-black"
            to={routes.keep()}
          >
            Keep
          </NavLink>
          <NavLink
            className="w-20 rounded-lg p-1 text-center text-gray-400"
            activeClassName="!text-black"
            to={routes.home()}
          >
            Maybe
          </NavLink>
          <button
            onClick={() =>
              logOut({
                openUrl(url) {
                  window.location.replace(url)
                },
              })
            }
            className="w-20 rounded-lg p-1 text-center text-gray-400"
          >
            Logout
          </button>
        </nav>
        <div className="flex flex-1 justify-end">
          {/* <input type="text" placeholder="Search..." /> */}
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl">{children}</main>
    </div>
  )
}

export default MainLayout
