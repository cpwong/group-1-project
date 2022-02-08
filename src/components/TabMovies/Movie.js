import React from 'react';

const Movie = ({ movie, selectMovie }) => {
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w342';

  return (
    <div onClick={() => selectMovie(movie)} className={'movie'}>
      <div className='mani-movie-title'>
        {movie.poster_path && (
          <div className='mani-pic'>
            <img
              src={IMAGE_PATH + movie.poster_path}
              alt={movie.title}
              className='mani-imageq'
            />
            <div className='mani-overview'>
              <div>
                <h5>{movie.overview}</h5>
              </div>
            </div>
          </div>
        )}

        <div className={'mani-flex mani-between mani-movie-infos'}>
          <h5 className={'mani-movie-title'}>{movie.title}</h5>
          {movie.vote_average ? (
            <span className={'mani-movie-voting'}>{movie.vote_average}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Movie;
