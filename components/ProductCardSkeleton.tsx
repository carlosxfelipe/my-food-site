import Skeleton from "./Skeleton.tsx";

type Props = {
  tagCount?: number;
  showRating?: boolean;
  class?: string;
};

export default function ProductCardSkeleton({
  tagCount = 2,
  showRating = true,
  class: cls = "",
}: Props) {
  return (
    <div
      class={`group w-full max-w-[380px] rounded-xl overflow-hidden border transition
      bg-surface-light dark:bg-surface-dark
      border-outline-light/40 dark:border-outline-dark/40
      flex flex-col h-full ${cls}`}
      aria-hidden="true"
    >
      <div class="relative aspect-[4/3] shrink-0 overflow-hidden">
        <Skeleton
          animation="shimmer"
          width="100%"
          height="100%"
          radius={0}
          class="absolute inset-0"
        />
        <div class="absolute top-2 left-2 right-12 flex gap-2 flex-wrap">
          {Array.from({ length: tagCount }).map((_, i) => (
            <Skeleton
              key={i}
              width={64 + (i % 2) * 20}
              height={20}
              radius={999}
              class="shadow-sm"
            />
          ))}
        </div>
        <div class="absolute bottom-2 right-2 w-9 h-9">
          <Skeleton variant="circle" width={36} height={36} />
        </div>
      </div>
      <div class="p-3 flex flex-col gap-1 flex-1">
        <Skeleton height={14} width="80%" class="mb-1" />
        <Skeleton height={14} width="60%" />
        <Skeleton height={10} width="40%" class="mt-2" />
        <Skeleton height={12} width="95%" class="mt-2" />
        <Skeleton height={12} width="85%" />
        <div class="mt-3">
          <Skeleton height={16} width="40%" class="mb-1" />
          <Skeleton height={10} width="30%" />
        </div>
        {showRating && (
          <div class="flex items-center mt-2 gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="circle"
                width={16}
                height={16}
                class="mr-0.5"
              />
            ))}
            <Skeleton height={10} width={24} />
          </div>
        )}
      </div>
      <div class="mt-auto p-3 bg-surfaceVariant-light/60 dark:bg-surfaceVariant-dark/60 shrink-0">
        <Skeleton height={40} radius={6} class="w-full" />
      </div>
    </div>
  );
}
