import { Grid, Button, CircularProgress } from "@mui/material";
import { FormProvider } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { Client } from "../types/clients.types";
import { TextField } from "@/components/ui/textfield/textfield";
import { Dialog } from "@/components/ui/dialog/dialog";
import { FormTitle } from "@/components/shared/form-title";
import {
  CLIENT_FORM_TITLES,
  DEFAULT_CLIENT_FORM_VALUES,
} from "../constants/clients.constants";
import { Select } from "@/components/ui/select/select";
import { useGeorefApi } from "@/hooks/useGeoRefApi";
import type { Municipio, Provincia } from "@/types/georef.types";
import { convertApiDataToSelectOptions } from "@/utils/mapUtils";
import * as React from "react";
import { Autocomplete } from "@/components/ui/autocomplete/autocomplete";
import { useResetForm } from "@/hooks/useResetForm";

const CLIENT_FORM_ID = "client-form";

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
  confirmButtonTitle,
  dialogTitle,
  form,
  loading = false,
  onClose,
  onSubmit,
  open,
}: ClientFormDialogProps) {
  const { handleSubmit } = form;
  const [selectedProvince, setSelectedProvince] = React.useState<string>("");

  const { data: provincias } = useGeorefApi<Provincia>("provincias");
  const { data: municipios } = useGeorefApi<Municipio>(
    "municipios",
    { provincia: selectedProvince },
    !!selectedProvince
  );

  useResetForm({
    defaultValues: DEFAULT_CLIENT_FORM_VALUES,
    editing,
    form,
    open,
  });

  return (
    <Dialog
      onClose={onClose}
      open={open}
      title={dialogTitle}
      actions={
        <>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            form={CLIENT_FORM_ID}
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : confirmButtonTitle}
          </Button>
        </>
      }
    >
      <FormProvider {...form}>
        <form id={CLIENT_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
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
              <Select
                defaultValue="Argentina"
                disabled
                name="country"
                label="País"
                options={[{ label: "Argentina", value: "Argentina" }]}
                validation={{ required: "País requerido" }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Autocomplete
                name="province"
                label="Provincia"
                options={convertApiDataToSelectOptions(provincias, "nombre")}
                onValueChange={(value) => setSelectedProvince(String(value))}
                validation={{ required: "Provincia requerida" }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Autocomplete
                disabled={!selectedProvince}
                name="city"
                label="Ciudad"
                options={convertApiDataToSelectOptions(municipios, "nombre")}
                validation={{ required: "Ciudad requerida" }}
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
              <Select
                label="Nivel"
                name="level"
                options={LEVELS}
                validation={{ required: "Nivel requerido" }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Select
                label="Origen"
                name="source"
                options={SOURCES}
                validation={{ required: "Origen requerido" }}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Dialog>
  );
}
