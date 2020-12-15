import React, { useState, useEffect } from 'react';
import {

    fetchTopratedMovie
} from "../service";
import "../pages/Index.css";
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

const TopRated = () => {

    const [topRate, setTopRate] = useState([]);

    useEffect(() => {
        // param for setup data for first time
        const fetchAPI = async () => {

            setTopRate(await fetchTopratedMovie());
        }
        fetchAPI();
    }, []);

    const setVoteClass = (vote) => {
        if (vote >= 8) {
            return "green";
        } else if (vote >= 6) {
            return "orange";
        } else {
            return "red";
        }
    }

    const topRateData = topRate.map((item, index) => {
        return (
            <div className="col-3">
                <Card className="bg-dark text-white" key={index} style={{ width: 220 + 'px' }}>
                    <Link to={`/movie/${item.id}`}>
                        <Card.Img src={item.poster} alt="new" />
                        {/* <Card.ImgOverlay>
                            <Card.Title style={{ marginTop: 11 + 'em', color: "white" }}>{item.title}</Card.Title>
                        </Card.ImgOverlay> */}
                    </Link>
                    <span style={{ position: "absolute", bottom: 0 + 'px', right: 0 + 'px' }} className={`tag ${setVoteClass(item.rating)}`}>{item.rating}</span>
                </Card >
            </div>

        );
    });



    return (
        <>
            <div class="container testimonial-group">
                <div class="row text-center">
                    {topRateData}

                </div>
            </div>
        </>
    );
}


export default TopRated;