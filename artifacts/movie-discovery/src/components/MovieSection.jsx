import { MovieCard } from "./MovieCard";
import { SkeletonCard } from "./SkeletonCard";

export function MovieSection({
  title,
  subtitle,
  movies,
  loading,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) {
  return (
    <section className="mb-12">
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {title}
        </h2>
        {subtitle && <p className="text-white/40 text-sm mt-0.5">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3">
        {loading
          ? Array.from({ length: 14 }).map((_, i) => <SkeletonCard key={i} />)
          : movies
              ?.slice(0, 14)
              .map((movie, i) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  index={i}
                  isFavorite={isFavorite(movie.id)}
                  onToggleFavorite={onToggleFavorite}
                  onClick={onSelect}
                />
              ))}
      </div>
    </section>
  );
}
