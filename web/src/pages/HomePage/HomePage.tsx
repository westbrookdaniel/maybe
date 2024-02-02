import { motion } from 'framer-motion'

import { useAuth } from 'src/auth'
import ItemsCell from 'src/components/Item/ItemsCell/ItemsMaybeCell'
import NewItemButton from 'src/components/Item/NewItemButton/NewItemButton'

const itemVariants = {
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    translateY: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
  hidden: {
    opacity: 0,
    scale: 0.98,
    translateY: 20,
  },
}

const fadeInProps = (i: number) => ({
  custom: i,
  initial: 'hidden',
  animate: 'visible',
  variants: itemVariants,
  transition: { type: 'spring', stiffness: 400, damping: 17 },
})

const HomePage = () => {
  const { isAuthenticated, signUp, logIn, loading } = useAuth()

  if (loading) return null

  if (!isAuthenticated) {
    return (
      <>
        <motion.p className="mt-32 text-center" {...fadeInProps(0)}>
          Login to see your items
        </motion.p>
        <div className="mt-8 flex flex-col items-center space-y-2">
          <motion.button
            className="button w-full max-w-sm"
            onClick={() => logIn()}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            {...fadeInProps(1)}
          >
            Log In
          </motion.button>
          <motion.button
            className="button w-full max-w-sm"
            onClick={() => signUp()}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            {...fadeInProps(2)}
          >
            Sign Up
          </motion.button>
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
