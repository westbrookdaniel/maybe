import { motion } from 'framer-motion'
import { Plus } from 'iconoir-react'

import { navigate, routes } from '@redwoodjs/router'

const itemVariants = {
  visible: {
    opacity: 1,
    scale: 1,
    translateY: 0,
  },
  hidden: {
    opacity: 0,
    scale: 0.98,
    translateY: 20,
  },
}

const fadeInProps = {
  initial: 'hidden',
  animate: 'visible',
  variants: itemVariants,
  transition: { type: 'spring', stiffness: 400, damping: 17 },
}

const NewItemButton = () => {
  return (
    <motion.button
      className="button-primary fixed bottom-12 left-[calc(50vw-18px)] rounded-full p-2"
      {...fadeInProps}
      onClick={() => navigate(routes.newItem())}
    >
      <Plus width={24} height={24} />
    </motion.button>
  )
}

export default NewItemButton
