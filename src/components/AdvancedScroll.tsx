import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * ADVANCED TECHNIQUES SHOWCASE
 * 1. Horizontal scroll driven by vertical scroll (useScroll + useTransform x)
 * 2. Staggered character / word reveal on scroll progress
 * 3. 3D rotateY cards that flip with progress
 * 4. Opacity + scale sequences
 * 5. Sticky + tall track pattern
 */

const phrases = [
  { title: 'Scroll Linked', subtitle: 'Motion values map to any CSS property' },
  { title: 'Parallax Depth', subtitle: 'Different rates create cinematic layers' },
  { title: 'Clip & Mask', subtitle: 'Morph shapes with clip-path progress' },
  { title: 'Spring Physics', subtitle: 'useSpring adds natural inertia' },
  { title: '3D Transforms', subtitle: 'Perspective + rotate based on scroll' },
]

export default function AdvancedScroll() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  const x = useTransform(smooth, [0.1, 0.9], ['5%', '-75%'])

  const headerY = useTransform(smooth, [0, 0.2], [40, 0])
  const headerOpacity = useTransform(smooth, [0, 0.15], [0, 1])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      <motion.div
        style={{ y: headerY, opacity: headerOpacity }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-4">
          Advanced Techniques
        </p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
          Scroll is the new{' '}
          <span className="bg-gradient-to-r from-[#00f0ff] to-[#b026ff] bg-clip-text text-transparent">
            interaction
          </span>
        </h2>
      </motion.div>

      <div className="relative h-[50vh] flex items-center">
        <motion.div
          style={{ x }}
          className="flex gap-8 px-8 will-change-transform"
        >
          {phrases.map((item, i) => {
            const cardProgress = useTransform(
              smooth,
              [0.15 + i * 0.12, 0.35 + i * 0.12],
              [0, 1]
            )
            const rotateY = useTransform(cardProgress, [0, 1], [25, 0])
            const scale = useTransform(cardProgress, [0, 1], [0.85, 1])
            const opacity = useTransform(cardProgress, [0, 0.4, 1], [0.4, 1, 1])

            return (
              <motion.div
                key={item.title}
                style={{
                  rotateY,
                  scale,
                  opacity,
                  transformPerspective: 1200,
                }}
                className="shrink-0 w-[320px] md:w-[380px] h-[280px] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-8 flex flex-col justify-between hover:border-[#00f0ff]/30 transition-colors"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#b026ff]">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight mt-3 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00f0ff] to-[#b026ff]"
                    style={{ scaleX: cardProgress, originX: 0 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-24 text-center">
        <StaggeredReveal />
      </div>
    </section>
  )
}

function StaggeredReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.3'],
  })

  const words = 'Every pixel responds to your scroll position.'.split(' ')

  return (
    <div ref={ref} className="py-12">
      <p className="text-2xl md:text-4xl font-medium tracking-tight leading-snug flex flex-wrap justify-center gap-x-2 gap-y-1">
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1])
          const y = useTransform(scrollYProgress, [start, end], [12, 0])

          return (
            <motion.span
              key={i}
              style={{ opacity, y }}
              className="inline-block"
            >
              {word}
            </motion.span>
          )
        })}
      </p>
    </div>
  )
}
