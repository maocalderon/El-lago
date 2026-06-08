import React from 'react'

export function Reveal({ children, delay }: { children: React.ReactNode; delay?: number }) {
  return <div style={{ transitionDelay: `${(delay || 0) * 1000}s` }}>{children}</div>
}
