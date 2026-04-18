import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Star, Clock, Calendar, Globe } from "lucide-react";
import {
  backdropUrl,
  posterUrl,
  useMovieDetails,
  useMovieCredits,
} from "@/hooks/useTMDB";

export function MovieModal({
  movieId,
  movie,
  isFavorite,
  onToggleFavorite,
  onClose,
}) {
  const { data: details, isLoading: loadingDetails } = useMovieDetails(movieId);
  const { data: credits } = useMovieCredits(movieId);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (movieId) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [movieId]);

  const displayed = details || movie;
  const backdrop = backdropUrl(displayed?.backdrop_path || null, "w1280");
  const poster = posterUrl(displayed?.poster_path || null, "w500");
  const topCast = credits?.cast?.slice(0, 8) ?? [];
  const rating = displayed?.vote_average?.toFixed(1) ?? "—";
  const year = displayed?.release_date?.slice(0, 4) ?? "—";
  const runtime = details?.runtime;

  return (
    <AnimatePresence>
      {movieId && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-4 sm:inset-6 md:inset-10 lg:inset-[5%] xl:inset-[8%] z-50 bg-[#0f0f17] rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white transition-colors"
            >
              <X size={18} />
            </button>

            <div className="overflow-y-auto flex-1 overscroll-contain">
              {/* Backdrop */}
              <div className="relative h-56 sm:h-72 md:h-80 shrink-0">
                {backdrop ? (
                  <img
                    src={backdrop}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f17] via-[#0f0f17]/30 to-transparent" />
              </div>

              <div className="px-5 sm:px-8 pb-10 -mt-16 relative">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Poster */}
                  <div className="w-28 sm:w-36 shrink-0">
                    <img
                      src={poster}
                      alt={displayed?.title}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/300x450/0f0f17/444?text=No+Image";
                      }}
                      className="w-full rounded-xl shadow-2xl border border-white/10"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 pt-2 sm:pt-14">
                    {loadingDetails && !displayed ? (
                      <div className="animate-pulse space-y-3">
                        <div className="h-8 bg-white/10 rounded w-3/4" />
                        <div className="h-4 bg-white/10 rounded w-1/3" />
                      </div>
                    ) : (
                      <>
                        {details?.tagline && (
                          <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-2 italic">
                            "{details.tagline}"
                          </p>
                        )}
                        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                          {displayed?.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                            <Star size={14} fill="currentColor" />
                            {rating}
                            <span className="text-white/40 font-normal text-xs ml-0.5">
                              ({displayed?.vote_count?.toLocaleString()})
                            </span>
                          </span>
                          <span className="flex items-center gap-1 text-white/50 text-xs">
                            <Calendar size={12} /> {year}
                          </span>
                          {runtime && (
                            <span className="flex items-center gap-1 text-white/50 text-xs">
                              <Clock size={12} /> {Math.floor(runtime / 60)}h{" "}
                              {runtime % 60}m
                            </span>
                          )}
                          {displayed?.original_language && (
                            <span className="flex items-center gap-1 text-white/50 text-xs uppercase">
                              <Globe size={12} /> {displayed.original_language}
                            </span>
                          )}
                        </div>

                        {details?.genres && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {details.genres.map((g) => (
                              <span
                                key={g.id}
                                className="text-xs px-3 py-1 rounded-full bg-white/8 border border-white/10 text-white/70"
                              >
                                {g.name}
                              </span>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() =>
                            displayed && onToggleFavorite(displayed)
                          }
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                            isFavorite
                              ? "bg-rose-500/20 border-rose-500/50 text-rose-400"
                              : "bg-white/8 border-white/15 text-white/80 hover:bg-white/15"
                          }`}
                        >
                          <Heart
                            size={14}
                            className={isFavorite ? "fill-rose-500" : ""}
                          />
                          {isFavorite
                            ? "Saved to Favorites"
                            : "Add to Favorites"}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Overview */}
                {displayed?.overview && (
                  <div className="mt-7">
                    <h3 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                      Overview
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {displayed.overview}
                    </p>
                  </div>
                )}

                {/* Cast */}
                {topCast.length > 0 && (
                  <div className="mt-7">
                    <h3 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
                      Cast
                    </h3>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {topCast.map((member) => (
                        <div
                          key={member.id}
                          className="flex-shrink-0 text-center w-16"
                        >
                          <div className="w-14 h-14 rounded-full overflow-hidden bg-white/10 mx-auto mb-1.5 border border-white/10">
                            {member.profile_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/30 text-lg font-bold">
                                {member.name[0]}
                              </div>
                            )}
                          </div>
                          <p className="text-white text-[10px] font-semibold leading-tight line-clamp-2">
                            {member.name}
                          </p>
                          <p className="text-white/40 text-[10px] leading-tight line-clamp-1 mt-0.5">
                            {member.character}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
