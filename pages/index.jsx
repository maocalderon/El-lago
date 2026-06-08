import React from 'react'
import { Hero } from '../src/components/Hero'
import { AboutSection } from '../src/components/AboutSection'
import { MenuSection } from '../src/components/MenuSection'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <MenuSection />
    </>
  )
}
