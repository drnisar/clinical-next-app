import { Flex, Select, TextField } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { Control, Controller, UseFormRegisterReturn } from "react-hook-form";

export function TextInput({
  label,
  name,
  type,
  placeholder,
  errorMessage,
  defaultValue,
  hidden,
  register,
}: {
  label: string;
  name: string;
  type:
    | "number"
    | "search"
    | "time"
    | "text"
    | "hidden"
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "password"
    | "tel"
    | "url"
    | "week"
    | undefined;
  placeholder: string;
  defaultValue?: string | number | undefined;
  errorMessage: string;
  hidden?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (name: string, options?: object) => UseFormRegisterReturn<any>;
}) {
  return (
    <div className={`mb-4 ${hidden ? "hidden" : ""}`}>
      <div className="mb-2">
        <label htmlFor={name}>{label}</label>
      </div>
      <div>
        <TextField.Root
          size="2"
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...register(name)}
        />
        {/* <input
          id={name}
          type={type}
          {...register(name)}
          className="border border-gray-300 rounded-md w-full size-8"
        /> */}
      </div>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
}

interface SelectInputProps {
  label?: string;
  name: string;
  size?: "1" | "2" | "3";
  options: { label: string; value: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errorMessage?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export function SelectInput({
  label,
  name,
  size,
  options,
  control,
  errorMessage,
  placeholder,
  defaultValue,
  className,
}: SelectInputProps) {
  return (
    <div>
      <div className="mb-2">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="w-full">
        <Controller
          name={name}
          defaultValue={defaultValue || ""}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select.Root
              onValueChange={onChange}
              value={value || defaultValue || ""}
              defaultValue={defaultValue || ""}
              size={size}
            >
              <Select.Trigger placeholder={placeholder} className={className} />

              <Select.Content>
                <Select.Group>
                  <Select.Label>Options</Select.Label>
                  {options.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          )}
        />
      </div>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
}

interface InputGenericProps {
  name: string;
  label: string;
  errorMessage: string;
  children: ReactNode;
  className?: string;
}
export function InputGeneric({
  name,
  label,
  errorMessage,
  children,
  className = "",
}: InputGenericProps) {
  return (
    <Flex direction="column" className={`mb-2 ${className}`}>
      <div className="mb-2 ">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="w-full">{children}</div>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </Flex>
  );
}

interface SelectInputServerSideProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  errorMessage?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
  size?: "1" | "2" | "3";
}

export const SelectInputServerSide = ({
  label,
  name,
  options,
  errorMessage,
  placeholder,
  defaultValue,
  required = false,
  className = "",
  size = "2",
}: SelectInputServerSideProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>

      {/* Hidden input to capture the value for form submission */}
      <input
        type="hidden"
        name={name}
        value={selectedValue}
        required={required}
      />

      <Select.Root
        value={selectedValue}
        onValueChange={(value) => setSelectedValue(value)}
        defaultValue={defaultValue || ""}
        size={size}
      >
        <Select.Trigger placeholder={placeholder} className="w-full" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Options</Select.Label>
            {options.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};
