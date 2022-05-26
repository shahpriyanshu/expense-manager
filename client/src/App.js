import React, { useEffect, useState, createContext } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { withRouter } from './components/auth/withRouter';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Home from './components/home';
import PrivateRoute from './components/auth/privateRoute';
import './App.css';


Amplify.configure({
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_0zFL6Y5De',
    userPoolWebClientId: '7f3fhnuqttfogg3ouorh96dl1r',
    mandatorySignIn: false,
  }
});

export const UserContext = createContext();

const App = ({history}) => {
  const [isAuthenticated, setAuthentication] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!isAuthenticated) checkUserAuthentication();
  }, [history]);

  const checkUserAuthentication = async () => {
    await Auth.currentAuthenticatedUser({
      bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
      if (user) {
        const {signInUserSession} = user;
        document.cookie = `accessToken=${signInUserSession?.accessToken.jwtToken};`;
      }
      setAuthentication(true);
      setUser(user);
    }).catch(err => {
      setAuthentication(false)
      setUser(null)
    });
  }

  const setUserDetails = (user) => {
    setAuthentication(true);
    setUser(user);
  }

  return (
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>  
              <Route path="/" element={<Home />} />
           </Route> 
          <Route exact path="/signup" element={<Signup setUserDetails={(user) => setUserDetails(user)}/>} />
          <Route exact path="/signin" element={<Signin setUserDetails={(user) => setUserDetails(user)}/>} />
        </Routes>
        </UserContext.Provider>
  );
}

export default withRouter(App);
