import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'Agency', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 50], [0.02, 0.08])
  const blur = useTransform(scrollY, [0, 50], [8, 24])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }, [isOpen])

  return (
    <motion.header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 border border-white/10 ${
          isOpen ? 'rounded-3xl' : 'rounded-full'
        } backdrop-blur-md transition-all duration-300`}
        style={{
          backgroundColor: useTransform(scrollY, [0, 50], ['rgba(12,17,40,0.02)', 'rgba(12,17,40,0.08)']) as any,
        }}
      >
        <a href="#" className="flex items-center gap-2 font-black text-xl tracking-tighter">
          <span className="bg-gradient-to-r from-[#00f0ff] to-[#b026ff] bg-clip-text text-transparent">
            Slotmint
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors group">
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#00f0ff] to-[#b026ff] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <a href="#contact" className="inline-flex items-center px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:scale-105 active:scale-95 transition-transform duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]">
            Start Project
          </a>
        </div>
        <button className="md:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close menu' : 'Open menu'}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute top-20 left-4 right-4 rounded-3xl border border-white/10 bg-[#0c1128]/95 backdrop-blur-xl p-6 flex flex-col gap-4 md:hidden">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-200 hover:text-white py-2">{item.name}</a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="mt-2 inline-flex justify-center px-5 py-3 rounded-full bg-white text-black font-semibold">Start Project</a>
        </motion.div>
      )}
    </motion.header>
  )
}
