import { TextField as MuiTextField, type TextFieldProps } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface ClientTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  validation?: Record<string, unknown>;
}

export function TextField({
  name,
  label,
  validation,
  size = "small",
  type = "text",
  variant = "outlined",
  ...props
}: ClientTextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name]?.message as string | undefined;

  return (
    <MuiTextField
      {...register(name, validation)}
      error={!!fieldError}
      fullWidth
      helperText={fieldError}
      label={label}
      size={size}
      type={type}
      variant={variant}
      {...props}
    />
  );
}
