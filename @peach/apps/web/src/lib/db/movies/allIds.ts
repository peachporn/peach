import { db } from "@peach/database";
import { cache } from "react";

export const fetchAllMovieIds = cache(() =>
  db.query.movie.findMany({
    columns: {
      id: true,
    },
  })
);
