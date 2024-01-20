import { useAuth } from 'src/auth'
import ItemsCell from 'src/components/Item/ItemsCell'
import NewItemButton from 'src/components/Item/NewItemButton/NewItemButton'

const HomePage = () => {
  const { isAuthenticated, signUp, logIn, loading } = useAuth()

  if (loading) return null

  if (!isAuthenticated) {
    return (
      <>
        <p className="mt-32 text-center">Login to see your items</p>
        <div className="mt-8 flex flex-col space-y-2">
          <button className="button" onClick={() => logIn()}>
            Log In
          </button>
          <button className="button" onClick={() => signUp()}>
            Sign Up
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <ItemsCell />
      <NewItemButton />
    </>
  )
}

export default HomePage
