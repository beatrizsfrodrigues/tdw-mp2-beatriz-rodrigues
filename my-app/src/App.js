import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import ReactDOM from "react-dom";
import Info from "./Info.js";
import Home from "./Home.js";

// import dotenv from "dotenv";
// import { Provider } from "react-redux";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <Link to="/" className="navLink">
              <li>Home</li>
            </Link>
            <Link to="/info" className="navLink">
              <li>Info</li>
            </Link>
          </ul>
        </nav>

        <Routes>
          <Route path="/">
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

//! um
//todo dois
//? três
//* quatro
//& cinco
