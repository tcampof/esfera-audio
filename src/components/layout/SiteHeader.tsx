import type { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPrimaryNavCategories } from "@/data/nav";
import { cn } from "@/lib/utils";

export function SiteHeader(): ReactElement {
  const { t } = useTranslation("common");
  const categories = getPrimaryNavCategories();

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <NavLink
          to="/"
          className="font-[family-name:var(--font-display)] text-xl tracking-[0.08em] text-[hsl(var(--foreground))]"
        >
          {t("brandShort")}
        </NavLink>

        <nav
          aria-label={t("navAria")}
          className="flex items-center gap-4 text-sm text-[hsl(var(--muted-foreground))] md:gap-5"
        >
          <div className="hidden items-center gap-5 md:flex">
            {categories.map((category) => (
              <NavLink
                key={category.id}
                to={`/catalogo?cat=${category.slug}`}
                className={({ isActive }) =>
                  cn(
                    "transition-colors hover:text-[hsl(var(--foreground))]",
                    isActive && "text-[hsl(var(--foreground))]",
                  )
                }
              >
                {category.name}
              </NavLink>
            ))}
          </div>
          <NavLink
            to="/catalogo"
            className="transition-colors hover:text-[hsl(var(--foreground))] md:hidden"
          >
            {t("ctaCatalog")}
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
