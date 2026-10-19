import type { ReactElement } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getIntentions, intentionCatalogPath } from "@/data/intentions";
import { searchCatalog } from "@/lib/catalog-query";
import { formatEurFromCents } from "@/lib/money";

export function SearchPage(): ReactElement {
  const { t } = useTranslation("common");
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";
  const { products, categories } = searchCatalog(query);
  const intentions = getIntentions();
  const empty = !query || (products.length === 0 && categories.length === 0);

  return (
    <main className="mx-auto max-w-4xl px-6 py-28">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">
        {t("searchTitle")}
      </h1>
      <p className="mt-2 text-[hsl(var(--muted-foreground))]">
        {query ? t("searchQuery", { query }) : t("searchHint")}
      </p>

      {empty ? (
        <div className="mt-10 space-y-6">
          <p className="text-[hsl(var(--muted-foreground))]">{t("searchEmpty")}</p>
          <div>
            <p className="mb-3 text-sm uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              {t("searchIntentions")}
            </p>
            <ul className="flex flex-wrap gap-4">
              {intentions.map((intention) => (
                <li key={intention.id}>
                  <Link
                    to={intentionCatalogPath(intention.id)}
                    className="text-[hsl(var(--primary))] hover:opacity-90"
                  >
                    {t(intention.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-10 space-y-10">
          {categories.length > 0 ? (
            <section>
              <h2 className="mb-3 text-sm uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                {t("searchCategories")}
              </h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      className="text-[hsl(var(--primary))] hover:opacity-90"
                      to={`/catalogo?cat=${category.slug}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {products.length > 0 ? (
            <section>
              <h2 className="mb-3 text-sm uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                {t("searchProducts")}
              </h2>
              <ul className="space-y-3">
                {products.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={`/producto/${product.slug}`}
                      className="flex justify-between gap-4 border-t border-[hsl(var(--border))] py-4 hover:border-[hsl(var(--primary))]"
                    >
                      <span>
                        {product.brand} — {product.name}
                      </span>
                      <span>{formatEurFromCents(product.basePriceCents)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </main>
  );
}
