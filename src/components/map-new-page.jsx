import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";

const MapNewPage = () => {
  const { t } = useTranslation(["map"]);

  return (
    <Container className="mb-5">
      <h1 className="d-flex justify-content-center">{t("title")}</h1>
    </Container>
  );
};

export default MapNewPage;
