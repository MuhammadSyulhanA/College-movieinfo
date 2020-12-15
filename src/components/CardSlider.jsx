import React from 'react';
import "./Movie.css";
import { Carousel } from 'react-bootstrap';
// import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import "../pages/bootstrap/css/bootstrap.css";

const PopularData = ({ title, overview, poster }) => (
    <Carousel>
        <Carousel.Item interval={1000}>
            <img
                className="d-block w-100"
                src={poster}
                alt="new"
            />
            <Carousel.Caption>
                <h3>Title</h3>
                <p>{overview}</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
);
export default PopularData;