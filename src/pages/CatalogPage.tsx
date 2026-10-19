import type { ReactElement } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPrimaryNavCategories } from "@/data/nav";
import { filterProducts, getUniqueBrands, stockBadgeLabel } from "@/lib/catalog-query";
import { formatEurFromCents } from "@/lib/money";

export function CatalogPage(): ReactElement {
  const { t } = useTranslation("common");
  const [params, setParams] = useSearchParams();
  const categorySlug = params.get("cat") ?? undefined;
  const brand = params.get("brand") ?? undefined;
  const inStockOnly = params.get("stock") === "1";

  const products = filterProducts({ categorySlug, brand, inStockOnly });
  const brands = getUniqueBrands();
  const categories = getPrimaryNavCategories();

  function updateParam(key: string, value: string | null): void {
    const next = new URLSearchParams(params);
    if (!value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setParams(next);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-28">
      <header className="mb-10 space-y-2">
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide">
          {t("catalogTitle")}
        </h1>
        <p className="text-[hsl(var(--muted-foreground))]">{t("catalogSubtitle")}</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-6 text-sm">
          <div className="space-y-2">
            <p className="font-medium text-[hsl(var(--foreground))]">{t("filterCategory")}</p>
            <button
              type="button"
              className={!categorySlug ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))]"}
              onClick={() => updateParam("cat", null)}
            >
              {t("filterAll")}
            </button>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    className={
                      categorySlug === category.slug
                        ? "text-[hsl(var(--primary))]"
                        : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                    }
                    onClick={() => updateParam("cat", category.slug)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-medium">{t("filterBrand")}</p>
            <select
              className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2 py-2"
              value={brand ?? ""}
              onChange={(event) => updateParam("brand", event.target.value || null)}
            >
              <option value="">{t("filterAll")}</option>
              {brands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => updateParam("stock", event.target.checked ? "1" : null)}
            />
            {t("filterInStock")}
          </label>
        </aside>

        <section>
          {products.length === 0 ? (
            <p className="text-[hsl(var(--muted-foreground))]">{t("catalogEmpty")}</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {products.map((product) => {
                const status = product.variants.some((v) => v.stockQuantity > 0)
                  ? "in_stock"
                  : "out_of_stock";
                return (
                  <li key={product.id}>
                    <Link
                      to={`/producto/${product.slug}`}
                      className="block rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 transition-colors hover:border-[hsl(var(--primary))]"
                    >
                      <p className="text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                        {product.brand}
                      </p>
                      <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl">
                        {product.name}
                      </h2>
                      <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                        {product.shortDescription}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                        <span>{formatEurFromCents(product.basePriceCents)}</span>
                        <span className="text-[hsl(var(--muted-foreground))]">
                          {stockBadgeLabel(status)}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
