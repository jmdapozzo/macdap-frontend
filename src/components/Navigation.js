import React, { useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import HomeContent from "./HomeContent";
import SOPFEU from './TemplateContent';
import Users from './Users';
import Template from './TemplateContent';

const initialState = <HomeContent />
const reducer = (state, action) => {
  switch (action) {
    case 'home':
      return <HomeContent />;
    case 'sopfeu':
      return <SOPFEU />;
    case 'users':
      return <Users />;
    case 'template':
      return <Template />;
    default:
      return null;
  }
}

function Navigation() {

  const { t, i18n } = useTranslation(['common', 'sopfeu', 'users', 'template']);
  const [page, dispatch] = useReducer(reducer, initialState);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand className="navbar-brand" onClick={() => dispatch('home')}>{t('brand')}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => dispatch('sopfeu')}>{t('sopfeu:title')}</Nav.Link>
          <Nav.Link onClick={() => dispatch('users')}>{t('users:title')}</Nav.Link>
          <Nav.Link onClick={() => dispatch('template')}>{t('template:title')}</Nav.Link>
        </Nav>
        <Nav className="navbar-right">
          <NavDropdown title={t('language')} id="collasible-nav-dropdown">
            {i18n.languages.map((value) => {
              var languageT = i18n.getFixedT(value, 'common');
              var languageName = languageT('language');
              return <NavDropdown.Item key={value}>{languageName}</NavDropdown.Item>
            })}
          </NavDropdown>
          <Nav.Link href="/login">{t('navBar.login')}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
