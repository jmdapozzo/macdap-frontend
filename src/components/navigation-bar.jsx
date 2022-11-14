import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

const NavigationBar = () => {
  const { t, i18n } = useTranslation([
    "common",
    "home",
    "map",
    "sopfeu",
    "template",
  ]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
      <Container fluid className="px-3">
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/">{t("home:title")}</Nav.Link>
            <Nav.Link href="/map">{t("map:title")}</Nav.Link>
            <Nav.Link href="/sopfeu">{t("sopfeu:title")}</Nav.Link>
            <Nav.Link href="/template">{t("template:title")}</Nav.Link>
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
            <Form>
              <Button variant="outline-success">Login</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
