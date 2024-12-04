import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X } from "feather-icons-react";
import { useGetVillagersQuery } from "../services/api";

function VillagerInfo() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetVillagersQuery({ name: name });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data || data.length === 0) return <div>Villager not found</div>;

  const villager = data[0];

  return (
    <div className="modal">
      <div className="modal-content">
        <X className="close" onClick={() => navigate("/")} />
        <h2 className="text">{villager.name}</h2>
        <img
          src={villager.image_url}
          alt={villager.name}
          className="imageVillagerOpen"
        />
        <p className="text">Species: {villager.species}</p>
        <p className="text">Personality: {villager.personality}</p>
        <p className="text">
          Birthday: {villager.birthday_day} {villager.birthday_month}
        </p>
        <p className="text">Catchphrase: {villager.phrase}</p>
      </div>
    </div>
  );
}

export default VillagerInfo;
