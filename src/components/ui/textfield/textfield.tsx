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
  type = "text",
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
      label={label}
      type={type}
      error={!!fieldError}
      helperText={fieldError}
      fullWidth
      {...props}
    />
  );
}
