import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import { Map, Marker } from "mapkit-react";

const MapPage = () => {
  const { t } = useTranslation(["map"]);

  return (
    <Container className="mb-5">
      <h1 className="d-flex justify-content-center">{t("title")}</h1>
      <Map token={process.env.REACT_APP_APPLE_MAP_JWT}>
        <Marker latitude={46.52} longitude={6.57} />
      </Map>
    </Container>
  );
};

export default MapPage;
