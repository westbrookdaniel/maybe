import { useAuth } from 'src/auth'
import ItemsCell from 'src/components/Item/ItemsCell'

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
    </>
  )
}

export default HomePage
