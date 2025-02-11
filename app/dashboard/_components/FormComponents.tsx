import { Select, TextField } from "@radix-ui/themes";
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
  label: string;
  name: string;
  options: { label: string; value: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errorMessage?: string;
  placeholder?: string;
  defaultValue?: string;
}

export function SelectInput({
  label,
  name,
  options,
  control,
  errorMessage,
  placeholder,
  defaultValue,
}: SelectInputProps) {
  return (
    <div className="mb-4">
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
            >
              <Select.Trigger placeholder={placeholder} />

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
