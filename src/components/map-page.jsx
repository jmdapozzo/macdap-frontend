import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { useKeycloak } from "@react-keycloak/web";
import { Container } from "react-bootstrap";
import { Map, Marker } from "mapkit-react";
import Loading from "./loading";

// voir https://rajeshlv.medium.com/using-apple-mapkit-js-for-web-applications-15c4cff0e2
// voir exemple de Apple avec génération token por Node https://developer.apple.com/documentation/mapkitjs/mapkit/init

const MapPage = () => {
  const { t } = useTranslation(["map"]);
  // const { keycloak } = useKeycloak();
  const [markerPositions, setMarkerPositions] = useState([]);
  const [mapToken, setMapToken] = useState(null);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/mapjwt/xx`);
        if (!response.ok) {
          throw new Error("Failed to fetch the map token");
        }
        const data = await response.json();
        console.log("---------------- map token", data.token);
        setMapToken(data.token);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchToken();
  }, []);

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     try {

  //       const token = keycloak.token;
  //       console.log("---------------- keycloak token", token);
  //       const response = await fetch(
  //         process.env.REACT_APP_SERVER_ENDPOINT + "/mapjwt/xx",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch the map token");
  //       }
  //       const data = await response.json();
  //       console.log("---------------- map token", token);
  //       setMapToken(data.token);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   fetchToken();
  // }, [keycloak]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!mapToken) {
    return <Loading />;
  }

  return (
    <Container className="vh-100">
      <Map
        token={mapToken}
        width="100px"
        height="100px"
        title={t("title")}
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
              marker = (
                <Marker
                  key={markerPosition.time.toISOString()}
                  latitude={markerPosition.coord.latitude}
                  longitude={markerPosition.coord.longitude}
                />
              );
          }
          return marker;
        })}
      </Map>
    </Container>
  );
};

export default MapPage;
