import React, {useState, useEffect} from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import {
    fetchGenre,
    fetchMovieByGenre,
    fetchSearchingBar
} from "../../service";
import { Link } from "react-router-dom";


export default function Navigation(){
    const [getValue, setgetValue] =  useState([]);
    const [getGenreId, setGetGenreid] =  useState([]);
    const [genreClik, setGenreClik] = useState ([]);

    useEffect(() => {
        const fetchAPI = async ()=> {
            setGetGenreid (await fetchGenre());
            setGenreClik (await fetchMovieByGenre(53));
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

    /*Get genre and show list genre*/
    const getIdGenre = getGenreId.map((item, index) => {
        return (
            <Link to={`/genre/${item.id}`}> 
                <NavDropdown.Item href="#action/3.1">{item.name}</NavDropdown.Item>      
            </Link>
        );
    })
    /*End of Get genre and show list genre*/

    const handleSubmit = async (e)=>{
        e.preventDefault();
    }

    const hendelForm = async (e)=>{
        setgetValue(e.target.value)
        console.log("data =>",getValue)
    }

    return(
        <>
            <Navbar bg="light" expand="lg" fixed="top">
                <Navbar.Brand href="/">MovieReview</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/UpComing">UpComing Movie</Nav.Link>
                        <Nav.Link href="/NowPlaying">Now Playing</Nav.Link>
                        <NavDropdown title="Genre" id="basic-nav-dropdown">
                            {getIdGenre}
                        </NavDropdown>
                    </Nav>

                    <Form inline onSubmit={handleSubmit}>
                        <FormControl type="select" placeholder="Search" className="mr-sm-2"  onChange={hendelForm} />
                        <Link to={`/search/${getValue}`}>    
                            <Button type="submit" variant="outline-success">Search</Button>
                        </Link>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

