import cn, { Argument } from "classnames";
import React from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const inputClasses = {
  root: `group relative h-14 w-full rounded-md border border-[#a5a5a6] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary`,
  label: `absolute left-2 top-1/2 z-0 -translate-y-1/2 bg-background px-1 text-base pointer-events-none duration-200 group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-primary`,
  labelError: `absolute left-2 top-1/2 z-0 -translate-y-1/2 bg-background px-1 text-red-500 pointer-events-none duration-200 group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-red-500`,
  input: `z-10 h-full w-full rounded-md bg-background px-3.5 py-4 outline-none`,
};

function useCnMerge(...classNames: Argument[]) {
  return React.useMemo(() => twMerge(cn(classNames)), [classNames]);
}

interface InputProps extends React.ComponentProps<"input"> {
  placeholder: string;
  error?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, error, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className={cn(inputClasses.root, { "has-error": hasError })}>
        <label
          className={cn(
            inputClasses.label,
            { [inputClasses.labelError]: hasError }, // Adicionando classe condicional para alterar a cor do texto
          )}
          htmlFor={props.id ?? props.name}
        >
          {hasError ? error?.message || "Campo inválido" : placeholder}
        </label>
        <input
          id={props.id ?? props.name}
          {...props}
          ref={ref}
          className={inputClasses.input}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
