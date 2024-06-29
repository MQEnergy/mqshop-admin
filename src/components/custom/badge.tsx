import {cn} from "@/lib/utils.ts";
import {cva, type VariantProps} from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        gray: "border-transparent bg-gray-50 text-gray-600",
        red: "border-transparent bg-red-50 text-red-700",
        yellow: "border-transparent bg-yellow-50 text-yellow-800",
        green: "border-transparent bg-green-50 text-green-700",
        blue: "border-transparent bg-blue-50 text-blue-700",
        purple: "border-transparent bg-purple-50 text-purple-700",
        indigo: "border-transparent bg-indigo-50 text-indigo-700",
        pink: "border-transparent bg-pink-50 text-pink-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface CustomBadgeProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {
}

function Badge({className, variant, ...props}: CustomBadgeProps) {
  return (
    <div className={cn(badgeVariants({variant}), className)} {...props} />
  )
}

export {Badge, badgeVariants}