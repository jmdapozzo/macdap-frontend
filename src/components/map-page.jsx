import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import { Map, Marker } from "mapkit-react";

const MapPage = () => {
  const { t } = useTranslation(["map"]);

  const [currentPosition, setCurrentPosition] = useState({});
  const currentPositionSuccess = (position) => {
    const currentPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  const currentPositionError = (error) => {
    const currentPosition = {
      lat: 45.462504,
      lng: -73.554223,
    };
    setCurrentPosition(currentPosition);
  };

  useMemo(() => {
    navigator.geolocation.getCurrentPosition(
      currentPositionSuccess,
      currentPositionError
    );
  }, []);

  const [markerPositions, setMarkerPositions] = useState([]);

  const onMapClick = useCallback((event) => {
    setMarkerPositions((current) => [
      ...current,
      {
        type: "xxx",
        coord: event.toCoordinates(),
        time: new Date(),
      },
    ]);
  }, []);

  let region = {
    centerLatitude: 45.5019,
    centerLongitude: -73.5674,
    latitudeDelta: 1.0,
    longitudeDelta: 1.0,
  };

  return (
    <Container className="vh-100">
      <Map
        token={process.env.REACT_APP_APPLE_MAP_JWT}
        width="100px"
        height="100px"
        showsUserLocation="true"
        showsUserLocationControl="true"
        onClick={onMapClick}
        initialRegion={region}
      >
        {markerPositions.map((markerPosition) => {
          let marker;
          switch (markerPosition.type) {
            case "xxx":
              marker = (
                <Marker
                  key={markerPosition.time.toISOString()}
                  latitude={markerPosition.coord.latitude}
                  longitude={markerPosition.coord.longitude}
                />
              );
              break;

            default:
              marker = marker = (
                <Marker
                  key={markerPosition.time.toISOString()}
                  latitude={markerPosition.coord.latitude}
                  longitude={markerPosition.coord.longitude}
                />
              );
          }
          return marker;
        })}

        {/* <Marker latitude={45.449114214544856} longitude={-73.55212640146412} /> */}
      </Map>
    </Container>
  );
};

export default MapPage;
