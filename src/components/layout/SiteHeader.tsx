import { useState, type FormEvent, type ReactElement } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getIntentions, intentionCatalogPath } from "@/data/intentions";
import { cn } from "@/lib/utils";
import { useQuoteCount } from "@/quote/use-quote-count";

export function SiteHeader(): ReactElement {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const intentions = getIntentions();
  const quoteCount = useQuoteCount();
  const [query, setQuery] = useState("");

  function onSearch(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/buscar?q=${encodeURIComponent(trimmed)}` : "/buscar");
  }

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <NavLink
          to="/"
          className="font-[family-name:var(--font-display)] text-xl tracking-[0.08em] text-[hsl(var(--foreground))]"
        >
          {t("brandShort")}
        </NavLink>

        <form onSubmit={onSearch} className="order-3 w-full md:order-none md:w-auto md:flex-1 md:max-w-xs">
          <label className="sr-only" htmlFor="global-search">
            {t("searchTitle")}
          </label>
          <input
            id="global-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))]/80 px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
          />
        </form>

        <nav
          aria-label={t("navAria")}
          className="flex items-center gap-4 text-sm text-[hsl(var(--muted-foreground))] md:gap-5"
        >
          <div className="hidden items-center gap-4 xl:flex">
            {intentions.map((intention) => (
              <NavLink
                key={intention.id}
                to={intentionCatalogPath(intention.id)}
                className={({ isActive }) =>
                  cn(
                    "transition-colors hover:text-[hsl(var(--foreground))]",
                    isActive && "text-[hsl(var(--foreground))]",
                  )
                }
              >
                {t(intention.labelKey)}
              </NavLink>
            ))}
          </div>
          <NavLink
            to="/catalogo"
            className="transition-colors hover:text-[hsl(var(--foreground))]"
          >
            {t("ctaCatalogFull")}
          </NavLink>
          <NavLink
            to="/presupuesto"
            className="transition-colors hover:text-[hsl(var(--foreground))]"
          >
            {t("ctaQuote")}
            {quoteCount > 0 ? ` (${quoteCount})` : ""}
          </NavLink>
          <NavLink
            to="/cita"
            className="text-[hsl(var(--primary))] transition-colors hover:opacity-90"
          >
            {t("ctaAppointment")}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
