import * as React from "react";
import { cn } from "@/lib/utils"; 
import { Button as ShadcnButton } from "@/components/ui/button"; 

const Button = React.forwardRef(({ className, ...props }, ref) => (
  <ShadcnButton
    ref={ref}
    className={cn(
      "w-full px-4 py-2 bg-blue-600 text-white rounded-2xl shadow-md transition-colors hover:bg-blue-700 disabled:bg-gray-400",
      className
    )}
    {...props}
  />
));

Button.displayName = "Button";

export {Button};
