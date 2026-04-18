import { useQuery } from "@tanstack/react-query";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

async function tmdbFetch(endpoint, params) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
export const posterUrl = (path, size = "w500") =>
  path ? `${TMDB_IMAGE_BASE}/${size}${path}` : "/placeholder-poster.jpg";
export const backdropUrl = (path, size = "w1280") =>
  path ? `${TMDB_IMAGE_BASE}/${size}${path}` : null;

export function useTrending() {
  return useQuery({
    queryKey: ["trending"],
    queryFn: () => tmdbFetch("/trending/movie/day"),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePopular() {
  return useQuery({
    queryKey: ["popular"],
    queryFn: () => tmdbFetch("/movie/popular"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useTopRated() {
  return useQuery({
    queryKey: ["top-rated"],
    queryFn: () => tmdbFetch("/movie/top_rated"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useSearch(query) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () =>
      tmdbFetch("/search/movie", { query, include_adult: "false" }),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 2,
  });
}

export function useMovieDetails(id) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => tmdbFetch(`/movie/${id}`),
    enabled: id !== null,
    staleTime: 1000 * 60 * 10,
  });
}

export function useMovieCredits(id) {
  return useQuery({
    queryKey: ["movie-credits", id],
    queryFn: () => tmdbFetch(`/movie/${id}/credits`),
    enabled: id !== null,
    staleTime: 1000 * 60 * 10,
  });
}

// Genre IDs: 28=Action, 53=Thriller, 10751=Family, 12=Adventure
// Using pipe (|) for OR logic — returns movies in any of these genres
const FAMILY_ACTION_GENRES = "28|53|10751|12";

export function useRegionalMovies(language) {
  return useQuery({
    queryKey: ["regional", language],
    queryFn: () =>
      tmdbFetch("/discover/movie", {
        with_original_language: language,
        with_genres: FAMILY_ACTION_GENRES,
        include_adult: "false",
        sort_by: "popularity.desc",
        "vote_count.gte": "50",
      }),
    staleTime: 1000 * 60 * 10,
  });
}

// Indian trending: popular movies from India region, family/action/thriller only
export function useIndianTrending() {
  return useQuery({
    queryKey: ["indian-trending"],
    queryFn: () =>
      tmdbFetch("/discover/movie", {
        region: "IN",
        with_genres: FAMILY_ACTION_GENRES,
        include_adult: "false",
        sort_by: "popularity.desc",
        "vote_count.gte": "50",
      }),
    staleTime: 1000 * 60 * 5,
  });
}
