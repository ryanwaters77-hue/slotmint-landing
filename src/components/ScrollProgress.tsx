import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Advanced: Global scroll progress bar with spring physics
 * - useScroll() tracks document scroll
 * - useSpring adds natural lag / smoothing (feels premium)
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100] bg-gradient-to-r from-[#00f0ff] via-[#b026ff] to-[#00f0ff]"
      style={{ scaleX }}
    />
  )
}
