import { Divider, Grid, Typography } from "@mui/material";

type FormTitleProps = {
  title: string;
  showDivider?: boolean;
};

export function FormTitle({ title, showDivider = true }: FormTitleProps) {
  return (
    <Grid size={{ xs: 12 }}>
      <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
        {title}
      </Typography>
      {showDivider && <Divider />}
    </Grid>
  );
}
