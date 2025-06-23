import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts";

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  if (user) {
    return <Navigate replace to="/dashboard" />;
  }

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError("");

    try {
      await signIn(data.email, data.password);
    } catch (err) {
      setError("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* FORM COLUMN */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Container maxWidth="sm">
          <Stack spacing={4}>
            <Box>
              <Typography variant="h4" fontWeight={700} mb={1}>
                Bienvenido de nuevo
              </Typography>
              <Typography color="text.secondary">
                Ingresá tus datos para continuar
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                  label="Correo electrónico"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email", {
                    required: "Email requerido",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email inválido",
                    },
                  })}
                />

                <TextField
                  label="Contraseña"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register("password", {
                    required: "Contraseña requerida",
                    minLength: {
                      value: 6,
                      message: "Mínimo 6 caracteres",
                    },
                  })}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Recordarme"
                  />
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: "pointer" }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Typography>
                </Stack>

                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
              </Stack>
            </form>

            <Typography textAlign="center" variant="body2">
              ¿No tenés cuenta?{" "}
              <Typography component="span" color="primary" fontWeight={500}>
                Registrate
              </Typography>
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* IMAGE COLUMN */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "primary.dark",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          p: 6,
        }}
      >
        <Box
          component="img"
          src="/logo-fidelix-black.webp"
          alt="Login Illustration"
          sx={{
            maxWidth: "100%",
            maxHeight: "80vh",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
}
