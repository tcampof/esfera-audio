import { useEffect, useMemo, useState, type ReactElement } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProductById, getProductBySlug } from "@/data/mocks/catalog";
import { inventory } from "@/inventory/mock-inventory";
import type { StockSnapshot } from "@/inventory/types";
import { stockBadgeLabel } from "@/lib/catalog-query";
import { formatEurFromCents } from "@/lib/money";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addQuoteLine } from "@/quote/quote-store";

export function ProductPage(): ReactElement {
  const { slug = "" } = useParams();
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const product = getProductBySlug(slug);

  const [variantId, setVariantId] = useState<string>("");
  const [stock, setStock] = useState<StockSnapshot | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);

  useEffect(() => {
    if (!product) {
      return;
    }
    setVariantId(product.variants.length === 1 ? product.variants[0].id : "");
    setMessage(null);
    setSpecsOpen(false);
  }, [product]);

  useEffect(() => {
    if (!variantId) {
      setStock(null);
      return;
    }
    void inventory.getStock(variantId).then(setStock);
  }, [variantId]);

  const selectedVariant = useMemo(
    () => product?.variants.find((variant) => variant.id === variantId),
    [product, variantId],
  );

  if (!product) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-28">
        <p>{t("productNotFound")}</p>
        <Link to="/catalogo" className="text-[hsl(var(--primary))]">
          {t("ctaCatalog")}
        </Link>
      </main>
    );
  }

  function handleAddToQuote(): void {
    if (!product) {
      return;
    }
    if (!variantId) {
      setMessage(t("productNeedVariant"));
      return;
    }
    const result = addQuoteLine({ productId: product.id, variantId });
    if (!result.ok) {
      if (result.reason === "out_of_stock") {
        setMessage(t("productOutOfStock"));
      } else {
        setMessage(t("productNeedVariant"));
      }
      return;
    }
    setMessage(t("productAddedQuote"));
  }

  const related = (product.relatedProductIds ?? [])
    .map((id) => getProductById(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <main className="mx-auto max-w-6xl px-6 py-28">
      {/* Acto 1 — decisión */}
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex min-h-72 items-end rounded-lg border border-[hsl(var(--border))] bg-[linear-gradient(160deg,hsl(220_14%_12%),hsl(220_16%_6%))] p-8">
          <p className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[hsl(var(--muted-foreground))]">
            {product.brand}
          </p>
        </div>

        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
            {product.brand}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl">{product.name}</h1>
          <p className="text-[hsl(var(--muted-foreground))]">{product.shortDescription}</p>
          <p className="text-xl">
            {formatEurFromCents(selectedVariant?.priceCents ?? product.basePriceCents)}
            <span className="ml-2 text-sm text-[hsl(var(--muted-foreground))]">
              {t("priceVatIncluded")}
            </span>
          </p>

          {product.variants.length > 1 ? (
            <label className="block space-y-2 text-sm">
              <span>{t("productVariant")}</span>
              <select
                className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2"
                value={variantId}
                onChange={(event) => {
                  setVariantId(event.target.value);
                  setMessage(null);
                }}
              >
                <option value="">{t("productSelectVariant")}</option>
                {product.variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            {stock
              ? `${stockBadgeLabel(stock.stockStatus)} · ${stock.stockQuantity} u.`
              : t("productStockPending")}
          </p>

          <div className="flex flex-wrap gap-3">
            <button type="button" className={cn(buttonVariants())} onClick={handleAddToQuote}>
              {t("ctaAddQuote")}
            </button>
            <Link
              to={`/cita?product=${product.slug}`}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {t("ctaDemo")}
            </Link>
          </div>

          {message ? <p className="text-sm text-[hsl(var(--primary))]">{message}</p> : null}
        </div>
      </div>

      {/* Acto 2 — confianza */}
      <section className="mt-16 max-w-3xl space-y-4 border-t border-[hsl(var(--border))] pt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl">{t("productTrustTitle")}</h2>
        <p className="leading-relaxed text-[hsl(var(--muted-foreground))]">{product.description}</p>

        <button
          type="button"
          className="text-sm text-[hsl(var(--primary))] hover:opacity-90"
          aria-expanded={specsOpen}
          onClick={() => setSpecsOpen((open) => !open)}
        >
          {specsOpen ? t("productSpecsHide") : t("productSpecsShow")}
        </button>

        {specsOpen ? (
          <table className="mt-2 w-full max-w-xl text-left text-sm">
            <caption className="sr-only">{t("productSpecs")}</caption>
            <tbody>
              {product.specifications.map((spec) => (
                <tr key={spec.label} className="border-b border-[hsl(var(--border))]">
                  <th className="py-2 pr-4 font-medium">{spec.label}</th>
                  <td className="py-2 text-[hsl(var(--muted-foreground))]">
                    {spec.value}
                    {spec.unit ? ` ${spec.unit}` : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </section>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">{t("productRelated")}</h2>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{t("productRelatedSupport")}</p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/producto/${item.slug}`}
                  className="block space-y-1 border-t border-[hsl(var(--border))] pt-4 hover:border-[hsl(var(--primary))]"
                >
                  <p className="text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                    {item.brand}
                  </p>
                  <p className="font-[family-name:var(--font-display)] text-xl">{item.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <button
        type="button"
        className="mt-10 text-sm text-[hsl(var(--muted-foreground))]"
        onClick={() => navigate(-1)}
      >
        {t("backHome")}
      </button>
    </main>
  );
}
