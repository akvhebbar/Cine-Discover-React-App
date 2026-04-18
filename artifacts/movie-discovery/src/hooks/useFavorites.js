import { useLocalStorage } from "./useLocalStorage";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage(
    "cinediscover-favorites",
    [],
  );

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) return prev.filter((m) => m.id !== movie.id);
      return [...prev, movie];
    });
  };

  const isFavorite = (movieId) => favorites.some((m) => m.id === movieId);

  return { favorites, toggleFavorite, isFavorite };
}
