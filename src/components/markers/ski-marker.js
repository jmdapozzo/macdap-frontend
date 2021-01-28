import React from "react";
import { Marker } from "@react-google-maps/api";

function SkiMarker({ key, position, onClick }) {
  return (
    <Marker
      key={key}
      position={position}
      onClick={onClick}
      icon={{
        url: "./assets/images/ski.png", //move this back to assets or move all assets to public
        //scaledSize: new window.google.maps.Size(32, 32),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(16, 16),
      }}
    />
  );
}

export default SkiMarker;
