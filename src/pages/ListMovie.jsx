import React, {useState, useEffect, Component} from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import {
    fetchSearchingBar,
    fetchPopuler
} from "../service";
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";


export function ListMovie() {
    const [popular, setPopular] = useState([]);
    const [search, setSearching] = useState ([]);

    useEffect(() => {
        // param for setup data for first time
        const fetchAPI = async () => {
            setPopular (await fetchPopuler());
        }
        fetchAPI();
    }, []);

    const handleOnInputChange = async (event) => {
        var query = event.target.value;
        var ex = " ";
        for (var i = 0; i < query.length; i++) {
            console.log("data =>", typeof event.target.value[i]);
            console.log("data =>", query.length);
        }

       //searching
        if(query === null){
            event.preventDefault();
        }else{
            if(query.length === 0){
                setSearching (await fetchSearchingBar(ex.toString()));
                setPopular (search);
            }else{
                setSearching (await fetchSearchingBar(query.toString()));
                setPopular (search);
            }
        }
    }

    //rating
    const setVoteClass = (vote) => {
        if(vote >= 8){
            return "green";
        }else if(vote >= 6){
            return "orange";
        }else{
            return "red";
        }
    }

    //poster
    const poster = popular.slice(0, 1).map((item, index) => {
        return (
         <div style={{ height: 440 }} key={index}>
            <div style={{width:800, margin:0}}>
              <img style={{ height: 460 ,width:1349}} src={item.backPoster}  />
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

      const Popular = popular.slice(0,4).map((item, index)=>{
        return(
            //now playing
            <div className="movie">
                <div key = {index}>
                    <Link to={`/movie/${item.id}`}>       
                        <img src={item.poster} className="photo" alt="new"/>
                    </Link>
                    <div className="movie-info">
                        <h3>{item.title}</h3>
                        <span className={`tag ${setVoteClass(item.rating)}`}>{item.rating}</span>
                    </div>
                </div>
            </div>        
        );
    });
    /* end of now playing */

    /* Searching */
    const searching = search.slice(0,4).map((item, index) =>{
        return(
            <div className="movie">
                <h2></h2>
                <div key = {index}>
                    <Link to={`/movie/${item.id}`}>       
                        <img src={item.poster} className="photo" alt="new"/>
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
        <header>
          <div className="Logo">
              <Link to="/" >Ore Movie</Link>
          </div>            
            <input className="search" type="search" placeholder="Search..." onChange={handleOnInputChange.bind(this)}/>
            <div className="navigation">
              <Link to="/UpComing">Upcoming Movie</Link>
              <Link to="/NowPlaying">Now Playing</Link>
              <Link to="/ListMovie">Popular</Link>
            </div>  
        </header>
    
        <div className="container">
                <RBCarousel
                    autoplay={true}
                    pauseOnVisibility={true}
                    slidesshowSpeed={5000}
                    version={4}
                    indicators={false}
                >
                    {poster}
                </RBCarousel>
        </div>

        <div style={{ paddingTop : 40,paddingLeft:20}}>
            <h2>Popular Movie</h2>
        </div>

          <div>
            <i className="far fa-arrow-alt-circle-right"></i>
          </div>
          <div className="movie-container">              
            {searching}
            {Popular}
          </div>
    
       <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

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