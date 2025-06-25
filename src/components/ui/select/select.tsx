import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  type SelectProps,
  FormHelperText,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps extends Omit<SelectProps, "name"> {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  validation?: Record<string, unknown>;
}

export function SelectField({
  name,
  label,
  options,
  placeholder = "",
  validation,
  multiple = false,
  disabled = false,
  ...props
}: SelectFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name]?.message as string | undefined;

  return (
    <FormControl fullWidth error={!!fieldError} disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        multiple={multiple}
        defaultValue={multiple ? [] : ""}
        {...register(name, validation)}
        {...props}
      >
        {!multiple && placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </MuiSelect>
      {fieldError && <FormHelperText>{fieldError}</FormHelperText>}
    </FormControl>
  );
}
