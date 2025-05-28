// dipakai di Main.tsx
'use client'

import { useEffect, useRef } from 'react'
import Typed from 'typed.js'


interface TypedTextProps {
  strings: string[]
}

export default function TypedText({ strings }: TypedTextProps) {
  const typedRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const typed = new Typed(typedRef.current!, {
      strings,
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 3000,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: '|',
    })

    return () => typed.destroy()
  }, [strings])

  return <span ref={typedRef} className="text-xl md:text-2xl font-protest" />
}
