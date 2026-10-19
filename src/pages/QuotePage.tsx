import { useEffect, useMemo, useState, type FormEvent, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProductById } from "@/data/mocks/catalog";
import { buttonVariants } from "@/components/ui/button";
import { formatEurFromCents } from "@/lib/money";
import { cn } from "@/lib/utils";
import {
  quoteRequestSchema,
  type ContactPreference,
  type QuoteRequestInput,
} from "@/quote/quote-schema";
import {
  getQuoteLines,
  removeQuoteLine,
  updateQuoteLineQuantity,
  type QuoteLine,
} from "@/quote/quote-store";
import { submitQuoteRequest, type QuoteSubmitPayload } from "@/quote/submit-quote";

const emptyForm: QuoteRequestInput = {
  name: "",
  email: "",
  phone: "",
  message: "",
  contactPreference: "email",
};

type QuoteStep = "selection" | "details" | "sent";

function QuoteStepper({ step }: { step: QuoteStep }): ReactElement {
  const { t } = useTranslation("common");
  const steps: { id: QuoteStep; label: string }[] = [
    { id: "selection", label: t("quoteStepSelection") },
    { id: "details", label: t("quoteStepDetails") },
    { id: "sent", label: t("quoteStepSent") },
  ];
  const activeIndex = steps.findIndex((item) => item.id === step);

  return (
    <ol className="mt-8 flex flex-wrap gap-4 text-sm" aria-label={t("quoteStepperAria")}>
      {steps.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "flex items-center gap-2",
            index <= activeIndex
              ? "text-[hsl(var(--foreground))]"
              : "text-[hsl(var(--muted-foreground))]",
          )}
        >
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full border text-xs",
              index <= activeIndex
                ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
                : "border-[hsl(var(--border))]",
            )}
            aria-current={index === activeIndex ? "step" : undefined}
          >
            {index + 1}
          </span>
          {item.label}
        </li>
      ))}
    </ol>
  );
}

export function QuotePage(): ReactElement {
  const { t } = useTranslation("common");
  const [lines, setLines] = useState<QuoteLine[]>([]);
  const [form, setForm] = useState<QuoteRequestInput>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof QuoteRequestInput, string>>>(
    {},
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<QuoteSubmitPayload | null>(null);
  const [stepOverride, setStepOverride] = useState<"selection" | "details" | null>(null);

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

  const totalCents = useMemo(() => {
    return lines.reduce((sum, line) => {
      const product = getProductById(line.productId);
      const variant = product?.variants.find((item) => item.id === line.variantId);
      if (!variant) {
        return sum;
      }
      return sum + variant.priceCents * line.quantity;
    }, 0);
  }, [lines]);

  const step: QuoteStep = confirmation
    ? "sent"
    : stepOverride === "details" && lines.length > 0
      ? "details"
      : "selection";

  function errorMessage(code: string | undefined): string | undefined {
    if (!code) {
      return undefined;
    }
    return t(`quoteError_${code}` as "quoteError_email_invalid");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const parsed = quoteRequestSchema.safeParse(form);
    if (!parsed.success) {
      const next: Partial<Record<keyof QuoteRequestInput, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string") {
          next[key as keyof QuoteRequestInput] = issue.message;
        }
      }
      setFieldErrors(next);
      return;
    }

    setSubmitting(true);
    const result = await submitQuoteRequest(parsed.data);
    setSubmitting(false);

    if (!result.ok) {
      if (result.code === "empty") {
        setFormError(t("quoteError_empty"));
      } else {
        setFormError(t("quoteError_stock"));
      }
      setLines(getQuoteLines());
      return;
    }

    setConfirmation(result.payload);
    setForm(emptyForm);
    setStepOverride(null);
  }

  if (confirmation) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-28">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">
          {t("quoteConfirmTitle")}
        </h1>
        <QuoteStepper step="sent" />
        <p className="mt-6 text-[hsl(var(--muted-foreground))]">
          {t("quoteConfirmBody", { name: confirmation.name })}
        </p>
        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
          {t("quoteConfirmNoPayment")}
        </p>
        <Link to="/catalogo" className={cn(buttonVariants(), "mt-8 inline-flex")}>
          {t("ctaCatalog")}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-28">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">{t("quoteTitle")}</h1>
      <p className="mt-2 text-[hsl(var(--muted-foreground))]">{t("quoteSubtitle")}</p>
      <QuoteStepper step={step} />

      {step === "selection" ? (
        <>
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
                    className="flex flex-wrap items-center justify-between gap-4 border-t border-[hsl(var(--border))] py-4"
                  >
                    <div>
                      <p className="font-medium">
                        {product.name} · {variant.name}
                      </p>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        {formatEurFromCents(variant.priceCents)} / u.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-[hsl(var(--muted-foreground))]">
                        {t("quoteQty")}
                        <input
                          type="number"
                          min={1}
                          max={variant.stockQuantity}
                          value={line.quantity}
                          className="ml-2 w-16 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2 py-1"
                          onChange={(event) => {
                            const value = Number(event.target.value);
                            updateQuoteLineQuantity(line.productId, line.variantId, value);
                          }}
                        />
                      </label>
                      <p className="min-w-20 text-right">
                        {formatEurFromCents(variant.priceCents * line.quantity)}
                      </p>
                      <button
                        type="button"
                        className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                        onClick={() => removeQuoteLine(line.productId, line.variantId)}
                      >
                        {t("quoteRemove")}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {lines.length > 0 ? (
            <>
              <p className="mt-4 text-right text-lg">
                {t("quoteTotal")}: {formatEurFromCents(totalCents)}
              </p>
              <p className="mt-2 text-right text-xs text-[hsl(var(--muted-foreground))]">
                {t("quoteNoPaymentHint")}
              </p>
              <button
                type="button"
                className={cn(buttonVariants(), "mt-8")}
                onClick={() => setStepOverride("details")}
              >
                {t("quoteContinueDetails")}
              </button>
            </>
          ) : null}
        </>
      ) : null}

      {step === "details" ? (
        <form onSubmit={onSubmit} className="mt-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl">{t("quoteFormTitle")}</h2>
            <button
              type="button"
              className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              onClick={() => setStepOverride("selection")}
            >
              {t("quoteBackSelection")}
            </button>
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">{t("quoteFormHint")}</p>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            {t("quoteTotal")}: {formatEurFromCents(totalCents)} · {t("quoteNoPaymentHint")}
          </p>

          <label className="block space-y-1 text-sm">
            <span>{t("quoteFieldName")}</span>
            <input
              className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            />
            {fieldErrors.name ? (
              <span className="text-[hsl(var(--primary))]">{errorMessage(fieldErrors.name)}</span>
            ) : null}
          </label>

          <label className="block space-y-1 text-sm">
            <span>{t("quoteFieldEmail")}</span>
            <input
              type="email"
              className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            />
            {fieldErrors.email ? (
              <span className="text-[hsl(var(--primary))]">{errorMessage(fieldErrors.email)}</span>
            ) : null}
          </label>

          <label className="block space-y-1 text-sm">
            <span>{t("quoteFieldPhone")}</span>
            <input
              className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            />
            {fieldErrors.phone ? (
              <span className="text-[hsl(var(--primary))]">{errorMessage(fieldErrors.phone)}</span>
            ) : null}
          </label>

          <label className="block space-y-1 text-sm">
            <span>{t("quoteFieldPreference")}</span>
            <select
              className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2"
              value={form.contactPreference}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  contactPreference: event.target.value as ContactPreference,
                }))
              }
            >
              <option value="email">{t("quotePrefEmail")}</option>
              <option value="phone">{t("quotePrefPhone")}</option>
              <option value="whatsapp">{t("quotePrefWhatsapp")}</option>
            </select>
          </label>

          <label className="block space-y-1 text-sm">
            <span>{t("quoteFieldMessage")}</span>
            <textarea
              rows={4}
              className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2"
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            />
            {fieldErrors.message ? (
              <span className="text-[hsl(var(--primary))]">{errorMessage(fieldErrors.message)}</span>
            ) : null}
          </label>

          {formError ? <p className="text-sm text-[hsl(var(--primary))]">{formError}</p> : null}

          <button
            type="submit"
            disabled={submitting || lines.length === 0}
            className={cn(buttonVariants(), "disabled:opacity-50")}
          >
            {submitting ? t("quoteSubmitting") : t("quoteSubmit")}
          </button>
        </form>
      ) : null}

      <Link to="/catalogo" className="mt-8 inline-block text-sm text-[hsl(var(--primary))]">
        {t("ctaCatalog")}
      </Link>
    </main>
  );
}
