import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  type DialogProps as MuiDialogProps,
} from "@mui/material";

type CustomDialogProps = MuiDialogProps & {
  actions?: React.ReactNode;
  children: React.ReactNode;
  title: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
};

export function CustomDialog({
  actions,
  children,
  maxWidth = "sm",
  title,
  ...rest
}: CustomDialogProps) {
  return (
    <Dialog fullWidth maxWidth={maxWidth} {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {actions && (
        <DialogActions sx={{ marginRight: 2 }}>{actions}</DialogActions>
      )}
    </Dialog>
  );
}
