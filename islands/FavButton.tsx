import Icon from "../components/Icon.tsx";
import { has as hasFav, toggle as toggleFav } from "../state/favorites.ts";

export default function FavButton({ id }: { id: string }) {
  const isFavorite = hasFav(id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggleFav(id);
      }}
      aria-label={isFavorite
        ? "Remover dos favoritos"
        : "Adicionar aos favoritos"}
      class="absolute bottom-2 right-2 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-md hover:opacity-90 transition"
    >
      <Icon
        name={isFavorite ? "heart" : "heart-outline"}
        size={18}
        class={isFavorite
          ? "text-favorite-light dark:text-favorite-dark"
          : "text-onSurface-light dark:text-onSurface-dark"}
      />
    </button>
  );
}
