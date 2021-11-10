import jwt from 'jsonwebtoken'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import React, { Component } from "react"
import { Link } from "react-router-dom"
require('dotenv').config()


export class Movies extends Component {
    state = {
        searchArray : ["Superman", "lord of the ring", "batman", "Pokemon", "Harry Potter", "Star Wars", "avengers", "Terminator"],
        isLoading: false,
        movieArray: [],
        apiKey : process.env.REACT_APP_API_KEY,
    }

    notifySuccess = () => toast.success('Movie added to favorite!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    notifyFailed = (input) => toast.error(`${input}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    

    async componentDidMount() {
        const ranNum = Math.floor(Math.random() * this.state.searchArray.length)

        this.setState({
            isLoading: true,
        })
        try {
            let payload = await axios.get(`https://www.omdbapi.com/?apikey=${this.state.apiKey}&s=${this.state.searchArray[ranNum]}`)
        
            let movieIdArray = payload.data.Search.map((item) => item.imdbID)

            let promisedMovieArray = movieIdArray.map(async (item) => {
                return await axios.get(`https://www.omdbapi.com/?apikey=${this.state.apiKey}&i=${item}`)
            })

            Promise.all(promisedMovieArray)
                            .then((result) => {
                                this.setState({
                                    movieArray: Array.from(new Set(result)),
                                    isLoading : false
                                })
                                
                                console.log(this.state.movieArray)
                            })
                            .catch((e) => {
                                console.log(e)
                            })

            // console.log(resultArray)

        }catch(e){
            console.log(e)
        }
    }

    addFavorite = async (e) => {
        if(localStorage.getItem('loginToken') === null){
            
            this.notifyFailed("Please login")
        }else{
            let decodedToken = jwt.verify(localStorage.getItem('loginToken'), process.env.REACT_APP_JWT_SECRET)
            try{
                let payload = await axios.post("http://localhost:3001/movies/add-favorite",
                {
                    title : e.data.Title,
                    poster: e.data.Poster,
                    imdbLink: `https://www.omdbapi.com/?apikey=${this.state.apiKey}&i=${e.imdbID}`,
                    imdbId: e.data.imdbID,
                    userID : decodedToken.id
                },
                {headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}})
                console.log(payload)
                this.notifySuccess()
            }catch(e){
                console.log(e.response)
            }
        }
    }

    

    render(){
        return(
            <div className="App" style={{display : "flex", flexWrap : 'wrap'}}>
                {this.state.isLoading ? ("...Loading") : (
                    this.state.movieArray.map((item) => {
                        return (
                            <div key={item.data.imdbID} style={{margin: "20px auto", border: "1px solid gray", width: "350px", borderRadius: "10px", textDecoration : "none"}}>
                                
                                    <table style={{margin : "0 auto", color: "black"}}>
                                        <tbody>
                                            
                                            <tr style={{height: "75px"}}>
                                                <td>
                                                    <Link to={`/get-movie/${item.data.imdbID}`} style={{textDecoration : "none", color: "black"}}>
                                                        <h4 style={{marginTop: "10px" ,height: "75px", textOverflow : "ellipsis", textAlign : "center"}}>{item.data.Title.length > 40 ? `${item.data.Title.slice(0,40)}...` : item.data.Title}</h4>
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr style={{height : "400px"}}>
                                                <td style={{textAlign : "center"}}>
                                                    <Link to={`/get-movie/${item.data.imdbID}`} style={{textDecoration : "none", color: "black"}}>
                                                    <img src={item.data.Poster} alt="poster" style={{height: "400px", width: "250px", objectFit : "cover"}}/>
                                                    </Link>
                                                </td>
                                            </tr>
                                            
                                            <tr style={{height: "50px"}}>
                                                <td>
                                                    <button className="btn" style={{backgroundColor:"rgb(0, 119, 255)", color: 'white', fontWeight: "500"}} onClick={()=> this.addFavorite(item)}>Add favorite</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                
                            </div>
                        )
                    })
                )}
            </div>
        )
    }
}