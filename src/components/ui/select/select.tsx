import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  FormHelperText,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

interface Option {
  label: string;
  value: string | number;
}

interface ControlledSelectFieldProps {
  defaultValue?: string;
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  size?: "small" | "medium";
  multiple?: boolean;
  validation?: Record<string, unknown>;
  onValueChange?: (value: string | number) => void;
}

export function Select({
  defaultValue,
  name,
  label,
  options,
  placeholder,
  disabled = false,
  size = "small",
  multiple = false,
  validation,
  onValueChange,
}: ControlledSelectFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name]?.message as string | undefined;

  return (
    <FormControl fullWidth disabled={disabled} error={!!fieldError} size={size}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <MuiSelect
            {...field}
            label={label}
            labelId={`${name}-label`}
            multiple={multiple}
            defaultValue={multiple ? [] : defaultValue ? defaultValue : ""}
            onChange={(e) => {
              field.onChange(e);
              onValueChange?.(e.target.value);
            }}
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
        )}
      />
      {fieldError && <FormHelperText>{fieldError}</FormHelperText>}
    </FormControl>
  );
}
