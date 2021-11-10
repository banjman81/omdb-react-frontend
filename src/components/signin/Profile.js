import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Profile(){
    const [movies, setMovies] = useState([])
    useEffect(()=>{
        async function getFavorites(){
            try{
                let payload = await axios.get("http://localhost:3001/movies/all-favorites", 
                {headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}})

                
                setMovies(payload.data.payload)
            }catch(e){
                console.log(e.response)
            }
        }
        getFavorites()
    }, [])
    return(
        <div style={{display: "flex", flexWrap: 'wrap'}}>
            {movies.map(movie => {
                return(
                    <div key={movie._id} style={{margin: '20px', border : '1px solid black', borderRadius: '20px', padding: "20px"}}>
                        <Link to={`/get-movie/${movie.imdbId}`} style={{textDecoration : "none"}}>
                        <table style={{width : "300px"}}>
                            <tbody>
                                <tr style={{height: "75px"}}>
                                    <td><h3>{movie.title.length > 30 ? `${movie.title.slice(0,30)}...`: movie.title}</h3></td>
                                </tr>
                                <tr>
                                    <td><img src={movie.poster} alt="" /></td>
                                </tr>
                            </tbody>
                        </table>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Profile