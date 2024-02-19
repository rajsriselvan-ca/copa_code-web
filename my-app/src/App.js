import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Login from './Components/login-form';
import ProjectDashBoard from './Components/project-dashboard';
import axios from 'axios';

function App() {
  const [user, setUser] = useState({ auth:false, name:''});

  useEffect(() => {
    // Check for the presence of the token in localStorage
    const storedToken = localStorage.getItem('jwtToken');

    if (storedToken) {
      // If token is present, set it in axios headers and update user authentication
      axios.defaults.headers.common['Authorization'] = storedToken;
      setUser({ auth: true, name: ''});
    } else {
      // If token is not present, reset axios headers and update user authentication
      delete axios.defaults.headers.common['Authorization'];
      setUser({ auth: false, name: '' });
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {user.auth ? <Redirect to={`/user/dashboard`} /> : <Login setUser={setUser} />}
          </Route>
          <Route path="/user/dashboard">
            {user.auth ? <ProjectDashBoard setUser={setUser} /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
