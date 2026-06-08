import React from 'react'
import { Header } from '../src/components/Header'
import { Hero } from '../src/components/Hero'
import { AboutSection } from '../src/components/AboutSection'
import { MenuSection } from '../src/components/MenuSection'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AboutSection />
      <MenuSection />
    </>
  )
}
