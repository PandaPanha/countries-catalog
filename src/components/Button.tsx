import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variants?: "outline";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variants, disabled, type = "button", ...props },
    ref
  ) => {
    return (
      <button
        type={type}
        className={twMerge(
          `px-4 py-2 rounded-lg ${
            variants === "outline"
              ? "border border-slate-500 text-slate-500"
              : "bg-slate-500 text-white"
          } ${
            disabled && 'opacity-60 cursor-not-allowed'
          }` ,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
