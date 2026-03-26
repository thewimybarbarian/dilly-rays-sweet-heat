"use client";

import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const baseStyles =
  "w-full bg-heat-black text-heat-white border-4 border-heat-charcoal px-4 py-3 font-body text-base placeholder:text-heat-smoke focus:border-heat-red focus:outline-none focus:ring-2 focus:ring-heat-red/50 transition-colors";

const labelStyles = "block font-display uppercase tracking-widest text-sm text-heat-white mb-2";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = "", id, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label htmlFor={id} className={labelStyles}>
            {label}
          </label>
        )}
        <input ref={ref} id={id} className={`${baseStyles} ${className}`} {...props} />
      </div>
    );
  }
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className = "", id, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label htmlFor={id} className={labelStyles}>
            {label}
          </label>
        )}
        <textarea ref={ref} id={id} className={`${baseStyles} min-h-[120px] resize-y ${className}`} {...props} />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
