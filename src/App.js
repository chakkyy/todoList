import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { LoginScreen } from "./pages/LoginScreen/LoginScreen";
import store from "./redux/store";
import { PublicRoute } from "./routers/PublicRoute";
import { PrivateRoute } from "./routers/PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const auth = localStorage?.getItem("accessToken");

    if (auth) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Switch>
            <PublicRoute
              path="/login"
              component={LoginScreen}
              isAuthenticated={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
            />
            <PrivateRoute
              exact
              path="/"
              component={Home}
              isAuthenticated={isLoggedIn}
            />
          </Switch>
        </Router>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
