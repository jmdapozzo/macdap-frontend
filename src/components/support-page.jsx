import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";

const SupportPage = () => {
  const { t } = useTranslation(["support"]);

  return (
    <Container className="mb-5">
      <h1 className="d-flex justify-content-center">{t("title")}</h1>
    </Container>
  );
};

export default SupportPage;
