import React, { useReducer } from 'react'
import { useTranslation } from 'react-i18next';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import SopfeuPage from './components/SopfeuPage';
import UserPage from './components/UserPage';
import TemplatePage from './components/TemplatePage';

import './App.css';

//checkout https://www.npmjs.com/package/react-router-bootstrap

const initialState = <HomePage />
const reducer = (state, action) => {
  switch (action) {
    case 'home':
      return <HomePage />;
    case 'sopfeu':
      return <SopfeuPage />;
    case 'users':
      return <UserPage />;
    case 'template':
      return <TemplatePage />;
    default:
      return null;
  }
}

function App(props) {

  const { t, i18n } = useTranslation(['common', 'sopfeu', 'users', 'template']);
  const [page, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">

      <Header />

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

      <div>
        {page}
      </div>

      {/* <Footer /> */}

    </div>
  );
};

export default App
