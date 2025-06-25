import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import type { UseFormReturn } from "react-hook-form";
import type { Client } from "../types/clients.types";

const LEVELS = [
  { label: "Bronce", value: "bronze" },
  { label: "Plata", value: "silver" },
  { label: "Oro", value: "gold" },
  { label: "Platino", value: "platinum" },
];

const SOURCES = [
  { label: "En tienda", value: "in_store" },
  { label: "Web", value: "web" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Manual", value: "manual" },
];

type ClientFormDialogProps = {
  confirmButtonTitle: string;
  dialogTitle: string;
  editing: Client | null;
  form: UseFormReturn<Client>;
  onClose: () => void;
  onSubmit: () => void;
  open: boolean;
};

export function ClientFormDialog({
  confirmButtonTitle,
  dialogTitle,
  form,
  onClose,
  onSubmit,
  open,
}: ClientFormDialogProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = form;

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("fullName", { required: "Nombre requerido" })}
                fullWidth
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                label="Nombre completo"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("email", {
                  required: "Email requerido",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email inválido",
                  },
                })}
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                label="Email"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("phone", { required: "Teléfono requerido" })}
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
                label="Teléfono"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("city", { required: "Ciudad requerida" })}
                fullWidth
                error={!!errors.city}
                helperText={errors.city?.message}
                label="Ciudad"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("province", { required: "Provincia requerida" })}
                fullWidth
                error={!!errors.province}
                helperText={errors.province?.message}
                label="Provincia"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("country", { required: "País requerido" })}
                fullWidth
                error={!!errors.country}
                helperText={errors.country?.message}
                label="País"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("points", {
                  required: "Puntos requeridos",
                  min: { value: 0, message: "Debe ser mayor o igual a 0" },
                })}
                fullWidth
                type="number"
                error={!!errors.points}
                helperText={errors.points?.message}
                label="Puntos"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth error={!!errors.level}>
                <InputLabel>Nivel</InputLabel>
                <Select
                  defaultValue=""
                  label="Nivel"
                  {...register("level", { required: "Nivel requerido" })}
                >
                  {LEVELS.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth error={!!errors.source}>
                <InputLabel>Origen</InputLabel>
                <Select defaultValue="" label="Origen" {...register("source")}>
                  {SOURCES.map((source) => (
                    <MenuItem key={source.value} value={source.value}>
                      {source.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            {confirmButtonTitle}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
