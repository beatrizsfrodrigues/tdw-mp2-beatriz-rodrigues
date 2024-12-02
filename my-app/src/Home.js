import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./assets/base.css";
import bigSister from "./assets/big_sister.png";
import cranky from "./assets/cranky.png";
import jock from "./assets/jock.png";
import lazy from "./assets/lazy.png";
import normal from "./assets/normal.png";
import peppy from "./assets/peppy.png";
import smug from "./assets/smug.png";
import snooty from "./assets/snooty.png";
import {
  addFavVillager,
  removeFavVillager,
  setVillagers,
  setStatus,
  setError,
} from "./redux/villagersSlice";
import { useGetVillagersQuery } from "./services/api";
import { Heart } from "feather-icons-react";

function Home() {
  const dispatch = useDispatch();
  const villagers = useSelector((state) => state.villagers.villagers);
  const favVillagers = useSelector((state) => state.villagers.favVillagers);
  const status = useSelector((state) => state.villagers.status);
  const error = useSelector((state) => state.villagers.error);
  const [filter, setFilter] = useState("All");
  const [filteredVillagers, setFilteredVillagers] = useState([]);
  const {
    data,
    error: apiError,
    isLoading,
  } = useGetVillagersQuery({ nhdetails: true });

  useEffect(() => {
    if (isLoading) {
      dispatch(setStatus("loading"));
    } else if (apiError) {
      dispatch(setStatus("failed"));
      dispatch(setError(apiError.message));
    } else if (data) {
      dispatch(setStatus("succeeded"));
      dispatch(setVillagers(data));
    }
  }, [data, apiError, isLoading, dispatch]);

  useEffect(() => {
    const savedFavVillagers = localStorage.getItem("favVillagers");

    if (savedFavVillagers) {
      try {
        const parsedFavVillagers = JSON.parse(savedFavVillagers);
        console.log(parsedFavVillagers);

        setFavoriteVillagers(parsedFavVillagers);
      } catch (error) {
        console.error(
          "Error parsing saved favorite villagers from local storage:",
          error
        );
        // localStorage.removeItem("favVillagers");
      }
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("favVillagers", JSON.stringify(favVillagers));
  }, [favVillagers]);

  useEffect(() => {
    setFilteredVillagers(getFilteredVillagers());
  }, [villagers, filter, favVillagers]);

  function addFav(villager) {
    console.log(!favVillagers);

    if (
      favVillagers
        .filter((fav) => fav !== undefined)
        .find((vil) => vil.id == villager.villager.id)
    ) {
      dispatch(removeFavVillager(villager.villager.id));
    } else {
      dispatch(addFavVillager(villager));
    }
  }

  function isFav(villager) {
    if (!favVillagers) {
      return false;
    }
    const validFavVillagers = favVillagers.filter((fav) => fav !== undefined);

    return validFavVillagers.some((fav) => fav.id === villager.id);
  }

  function setFavoriteVillagers(favVillagers) {
    console.log(favVillagers);
    favVillagers.forEach((villager) => {
      dispatch(addFavVillager(villager));
    });
  }

  function loadingVillagers() {
    if (status === "loading") {
      return <div className="text">Loading villagers...</div>;
    } else if (error) {
      return <div className="text">Error fetching villagers.</div>;
    } else if (filteredVillagers && filteredVillagers.length > 0) {
      return filteredVillagers.map((villager, id) => {
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
                  <Heart
                    className={`iconVillager favBtn ${
                      isFav(villager) ? "filled" : ""
                    }`}
                    onClick={() => addFav({ villager })}
                  />
                </div>
              </div>
            </div>
          );
        }
        return null;
      });
    } else {
      return <div className="text">No villagers found.</div>;
    }
  }

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
    } else if (filter === "fav") {
      return favVillagers;
    } else {
      return villagers; //& For "All"
    }
  }

  return (
    <div id="home">
      <div id="filters">
        <div
          className={`filter green2 ${filter === "All" ? "selected" : ""}`}
          onClick={() => setFilter("All")}
        >
          All
        </div>
        <div
          className={`filter tooltip ${
            filter === "big sister" ? "selected" : ""
          }`}
          onClick={() => setFilter("big sister")}
        >
          <img src={bigSister} alt="big sister" id="bigSister" />
          <span className="tooltiptext">Big Sister</span>
        </div>
        <div
          className={`filter tooltip ${filter === "cranky" ? "selected" : ""}`}
          onClick={() => setFilter("cranky")}
        >
          <img src={cranky} alt="cranky" id="cranky" />
          <span className="tooltiptext">Cranky</span>
        </div>
        <div
          className={`filter tooltip ${filter === "jock" ? "selected" : ""}`}
          onClick={() => setFilter("jock")}
        >
          <img src={jock} alt="jock" id="jock" />
          <span className="tooltiptext">Jock</span>
        </div>
        <div
          className={`filter tooltip ${filter === "lazy" ? "selected" : ""}`}
          onClick={() => setFilter("lazy")}
        >
          <img src={lazy} alt="lazy" id="lazy" />
          <span className="tooltiptext">Lazy</span>
        </div>
        <div
          className={`filter tooltip ${filter === "normal" ? "selected" : ""}`}
          onClick={() => setFilter("normal")}
        >
          <img src={normal} alt="normal" id="normal" />
          <span className="tooltiptext">Normal</span>
        </div>
        <div
          className={`filter tooltip ${filter === "smug" ? "selected" : ""}`}
          onClick={() => setFilter("smug")}
        >
          <img src={smug} alt="smug" id="smug" />
          <span className="tooltiptext">Smug</span>
        </div>
        <div
          className={`filter tooltip ${filter === "snooty" ? "selected" : ""}`}
          onClick={() => setFilter("snooty")}
        >
          <img src={snooty} alt="snooty" id="snooty" />
          <span className="tooltiptext">Snooty</span>
        </div>
        <div
          className={`filter tooltip ${filter === "peppy" ? "selected" : ""}`}
          onClick={() => setFilter("peppy")}
        >
          <img src={peppy} alt="peppy" id="peppy" />
          <span className="tooltiptext">Peppy</span>
        </div>
        <div
          className={`filter tooltip pink ${
            filter === "fav" ? "selected" : ""
          }`}
          onClick={() => setFilter("fav")}
        >
          Fav
          <span className="tooltiptext">Favorites</span>
        </div>
      </div>

      <div id="listBoard">{loadingVillagers()}</div>
    </div>
  );
}

export default Home;
