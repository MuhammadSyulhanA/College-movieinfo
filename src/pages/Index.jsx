import React, { useState, useEffect } from 'react';
//import popularData from "../components/PopularData";
import "./Index.css";
import { Link } from "react-router-dom";
import {
    fetchMovies,
    fetchTopratedMovie,
    fetchSearchingBar,
} from "../service";
import { Carousel, Card } from 'react-bootstrap';
import "./bootstrap/css/bootstrap.css";
import TopRated from "../components/TopRated";
import CardSlider from "../components/CardSlider";
import { grey } from '@material-ui/core/colors';
import Navigation from '../components/Navbar/Navigation';



export function Index() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [topRate, setTopRate] = useState([]);
    const [search, setSearching] = useState([]);

    useEffect(() => {
        // param for setup data for first time
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setTopRate(await fetchTopratedMovie());
        }
        fetchAPI();
    }, []);


    //rating
    const setVoteClass = (vote) => {
        if (vote >= 8) {
            return "green";
        } else if (vote >= 6) {
            return "orange";
        } else {
            return "red";
        }
    }

    //poster
    const poster = topRate.slice(0, 1).map((item, index) => {
        return (
            <div style={{ height: 440 }} key={index}>
                <div style={{ width: 800, margin: 0 }}>
                    <img style={{ height: 460, width: 1349 }} src={item.backPoster} />
                </div>
                <div className="carousel-center">
                    <i
                        className="far fa-play-circle"
                        style={{ fontSize: 95, color: "#f4c10f" }}
                    ></i>
                </div>
            </div>
        );
    });

    /* top rate */
    const topRateData = topRate.map((item, index) => {
        return (
            <>
                <Card className="bg-dark text-white" key={index} style={{ width: 220 + 'px', marginRight: 1 + 'em', marginBottom: 1 + 'em', position: "relative" }}>
                    <Link to={`/movie/${item.id}`}>
                        <Card.Img src={item.poster} alt="new" />
                        <Card.ImgOverlay>
                            <Card.Title style={{ marginTop: 11 + 'em', color: "white" }}>{item.title}</Card.Title>
                        </Card.ImgOverlay>
                    </Link>
                    <span style={{ position: "absolute", bottom: 0 + 'px', right: 0 + 'px' }} className={`tag ${setVoteClass(item.rating)}`}>{item.rating}</span>
                </Card >

            </>
        );
    });
    /* end of top rate */


    /* Searching */
    const searching = search.slice(0, 4).map((item, index) => {
        return (
            <div className="movie">
                <h2></h2>
                <div key={index}>
                    <Link to={`/movie/${item.id}`}>
                        <img src={item.poster} className="photo" alt="new" />
                    </Link>
                    <div className="movie-info">
                        <h3>{item.title}</h3>
                        <span className={`tag ${setVoteClass(item.rating)}`}>{item.rating}</span>
                    </div>
                </div>
            </div>
        );
    });
    /* End of Searching */

    return (
        <>
            <Navigation />
            <Carousel>
                {
                    topRate.map((item, index) => {
                        return (
                            <Carousel.Item interval={1000} key={index}>
                                <img
                                    className="d-block w-100"
                                    src={item.backPoster}
                                    alt="new"
                                />
                                <Carousel.Caption>
                                    <h3>{item.title}</h3>
                                    <p>{item.overview}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>

            <div style={{ padding: 20, backgroundColor: grey, background: grey }}>
                <h2>Top Rated Movie</h2>
            </div>

            {/* <div>
                <i className="far fa-arrow-alt-circle-right"></i>
            </div> */}

            <div className="movie-container">
                {/* {topRateData} */}
                <TopRated />
            </div>

            {/* <TopRated /> */}
            {/* 
            <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr> */}

            <footer class="site-footer">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <h6>About</h6>
                            <p class="text-justify">OreMovie.com <i>CODE WANTS TO BE SIMPLE </i> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at pharetra risus, quis consequat purus. Vestibulum vel consequat mauris. Aenean dignissim faucibus tortor, ut lobortis eros commodo sed. Proin quis augue dictum, luctus augue ac, mattis arcu. Nulla eget auctor lacus, id ullamcorper felis. Donec malesuada augue ligula, vel lobortis sapien efficitur vel. Aliquam et maximus ante, at tristique libero. Curabitur aliquet nisi nec leo dictum, et elementum felis rhoncus.</p>
                        </div>
                    </div>
                </div>
            </footer>

        </>

    );
}
