import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { NotFoundPage } from "./components/shared/not-found";
import { AuthProvider } from "./contexts/AuthContext";
import { OfflineProvider } from "./contexts/OfflineContext";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { theme } from "./theme";
import { ClientsPage } from "./features/clients/clients-page";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 3,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <OfflineProvider>
          <AuthProvider>
            <Router>
              <Routes>
                <Route element={<LoginPage />} path="/login" />
                <Route
                  element={<Navigate replace to="/dashboard" />}
                  path="/"
                />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Routes>
                          <Route
                            element={<DashboardPage />}
                            path="/dashboard"
                          />
                          <Route element={<ClientsPage />} path="/clientes" />
                          <Route
                            element={<Navigate replace to="/dashboard" />}
                            path="/"
                          />
                          <Route element={<NotFoundPage />} path="*" />
                        </Routes>
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Router>
          </AuthProvider>
        </OfflineProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
