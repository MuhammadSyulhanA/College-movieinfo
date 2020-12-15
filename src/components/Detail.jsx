import React, { useState, useEffect } from "react";
import {
  fetchMovieDetail,
  fetchRecomedationsMovie,
  fetchSearchingBar,
  fetchCreditPerson,
  fetchMovieVideos
} from "../service";
import { Link } from "react-router-dom";
import "../pages/Index.css"
import Modal from "./Modal/Modal";
import Navigation from '../components/Navbar/Navigation';
import { Card, Carousel } from 'react-bootstrap';

export function Detail({ match }) {
  let params = match.params;


  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [recomendMovie, setRecomendMovie] = useState([]);
  const [creditPerson, setcreditPerson] = useState([]);
  const [videoTrailer, setvideoTrailer] = useState([]);
  const [search, setSearching] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setRecomendMovie(await fetchRecomedationsMovie(params.id));
      setcreditPerson(await fetchCreditPerson(params.id));
      setvideoTrailer(await fetchMovieVideos(params.id));
    };
    fetchAPI();
  }, [params.id]);

  const handleOnInputChange = async (event) => {
    var query = event.target.value;
    var ex = " ";
    for (var i = 0; i < query.length; i++) {
      console.log("data =>", typeof event.target.value[i]);
      console.log("data =>", query.length);
    }

    //searching
    if (query === null) {
      event.preventDefault();
    } else {
      if (query.length === 0) {
        setSearching(await fetchSearchingBar(ex.toString()));
        //setPopular (search);
      } else {
        setSearching(await fetchSearchingBar(query.toString()));
        //setPopular (search);
      }
    }
  }

  const setVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  }

  /*set Similar*/

  const recomendData = recomendMovie.map((item, index) => {
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
      //now playing
    );
  });
  /* End of Similar */

  /*set personCredit*/
  const creditPersonData = creditPerson.slice(0, 4).map((item, index) => {
    return (
      //now playing
      <div className="person" key={index}>
        <div>
          <img src={item.img} className="photo" alt="new" />
          <div className="person-info">
            <h3>{item.name}</h3>
          </div>
          <div className="person-info">
            <p>{item.character}</p>
          </div>
        </div>
      </div>
    );
  });
  /* End of PersonCredit */

  return (
    <>
      <Navigation />

      {/* <div className="movie-container"> */}
      <div className="row mt-2">
        <Modal
          detail={detail.title}
          video={videoTrailer.key}
          show={isOpen}
          onHide={() => { setIsOpen(false); }}
        ></Modal>
      </div>

      <div className="col text-center" style={{ width: "100%", cursor: 'pointer' }}>
        <img className="img-fluid"
          src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
          onClick={() => setIsOpen(true)} />
      </div>
      {/* <div className="carousel-center">
              <i 
                onClick={() => setIsOpen(true)}
                className="far fa-play-circle"
                style={{ fontSize: , color: "white", cursor: "pointer"}}></i>
            </div> */}
      {/* </div> */}

      <div>
        <h3 style={{ paddingTop: 20, paddingLeft: 500, fontSize: 40 }}>{detail.title}</h3>
        <h3 style={{ paddingTop: 40, paddingLeft: 20 }}>Overview</h3>
        <div className="movie-info">
          <p>{detail.overview}</p>
        </div>
      </div>

      <div className="movie-container">
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RELEASE DATE</p>
          <p style={{ color: "#f4c10f" }}>{detail.release_date}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder", paddingLeft: 40 }}>RUN TIME</p>
          <p style={{ color: "#f4c10f", paddingLeft: 40 }}>{detail.runtime}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder", paddingLeft: 40 }}>BUDGET</p>
          <p style={{ color: "#f4c10f", paddingLeft: 40 }}>{detail.budget}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder", paddingLeft: 40 }}>HOMEPAGE</p>
          <p style={{ color: "#f4c10f", paddingLeft: 40 }}>{detail.homepage}</p>
        </div>
      </div>

      {/* <div style={{ paddingTop: 20, paddingLeft: 20 }}>
        <h2>Casts</h2>
      </div>
      <div className="movie-container">
        // {creditPersonData}
      </div> */}

      <div style={{ paddingTop: 20, paddingLeft: 20 }}>
        <h2>Similar Movie</h2>
      </div>

      <div className="movie-container">
        <div class="container testimonial-group">
          <div class="row text-center">
            {recomendData}
          </div>
        </div>
      </div>


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

