import cn, { Argument } from "classnames";
import React from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const inputClasses = {
  root: `group relative h-10 w-full rounded-md border order-input focus-within:border-primary text-sm focus-within:ring-1 focus-within:ring-primary `,
  input: `z-10 h-full w-full rounded-md bg-background px-3.5 text-sm py-4 outline-none`,
  label: `absolute left-2 top-1/2 z-0 -translate-y-1/2 bg-background px-1 text-sm text-muted-foreground pointer-events-none duration-200 group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-primary`,
  labelError: `absolute left-2 top-1/2 z-0 -translate-y-1/2 bg-background px-1 text-red-500 pointer-events-none duration-200 group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-red-500`,
};

function useCnMerge(...classNames: Argument[]) {
  return React.useMemo(() => twMerge(cn(classNames)), [classNames]);
}

interface InputProps extends React.ComponentProps<"input"> {
  placeholder: string;
  error?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, value, error, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className={useCnMerge(inputClasses.root, { "has-error": hasError })}>
        <label
          className={useCnMerge(
            inputClasses.label,
            { [inputClasses.labelError]: hasError },
            value && "top-0 text-xs",
            // Adicionando classe condicional para alterar a cor do texto
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
