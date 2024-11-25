import React from "react";
import "./assets/base.css";
import bigSister from "./assets/big_sister.png";
import cranky from "./assets/cranky.png";
import jock from "./assets/jock.png";
import lazy from "./assets/lazy.png";
import normal from "./assets/normal.png";
import peppy from "./assets/peppy.png";
import smug from "./assets/smug.png";
import snooty from "./assets/snooty.png";

function Home({}) {
  return (
    <div id="home">
      <div id="filters">
        <div className="filter" id="all">
          All
        </div>
        <div className="filter">
          <img src={bigSister} alt="big sister" id="bigSister" />
        </div>
        <div className="filter">
          <img src={cranky} alt="cranky" id="cranky" />
        </div>
        <div className="filter">
          <img src={jock} alt="jock" id="jock" />
        </div>
        <div className="filter">
          <img src={lazy} alt="lazy" id="lazy" />
        </div>
        <div className="filter">
          <img src={normal} alt="normal" id="normal" />
        </div>
        <div className="filter">
          <img src={smug} alt="smug" id="smug" />
        </div>
        <div className="filter">
          <img src={peppy} alt="peppy" id="peppy" />
        </div>
        <div className="filter">
          <img src={snooty} alt="snooty" id="snooty" />
        </div>
        <div className="filter" id="fav">
          Fav
        </div>
      </div>
      <div id="listBoard"></div>
    </div>
  );
}

export default Home;
