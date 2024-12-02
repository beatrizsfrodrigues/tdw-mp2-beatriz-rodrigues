// VillagerInfo.js
import React from "react";
import { X } from "feather-icons-react";

function VillagerInfo({ villager, onClose }) {
  if (!villager) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <X className="close" onClick={onClose} />
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
