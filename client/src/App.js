import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import About from "./pages/About/About";
import Business from "./pages/BusinessPitch/Business";
import Signup from "./components/Signup/Signup";
import Login from "./pages/Login/Login";
import { StoreProvider } from "./utils/UserContext";
import Businesspage from "./pages/BusinessPage/BusinessPage";
import Userpage from "./pages/UserHome/UserHome";
import BusinessHome from "./pages/BusinessHome/BusinessHome";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <StoreProvider>
            <Navbar />
            <Route exact path="/" component={Main} />
            <Route exact path="/about" component={About} />
            <Route exact path="/business" component={Business} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/business/page" component={Businesspage} />
            <Route exact path="/business/home" component={BusinessHome} />
            <Route exact path="/user/home" component={Userpage} />
          </StoreProvider>
        </div>
      </Router>
    );
  }
}

export default App;
