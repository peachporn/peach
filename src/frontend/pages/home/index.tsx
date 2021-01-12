import { FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/react-hooks';
import { randomMovieQuery } from './queries/randomMovie.gql';
import { BasePage } from '../../components/basePage';
import { Home } from './components/home';

export const Homepage: FunctionalComponent = () => {
  const { data } = useQuery<RandomMovieQuery>(randomMovieQuery);
  return (
    <BasePage>
      <Home movie={data?.randomMovie} />
    </BasePage>
  );
};
