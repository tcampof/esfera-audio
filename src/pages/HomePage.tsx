import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomePage(): ReactElement {
  const { t } = useTranslation("common");

  return (
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
  );
}
