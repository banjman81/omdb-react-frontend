import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function MovieDetail(){
    const [movie, setMovie] = useState({})
    const api = process.env.REACT_APP_API_KEY
    let {id} = useParams()

    useEffect(()=>{
        async function getMovie(){
            console.log(id, '----')
            try{
                let payload = await axios.get(`https://www.omdbapi.com/?apikey=${api}&i=${id}`)
                setMovie(payload.data)
                console.log(payload.data)
            }catch(e){
                console.log(e)
            }
        }

        getMovie()
        
    }, [])
    return(
        <div style={{textAlign: 'center', 
            minHeight: "90vh",
            backgroundImage : `url("${movie.Poster}")`, 
            backgroundRepeat : "no=repeat", 
            backgroundSize: "100vw"}}>
            <div style={{opacity : "1", backgroundColor: "rgba(255, 255, 255, 0.7)", minHeight: "90vh"}}>
                <div style={{margin : "0px"}}>
                    <h1>{movie.Title}({movie.Year}, {movie.Rated}, )</h1>
                </div>
                <div>
                    <img src={movie.Poster} alt="" />
                </div>
                <div style={{width: "70%", textAlign: "center", margin: "20px auto"}}>
                    <h3>{movie.Plot}</h3>
                    {movie.Genre}
                    <h4>Starring : {movie.Actors}</h4>
                    <h5>Writer : {movie.Writer}</h5>
                    <h5>Director : {movie.Director}</h5>
                </div>
            </div>
            
        </div>
    )
}

export default MovieDetail