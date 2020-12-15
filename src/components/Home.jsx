import React, {useState, useEffect, Component} from "react";
import {
    fetchMovies,
    fetchTopratedMovie,
    fetchSearchingBar,
    fetchUpComing,
    fetchPopuler
} from "../service";
import "./Movie.css";
import { Link } from "react-router-dom";

export  function Home() {

    const [nowPlaying, setNowPlaying] = useState([]);
    const [topRate, setTopRate] = useState ([]);
    const [upComing, setUpComing] = useState([]);
    const [popular, setPopular] = useState([]);
    const [search, setSearching] = useState ([]);
    

    useEffect(() => {
        const fetchAPI = async ()=> {
            setNowPlaying(await fetchMovies());
            setTopRate (await fetchTopratedMovie());
            setUpComing (await fetchUpComing());
            setPopular (await fetchPopuler());
        }
        fetchAPI();
    }, []);

    const setVoteClass = (vote) => {
        if(vote >= 8){
            return "green";
        }else if(vote >= 6){
            return "orange";
        }else{
            return "red";
        }
    }

    /* hendel Searching input life searching */
    const handleOnInputChange = async (event) => {
        var query = event.target.value;
        var ex = " ";
        for (var i = 0; i < query.length; i++) {
            console.log("data =>", typeof event.target.value[i]);
        }
        if (query === null){
            // setSearching (await searchingBar(query.toString()));
            console.log("data pada input search kosong");
        }else {
            console.log(query.length);
            if (query.length===0){
                setSearching (await fetchSearchingBar(ex.toString()));
            } else{
                setSearching (await fetchSearchingBar(query.toString()));
            }
            
        }
    };
   
    const movies = nowPlaying.slice(0,4).map((item, index)=>{
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

    /* top rate */
    const topRateData = topRate.slice(0,4).map((item, index) =>{
        return(
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
    /* end of top rate */

    /*upComingMovie */
    const upComingData = upComing.slice(0,4).map((item, index) =>{
        return (
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
        )
    });
    /* end of upComingMovie */

    /* Searching */
    const searching = search.slice(0,10).map((item, index) =>{
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

    /*Popular */
    const popularData = popular.slice(0,4).map((item, index) =>{
        return (
            <div className="movie" key = {index}>
                    <Link to={`/movie/${item.id}`}>       
                        <img src={item.poster} className="photo" alt="new"/>
                    </Link>
                    <div className="movie-info">
                        <h3>{item.title}</h3>
                        <span className={`tag ${setVoteClass(item.rating)}`}>{item.rating}</span>
                    </div>
            </div> 
        );
    });
    /*End of Popular */

    
    return(
        <>
            <header>
                <input className="search" type="search" placeholder="Search..." onChange={handleOnInputChange.bind(this)}/>
            </header>
            <div><h2>Popular</h2></div>
            <div className="movie-container">
            {searching}
            {popularData}
            </div><br></br>
            <div><h2>Top Rate Data</h2></div>
            <div className="movie-container">
            {topRateData}
            </div>
            <div><h2>Movie</h2></div>
            <div className="movie-container">
            {movies}
            </div>
            <div><h2>Upcoming Movie</h2></div>
            <div className="movie-container">
            {upComingData}
            </div>
        </>
    );


    // return (
    //     <div>
    //     <input
    //         className="input"
    //         type="text"
    //         placeholder="Search..."
    //         onChange={handleOnInputChange.bind(this)}
    //     />
    //         {popularData}
    //         {/* {movies}
    //         {topRateData} */}
    //         {searching}
    //         {/* {upComingData} */}
    //     </div>
    // )
}

