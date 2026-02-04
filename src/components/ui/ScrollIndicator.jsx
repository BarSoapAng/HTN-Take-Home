import { motion } from "motion/react"
import { FaArrowDownLong } from "react-icons/fa6"

export default function ScrollIndicator() {
  return (
    <motion.div
      animate={{ y: [0, 10, 10, 0], opacity: [0.0, 1, 0, 0] }}
      transition={{
        duration: 2,
        times: [0, 0.5, 1, 1],
        ease: "easeInOut",
        repeat: Infinity,
      }}
      className="will-change-transform"
      aria-hidden="true"
    >
      <FaArrowDownLong className="h-7 w-7 text-[color:var(--green)]" />
    </motion.div>
  )
}
