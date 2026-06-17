import { useState, useMemo } from 'react'
import './App.css'
import Loader from './components/Loader'
import Scene3D from './components/Scene3D'
import MouseFollower from './components/MouseFollower'
import CursorTrail from './components/CursorTrail'
import BackToTop from './components/BackToTop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SectionDivider from './components/SectionDivider'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Timeline from './components/Timeline'
import FunFacts from './components/FunFacts'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ReviewForm from './components/ReviewForm'
import AdminLogin from './components/Admin/AdminLogin'
import AdminLayout from './components/Admin/AdminLayout'

function App() {
  const [loading, setLoading] = useState(true)

  const params = new URLSearchParams(window.location.search)
  const isReviewMode = params.get('review') === 'true'
  const isAdminMode = params.get('admin') === 'true'

  // ─── Admin State ───────────────────────────────────────
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('admin_logged_in') === 'true'
  )

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('admin_logged_in')
    window.location.href = '/'
  }

  // ─── Review Form ───────────────────────────────────────
  if (isReviewMode) {
    return <ReviewForm />
  }

  // ─── Admin Dashboard ──────────────────────────────────
  if (isAdminMode) {
    if (!isLoggedIn) {
      return <AdminLogin onLogin={setIsLoggedIn} />
    }
    return <AdminLayout onLogout={handleLogout} />
  }

  // ─── Portfolio ─────────────────────────────────────────
  const stars = useMemo(() => {
    return [...Array(60)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${2 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 3}s`,
    }))
  }, [])

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <div className="app">
          <MouseFollower />
          <CursorTrail />
          <Scene3D />
          <div className="bg-grid"></div>
          <div className="bg-glow-1"></div>
          <div className="bg-glow-2"></div>
          <div className="bg-glow-3"></div>
          <div className="bg-stars">
            {stars.map((s, i) => (
              <div key={i} className="star" style={s}></div>
            ))}
          </div>

          <Navbar />
          <Hero />
          <SectionDivider type="wave" />
          <About />
          <SectionDivider type="glow" />
          <Skills />
          <SectionDivider type="stars" />
          <Projects />
          <SectionDivider type="wave" flip />
          <Services />
          <SectionDivider type="glow" />
          <Testimonials />
          <SectionDivider type="stars" />
          <Timeline />
          <SectionDivider type="wave" />
          <FunFacts />
          <SectionDivider type="glow" />
          <Contact />
          <Footer />
          <BackToTop />
        </div>
      )}
    </>
  )
}

export default App