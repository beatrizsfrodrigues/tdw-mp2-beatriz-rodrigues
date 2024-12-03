import { createSlice } from "@reduxjs/toolkit";

const villagersSlice = createSlice({
  name: "villagers",
  initialState: {
    villagers: [],
    favVillagers: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addFavVillager: (state, action) => {
      let villager = {};
      if (action.payload.villager) {
        villager = action.payload.villager;
      } else {
        villager = action.payload;
      }

      const favVillagers = JSON.parse(JSON.stringify(state.favVillagers)); // Convert Proxy to plain object

      if (!favVillagers.find((vil) => vil.id === villager.id)) {
        state.favVillagers.push(villager);
      }
    },
    removeFavVillager: (state, action) => {
      const villagerId = action.payload;
      console.log(villagerId);
      const favVillagers = JSON.parse(JSON.stringify(state.favVillagers)); // Convert Proxy to plain object
      console.log(favVillagers);
      state.favVillagers = state.favVillagers.filter(
        (vil) => vil.id !== villagerId
      );
    },
    setVillagers: (state, action) => {
      state.villagers = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addFavVillager,
  removeFavVillager,
  setVillagers,
  setStatus,
  setError,
} = villagersSlice.actions;

export default villagersSlice.reducer;
