import { NavLink, routes } from '@redwoodjs/router'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col space-y-8">
      <header className="flex p-8">
        <div className="flex-1" />
        <nav className="flex flex-1 justify-center space-x-8">
          <NavLink className="text-gray-400" activeClassName="text-black" to={routes.items()}>Keep</NavLink>
          <NavLink className="text-gray-400" activeClassName="text-black" to={routes.home()}>Maybe</NavLink>
          <NavLink className="text-gray-400" activeClassName="text-black" to={routes.items()}>Profile</NavLink>
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
