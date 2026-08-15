import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * ADVANCED SCROLL EFFECTS in Hero:
 * 1. useScroll({ target, offset }) - section-relative progress
 * 2. Multiple useTransform mappings from same progress
 * 3. useSpring for smoothed values (less jitter)
 * 4. Clip-path morph (circle expand = mask reveal)
 * 5. Independent parallax rates (scale, y, opacity, blur)
 * 6. Sticky container inside tall scroll track
 */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  })

  const outlineOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0])
  const outlineY = useTransform(smoothProgress, [0, 1], [0, -80])
  const outlineScale = useTransform(smoothProgress, [0, 1], [1, 1.08])

  const clipPath = useTransform(
    smoothProgress,
    [0, 0.7],
    ['circle(0% at 50% 50%)', 'circle(160% at 50% 50%)']
  )
  const realisticScale = useTransform(smoothProgress, [0, 1], [1.05, 1.2])
  const realisticY = useTransform(smoothProgress, [0, 1], [0, -40])

  const contentY = useTransform(smoothProgress, [0, 0.6], [0, -120])
  const contentOpacity = useTransform(smoothProgress, [0, 0.15, 0.45], [1, 1, 0])
  const contentBlur = useTransform(smoothProgress, [0, 0.4], [0, 12])
  const contentScale = useTransform(smoothProgress, [0, 0.5], [1, 0.92])

  const overlayOpacity = useTransform(smoothProgress, [0, 0.5], [0.3, 0.7])

  return (
    <section ref={containerRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            opacity: outlineOpacity,
            y: outlineY,
            scale: outlineScale,
          }}
        >
          <img
            src="https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/hero_city_outline_fzg37d.jpg"
            alt="City outline sketch"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            clipPath,
            scale: realisticScale,
            y: realisticY,
          }}
        >
          <img
            src="https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/hero_city_iglhwn.jpg"
            alt="Realistic city skyline"
            className="w-full h-full object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#0c1128]/40 via-transparent to-[#0c1128]"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10"
          style={{
            y: contentY,
            opacity: contentOpacity,
            scale: contentScale,
            filter: useTransform(contentBlur, (v) => `blur(${v}px)`),
          }}
        >
          <div className="space-y-6 max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xs font-bold uppercase tracking-widest text-[#00f0ff]"
            >
              Digital Agency • AI Powered
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05]"
            >
              <span className="block text-white">Imagine the Future</span>
              <span className="block mt-2 bg-gradient-to-r from-[#00f0ff] via-white to-[#b026ff] bg-clip-text text-transparent">
                Build the Reality
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25 }}
              className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed"
            >
              We craft premium digital experiences that convert. Strategy, design, and growth engineered for ambitious brands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-semibold text-base hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)]"
              >
                Start a Project
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 hover:border-[#00f0ff]/40 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                View Our Work
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
          style={{ opacity: contentOpacity }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  )
}
