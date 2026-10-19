import { useState, type ReactElement } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getIntentionById, getIntentions, intentionCatalogPath } from "@/data/intentions";
import { getPrimaryNavCategories } from "@/data/nav";
import { filterProducts, getUniqueBrands, stockBadgeLabel } from "@/lib/catalog-query";
import { formatEurFromCents } from "@/lib/money";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CatalogPage(): ReactElement {
  const { t } = useTranslation("common");
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const intentionId = params.get("intention") ?? undefined;
  const categorySlug = intentionId ? undefined : (params.get("cat") ?? undefined);
  const brand = params.get("brand") ?? undefined;
  const inStockOnly = params.get("stock") === "1";

  const intention = intentionId ? getIntentionById(intentionId) : undefined;
  const products = filterProducts({ intentionId, categorySlug, brand, inStockOnly });
  const brands = getUniqueBrands();
  const categories = getPrimaryNavCategories();
  const intentions = getIntentions();

  function updateParam(key: string, value: string | null): void {
    const next = new URLSearchParams(params);
    if (!value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    if (key === "intention" && value) {
      next.delete("cat");
    }
    if (key === "cat" && value) {
      next.delete("intention");
    }
    setParams(next);
  }

  function clearCurated(): void {
    const next = new URLSearchParams(params);
    next.delete("intention");
    next.delete("cat");
    setParams(next);
  }

  const title = intention ? t(intention.labelKey) : t("catalogTitle");
  const subtitle = intention ? t(intention.supportKey) : t("catalogSubtitle");

  return (
    <main className="mx-auto max-w-6xl px-6 py-28">
      <header className="mb-8 max-w-2xl space-y-3">
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide">{title}</h1>
        <p className="text-[hsl(var(--muted-foreground))]">{subtitle}</p>
        {intention ? (
          <button
            type="button"
            className="text-sm text-[hsl(var(--primary))] hover:opacity-90"
            onClick={clearCurated}
          >
            {t("catalogSeeAll")}
          </button>
        ) : null}
      </header>

      {!intention ? (
        <div className="mb-10 flex flex-wrap gap-x-5 gap-y-2 border-b border-[hsl(var(--border))] pb-6 text-sm">
          {intentions.map((item) => (
            <Link
              key={item.id}
              to={intentionCatalogPath(item.id)}
              className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {t("catalogResultCount", { count: products.length })}
        </p>
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }), "text-sm")}
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((open) => !open)}
        >
          {filtersOpen ? t("filtersHide") : t("filtersShow")}
        </button>
      </div>

      {filtersOpen ? (
        <div className="mb-10 grid gap-6 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))]/40 p-5 text-sm sm:grid-cols-3">
          <div className="space-y-2">
            <p className="font-medium text-[hsl(var(--foreground))]">{t("filterCategory")}</p>
            <button
              type="button"
              className={!categorySlug && !intentionId ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))]"}
              onClick={clearCurated}
            >
              {t("filterAll")}
            </button>
            <ul className="max-h-40 space-y-1 overflow-y-auto">
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

          <label className="flex items-center gap-2 self-end text-[hsl(var(--muted-foreground))]">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => updateParam("stock", event.target.checked ? "1" : null)}
            />
            {t("filterInStock")}
          </label>
        </div>
      ) : null}

      <section>
        {products.length === 0 ? (
          <div className="space-y-4 py-8">
            <p className="text-[hsl(var(--muted-foreground))]">{t("catalogEmpty")}</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{t("catalogEmptyHint")}</p>
            <div className="flex flex-wrap gap-3">
              {intentions.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  to={intentionCatalogPath(item.id)}
                  className="text-sm text-[hsl(var(--primary))] hover:opacity-90"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2">
            {products.map((product) => {
              const status = product.variants.some((v) => v.stockQuantity > 0)
                ? "in_stock"
                : "out_of_stock";
              return (
                <li key={product.id}>
                  <Link
                    to={`/producto/${product.slug}`}
                    className="group block space-y-3 border-t border-[hsl(var(--border))] pt-5 transition-colors hover:border-[hsl(var(--primary))]"
                  >
                    <p className="text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                      {product.brand}
                    </p>
                    <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide group-hover:text-[hsl(var(--primary))]">
                      {product.name}
                    </h2>
                    <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center justify-between gap-3 pt-2 text-sm">
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
    </main>
  );
}
