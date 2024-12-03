import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../assets/base.css";
import bigSister from "../assets/big_sister.png";
import cranky from "../assets/cranky.png";
import jock from "../assets/jock.png";
import lazy from "../assets/lazy.png";
import normal from "../assets/normal.png";
import peppy from "../assets/peppy.png";
import smug from "../assets/smug.png";
import snooty from "../assets/snooty.png";
import {
  addFavVillager,
  removeFavVillager,
  setVillagers,
  setStatus,
  setError,
} from "../redux/villagersSlice";
import { useGetVillagersQuery } from "../services/api";
import { Heart } from "feather-icons-react";
import VillagerInfo from "./VillagerInfo";
import Pagination from "./Pagination";
import { FilterButton, VillagerCard, VillagerImage } from "../StyledComponents";

function Home() {
  const dispatch = useDispatch();
  const villagers = useSelector((state) => state.villagers.villagers);
  const favVillagers = useSelector((state) => state.villagers.favVillagers);
  const status = useSelector((state) => state.villagers.status);
  const error = useSelector((state) => state.villagers.error);
  const [filter, setFilter] = useState("All");
  const [filteredVillagers, setFilteredVillagers] = useState([]);
  const [selectedVillager, setSelectedVillager] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [villagersPerPage] = useState(18);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data,
    error: apiError,
    isLoading,
  } = useGetVillagersQuery({ nhdetails: true });
  const personalityFilter = [
    { name: "Cranky", data: cranky },
    { name: "Jock", data: jock },
    { name: "Lazy", data: lazy },
    { name: "Normal", data: normal },
    { name: "Peppy", data: peppy },
    { name: "Smug", data: smug },
    { name: "Snooty", data: snooty },
    { name: "Big Sister", data: bigSister },
  ];

  useEffect(() => {
    if (isLoading) {
      dispatch(setStatus("loading"));
    } else if (apiError) {
      dispatch(setStatus("failed"));
      dispatch(setError(apiError.message));
    } else if (data) {
      const villagersWithNhDetails = data.filter(
        (villager) => villager.nh_details
      );

      dispatch(setStatus("succeeded"));
      dispatch(setVillagers(villagersWithNhDetails));
    }
  }, [data, apiError, isLoading, dispatch]);

  useEffect(() => {
    const savedFavVillagers = localStorage.getItem("favVillagers");

    if (savedFavVillagers) {
      try {
        const parsedFavVillagers = JSON.parse(savedFavVillagers);

        setFavoriteVillagers(parsedFavVillagers);
      } catch (error) {
        console.error(
          "Error parsing saved favorite villagers from local storage:",
          error
        );
      }
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("favVillagers", JSON.stringify(favVillagers));
  }, [favVillagers]);

  useEffect(() => {
    setFilteredVillagers(getFilteredVillagers());
  }, [villagers, filter, favVillagers]);

  function openModal(villager) {
    setSelectedVillager(villager);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedVillager(null);
    setIsModalOpen(false);
  }

  function addFav(villager) {
    if (
      favVillagers
        .filter((fav) => fav !== undefined)
        .find((vil) => vil.id == villager.id)
    ) {
      dispatch(removeFavVillager(villager.id));
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
    favVillagers.forEach((villager) => {
      dispatch(addFavVillager(villager));
    });
  }

  function loadingVillagers() {
    if (status === "loading") {
      return <div className="text listBoard">Loading villagers...</div>;
    } else if (error) {
      return <div className="text listBoard">Error fetching villagers.</div>;
    } else if (filteredVillagers && filteredVillagers.length > 0) {
      const indexOfLastVillager = currentPage * villagersPerPage;
      const indexOfFirstVillager = indexOfLastVillager - villagersPerPage;
      const currentVillagers = filteredVillagers.slice(
        indexOfFirstVillager,
        indexOfLastVillager
      );

      return (
        <>
          <div className="listBoard">
            {currentVillagers.map((villager, id) => {
              if (villager.nh_details) {
                return (
                  <VillagerCard key={id} className="villager">
                    <VillagerImage
                      src={villager.image_url}
                      alt="image"
                      className="imageVillager"
                      onClick={() => openModal(villager)}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            addFav(villager);
                          }}
                        />
                      </div>
                    </div>
                  </VillagerCard>
                );
              }
              return null;
            })}
          </div>
          {isModalOpen && (
            <VillagerInfo villager={selectedVillager} onClose={closeModal} />
          )}
          <Pagination
            villagersPerPage={villagersPerPage}
            totalVillagers={filteredVillagers.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      );
    } else {
      return <div className="text">No villagers found.</div>;
    }
  }

  function Personality({ villager }) {
    const personalityFilterItem = personalityFilter.find(
      (pf) => pf.name.toLowerCase() === villager.personality.toLowerCase()
    );
    if (personalityFilterItem) {
      return (
        <img
          src={personalityFilterItem.data}
          alt="icon"
          className="iconVillager"
        />
      );
    }
  }

  function getFilteredVillagers() {
    setCurrentPage(1);
    if (filter === "fav") {
      return favVillagers;
    } else if (filter === "All") {
      return villagers;
    } else {
      const personalityFilterItem = personalityFilter.find(
        (pf) => pf.name.toLowerCase() === filter
      );
      if (personalityFilterItem) {
        return villagers.filter(
          (villager) => villager.personality.toLowerCase() === filter
        );
      }
    }
    return villagers; // Default return if no filter matches
  }

  return (
    <div id="home">
      <div id="filters">
        <FilterButton
          className={`filter green2 ${filter === "All" ? "selected" : ""}`}
          onClick={() => setFilter("All")}
        >
          All
        </FilterButton>
        {personalityFilter.map((pf) => (
          <FilterButton
            key={pf.name}
            className={`filter tooltip blue ${
              filter === pf.name.toLowerCase() ? "selected" : ""
            }`}
            onClick={() => setFilter(pf.name.toLowerCase())}
          >
            <img src={pf.data} alt={pf.name} />
            <span className="tooltiptext">{pf.name}</span>
          </FilterButton>
        ))}

        <FilterButton
          className={`filter tooltip pink ${
            filter === "fav" ? "selected" : ""
          }`}
          onClick={() => setFilter("fav")}
        >
          Fav
          <span className="tooltiptext">Favorites</span>
        </FilterButton>
      </div>

      <div>{loadingVillagers()}</div>
    </div>
  );
}

export default Home;
