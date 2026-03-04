import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Input } from "@/shared/ui/input";
import {
  FormMessage,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
} from "@/shared/ui/form";
import { useState } from "react";

interface CustomFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
}

export const CustomField = <T extends FieldValues>({
  form,
  name,
  label,
}: CustomFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = name === "password";
  const isFile = name === "image";

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // 👉 CASE FILE INPUT
        if (isFile) {
          return (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          );
        }

        // 👉 CASE NORMAL INPUT
        return (
          <FormItem className="relative h-9">
            <FormControl>
              <Input
                type={
                  isPassword ? (showPassword ? "text" : "password") : "text"
                }
                autoComplete={name === "email" ? "email" : undefined}
                placeholder=" "
                {...field}
                className="peer px-4 py-1 text-sm border-gray-8 focus:ring-2 focus:ring-primary"
              />
            </FormControl>

            {isPassword && (
              <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 right-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="size-4" />
                ) : (
                  <FaEye className="size-4" />
                )}
              </button>
            )}

            <FormLabel className="peer-focus:text-primary peer-focus:scale-[0.9] peer-focus:-top-1 peer-focus:-translate-x-2 peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:scale-[0.9] peer-not-placeholder-shown:-top-1 peer-not-placeholder-shown:-translate-x-2 text-gray-6 font-normal absolute px-1 left-3 top-1/2 -translate-y-1/2 bg-white text-sm transition-all duration-200 ease">
              {label}
            </FormLabel>

            <FormMessage className="text-red-500 text-xs" />
          </FormItem>
        );
      }}
    />
  );
};
