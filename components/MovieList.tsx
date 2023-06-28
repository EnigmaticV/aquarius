import React from 'react';

import { MovieInterface } from '@/types';
import MovieCard from '@/components/MovieCard';
import { isEmpty } from 'lodash';

interface MovieListProps {
  data: MovieInterface[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-lg text-black mb-8 opacity-70 uppercase">{title}</p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
