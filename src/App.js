import './App.css';
import jwt from 'jsonwebtoken'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
import PrivateRoute from './components/privateRoute/PrivateRoute';
import UpdateProfile from './components/signin/UpdateProfile';

require('dotenv').config()

function App() {
  const [user, setUser] = useState(null)

  const key = process.env.REACT_APP_JWT_SECRET

  useEffect(() => {
    try{
      let jwtToken = localStorage.getItem("loginToken")
      if(jwtToken){
        let decodedToken = jwt.verify(jwtToken, key)
        if(decodedToken.exp < Date.now()/1000){
          setUser(null)
        }else{
          setUser({
            email: decodedToken.email,
            username : decodedToken.username,
            id: decodedToken.id
          })
        }
          
      }
    }catch(e){
      localStorage.removeItem("loginToken")
      setUser(null)
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
          <Route path="/profile" 
            element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>}/>
          <Route path="/signup" element={< SignUp />}/>
          <Route path="/signin" element={<SignIn setUser={setUser}/>}/>
          <Route path="/signout" element={< SignOut setUser={setUser}/>}/>
          <Route path="/search/:data" element={< Search />}/>
          <Route path="/get-movie/:id" element={< MovieDetail />}/>
          <Route path="/update-profile" 
            element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
