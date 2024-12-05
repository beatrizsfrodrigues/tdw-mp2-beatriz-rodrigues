import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
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
import {
  FilterButton,
  VillagerCard,
  VillagerImage,
  ListBoard,
  IconDiv,
} from "../StyledComponents";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const villagers = useSelector((state) => state.villagers.villagers);
  const favVillagers = useSelector((state) => state.villagers.favVillagers);
  const status = useSelector((state) => state.villagers.status);
  const error = useSelector((state) => state.villagers.error);
  const [filter, setFilter] = useState("All");
  const [filteredVillagers, setFilteredVillagers] = useState([]);
  const [selectedVillager] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [villagersPerPage] = useState(18);
  const [isModalOpen] = useState(false);
  const {
    data,
    error: apiError,
    isLoading,
  } = useGetVillagersQuery({ nhdetails: true });

  const personalityFilter = useMemo(
    () => [
      { name: "Cranky", data: cranky },
      { name: "Jock", data: jock },
      { name: "Lazy", data: lazy },
      { name: "Normal", data: normal },
      { name: "Peppy", data: peppy },
      { name: "Smug", data: smug },
      { name: "Snooty", data: snooty },
      { name: "Big Sister", data: bigSister },
    ],
    []
  );

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

  // ? Favorites
  const setFavoriteVillagers = useCallback(
    (favVillagers) => {
      favVillagers.forEach((villager) => {
        dispatch(addFavVillager(villager));
      });
    },
    [dispatch]
  );

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
  }, [dispatch, setFavoriteVillagers]);

  useEffect(() => {
    localStorage.setItem("favVillagers", JSON.stringify(favVillagers));
  }, [favVillagers]);

  function addFav(villager) {
    if (
      favVillagers
        .filter((fav) => fav !== undefined)
        .find((vil) => vil.id === villager.id)
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

  // ? Modal

  function openModal(name) {
    navigate(`/villager/${name}`, { state: { backgroundLocation: location } });
  }

  function closeModal() {
    navigate("/");
  }

  // ? Filter villagers

  const getFilteredVillagers = useCallback(() => {
    if (filter === "fav") {
      setCurrentPage(1);
      return favVillagers;
    } else if (filter === "All") {
      setCurrentPage(1);
      return villagers;
    } else {
      const personalityFilterItem = personalityFilter.find(
        (pf) => pf.name.toLowerCase() === filter.toLowerCase()
      );
      if (personalityFilterItem) {
        setCurrentPage(1);
        return villagers.filter(
          (villager) =>
            villager.personality.toLowerCase() === filter.toLowerCase()
        );
      }
    }
    return villagers;
  }, [filter, favVillagers, villagers, personalityFilter]);

  useEffect(() => {
    setFilteredVillagers(getFilteredVillagers());
  }, [villagers, filter, favVillagers, getFilteredVillagers]);

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

  // ? Loading villagers

  function loadingVillagers() {
    if (status === "loading") {
      return (
        <ListBoard className="text listBoard">Loading villagers...</ListBoard>
      );
    } else if (error) {
      return (
        <ListBoard className="text listBoard">
          Error fetching villagers.
        </ListBoard>
      );
    } else if (filteredVillagers && filteredVillagers.length > 0) {
      const indexOfLastVillager = currentPage * villagersPerPage;
      const indexOfFirstVillager = indexOfLastVillager - villagersPerPage;
      const currentVillagers = filteredVillagers.slice(
        indexOfFirstVillager,
        indexOfLastVillager
      );

      return (
        <>
          <ListBoard className="listBoard">
            {currentVillagers.map((villager, id) => {
              return (
                <VillagerCard key={id} className="villager">
                  <VillagerImage
                    src={villager.image_url}
                    alt="image"
                    className="imageVillager"
                    onClick={() => openModal(villager.name)}
                  />
                  <p className="text">{villager.name}</p>
                  <div className="iconsVillagers">
                    <IconDiv className="iconDiv tooltip blue">
                      <img
                        src={villager.nh_details.icon_url}
                        alt="icon"
                        className="iconVillager"
                      />
                      <span className="tooltiptext">{villager.species}</span>
                    </IconDiv>
                    <IconDiv className="iconDiv green">
                      <Personality villager={villager} />
                    </IconDiv>
                    <IconDiv className="iconDiv pink">
                      <Heart
                        className={`iconVillager favBtn ${
                          isFav(villager) ? "filled" : ""
                        }`}
                        onClick={() => {
                          addFav(villager);
                        }}
                      />
                    </IconDiv>
                  </div>
                </VillagerCard>
              );
            })}
          </ListBoard>
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
