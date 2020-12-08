import React, { useReducer } from 'react'
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Jumbotron, Image, Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Navigation from "./components/Navigation";
import TemplateContent from "./components/TemplateContent";
import Footer from "./components/Footer";
import HomeContent from "./components/HomeContent";
import SOPFEU from './components/TemplateContent';
import Users from './components/Users';
import Template from './components/TemplateContent';
import logo from './images/logo/noBackgroundNoText.svg';

import './App.css';

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

function App(props) {

  const { t, i18n } = useTranslation(['common', 'sopfeu', 'users', 'template']);
  const [page, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Jumbotron className="mb-0">
        <div className="d-inline-flex p-3">
          <div className="p-2">
            <Image src={logo} width={100} height={100} />
          </div>
          <div className="p-2">
            <h1 className="company">{t('company')}</h1>
            <h3>{t('mission')}</h3>
          </div>
        </div>
      </Jumbotron>


      <Navigation />

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
      {/*       <BrowserRouter>
        <Navigation />
        <div className="App-header">
          <Switch>
            <Route path="/" exact component={() => <HomeContent />} />
            <Route path="/sopfeu" exact component={() => <TemplateContent name="sopfeu" />} />
            <Route path="/users" exact component={() => <Users />} />
            <Route path="/template" exact component={() => <TemplateContent name="template" />} />
          </Switch>
        </div>
      </BrowserRouter>
 */}
      <Footer />
    </div>
  );
};

export default App
