import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./loading";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image"

const Profile = () => {
  const { t } = useTranslation(["profile"]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { name, picture, email } = user;

  if (isLoading) {
    <Loading />;
  }

  return (
    isAuthenticated && (
      <Container fluid>
        <Row>
          <h1 className="d-flex justify-content-center">{t("title")}</h1>
        </Row>
        <Row className="align-items-center">
          <div className="col-md-2 mb-3">
            <Image src={picture} className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"></Image>
          </div>
          <div className="col-md text-center text-md-left">
            <h2>{name}</h2>
            <p className="lead text-muted">{email}</p>
          </div>
        </Row>
        <Row>
          <pre className="col-12 text-light bg-dark p-4">
            {JSON.stringify(user, null, 2)}
          </pre>
        </Row>
      </Container>
    )
  );
};

export default Profile;
