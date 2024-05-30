import { cache } from "react";
import { client } from "../client";

const settings = () =>
  client.settings.findMany().then((s) => (s.length ? s[0] : undefined));

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
