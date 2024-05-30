import { client } from "../client";
import { applyMovieFilter, type MovieFilter } from "./filter";

export const fetchMovies = (filter: MovieFilter = {}) =>
  client.movie.findMany({
    skip: filter.skip || 0,
    take: filter.limit || 30,
    orderBy:
      filter.sort === "CREATED_AT_DESC" ? { createdAt: "desc" } : { id: "asc" },
    ...applyMovieFilter(filter),
    include: {
      metadata: true,
      genres: true,
      actresses: true,
      fetishes: true,
      website: true,
    },
  });
