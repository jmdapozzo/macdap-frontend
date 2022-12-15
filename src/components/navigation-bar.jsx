import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import AuthenticationButton from "./authentication-button";

const NavigationBar = () => {
  const { t, i18n } = useTranslation([
    "common",
    "home",
    "map",
    "sopfeu",
    "device",
    "user",
    "profile",
    "template",
    "test"
  ]);

  const { isAuthenticated } = useAuth0();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid className="px-3">
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/">{t("home:title")}</Nav.Link>
            <Nav.Link href="/map">{t("map:title")}</Nav.Link>
            <Nav.Link href="/sopfeu">{t("sopfeu:title")}</Nav.Link>
            {isAuthenticated && (<Nav.Link href="/device">{t("device:title")}</Nav.Link>)}
            {isAuthenticated && (<Nav.Link href="/user">{t("user:title")}</Nav.Link>)}
            {isAuthenticated && (<Nav.Link href="/profile">{t("profile:title")}</Nav.Link>)}
            {isAuthenticated && (<Nav.Link href="/template">{t("template:title")}</Nav.Link>)}
            <Nav.Link href="/test">{t("test:title")}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown title={t("language")} id="collasible-nav-dropdown">
              {i18n.languages.map((value) => {
                var languageT = i18n.getFixedT(value, "common");
                var languageName = languageT("language");
                return (
                  <NavDropdown.Item key={value}>
                    {languageName}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <AuthenticationButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
