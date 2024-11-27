import React, { useState, useEffect } from "react";
import "./assets/base.css";
import bigSister from "./assets/big_sister.png";
import cranky from "./assets/cranky.png";
import jock from "./assets/jock.png";
import lazy from "./assets/lazy.png";
import normal from "./assets/normal.png";
import peppy from "./assets/peppy.png";
import smug from "./assets/smug.png";
import snooty from "./assets/snooty.png";
import { useGetVillagersQuery } from "./services/api";
import { Heart } from "feather-icons-react";

function Home() {
  const { data, error, isLoading } = useGetVillagersQuery({ nhdetails: true });

  const [villagers, setVillagers] = useState();
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (data) {
      setVillagers(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading villagers...</div>;
  }

  if (error) {
    return <div>Error fetching villagers.</div>;
  }

  function getFilteredVillagers() {
    if (filter === "jock") {
      return villagers.filter(
        (villager) => villager.personality.toLowerCase() == "jock"
      );
    } else if (filter === "big sister") {
      return villagers.filter(
        (villager) => villager.personality.toLowerCase() == "big sister"
      );
    } else if (filter === "normal") {
      return villagers.filter(
        (villager) => villager.personality.toLowerCase() == "normal"
      );
    } else if (filter === "cranky") {
      return villagers.filter(
        (villager) => villager.personality.toLowerCase() == "cranky"
      );
    } else if (filter === "lazy") {
      return villagers.filter(
        (villager) => villager.personality.toLowerCase() == "lazy"
      );
    } else if (filter === "smug") {
      return villagers.filter(
        (villager) => villager.personality.toLowerCase() == "smug"
      );
    } else if (filter === "snooty") {
      return villagers.filter(
        (villager) => villager.personality.toLowerCase() == "snooty"
      );
    } else if (filter === "peppy") {
      return villagers.filter(
        (villager) => villager.personality.toLowerCase() == "peppy"
      );
    } else {
      return villagers; //& For "All"
    }
  }

  const filteredVillagers = getFilteredVillagers();

  function Personality({ villager }) {
    if (villager.personality.toLowerCase() == "jock") {
      return <img src={jock} alt="icon" className="iconVillager" />;
    } else if (villager.personality.toLowerCase() == "big sister") {
      return <img src={bigSister} alt="icon" className="iconVillager" />;
    } else if (villager.personality.toLowerCase() == "cranky") {
      return <img src={cranky} alt="icon" className="iconVillager" />;
    } else if (villager.personality.toLowerCase() == "lazy") {
      return <img src={lazy} alt="icon" className="iconVillager" />;
    } else if (villager.personality.toLowerCase() == "normal") {
      return <img src={normal} alt="icon" className="iconVillager" />;
    } else if (villager.personality.toLowerCase() == "smug") {
      return <img src={smug} alt="icon" className="iconVillager" />;
    } else if (villager.personality.toLowerCase() == "snooty") {
      return <img src={snooty} alt="icon" className="iconVillager" />;
    } else if (villager.personality.toLowerCase() == "peppy") {
      return <img src={peppy} alt="icon" className="iconVillager" />;
    }
  }

  return (
    <div id="home">
      <div id="filters">
        <div className="filter" id="all" onClick={() => setFilter("All")}>
          All
        </div>
        <div className="filter tooltip" onClick={() => setFilter("big sister")}>
          <img src={bigSister} alt="big sister" id="bigSister" />
          <span className="tooltiptext">Big Sister</span>
        </div>
        <div className="filter tooltip" onClick={() => setFilter("cranky")}>
          <img src={cranky} alt="cranky" id="cranky" />
          <span className="tooltiptext">Cranky</span>
        </div>
        <div className="filter tooltip" onClick={() => setFilter("jock")}>
          <img src={jock} alt="jock" id="jock" />
          <span className="tooltiptext">Jock</span>
        </div>
        <div className="filter tooltip" onClick={() => setFilter("lazy")}>
          <img src={lazy} alt="lazy" id="lazy" />
          <span className="tooltiptext">Lazy</span>
        </div>
        <div className="filter tooltip" onClick={() => setFilter("normal")}>
          <img src={normal} alt="normal" id="normal" />
          <span className="tooltiptext">Normal</span>
        </div>
        <div className="filter tooltip" onClick={() => setFilter("smug")}>
          <img src={smug} alt="smug" id="smug" />
          <span className="tooltiptext">Smug</span>
        </div>
        <div className="filter tooltip" onClick={() => setFilter("peppy")}>
          <img src={peppy} alt="peppy" id="peppy" />
          <span className="tooltiptext">Peppy</span>
        </div>
        <div className="filter tooltip" onClick={() => setFilter("snooty")}>
          <img src={snooty} alt="snooty" id="snooty" />
          <span className="tooltiptext">Snooty</span>
        </div>
        <div className="filter" id="fav">
          Fav
        </div>
      </div>

      <div id="listBoard">
        {filteredVillagers &&
          Object.entries(filteredVillagers).map(([id, villager]) => {
            if (villager.nh_details) {
              return (
                <div key={id} className="villager">
                  <img
                    src={villager.image_url}
                    alt="image"
                    className="imageVillager"
                  />
                  <p className="text">{villager.name}</p>
                  <div className="iconsVillagers">
                    <div className="iconDiv tooltip blue">
                      <img
                        src={villager.nh_details.icon_url}
                        alt="icon"
                        className="iconVillager"
                      />

                      <span className="tooltiptext">{villager.species}</span>
                    </div>
                    <div className="iconDiv green">
                      <Personality villager={villager} />
                    </div>
                    <div className="iconDiv pink">
                      <Heart className="iconVillager favBtn" />
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default Home;
