import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Info from "./components/Info.js";
import Home from "./components/Home.js";
import VillagerInfo from "./components/VillagerInfo";
import leaf from "./assets/leaf.png";
import cards from "./assets/cards.png";

function App() {
  const location = useLocation();
  const state = location.state || {};

  return (
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

      <Routes location={state.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
      </Routes>

      {state.backgroundLocation && (
        <Routes>
          <Route path="/villager/:name" element={<VillagerInfo />} />
        </Routes>
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
