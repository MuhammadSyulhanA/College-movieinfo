import React, {useState, useEffect} from 'react'
import {
    fetchSearchingBar
} from "../service";
import { Link } from "react-router-dom";

export default function HalGenre({ match }) {
    let params = match.params;

    console.log("ini dah",params)

    const [search, setSearching] = useState ([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setSearching (await fetchSearchingBar(params.id));
        };
        fetchAPI();
      }, [params.id]);
    
    const setVoteClass = (vote) => {
        if (vote >= 8) {
            return "green";
        } else if (vote >= 6) {
            return "orange";
        } else {
            return "red";
        }
    }

    const showDataSearching = search.map ((item, index) => {
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

    return (
        <div>
            {console.log("inih halaman searchi",search)}
            {showDataSearching}
        </div>
    )
}
