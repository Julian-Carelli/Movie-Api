/* eslint-disable react-hooks/exhaustive-deps*/
import { useEffect } from 'react';

const drawProgressBar = (voteAverage) => {
  let progressBar: any = document.querySelector('.circular-progress');
  let valueContainer: any = document.querySelector('.value-container');

  const total = Math.round((voteAverage * 100) / 10);
  let progressValue = 0;
  let progressEndValue = total;
  let speed = 50;

  let progress = setInterval(() => {
    if (!valueContainer || progressEndValue === 0) {
      progressBar.style.background = 'black';
      return clearInterval(progress);
    }
    progressValue++;
    valueContainer.textContent = `${progressValue}%`;
    progressBar.style.background = `conic-gradient(
        #4d5bf9 ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg
    )`;

    if (progressValue === progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
};

const InformationCardDetail = ({ movie }) => {
  useEffect(() => drawProgressBar(movie?.vote_average), []);

  return (
    <div className="Information-card-detail">
      <div>
        <p className="Information-card-detail__title">
          {(movie?.media_type).toUpperCase()}
        </p>
        <div className="Information-card-detail__container">
          <div className="circular-progress">
            <div className="value-container">0%</div>
          </div>
          <div className="Information-card-detail__release-date">
            <h3>Release Date</h3>
            <p>{movie.release_date ? movie.release_date : '-'}</p>
          </div>
          <div className="Information-card-detail__popularity">
            <h3>Popularity</h3>
            <p>{movie.popularity ? movie.popularity : '-'}</p>
          </div>
        </div>
      </div>
      <div className="Information-card-detail__overview">
        <h3>Overview</h3>
        <p>{movie?.overview}</p>
      </div>
    </div>
  );
};
export { InformationCardDetail };
