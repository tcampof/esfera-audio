import type { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { HomePage } from "@/pages/HomePage";
import { StubPage } from "@/pages/StubPage";

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route
            path="catalogo"
            element={
              <StubPage titleKey="stubCatalogTitle" bodyKey="stubCatalogBody" />
            }
          />
          <Route
            path="cita"
            element={
              <StubPage titleKey="stubAppointmentTitle" bodyKey="stubAppointmentBody" />
            }
          />
          <Route
            path="legal/:slug"
            element={<StubPage titleKey="stubLegalTitle" bodyKey="stubLegalBody" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
