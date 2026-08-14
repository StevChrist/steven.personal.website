// dipakai di Main.tsx
'use client'

import { useEffect, useState, useRef } from 'react'

interface TypedTextProps {
  strings: string[]
  onStringTyped?: () => void
}

export default function TypedText({ strings, onStringTyped: onStringTypedProp }: TypedTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isGlitching, setIsGlitching] = useState(false)
  const callbackRef = useRef(onStringTypedProp)

  useEffect(() => {
    callbackRef.current = onStringTypedProp
  }, [onStringTypedProp])

  useEffect(() => {
    let isMounted = true
    let stringIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeoutId: NodeJS.Timeout

    const typeLoop = () => {
      if (!isMounted) return

      const currentFullString = strings[stringIndex] || ''
      // Use Array.from to correctly slice Unicode grapheme clusters (emojis) without splitting surrogate pairs
      const characters = Array.from(currentFullString)

      if (isDeleting) {
        // Backspacing phase
        charIndex--
        setDisplayText(characters.slice(0, charIndex).join(''))

        if (charIndex <= 0) {
          isDeleting = false
          stringIndex = (stringIndex + 1) % strings.length
          timeoutId = setTimeout(typeLoop, 350) // Short pause before typing next phrase
        } else {
          timeoutId = setTimeout(typeLoop, 30) // Backspace speed
        }
      } else {
        // Typing phase
        charIndex++
        setDisplayText(characters.slice(0, charIndex).join(''))

        if (charIndex >= characters.length) {
          // Finished typing 1 full string
          // 1. Pause 1.2s so text is readable before glitch
          timeoutId = setTimeout(() => {
            if (!isMounted) return
            // 2. Trigger Glitch Error Effect
            setIsGlitching(true)
            if (callbackRef.current) callbackRef.current()

            // 3. Glitch Error runs for 450ms
            timeoutId = setTimeout(() => {
              if (!isMounted) return
              setIsGlitching(false)

              // 4. Post-glitch pause (850ms) before deleting starts
              timeoutId = setTimeout(() => {
                if (!isMounted) return
                isDeleting = true
                typeLoop()
              }, 850)
            }, 450)
          }, 1200)
        } else {
          timeoutId = setTimeout(typeLoop, 45) // Typing speed
        }
      }
    }

    typeLoop()

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, [strings])

  return (
    <span
      className={`text-sm sm:text-lg md:text-2xl font-protest transition-all duration-100 inline-block max-w-full text-center ${
        isGlitching ? 'glitch-error-active' : ''
      }`}
    >
      {displayText}
      <span className="typed-cursor animate-pulse text-[#408A71] ml-1 font-mono">|</span>
    </span>
  )
}
