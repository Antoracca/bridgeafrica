"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const images = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2128&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2128&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop",
]

export function BackgroundSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 7000) // Un peu plus lent pour plus de douceur

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden bg-zinc-900">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-all duration-[3000ms] ease-in-out ${
            index === currentIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
        >
          <Image
            src={src}
            alt="Medical Background"
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />
    </div>
  )
}