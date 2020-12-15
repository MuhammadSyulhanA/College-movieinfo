import React from 'react';
import "./Movie.css";

const setVoteClass = (vote) => {
    if(vote >= 8){
        return "green";
    }else if(vote >= 6){
        return "orange";
    }else{
        return "red";
    }
}

const Movie = ({title, overview, rating, popularity, release_date, poster}) => (
    <div className="movie">
        <img src={poster} className="photo" alt="new"/>
        <div className="movie-info">
            <h3>{title}</h3>
            <span className={`tag ${setVoteClass(rating)}`}>{rating}</span>
        </div>

        {/* <div className="movie-overflow">
            <h2>Overview</h2>
            <p>{overview}</p>
        </div> */}
    </div>
);
export default Movie;