import { PropsWithChildren } from "react";

const MovieDetailPageLayout = ({ children }: PropsWithChildren<{}>) => (
  <main className='mx-auto max-w-[var(--max-width-content)] px-4 xl:px-0'>{children}</main>
);

export default MovieDetailPageLayout;
