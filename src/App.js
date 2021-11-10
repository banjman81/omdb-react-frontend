import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/nav/Nav'
import { Movies } from './components/Movies/Movies';
import SignUp from './components/signup/Signup';
import SignIn from './components/signin/SignIn';

import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SignOut from './components/signout/SignOut';

function App() {
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
        <Nav />
        <Switch>
          <Route exact path="/" component={Movies}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/signout" component={SignOut}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
