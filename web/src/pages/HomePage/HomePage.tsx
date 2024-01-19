import { useAuth } from 'src/auth'
import ItemsCell from 'src/components/Item/ItemsCell'

const HomePage = () => {
  const { isAuthenticated, signUp, logIn, logOut } = useAuth()

  if (!isAuthenticated) {
    return (
      <>
        <p className="mt-32 text-center">Login to see your items</p>
        <div className="mt-8 flex flex-col space-y-2">
          <button className="button" onClick={() => logIn()}>
            log in
          </button>
          <button className="button" onClick={() => signUp()}>
            sign up
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <ItemsCell />
    </>
  )
}

export default HomePage
