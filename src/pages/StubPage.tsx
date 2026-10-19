import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface StubPageProps {
  titleKey: "stubCatalogTitle" | "stubAppointmentTitle" | "stubLegalTitle";
  bodyKey: "stubCatalogBody" | "stubAppointmentBody" | "stubLegalBody";
}

export function StubPage({ titleKey, bodyKey }: StubPageProps): ReactElement {
  const { t } = useTranslation("common");

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center gap-4 px-6 py-28">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide">
        {t(titleKey)}
      </h1>
      <p className="text-[hsl(var(--muted-foreground))]">{t(bodyKey)}</p>
      <Link to="/" className="text-sm text-[hsl(var(--primary))] hover:opacity-90">
        {t("backHome")}
      </Link>
    </main>
  );
}
