import {
  Autocomplete as MuiAutocomplete,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export type Option = {
  label: string;
  value: string | number;
};

type AutocompleteFieldProps = {
  name: string;
  label: string;
  options: Option[];
  disabled?: boolean;
  placeholder?: string;
  size?: "small" | "medium";
  validation?: Record<string, unknown>;
  onValueChange?: (value: string | number) => void;
};

export function Autocomplete({
  name,
  label,
  options,
  disabled = false,
  placeholder = "",
  validation,
  size = "small",
  onValueChange,
}: AutocompleteFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name]?.message as string | undefined;

  return (
    <FormControl fullWidth error={!!fieldError}>
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => {
          const selectedOption =
            options.find((opt) => opt.value === field.value) || null;

          return (
            <MuiAutocomplete
              disablePortal
              options={options}
              size={size}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(opt, val) => opt.value === val.value}
              value={selectedOption}
              onChange={(_, newValue) => {
                const value = newValue?.value ?? "";
                field.onChange(value);
                onValueChange?.(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  placeholder={placeholder}
                  error={!!fieldError}
                />
              )}
              disabled={disabled}
            />
          );
        }}
      />
      {fieldError && <FormHelperText>{fieldError}</FormHelperText>}
    </FormControl>
  );
}
