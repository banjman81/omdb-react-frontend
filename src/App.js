import './App.css';
import jwt from 'jsonwebtoken'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Nav from './components/nav/Nav'
import { Movies } from './components/Movies/Movies';
import SignUp from './components/signup/Signup';
import SignIn from './components/signin/SignIn';

import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SignOut from './components/signout/SignOut';
import Search from './components/Movies/SearchMovies';
import Profile from './components/signin/Profile';
import MovieDetail from './components/Movies/MovieDetail';

import CheckToken from './components/hooks/CheckToken'

const { checkJwtToken } = CheckToken()
require('dotenv').config()

function App() {
  const [user, setUser] = useState(null)

  const key = process.env.REACT_APP_JWT_SECRET

  useEffect(() => {
    let jwtToken = localStorage.getItem("loginToken")
    let decodedToken = jwt.verify(jwtToken, key)
      if(!checkJwtToken()){
        setUser(null)
      }else{
        setUser({
          email: decodedToken.email,
          username : decodedToken.username,
          id: decodedToken.id
        })
      }
    }, [])
  return (
    <div className="App">
      <Router>
            <ToastContainer
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        <Nav user={user}/>
        <Routes>
          <Route path="/" element={<Movies />}/>
          <Route path="/signup" element={< SignUp />}/>
          <Route path="/signin" element={<SignIn setUser={setUser}/>}/>
          <Route path="/signout" element={< SignOut setUser={setUser}/>}/>
          <Route path="/search/:data" element={< Search />}/>
          <Route path="/profile" element={< Profile />}/>
          <Route path="/get-movie/:id" element={< MovieDetail />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
