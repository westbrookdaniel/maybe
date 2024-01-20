import { ReactNode, createContext, useContext, useId } from 'react'
import { motion } from 'framer-motion'

interface CheckboxContextProps {
  id: string
  isChecked: boolean
  setIsChecked: (isChecked: boolean) => void
}

const CheckboxContext = createContext<CheckboxContextProps>({
  id: '',
  isChecked: false,
  setIsChecked: () => {},
})

const tickVariants = {
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.2,
    },
  },
  unchecked: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

interface CheckboxProps {
  children: ReactNode
  checked: boolean
  onChange: (isChecked: boolean) => void
}

export default function Checkbox({
  children,
  checked,
  onChange,
}: CheckboxProps) {
  const id = useId()

  return (
    <div className="flex items-start gap-2">
      <CheckboxContext.Provider
        value={{
          id,
          isChecked: checked,
          setIsChecked: onChange,
        }}
      >
        {children}
      </CheckboxContext.Provider>
    </div>
  )
}

function CheckboxIndicator() {
  const { id, isChecked, setIsChecked } = useContext(CheckboxContext)

  return (
    <div className="relative flex items-center outline-none mt-[3px]">
      <input
        type="checkbox"
        className="peer absolute opacity-0"
        onChange={() => setIsChecked(!isChecked)}
        checked={isChecked}
        id={id}
      />
      <label
        htmlFor={id}
        className={`relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 transition-colors duration-500 peer-focus:ring-2 peer-focus:ring-black peer-focus:ring-offset-2${
          isChecked ? ' border-black bg-black' : ' border-gray-300'
        }`}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3.5"
          stroke="currentColor"
          className="h-3.5 w-3.5"
          initial={false}
          animate={isChecked ? 'checked' : 'unchecked'}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
            variants={tickVariants}
          />
        </motion.svg>
      </div>
    </div>
  )
}

Checkbox.Indicator = CheckboxIndicator

interface CheckboxLabelProps {
  children: ReactNode
}

function CheckboxLabel({ children }: CheckboxLabelProps) {
  const { id, isChecked } = useContext(CheckboxContext)

  return (
    <motion.label
      className="relative ml-2 cursor-pointer overflow-hidden"
      htmlFor={id}
      animate={{
        color: isChecked
          ? 'rgb(156 163 175 / 1)'
          : 'rgb(39, 39, 42)',
        textDecorationLine: isChecked ? 'line-through' : 'none',
      }}
      initial={false}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.label>
  )
}

Checkbox.Label = CheckboxLabel
