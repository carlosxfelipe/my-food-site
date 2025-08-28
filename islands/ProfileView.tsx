import Icon from "../components/Icon.tsx";
import { Button } from "../components/Button.tsx";
import { count, qty } from "../state/cart.ts";
import { MOCK_PRODUCTS } from "../data/products.ts";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div class="flex-1 flex flex-col items-center justify-center py-2">
      <span class="text-onSurface-light dark:text-onSurface-dark text-lg font-extrabold">
        {value}
      </span>
      <span class="text-outline-light dark:text-outline-dark text-xs mt-0.5">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return <div class="w-px h-7 bg-outline-light/40 dark:bg-outline-dark/40" />;
}

function SectionTitle({ title }: { title: string }) {
  return (
    <p class="text-[11px] font-extrabold uppercase mt-2 mb-1 text-outline-light dark:text-outline-dark">
      {title}
    </p>
  );
}

function ActionRow(
  { icon, label, right, onClick }: {
    icon: Parameters<typeof Icon>[0]["name"];
    label: string;
    right?: preact.ComponentChildren;
    onClick?: () => void;
  },
) {
  return (
    <button
      type="button"
      onClick={onClick}
      class="w-full min-h-[48px] border-t border-outline-light/40 dark:border-outline-dark/40 flex items-center justify-between py-2 hover:bg-surfaceVariant-light/40 dark:hover:bg-surfaceVariant-dark/40 text-left"
    >
      <span class="flex items-center gap-2">
        <Icon name={icon} size={20} />
        <span class="text-onSurface-light dark:text-onSurface-dark text-sm font-semibold">
          {label}
        </span>
      </span>
      {right ?? (
        <Icon
          name="chevron-right"
          size={22}
          class="text-outline-light dark:text-outline-dark"
        />
      )}
    </button>
  );
}

export default function ProfileView() {
  const user = {
    name: "Carlos Felipe Araújo",
    email: "carlosxfelipe@gmail.com",
    avatar:
      "https://avatars.githubusercontent.com/u/85801709?s=400&u=01cce0318ea853ce1a133699bc6b2af1919094d6&v=4",
  };

  const favoritesCount = 7;
  const itemsInCart = count.value;
  const cartLabel = itemsInCart === 0
    ? "Carrinho vazio"
    : `${itemsInCart} item(ns) no carrinho`;
  const subtotal = MOCK_PRODUCTS.reduce(
    (acc, p) => acc + p.price * (qty.value[p.id] ?? 0),
    0,
  );
  const headerCardClass =
    "rounded-xl border border-outline-light/40 dark:border-outline-dark/40 p-3 bg-surface-light dark:bg-surface-dark";
  const cardClass =
    "rounded-xl border border-outline-light/40 dark:border-outline-dark/40 p-2 bg-surface-light dark:bg-surface-dark";

  return (
    <div class="relative">
      <div class={headerCardClass}>
        <div class="flex items-center gap-3">
          <div class="w-16 h-16 rounded-full overflow-hidden shrink-0">
            <img
              src={user.avatar}
              alt={`Avatar de ${user.name}`}
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-onSurface-light dark:text-onSurface-dark font-extrabold truncate">
              {user.name}
            </p>
            <p class="text-outline-light dark:text-outline-dark text-xs truncate mt-0.5">
              {user.email}
            </p>
          </div>
          <Button
            onClick={() => globalThis.alert?.("Editar perfil")}
            class="px-3 py-2"
          >
            Editar
          </Button>
        </div>
      </div>

      <div class={`${cardClass} mt-3`}>
        <div class="flex items-center justify-between py-1">
          <Stat label="Pedidos" value="12" />
          <Divider />
          <Stat label="Favoritos" value={String(favoritesCount)} />
          <Divider />
          <Stat label="Avaliações" value="3" />
        </div>
      </div>

      <div class={`${cardClass} mt-3`}>
        <SectionTitle title="Conta" />
        <ActionRow
          icon="map-marker-outline"
          label="Endereços"
          onClick={() => alert("Endereços")}
        />
        <ActionRow
          icon="credit-card-outline"
          label="Pagamentos"
          onClick={() => alert("Pagamentos")}
        />
        <ActionRow
          icon="bell-outline"
          label="Notificações"
          onClick={() => alert("Notificações")}
        />
        <SectionTitle title="Ajuda" />
        <ActionRow
          icon="help-circle-outline"
          label="Central de ajuda"
          onClick={() => alert("Ajuda")}
        />
        <ActionRow
          icon="lock-outline"
          label="Privacidade"
          onClick={() => alert("Privacidade")}
        />
        <div class="pt-2">
          <Button
            onClick={() => alert("Logout: você saiu da conta.")}
            class="mt-3"
          >
            Sair da conta
          </Button>
        </div>
      </div>

      <div class="h-[120px] md:h-0" />

      <div
        class="fixed md:sticky bottom-[calc(env(safe-area-inset-bottom)+72px)] md:bottom-3 left-0 right-0 md:left-auto md:right-auto mx-3 md:mx-0 rounded-xl px-4 py-3 border bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur border-outline-light/40 dark:border-outline-dark/40 flex items-center justify-between gap-3"
        aria-label={cartLabel}
      >
        <div class="flex items-center gap-2">
          <Icon name="cart-outline" size={20} />
          <span class="text-onSurface-light dark:text-onSurface-dark text-sm font-semibold">
            {cartLabel}
          </span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-onSurface-light dark:text-onSurface-dark font-extrabold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(subtotal)}
          </span>
          <a
            href="/orders"
            class="px-4 py-2 rounded-lg font-semibold bg-primary-light text-onPrimary-light dark:bg-primary-dark dark:text-onPrimary-dark hover:opacity-90"
          >
            Ir para pedidos
          </a>
        </div>
      </div>
    </div>
  );
}
