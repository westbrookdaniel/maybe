import { useAuth } from 'src/auth'
import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  const { isAuthenticated, signUp, logIn, logOut, currentUser, userMetadata } =
    useAuth()

  console.log({ currentUser, userMetadata })

  return (
    <>
      <Metadata title="Home" description="Home page" />

      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
      <p>
        Items can be found at <Link to={routes.items()}>Items</Link>
      </p>

      <p>{JSON.stringify({ isAuthenticated })}</p>
      <button onClick={() => signUp()}>sign up</button>
      <button onClick={() => logIn()}>log in</button>
      <button onClick={() => logOut()}>log out</button>
    </>
  )
}

export default HomePage
