import { Heart } from "lucide-react";
import { MovieCard } from "./MovieCard";

export function FavoritesSection({
  favorites,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) {
  if (favorites.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-5 flex items-center gap-2">
        <Heart size={18} className="fill-rose-500 text-rose-500" />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            My Favorites
          </h2>
          <p className="text-white/40 text-sm mt-0.5">
            {favorites.length} saved
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3">
        {favorites.map((movie, i) => (
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
