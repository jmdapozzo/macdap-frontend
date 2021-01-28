import React from "react";
import { InfoWindow } from "@react-google-maps/api";

function DefaultInfoWindow({ time, position, onCloseClick }) {
  return (
    <InfoWindow position={position} onCloseClick={onCloseClick}>
      <div>
        <h2>Default</h2>
        <p>{time.toLocaleString()}</p>
      </div>
    </InfoWindow>
  );
}

export default DefaultInfoWindow;
