import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App() {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload(false);
  };

  return (
    <Router>
      <div className="app-container">
        <div className="App">
          {localStorage.getItem("token") === null ? (
            <h2>Login</h2>
          ) : (
              <div className="protected-container">
                <button
                  className="logout"
                  color="inherit"
                  onClick={logout}>
                  logout
							</button>
              </div>
            )}
          <Switch>
            <PrivateRoute
              exact
              path="/bubbles"
              component={BubblePage}
            />
            {/* <PrivateRoute
								exact
								path="/addColors"
								component={addColors}
							/> */}
            <Route path="/login" component={Login} />
            <Route component={Login} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;


// Explain what a token is used for.
//The server running these services can issue a JSON Web Token as the authentication token, in exchange for correct login credentials.

//  What steps can you take in your web apps to keep your data secure?
// At the API layer, the data that the user can read or change.
// At the React layer, the paths of the React app that the user can access.

//  Describe how web servers work.
//The client will make a login request, sending the server the user’s username and password. 
//Then, the server will check those credentials against the database, and if it can authenticate the user, it will return a token. 
//Once we have this token, we can add two layers of protection to our app. 
//One uses protected routes, and the other sends an authentication header with our API calls

//  Which HTTP methods can be mapped to the CRUD acronym that we use when interfacing with APIs/Servers.
// Create = PUT with a new URI
//          POST to a base URI returning a newly created URI
// Read   = GET
// Update = PUT with an existing URI
// Delete = DELETE