import React from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = {
  default:
    "border   border-black text-black hover:bg-purple-600 hover:text-white",
  outline:
    "border border-black bg-transparent text-black hover:bg-purple-500 hover:text-white",
};

export default function Button({
  children,
  className,
  variant = "default",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex font-normal cursor-pointer hover:scale-105 items-center text-xl justify-center rounded-32 text-nowrap  transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background  px-16 py-2",
        buttonVariants[variant],
        className
      )}
      {...props}>
      {children}
    </button>
  );
}
