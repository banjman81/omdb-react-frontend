import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import './profile.css'

function Profile(){
    const [movies, setMovies] = useState([])
    const [changes, setChanges] = useState(false)
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
    }, [changes])

    async function handleDelete(e){
        try{
            console.log(e)
            let deletedItem = await axios.delete(`http://localhost:3001/movies/delete-favorite/${e}`,
            {headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}})
            console.log(deletedItem)
            setChanges(!changes)

        }catch(e){
            console.log(e.response)
        }
    }

    return(
        <div className="wrapper">
            <Link to="/update-profile">
            <button className="button-update">Update profile</button>
            </Link>
            <hr />
            <div className="box">
                {movies.map(movie => {
                    return(
                        <div key={movie._id} style={{margin: '20px', border : '1px solid black', borderRadius: '20px', padding: "20px"}}>
                            
                            <table style={{width : "300px"}}>
                                <tbody>
                                    
                                    <tr style={{height: "75px"}}>
                                        
                                        <td>
                                            <Link to={`/get-movie/${movie.imdbId}`} style={{textDecoration : "none"}}>
                                            <h3>{movie.title.length > 30 ? `${movie.title.slice(0,30)}...`: movie.title}</h3>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Link to={`/get-movie/${movie.imdbId}`} style={{textDecoration : "none"}}>
                                                <img src={movie.poster} alt="" />
                                            </Link></td>
                                    </tr>
                                    
                                    <tr>
                                        <td>
                                            <button onClick={() => handleDelete(movie.imdbId)}>Remove</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Profile