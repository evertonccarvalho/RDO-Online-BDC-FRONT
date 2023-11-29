import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface InputFieldProps {
  control: Control;
  name: string;
  label: string;
  placeholder: string;
  type: string;
}

export default function FormInputField({
  control,
  name,
  label,
  placeholder,
  type,
  ...rest
}: any) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex gap-2 text-sm">
            {label} <FormMessage />
          </FormLabel>
          <FormControl>
            <Input {...rest} type={type} placeholder={placeholder} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
