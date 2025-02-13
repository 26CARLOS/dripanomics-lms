import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

function AnimatedLogo() {
  const [showFull, setShowFull] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFull(true)
    }, 1000) // Start animation after 1 second

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative font-extrabold text-lg md:text-xl flex items-center">
      <AnimatePresence>
        {showFull && (
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mr-1"
          >
            Dripanomics Grail
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AnimatedLogo

