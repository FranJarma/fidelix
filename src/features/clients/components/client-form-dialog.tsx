import {
  Grid,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FormProvider } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { Client } from "../types/clients.types";
import { TextField } from "@/components/ui/textfield/textfield";
import { CustomDialog } from "@/components/ui/dialog/dialog";
import { FormTitle } from "@/components/shared/form-title";
import { CLIENT_FORM_TITLES } from "../constants/clients.constants";
import { FORM_CONSTANTS } from "@/constants/form.constants";

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
  confirmButtonTitle?: string;
  dialogTitle?: string;
  editing: Client | null;
  form: UseFormReturn<Client>;
  onClose: () => void;
  onSubmit: () => void;
  open: boolean;
  loading?: boolean;
};

export function ClientFormDialog({
  editing,
  confirmButtonTitle = editing
    ? FORM_CONSTANTS.EDIT_LABEL
    : FORM_CONSTANTS.CREATE_LABEL,
  dialogTitle = editing
    ? FORM_CONSTANTS.EDIT_LABEL
    : FORM_CONSTANTS.CREATE_LABEL,
  form,
  loading = false,
  onClose,
  onSubmit,
  open,
}: ClientFormDialogProps) {
  const {
    formState: { errors },
    handleSubmit,
  } = form;

  return (
    <CustomDialog
      onClose={onClose}
      open={open}
      title={dialogTitle}
      actions={
        <>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : confirmButtonTitle}
          </Button>
        </>
      }
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <FormTitle title={CLIENT_FORM_TITLES.CONTACT_DATA} />
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="fullName"
                label="Nombre completo"
                autoFocus
                validation={{ required: "Nombre requerido" }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="phone"
                label="Teléfono"
                validation={{ required: "Teléfono requerido" }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="email"
                label="Email"
                validation={{
                  required: "Email requerido",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email inválido",
                  },
                }}
              />
            </Grid>
            <FormTitle title={CLIENT_FORM_TITLES.UBICATION_DATA} />
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="country"
                label="País"
                validation={{ required: "País requerido" }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="city"
                label="Ciudad"
                validation={{ required: "Ciudad requerida" }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="province"
                label="Provincia"
                validation={{ required: "Provincia requerida" }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormTitle title={CLIENT_FORM_TITLES.FIDELIZATION_DATA} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="points"
                label="Puntos"
                type="number"
                validation={{
                  required: "Puntos requeridos",
                  min: { value: 0, message: "Debe ser mayor o igual a 0" },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.level}>
                <InputLabel>Nivel</InputLabel>
                <Select
                  defaultValue=""
                  label="Nivel"
                  {...form.register("level", { required: "Nivel requerido" })}
                >
                  {LEVELS.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth error={!!errors.source}>
                <InputLabel>Origen</InputLabel>
                <Select
                  defaultValue=""
                  label="Origen"
                  {...form.register("source")}
                >
                  {SOURCES.map((source) => (
                    <MenuItem key={source.value} value={source.value}>
                      {source.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </CustomDialog>
  );
}
