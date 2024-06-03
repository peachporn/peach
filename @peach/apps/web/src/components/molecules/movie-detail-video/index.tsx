"use client";

import { videoForMovie } from "@/lib/assets";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type MovieDetailVideoProps = {
  movieId: number;
};
export const MovieDetailVideo = ({ movieId }: MovieDetailVideoProps) => (
  <ReactPlayer url={videoForMovie({ id: movieId })} controls={true} />
);
