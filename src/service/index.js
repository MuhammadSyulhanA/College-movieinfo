import axios from 'axios';

const apiKey = 'a4999a28333d1147dbac0d104526337a';
const url = 'https://api.themoviedb.org/3';
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const upComingUrl = `${url}/movie/upcoming`;
const searchingDataUrl = `${url}/search/movie`
const popularUrl = `${url}/movie/popular`
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const discoverIdGenre = `${url}/discover/movie`;
// const personUrl = `${url}/trending/person/week`;

export const fetchMovies = async () => {
    try {
        const { data } = await axios.get(nowPlayingUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
            
        });

        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
            release_date: m['release_date']
        }))

        return modifiedData;
    } catch (error) { }
    
}

export const fetchTopratedMovie = async () => {
    try {
        const {data} = await axios.get(topratedUrl, {
            params : {
                api_key : apiKey,
                language : 'en_US',
                page : 1
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
            release_date: m['release_date']
        }))

        return modifiedData;
    } catch (error) {
        console.log("data is not define")
    }
    
}

export const fetchSearchingBar = async (findData) =>{
    try {
        const {data} = await axios.get(searchingDataUrl, {
            params : {
                api_key : apiKey,
                language : 'en_US',
                query : findData,
                page : 1
            }
        });
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))
        console.log("data index=>",findData)
        return modifiedData;
    } catch (error) {
        console.log("data is not define for searchhing ", error);
    }

}

export const fetchMovieDetail = async (id) => {
    try {
        const {data} = await axios.get(`${movieUrl}/${id}`, {
            params : {
                api_key : apiKey,
                language : 'en-US'
            }
        });
        console.log("data index =>",id)
        return data;
    } catch (error) {
        console.log("data is not define", error)
    }
}

export const fetchUpComing = async () => {
    try {
        const {data} = await axios.get(upComingUrl, {
            params : {
                api_key :apiKey,
                language : 'en_US',
                page : 1
            }
        });
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
            release_date: m['release_date']
        }))
        return modifiedData;
    } catch (error) {
        console.log("data is not define", error)
    }
}

export const fetchPopuler = async () =>{
    try {
        const {data} = await axios.get(popularUrl, {
            params : {
                api_key : apiKey,
                language : 'en_US',
                page : 1
            }
        });

        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
            release_date: m['release_date']
        }))
        return modifiedData;
    } catch (error) {
        console.log("data is not define", error);
    }
}

export const fetchRecomedationsMovie = async (id) => {
    try {
        const {data} = await axios.get(`${movieUrl}/${id}/recommendations`, {
            params : {
                api_key : apiKey,
                language : 'en-US'
            }
        });
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
            release_date: m['release_date']
        }))
        return modifiedData;
    } catch (error) {
        console.log("data is not define", error)
    }
}

export const fetchCreditPerson = async (id) => {
    try {
        const {data} = await axios.get(`${movieUrl}/${id}/credits`, {
            params : {
                api_key : apiKey,
                language : 'en-US'
            }
        });

        const modifiedData = data['cast'].map((m) => ({
            id: m['cast_id'],
            character: m['character'],
            name: m['name'],
            img: 'https://image.tmdb.org/t/p/w200' + m['profile_path'],
        }));
        
        console.log("data is =>", id);
        return modifiedData;
    } catch (error) {
        console.log("data is not define", error)
    }
   
}

export const fetchGenre = async () => {
    try {
        const {data} =  await axios.get(genreUrl, {
            params : {
                api_key : apiKey,
                language : 'en-US',
                page: 1
            }
        });
        
        const modifiedData = data['genres'].map((m) => ({
            id: m['id'],
            name: m['name'],
        }));

        return modifiedData;
    } catch (error) {
        console.log("data is not define", error);
    }
}

export const fetchMovieByGenre = async (with_genres) => {
    try {
        const {data} = await axios.get(discoverIdGenre, {
            params :{
                api_key: apiKey,
                language: 'en_US',
                sort_by : 'popularity.asc',
                page: 1,
                with_genres: with_genres
            }
        });

        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }));
        return modifiedData;
    } catch (error) {
        console.log("data is not define", error);
    }
}

export const fetchMovieVideos = async (id) => {
    try {
        const {data} = await axios.get(`${movieUrl}/${id}/videos`, {
            params :{
                api_key : apiKey,
                language : 'en-US'
            }
        });
        return data['results'][0];
        
    } catch (error) {
        console.log("data is not define", error);
    }
}

export const fetchSimilarMovie =  async (id) =>{
    try {
        const {data} = await axios.get(`${movieUrl}/${id}/similar`, {
            params : {
                api_key : apiKey,
                language : 'en-US',
                page : 1
            }
        });
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
            release_date: m['release_date']
        }))
        return modifiedData;
    } catch (error) {
        
    }
}




