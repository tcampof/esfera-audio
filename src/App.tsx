import { useEffect, useState, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { mockCategories, mockProducts } from "@/data/mocks/catalog";
import { inventory } from "@/inventory/mock-inventory";
import type { StockSnapshot } from "@/inventory/types";

export default function App(): JSX.Element {
  const { t } = useTranslation("common");
  const [stockSample, setStockSample] = useState<StockSnapshot | null>(null);

  useEffect(() => {
    void inventory.getStock("var-vulkkano-negro").then(setStockSample);
  }, []);

  const hasImagen = mockCategories.some((category) =>
    category.slug.toLowerCase().includes("imagen"),
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
          {t("appName")}
        </p>
        <h1 className="text-3xl font-semibold text-[hsl(var(--foreground))]">
          {t("scaffoldTitle")}
        </h1>
        <p className="text-[hsl(var(--muted-foreground))]">{t("scaffoldBody")}</p>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">{t("tagline")}</p>
      </header>

      <section className="space-y-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
        <h2 className="text-lg font-medium">{t("categoriesLabel")}</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
          {mockCategories.map((category) => (
            <li key={category.id}>
              {category.name} ({category.slug})
            </li>
          ))}
        </ul>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Imagen en mocks: {hasImagen ? "FAIL" : "OK (ausente)"}
        </p>
      </section>

      <section className="space-y-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
        <h2 className="text-lg font-medium">{t("productsLabel")}</h2>
        <ul className="space-y-2 text-sm">
          {mockProducts.map((product) => (
            <li key={product.id} className="flex justify-between gap-4">
              <span>
                {product.brand} — {product.name}
              </span>
              <span className="text-[hsl(var(--muted-foreground))]">
                {(product.basePriceCents / 100).toLocaleString("es-ES", {
                  style: "currency",
                  currency: "EUR",
                })}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
        <h2 className="text-lg font-medium">{t("stockLabel")}</h2>
        {stockSample ? (
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            {stockSample.variantId}: {stockSample.stockQuantity} u. — {stockSample.stockStatus}
          </p>
        ) : (
          <p className="text-sm text-[hsl(var(--muted-foreground))]">…</p>
        )}
        <Button type="button" variant="outline" size="sm">
          shadcn/ui Button OK
        </Button>
      </section>
    </main>
  );
}
