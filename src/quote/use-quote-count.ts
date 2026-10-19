import { useEffect, useState } from "react";
import { getQuoteItemCount } from "@/quote/quote-store";

export function useQuoteCount(): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const refresh = (): void => {
      setCount(getQuoteItemCount());
    };
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("esfera-quote-changed", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("esfera-quote-changed", refresh);
    };
  }, []);

  return count;
}
