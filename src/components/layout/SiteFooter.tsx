import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { storeInfo } from "@/data/store";

export function SiteFooter(): ReactElement {
  const { t } = useTranslation("common");

  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          <p className="font-[family-name:var(--font-display)] text-2xl tracking-[0.06em]">
            {t("appName")}
          </p>
          <p className="max-w-md text-sm text-[hsl(var(--muted-foreground))]">
            {storeInfo.legalName}
            <br />
            {storeInfo.addressLine}
            <br />
            {storeInfo.city}
          </p>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">{storeInfo.hours}</p>
        </div>

        <div className="space-y-3 text-sm">
          <p>
            <a className="hover:text-[hsl(var(--primary))]" href={`tel:${storeInfo.phone.replace(/\s/g, "")}`}>
              {storeInfo.phone}
            </a>
          </p>
          <p>
            <a className="hover:text-[hsl(var(--primary))]" href={`tel:${storeInfo.mobile.replace(/\s/g, "")}`}>
              {storeInfo.mobile}
            </a>
          </p>
          <p>
            <a className="hover:text-[hsl(var(--primary))]" href={`mailto:${storeInfo.email}`}>
              {storeInfo.email}
            </a>
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-[hsl(var(--muted-foreground))]">
            <Link to="/legal/condiciones">{t("legalTerms")}</Link>
            <Link to="/legal/privacidad">{t("legalPrivacy")}</Link>
            <Link to="/legal/retirada">{t("legalWithdrawal")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
