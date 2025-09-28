"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface SheetContentProps {
  className?: string
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
}

interface SheetHeaderProps {
  className?: string
  children: React.ReactNode
}

interface SheetTitleProps {
  className?: string
  children: React.ReactNode
}

interface SheetDescriptionProps {
  className?: string
  children: React.ReactNode
}

const SheetContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
} | null>(null)

const Sheet = ({ open = false, onOpenChange, children }: SheetProps) => {
  return (
    <SheetContext.Provider value={{ open, onOpenChange: onOpenChange || (() => {}) }}>
      {children}
    </SheetContext.Provider>
  )
}

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const context = React.useContext(SheetContext)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    context?.onOpenChange(true)
    onClick?.(e)
  }

  return (
    <button
      ref={ref}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = ({
  className,
  children,
  side = "bottom",
  ...props
}: SheetContentProps) => {
  const context = React.useContext(SheetContext)

  if (!context) {
    throw new Error("SheetContent must be used within a Sheet")
  }

  const { open, onOpenChange } = context

  const slideVariants = {
    bottom: {
      hidden: { y: "100%" },
      visible: { y: 0 },
      exit: { y: "100%" }
    },
    top: {
      hidden: { y: "-100%" },
      visible: { y: 0 },
      exit: { y: "-100%" }
    },
    left: {
      hidden: { x: "-100%" },
      visible: { x: 0 },
      exit: { x: "-100%" }
    },
    right: {
      hidden: { x: "100%" },
      visible: { x: 0 },
      exit: { x: "100%" }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Sheet Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants[side]}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200
            }}
            className={cn(
              "fixed z-50 bg-white shadow-lg",
              side === "bottom" && "inset-x-0 bottom-0 rounded-t-3xl",
              side === "top" && "inset-x-0 top-0 rounded-b-3xl",
              side === "left" && "inset-y-0 left-0 w-3/4 max-w-sm rounded-r-3xl",
              side === "right" && "inset-y-0 right-0 w-3/4 max-w-sm rounded-l-3xl",
              className
            )}
            {...props}
          >
            {/* Close button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 rounded-full p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const SheetHeader = ({ className, children }: SheetHeaderProps) => {
  return (
    <div className={cn("p-6 pb-4", className)}>
      {children}
    </div>
  )
}

const SheetTitle = ({ className, children }: SheetTitleProps) => {
  return (
    <h2 className={cn("text-xl font-bold text-slate-800", className)}>
      {children}
    </h2>
  )
}

const SheetDescription = ({ className, children }: SheetDescriptionProps) => {
  return (
    <p className={cn("text-sm text-slate-600 mt-2", className)}>
      {children}
    </p>
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
}