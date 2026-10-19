import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buttonVariants } from "@/components/ui/button";
import { getIntentions, intentionCatalogPath } from "@/data/intentions";
import { cn } from "@/lib/utils";

export function HomePage(): ReactElement {
  const { t } = useTranslation("common");
  const intentions = getIntentions();

  return (
    <>
      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_70%_20%,hsl(36_28%_28%_/_0.35),transparent_55%),linear-gradient(160deg,hsl(220_18%_8%)_0%,hsl(220_16%_4%)_45%,hsl(220_20%_7%)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,hsl(40_10%_90%_/_0.35)_1px,transparent_0)] [background-size:22px_22px]"
        />

        <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-24 pt-28 md:justify-center md:pb-20">
          <div className="max-w-2xl animate-[hero-in_900ms_ease-out_forwards] opacity-0">
            <p className="font-[family-name:var(--font-display)] text-5xl leading-none tracking-[0.12em] text-[hsl(var(--foreground))] md:text-7xl">
              {t("appName")}
            </p>
            <h1 className="mt-6 max-w-xl font-[family-name:var(--font-display)] text-2xl font-medium leading-snug text-[hsl(var(--foreground))] md:text-3xl">
              {t("homeClaim")}
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg">
              {t("homeSupport")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/catalogo"
                className={cn(
                  buttonVariants(),
                  "transition-transform duration-300 hover:-translate-y-0.5",
                )}
              >
                {t("ctaCatalog")}
              </Link>
              <Link
                to="/cita"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "transition-transform duration-300 hover:-translate-y-0.5",
                )}
              >
                {t("ctaAppointment")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="intentions-heading"
        className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
            {t("intentionsEyebrow")}
          </p>
          <h2
            id="intentions-heading"
            className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl tracking-wide md:text-4xl"
          >
            {t("intentionsTitle")}
          </h2>
          <p className="mt-3 max-w-lg text-[hsl(var(--muted-foreground))]">
            {t("intentionsSupport")}
          </p>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {intentions.map((intention, index) => (
              <li
                key={intention.id}
                className="animate-[hero-in_700ms_ease-out_forwards] opacity-0"
                style={{ animationDelay: `${120 + index * 80}ms` }}
              >
                <Link
                  to={intentionCatalogPath(intention.id)}
                  className="group block space-y-2 border-t border-[hsl(var(--border))] pt-5 transition-colors hover:border-[hsl(var(--primary))]"
                >
                  <p className="font-[family-name:var(--font-display)] text-xl tracking-wide text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))]">
                    {t(intention.labelKey)}
                  </p>
                  <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {t(intention.supportKey)}
                  </p>
                </Link>
              </li>
            ))}
            <li
              className="animate-[hero-in_700ms_ease-out_forwards] opacity-0 sm:col-span-2 lg:col-span-1"
              style={{ animationDelay: `${120 + intentions.length * 80}ms` }}
            >
              <Link
                to="/catalogo"
                className="group block space-y-2 border-t border-[hsl(var(--border))] pt-5 transition-colors hover:border-[hsl(var(--primary))]"
              >
                <p className="font-[family-name:var(--font-display)] text-xl tracking-wide text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))]">
                  {t("intentionCatalog")}
                </p>
                <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {t("intentionCatalogSupport")}
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
