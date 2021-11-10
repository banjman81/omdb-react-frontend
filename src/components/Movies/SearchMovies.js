import jwt from 'jsonwebtoken'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"
import {useEffect, useState} from 'react'

require('dotenv').config()


function Search (e){
    const [loading, setLoading] = useState(false)
    const [movies, setMovies] = useState([])
    const api = process.env.REACT_APP_API_KEY
    const search = e.match.params.data.replace(" ", "+")

    const notifySuccess = () => toast.success('Movie added to favorite!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifyFailed = (input) => toast.error(`${input}`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    useEffect(() => {
        setLoading(true)
        async function fetchMovies(){
            try{
                let payload = await axios.get(`https://www.omdbapi.com/?apikey=${api}&s=${search}`)
        
                let movieIdArray = payload.data.Search.map((item) => item.imdbID)

                let promisedMovieArray = movieIdArray.map(async (item) => {
                    return await axios.get(`https://www.omdbapi.com/?apikey=${api}&i=${item}`)
                })

                Promise.all(promisedMovieArray)
                    .then((result) => {
                        setMovies(result)
                        setLoading(false)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }catch(e){
                console.log(e.response)
                notifyFailed("No Result")
                setLoading(false)
            }
        }
        fetchMovies()
        console.log(movies)
    }, [])

    const addFavorite = async (e) => {
        if(localStorage.getItem('loginToken') === null){
            
            notifyFailed("Please login")
        }else{
            let decodedToken = jwt.verify(localStorage.getItem('loginToken'), process.env.REACT_APP_JWT_SECRET)
            try{
                let payload = await axios.post("http://localhost:3001/movies/add-favorite",
                {
                    title : e.data.Title,
                    poster: e.data.Poster,
                    imdbLink: `https://www.omdbapi.com/?apikey=${api}&i=${e.imdbID}`,
                    userID : decodedToken.id
                },
                {headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}})
                console.log(payload)
                notifySuccess()
            }catch(e){
                console.log(e.response)
            }
        }
    }
    return(
        <div style={{display : "flex", flexWrap : 'wrap'}}>
            {loading ? ('...Loading') : 
                movies.map(movie => {
                    return(
                        <div key={movie.data.imdbID} style={{margin: "20px auto", border: "1px solid gray", width: "350px", borderRadius: "10px", textDecoration : "none"}}>
                            
                                <table style={{margin : "0 auto", color: "black"}}>
                                    <tbody>
                                        
                                        <tr style={{height: "75px"}}>
                                            <td>
                                                <Link to={`/get-movie/${movie.data.imdbID}`} style={{textDecoration : "none", color: "black"}}>
                                                    <h4 style={{marginTop: "10px" ,height: "75px", textOverflow : "ellipsis", textAlign : "center"}}>{movie.data.Title.length > 40 ? `${movie.data.Title.slice(0,40)}...` : movie.data.Title}</h4>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{textAlign : "center"}}>
                                                <Link to={`/get-movie/${movie.data.imdbID}`} style={{textDecoration : "none", color: "black"}}>
                                                <img src={movie.data.Poster} alt="poster" style={{height: "400px", width: "250px", objectFit : "cover"}}/>
                                                </Link>
                                            </td>
                                        </tr>
                                        
                                        <tr style={{height: "50px"}}>
                                            <td>
                                                <button onClick={()=> addFavorite(movie)}>Add favorite</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Search