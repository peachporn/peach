import { fromEnv } from ".";

export const screencapPath = `${fromEnv("LIBRARY_PATH")}/screencaps/`;
export const actressImagePath = `${fromEnv("LIBRARY_PATH")}/actresses/`;
export const websiteImagePath = `${fromEnv("LIBRARY_PATH")}/websites/`;
export const genreImagePath = `${fromEnv("LIBRARY_PATH")}/genres/`;
