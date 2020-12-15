import React from 'react';
import "./Movie.css";

const Upcoming = ({title, overview, rating, popularity, release_date, poster}) => (
    <div>
        <h1>Upcoming Movies</h1>
        <p>{title}</p>
        <p>{overview}</p>
        <p>{rating}</p>
        <p>{popularity}</p>
        <p>{release_date}</p>
        <img src={poster} className="photo" alt="new"/>
        <br/>
    </div>
);
export default Upcoming;