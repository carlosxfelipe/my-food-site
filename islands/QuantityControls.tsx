import { memo } from "preact/compat";
import { Button } from "../components/Button.tsx";
import IconButton from "../components/IconButton.tsx";

type Props = {
  quantity: number;
  stock: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  outOfStock: boolean;
};

function QuantityControlsBase({
  quantity,
  stock,
  onAdd,
  onIncrease,
  onDecrease,
  outOfStock,
}: Props) {
  return (
    <div class="mt-auto p-3 bg-surfaceVariant-light/60 dark:bg-surfaceVariant-dark/60 shrink-0">
      {quantity === 0
        ? (
          <Button
            type="button"
            text="Adicionar"
            icon="cart-outline"
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
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
                onDecrease();
              }}
            />
            <span class="min-w-6 text-center font-extrabold text-onSurface-light dark:text-onSurface-dark">
              {quantity}
            </span>
            <IconButton
              type="button"
              icon="plus"
              ariaLabel="Aumentar quantidade"
              onClick={(e) => {
                e.stopPropagation();
                onIncrease();
              }}
              disabled={quantity >= stock}
            />
          </div>
        )}
    </div>
  );
}

export default memo(QuantityControlsBase);
