import type { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { CatalogPage } from "@/pages/CatalogPage";
import { HomePage } from "@/pages/HomePage";
import { ProductPage } from "@/pages/ProductPage";
import { QuotePage } from "@/pages/QuotePage";
import { SearchPage } from "@/pages/SearchPage";
import { StubPage } from "@/pages/StubPage";

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="catalogo" element={<CatalogPage />} />
          <Route path="producto/:slug" element={<ProductPage />} />
          <Route path="buscar" element={<SearchPage />} />
          <Route path="presupuesto" element={<QuotePage />} />
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
