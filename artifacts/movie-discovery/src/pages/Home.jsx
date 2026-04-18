import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Film, Heart, Globe2 } from "lucide-react";

import { HeroBanner } from "@/components/HeroBanner";
import { SearchInput } from "@/components/SearchInput";
import { MovieSection } from "@/components/MovieSection";
import { FavoritesSection } from "@/components/FavoritesSection";
import { MovieModal } from "@/components/MovieModal";

import { useDebounce } from "@/hooks/useDebounce";
import { useFavorites } from "@/hooks/useFavorites";
import {
  useSearch,
  useRegionalMovies,
  useIndianTrending,
} from "@/hooks/useTMDB";

const LANGUAGES = [
  {
    code: "hi",
    label: "Hindi",
    subtitle: "Bollywood family & action-thriller blockbusters",
  },
  {
    code: "ta",
    label: "Tamil",
    subtitle: "Kollywood family & action-thriller hits",
  },
  {
    code: "te",
    label: "Telugu",
    subtitle: "Tollywood family & action-thriller picks",
  },
  {
    code: "ml",
    label: "Malayalam",
    subtitle: "Mollywood family & action-thriller gems",
  },
];

function RegionalSection({
  language,
  label,
  subtitle,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) {
  const { data, isLoading } = useRegionalMovies(language);
  return (
    <MovieSection
      title={label}
      subtitle={subtitle}
      movies={data?.results}
      loading={isLoading}
      isFavorite={isFavorite}
      onToggleFavorite={onToggleFavorite}
      onSelect={onSelect}
    />
  );
}

const NAV_TABS = ["Discover", "By Language", "Favorites"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("Discover");

  const debouncedQuery = useDebounce(query, 400);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const { data: indianTrending, isLoading: loadingHero } = useIndianTrending();
  const { data: searchResults, isLoading: loadingSearch } =
    useSearch(debouncedQuery);

  const heroMovie = indianTrending?.results?.[0] ?? null;
  const isSearching = debouncedQuery.trim().length > 0;
  const showHero = !isSearching && activeTab === "Discover";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-5 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

        {/* Logo */}
        <div className="relative flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center">
            <Film size={14} className="text-black" />
          </div>
          <span className="font-black text-white text-lg tracking-tight">
            Cine<span className="text-cyan-400">Discover</span>
          </span>
        </div>

        {/* Center tabs */}
        <nav className="relative hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-sm">
          {NAV_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setQuery("");
              }}
              className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white text-black shadow"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab === "By Language" && (
                <Globe2 size={11} className="inline mr-1 -mt-0.5" />
              )}
              {tab === "Favorites" && (
                <Heart
                  size={11}
                  className={`inline mr-1 -mt-0.5 ${
                    activeTab !== "Favorites" && favorites.length > 0
                      ? "fill-rose-400 text-rose-400"
                      : ""
                  }`}
                />
              )}
              {tab}
              {tab === "Favorites" && favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold">
                  {favorites.length > 9 ? "9+" : favorites.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Mobile favorites */}
        <button
          onClick={() => {
            setActiveTab("Favorites");
            setQuery("");
          }}
          className={`sm:hidden relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
            activeTab === "Favorites"
              ? "bg-rose-500/20 border-rose-500/50 text-rose-400"
              : "bg-white/8 border-white/15 text-white/70 hover:bg-white/15"
          }`}
        >
          <Heart
            size={14}
            className={activeTab === "Favorites" ? "fill-rose-500" : ""}
          />
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
              {favorites.length > 9 ? "9+" : favorites.length}
            </span>
          )}
        </button>
      </header>

      {/* Hero — always Indian family/action movie */}
      {showHero && (
        <HeroBanner
          movie={heroMovie}
          loading={loadingHero}
          isFavorite={heroMovie ? isFavorite(heroMovie.id) : false}
          onToggleFavorite={toggleFavorite}
          onDetails={setSelectedMovie}
        />
      )}

      {/* Content */}
      <div className="px-5 sm:px-8 lg:px-12 py-8">
        <div className={showHero ? "mb-10" : "mb-8 pt-20"}>
          <SearchInput
            value={query}
            onChange={(v) => {
              setQuery(v);
              if (v) setActiveTab("Discover");
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          {/* Search results */}
          {isSearching ? (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <MovieSection
                title={
                  loadingSearch
                    ? "Searching..."
                    : `Results for "${debouncedQuery}"`
                }
                subtitle={
                  searchResults
                    ? `${searchResults.total_results.toLocaleString()} movies found`
                    : undefined
                }
                movies={searchResults?.results}
                loading={loadingSearch}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onSelect={setSelectedMovie}
              />
            </motion.div>
          ) : activeTab === "Favorites" ? (
            <motion.div
              key="favorites-page"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-white/30">
                  <Heart size={48} className="mb-4" />
                  <p className="text-lg font-semibold">No favorites yet</p>
                  <p className="text-sm mt-1">
                    Hover a movie card and tap the heart to save it
                  </p>
                </div>
              ) : (
                <FavoritesSection
                  favorites={favorites}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  onSelect={setSelectedMovie}
                />
              )}
            </motion.div>
          ) : activeTab === "By Language" ? (
            <motion.div
              key="by-language"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Browse by Language
                </h2>
                <p className="text-white/40 text-sm mt-1">
                  Family, action &amp; thriller — no adult content
                </p>
              </div>
              {LANGUAGES.map((lang) => (
                <RegionalSection
                  key={lang.code}
                  language={lang.code}
                  label={lang.label}
                  subtitle={lang.subtitle}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  onSelect={setSelectedMovie}
                />
              ))}
            </motion.div>
          ) : (
            /* Discover tab — Indian family/thriller only */
            <motion.div
              key="discover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Saved favorites strip at top if any */}
              <FavoritesSection
                favorites={favorites}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onSelect={setSelectedMovie}
              />

              {/* Section label */}
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/8" />
                <span className="text-white/30 text-xs font-semibold uppercase tracking-widest">
                  Indian Family &amp; Action Picks — No Adult Content
                </span>
                <div className="h-px flex-1 bg-white/8" />
              </div>

              {LANGUAGES.map((lang) => (
                <RegionalSection
                  key={lang.code}
                  language={lang.code}
                  label={lang.label}
                  subtitle={lang.subtitle}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  onSelect={setSelectedMovie}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <MovieModal
        movieId={selectedMovie?.id ?? null}
        movie={selectedMovie}
        isFavorite={selectedMovie ? isFavorite(selectedMovie.id) : false}
        onToggleFavorite={toggleFavorite}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}
