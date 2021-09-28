import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import CreatePost from "./screens/CreatePost";
import EditProfile from "./screens/EditProfile";
import OthersProfile from "./screens/OthersProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./contexts/AuthContext";
import { useEffect, useRef } from "react";
import { getToken } from "./util";
import ViewPost from "./screens/ViewPost";
function App() {
  const isAuth = useRef(false);
  const token = useRef({});

  useEffect(() => {
    token.current = getToken();

    if (typeof token.current === "string") {
      isAuth.current = true;
    } else {
      isAuth.current = false;
    }
  });
  console.log("isAuth in App.js", isAuth.current);
  return (
    <div className="App">
      <Router>
        <AuthContext.Provider value={{ isAuth }}>
          <Navbar />
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute path="/Profile">
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute path="/CreatePost">
              <CreatePost />
            </ProtectedRoute>
            <ProtectedRoute path="/ViewPost/:postID">
              <ViewPost />
            </ProtectedRoute>
            <ProtectedRoute path="/EditProfile">
              <EditProfile />
            </ProtectedRoute>
            <Route path="/user/:userID">
              <OthersProfile />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
            <Route path="/Register">
              <Register />
            </Route>
          </Switch>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
