import { db } from "@peach/database";
import { cache } from "react";

const settings = () => db.query.settings.findFirst();

export const getScreencapPath = cache(() =>
  settings().then((s) => s && `${s.libraryPath}/screencaps/`)
);

export const getActressImagePath = cache(() =>
  settings().then((s) => s && `${s.libraryPath}/actresses/`)
);

export const getWebsiteImagePath = cache(() =>
  settings().then((s) => s && `${s.libraryPath}/websites/`)
);

export const getGenreImagePath = cache(() =>
  settings().then((s) => s && `${s.libraryPath}/genres/`)
);
