export function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-white/5 animate-pulse">
      <div className="aspect-[2/3] bg-white/10" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="relative h-[70vh] min-h-[500px] bg-white/5 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
      <div className="absolute bottom-12 left-10 space-y-4 max-w-2xl">
        <div className="h-8 bg-white/10 rounded w-24" />
        <div className="h-12 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-4/5" />
        <div className="flex gap-3 pt-2">
          <div className="h-10 w-32 bg-white/10 rounded-full" />
          <div className="h-10 w-32 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
