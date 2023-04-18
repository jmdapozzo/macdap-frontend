import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import { Map, Marker } from "mapkit-react";

const MapPage = () => {
  const { t } = useTranslation(["map"]);

  return (
    <Container className="vh-100">
      <Map
        token={process.env.REACT_APP_APPLE_MAP_JWT}
        width="100px"
        height="100px"
      >
        <Marker latitude={46.52} longitude={6.57} />
      </Map>
    </Container>
  );
};

export default MapPage;
