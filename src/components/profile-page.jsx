import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useKeycloak } from "@react-keycloak/web";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image"

const Profile = () => {
  const { t } = useTranslation(["profile"]);
  const { keycloak, initialized } = useKeycloak();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await keycloak.loadUserInfo();
      setUserInfo(userInfo);
      console.log(userInfo);
    }

    getUserInfo();
  }, [keycloak]);

  return (
    initialized && (
      <Container fluid>
        <Row>
          <h1 className="d-flex justify-content-center">{t("title")}</h1>
        </Row>
        <Row className="align-items-center">
          {userInfo.picture && (
            <div className="col-md-1 mb-3">
              <Image src={userInfo.picture} className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"></Image>
            </div>
          )}
          <div className="col-md text-md-left">
            <h2>{userInfo.name}</h2>
            <p className="lead text-muted">{userInfo.email}</p>
          </div>
        </Row>
        <Row>
          <pre className="col-12 text-light bg-dark p-4">
            {JSON.stringify(userInfo, null, 2)}
          </pre>
        </Row>
      </Container>
    )
  );
};

export default Profile;
