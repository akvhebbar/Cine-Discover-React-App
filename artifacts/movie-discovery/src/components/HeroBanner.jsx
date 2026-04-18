import { motion } from "framer-motion";
import { Play, Heart, Star, Info } from "lucide-react";
import { backdropUrl, posterUrl } from "@/hooks/useTMDB";
import { SkeletonHero } from "./SkeletonCard";

export function HeroBanner({
  movie,
  loading,
  isFavorite,
  onToggleFavorite,
  onDetails,
}) {
  if (loading || !movie) return <SkeletonHero />;

  const bg =
    backdropUrl(movie.backdrop_path, "original") ||
    posterUrl(movie.poster_path, "w780");
  const rating = movie.vote_average.toFixed(1);
  const year = movie.release_date?.slice(0, 4) || "";

  return (
    <div className="relative h-[78vh] min-h-[560px] overflow-hidden">
      <motion.div
        key={movie.id}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0"
      >
        {bg && (
          <img
            src={bg}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />

      <motion.div
        key={`content-${movie.id}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-14 left-6 sm:left-10 lg:left-16 max-w-xl xl:max-w-2xl"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 border border-cyan-400/40 px-3 py-1 rounded-full bg-cyan-400/10 backdrop-blur-sm">
            Trending
          </span>
          <span className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
            <Star size={12} fill="currentColor" />
            {rating}
          </span>
          {year && <span className="text-white/50 text-xs">{year}</span>}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-2xl mb-3">
          {movie.title}
        </h1>

        <p className="text-white/70 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 max-w-lg">
          {movie.overview}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onDetails(movie)}
            className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full text-sm hover:bg-white/90 transition-all duration-200 active:scale-95 shadow-lg"
          >
            <Play size={15} fill="currentColor" />
            View Details
          </button>
          <button
            onClick={() => onDetails(movie)}
            className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-5 py-3 rounded-full text-sm hover:bg-white/20 backdrop-blur-sm transition-all duration-200 active:scale-95"
          >
            <Info size={15} />
            More Info
          </button>
          <button
            onClick={() => onToggleFavorite(movie)}
            className={`p-3 rounded-full border backdrop-blur-sm transition-all duration-200 active:scale-95 ${
              isFavorite
                ? "bg-rose-500/20 border-rose-500/60 text-rose-400"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
            }`}
          >
            <Heart size={16} className={isFavorite ? "fill-rose-500" : ""} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
