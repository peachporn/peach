import { FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/react-hooks';
import { BasePage } from './basePage';
import { randomMovieQuery } from '../queries/randomMovie.gql';
import { Home } from '../../components/compositions/home';

export const Homepage: FunctionalComponent = () => {
  const { data } = useQuery<RandomMovieQuery>(randomMovieQuery);
  return (
    <BasePage>
      <Home movie={data?.randomMovie} />
    </BasePage>
  );
};
