'use client'

import { useEffect } from 'react'

/**
 * Locks the main scroll container (#app-scroll defined in app/layout.tsx)
 * when `active` is true. Falls back to document.body if the container
 * is not present. Handles multiple concurrent locks correctly via a counter.
 *
 * Setting `overflow: hidden` on the scroll container freezes scroll
 * position in place (no jump) and disables user scroll — equivalent to
 * a native app modal.
 */

let lockCount = 0
let previousOverflow: string | null = null

function getTarget(): HTMLElement | null {
  if (typeof document === 'undefined') return null
  return document.getElementById('app-scroll') ?? document.body
}

function lock() {
  lockCount++
  if (lockCount > 1) return
  const target = getTarget()
  if (!target) return
  previousOverflow = target.style.overflow
  target.style.overflow = 'hidden'
}

function unlock() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount > 0) return
  const target = getTarget()
  if (!target) return
  target.style.overflow = previousOverflow ?? ''
  previousOverflow = null
}

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    lock()
    return () => { unlock() }
  }, [active])
}
