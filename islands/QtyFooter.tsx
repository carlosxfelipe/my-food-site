import { memo } from "preact/compat";
import { dec, inc, qty } from "../state/cart.ts";
import IconButton from "../components/IconButton.tsx";
import { Button } from "../components/Button.tsx";

function QtyFooterBase({ id, stock }: { id: string; stock: number }) {
  const q = qty.value[id] ?? 0;
  const outOfStock = stock === 0;

  return (
    <div class="mt-auto p-3 bg-surfaceVariant-light/60 dark:bg-surfaceVariant-dark/60 shrink-0">
      {q === 0
        ? (
          <Button
            type="button"
            text="Adicionar"
            icon="cart-outline"
            onClick={(e) => {
              e.stopPropagation();
              inc(id, stock);
            }}
            disabled={outOfStock}
            fullWidth
          />
        )
        : (
          <div class="flex items-center justify-between">
            <IconButton
              type="button"
              icon="minus"
              ariaLabel="Diminuir quantidade"
              onClick={(e) => {
                e.stopPropagation();
                dec(id);
              }}
            />
            <span class="min-w-6 text-center font-extrabold text-onSurface-light dark:text-onSurface-dark">
              {q}
            </span>
            <IconButton
              type="button"
              icon="plus"
              ariaLabel="Aumentar quantidade"
              onClick={(e) => {
                e.stopPropagation();
                inc(id, stock);
              }}
              disabled={q >= stock}
            />
          </div>
        )}
    </div>
  );
}
export default memo(QtyFooterBase);
