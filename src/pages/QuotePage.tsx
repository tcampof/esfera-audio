import { useEffect, useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProductById } from "@/data/mocks/catalog";
import { formatEurFromCents } from "@/lib/money";
import { getQuoteLines, type QuoteLine } from "@/quote/quote-store";

export function QuotePage(): ReactElement {
  const { t } = useTranslation("common");
  const [lines, setLines] = useState<QuoteLine[]>([]);

  useEffect(() => {
    const refresh = (): void => {
      setLines(getQuoteLines());
    };
    refresh();
    window.addEventListener("esfera-quote-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("esfera-quote-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-28">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">{t("quoteTitle")}</h1>
      <p className="mt-2 text-[hsl(var(--muted-foreground))]">{t("quoteSubtitle")}</p>

      {lines.length === 0 ? (
        <p className="mt-10 text-[hsl(var(--muted-foreground))]">{t("quoteEmpty")}</p>
      ) : (
        <ul className="mt-10 space-y-3">
          {lines.map((line) => {
            const product = getProductById(line.productId);
            const variant = product?.variants.find((item) => item.id === line.variantId);
            if (!product || !variant) {
              return null;
            }
            return (
              <li
                key={`${line.productId}-${line.variantId}`}
                className="flex justify-between gap-4 rounded-lg border border-[hsl(var(--border))] p-4"
              >
                <div>
                  <p className="font-medium">
                    {product.name} · {variant.name}
                  </p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    × {line.quantity}
                  </p>
                </div>
                <p>{formatEurFromCents(variant.priceCents * line.quantity)}</p>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-8 text-sm text-[hsl(var(--muted-foreground))]">{t("quoteFormLater")}</p>
      <Link to="/catalogo" className="mt-4 inline-block text-[hsl(var(--primary))]">
        {t("ctaCatalog")}
      </Link>
    </main>
  );
}
