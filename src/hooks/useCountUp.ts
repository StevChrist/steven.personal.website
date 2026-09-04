'use client'

import { useEffect, useState } from 'react'

export function useCountUp(
  target: number,
  start: boolean,
  duration = 1600,
  decimals = 0,
  delay = 0
) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) {
      setValue(0)
      return
    }

    let raf: number
    const timeoutId = setTimeout(() => {
      let startTimestamp: number | null = null

      const tick = (now: number) => {
        if (startTimestamp === null) {
          startTimestamp = now
        }
        const elapsed = now - startTimestamp
        const progress = Math.min(Math.max(0, elapsed / duration), 1)
        // Smooth cubic ease-out
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = parseFloat((target * eased).toFixed(decimals))
        setValue(current)

        if (progress < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          setValue(target)
        }
      }

      raf = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(raf)
    }
  }, [start, target, duration, decimals, delay])

  return value
}
