import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Info from "./components/Info.js";
import Home from "./components/Home.js";
import leaf from "./assets/leaf.png";
import cards from "./assets/cards.png";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <Link to="/" className="navLink">
              <img src={leaf} alt="Home" className="navImg" />
            </Link>
            <Link to="/info" className="navLink">
              <img src={cards} alt="Info" className="navImg" />
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
