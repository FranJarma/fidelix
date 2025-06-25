import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  type DialogProps as MuiDialogProps,
} from "@mui/material";

type DialogProps = MuiDialogProps & {
  actions?: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
};

export function Dialog({
  actions,
  children,
  maxWidth = "sm",
  title,
  ...rest
}: DialogProps) {
  return (
    <MuiDialog fullWidth maxWidth={maxWidth} {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers sx={{ overflow: "hidden" }}>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions sx={{ marginRight: 2 }}>{actions}</DialogActions>
      )}
    </MuiDialog>
  );
}
