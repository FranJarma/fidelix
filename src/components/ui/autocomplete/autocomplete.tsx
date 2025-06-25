import {
  Autocomplete,
  TextField as MuiTextField,
  type AutocompleteProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface Option {
  label: string;
  value: string | number;
}

interface AutoCompleteFieldProps
  extends Omit<
    AutocompleteProps<Option, false, false, false>,
    "renderInput" | "name"
  > {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  validation?: Record<string, unknown>;
  disabled?: boolean;
}

export function AutoCompleteField({
  name,
  label,
  options,
  placeholder = "",
  validation,
  disabled = false,
  ...props
}: AutoCompleteFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field, fieldState }) => (
        <Autocomplete
          {...field}
          onChange={(_, newValue) => field.onChange(newValue?.value ?? "")}
          value={options.find((option) => option.value === field.value) ?? null}
          options={options}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          disabled={disabled}
          renderInput={(params) => (
            <MuiTextField
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
          {...props}
        />
      )}
    />
  );
}
