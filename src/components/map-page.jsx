import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Container from "react-bootstrap/Container"
import DefaultMarker from "./markers/default-marker";
import SkiMarker from "./markers/ski-marker";
import HomeMarker from "./markers/home-marker";
import DefaultInfoWindow from "./info-windows/default-info-window";
import SkiInfoWindow from "./info-windows/ski-info-window";
import HomeInfoWindow from "./info-windows/home-info-window";
//import mapStyles from "../mapStyles";

const libraries = ["places"];

const mapContainerStyle = {
  height: "50rem",
};
const options = {
  //styles: mapStyles,
  disableDefaultUI: true,
  mapTypeControl: true,
  zoomControl: true,
};

function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [currentPosition, setCurrentPosition] = React.useState({});
  const [markerPositions, setMarkerPositions] = React.useState([]);
  const [selectedMarkerPosition, setSelectedMarkerPosition] = React.useState(
    null
  );

  const currentPositionSuccess = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setMarkerPositions((current) => [
      ...current,
      {
        type: "home",
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        time: new Date(),
      },
    ]);

    setCurrentPosition(currentPosition);
  };

  const currentPositionError = (error) => {
    const currentPosition = {
      lat: 45.462504,
      lng: -73.554223,
    };
    setCurrentPosition(currentPosition);
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      currentPositionSuccess,
      currentPositionError
    );
  });

  const onMapClick = React.useCallback((event) => {
    setMarkerPositions((current) => [
      ...current,
      {
        type: "ski",
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <Container fluid className="px-0 map_container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={currentPosition}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markerPositions.map((markerPosition) => {
          var marker;
          switch (markerPosition.type) {
            case "home":
              marker = (
                <HomeMarker
                  key={markerPosition.time.toISOString()}
                  position={{
                    lat: markerPosition.lat,
                    lng: markerPosition.lng,
                  }}
                  onClick={() => {
                    setSelectedMarkerPosition(markerPosition);
                  }}
                />
              );
              break;

            case "ski":
              marker = (
                <SkiMarker
                  key={markerPosition.time.toISOString()}
                  position={{
                    lat: markerPosition.lat,
                    lng: markerPosition.lng,
                  }}
                  onClick={() => {
                    setSelectedMarkerPosition(markerPosition);
                  }}
                />
              );
              break;

            default:
              marker = (
                <DefaultMarker
                  key={markerPosition.time.toISOString()}
                  position={{
                    lat: markerPosition.lat,
                    lng: markerPosition.lng,
                  }}
                  onClick={() => {
                    setSelectedMarkerPosition(markerPosition);
                  }}
                />
              );
          }
          return marker;
        })}

        {selectedMarkerPosition
          ? (() => {
              var infoWindow;
              switch (selectedMarkerPosition.type) {
                case "home":
                  infoWindow = (
                    <HomeInfoWindow
                      time={selectedMarkerPosition.time}
                      position={{
                        lat: selectedMarkerPosition.lat,
                        lng: selectedMarkerPosition.lng,
                      }}
                      onCloseClick={() => {
                        setSelectedMarkerPosition(null);
                      }}
                    />
                  );
                  break;

                case "ski":
                  infoWindow = (
                    <SkiInfoWindow
                      time={selectedMarkerPosition.time}
                      position={{
                        lat: selectedMarkerPosition.lat,
                        lng: selectedMarkerPosition.lng,
                      }}
                      onCloseClick={() => {
                        setSelectedMarkerPosition(null);
                      }}
                    />
                  );
                  break;

                default:
                  infoWindow = (
                    <DefaultInfoWindow
                      time={selectedMarkerPosition.time}
                      position={{
                        lat: selectedMarkerPosition.lat,
                        lng: selectedMarkerPosition.lng,
                      }}
                      onCloseClick={() => {
                        setSelectedMarkerPosition(null);
                      }}
                    />
                  );
              }
              return infoWindow;
            })()
          : null}
      </GoogleMap>
    </Container>
  );
}

export default Map;
