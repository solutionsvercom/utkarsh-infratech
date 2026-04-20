import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/construction/Header'
import Hero from './components/construction/Hero'
import About from './components/construction/About'
import Services from './components/construction/Services'
import Projects from './components/construction/Projects'
import Packages from './components/construction/Packages'
import WhyChooseUs from './components/construction/WhyChooseUs'
import Testimonials from './components/construction/Testimonials'
import Contact from './components/construction/Contact'
import Footer from './components/construction/Footer'
import Portfolio from './pages/Portfolio'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Packages />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/company-profile" element={<Navigate to="/portfolio" replace />} />
      </Routes>
      <Footer />
    </div>
  )
}