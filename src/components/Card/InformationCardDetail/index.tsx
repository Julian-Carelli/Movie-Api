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
    <div style={{ width: '40%' }}>
      <div style={{ padding: '40px 0px' }}>
        <p
          style={{
            paddingBottom: '40px',
            fontSize: '25px',
            fontWeight: '800',
            color: 'rgb(134, 93, 255)',
          }}
        >
          {(movie?.media_type).toUpperCase()}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="circular-progress">
            <div className="value-container">0%</div>
          </div>
          <div>
            <h3>Release Date</h3>
            <p>{movie.release_date ? movie.release_date : '-'}</p>
          </div>
          <div>
            <h3>Popularity</h3>
            <p>{movie.popularity ? movie.popularity : '-'}</p>
          </div>
        </div>
      </div>
      <div style={{ padding: '80px 0px' }}>
        <h3
          style={{
            fontSize: '25px',
            fontWeight: '800',
            color: 'rgb(134, 93, 255)',
          }}
        >
          Overview
        </h3>
        <p>{movie?.overview}</p>
      </div>
    </div>
  );
};
export { InformationCardDetail };
