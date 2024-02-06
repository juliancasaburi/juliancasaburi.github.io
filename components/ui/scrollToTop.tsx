"use client"

import { cn } from "@/lib/utils"
import { ArrowBigUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <div className="fixed bottom-2 right-2">
      <button
        type="button"
        onClick={scrollToTop}
        className={cn(
          isVisible ? "opacity-100" : "opacity-0",
          "inline-flex items-center rounded-full bg-primary my-5 p-3 text-secondary shadow-sm transition-opacity hover:bg-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1"
        )}
      >
        <ArrowBigUp className="h-7 w-7" aria-hidden="true" />
      </button>
    </div>
  )
}