import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { posterUrl } from "@/hooks/useTMDB";

export function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
  onClick,
  index = 0,
}) {
  const poster = posterUrl(movie.poster_path);
  const rating = movie.vote_average.toFixed(1);
  const year = movie.release_date?.slice(0, 4) || "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      className="group relative cursor-pointer rounded-xl overflow-hidden bg-[#111118]"
      onClick={() => onClick(movie)}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={poster}
          alt={movie.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/300x450/111118/444?text=No+Image";
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs font-semibold bg-amber-400/90 text-black px-2 py-0.5 rounded-full">
              <Star size={10} fill="currentColor" />
              {rating}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(movie);
              }}
              className="p-1.5 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors"
            >
              <Heart
                size={14}
                className={
                  isFavorite ? "fill-rose-500 text-rose-500" : "text-white"
                }
              />
            </button>
          </div>
          <p className="text-white text-xs mt-2 line-clamp-2 leading-snug">
            {movie.overview}
          </p>
        </div>

        {isFavorite && (
          <div className="absolute top-2 right-2 opacity-100 group-hover:opacity-0 transition-opacity">
            <Heart
              size={14}
              className="fill-rose-500 text-rose-500 drop-shadow-lg"
            />
          </div>
        )}
      </div>

      <div className="p-2.5">
        <h3 className="text-white text-xs font-semibold line-clamp-1 leading-snug">
          {movie.title}
        </h3>
        <p className="text-white/40 text-xs mt-0.5">{year}</p>
      </div>
    </motion.div>
  );
}
