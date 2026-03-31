"use client"

import React, {
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0)
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    )

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }, [index, delay])

    const itemsToShow = useMemo(() => {
      const result = []
      for (let i = index; i >= 0 && result.length < childrenArray.length; i--) {
        result.push(childrenArray[i % childrenArray.length])
      }
      return result
    }, [index, childrenArray])

    return (
      <div
        className={cn("flex flex-col items-center gap-3", className)}
        {...props}
      >
        <AnimatePresence initial={false}>
          {itemsToShow.map((item, i) => (
            <motion.div
              key={index - i}
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              layout
              className="mx-auto w-full"
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedList.displayName = "AnimatedList"
