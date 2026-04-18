import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

export function SearchInput({ value, onChange }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Search
          size={18}
          className="absolute left-4 text-white/40 pointer-events-none"
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search movies, titles, genres..."
          className="w-full bg-white/8 border border-white/10 text-white placeholder:text-white/35 rounded-2xl py-3.5 pl-11 pr-11 text-sm focus:outline-none focus:border-cyan-500/60 focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
        />

        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              onClick={() => onChange("")}
              className="absolute right-4 text-white/40 hover:text-white transition-colors"
            >
              <X size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
