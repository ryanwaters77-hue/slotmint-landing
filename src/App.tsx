import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Clients from './components/Clients'
import Services from './components/Services'
import Work from './components/Work'
import About from './components/About'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen w-full bg-[#0c1128] text-white selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Services />
        <Work />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default App
