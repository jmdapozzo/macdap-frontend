import React from "react";
import { Marker } from "@react-google-maps/api";

function DefaultMarker({ position, onClick }) {
  return <Marker position={position} onClick={onClick} />;
}

export default DefaultMarker;
