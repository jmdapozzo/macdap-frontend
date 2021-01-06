import React from 'react'
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import SopfeuPage from './components/SopfeuPage';
import UserPage from './components/UserPage';
import TemplatePage from './components/TemplatePage';
import NoMatchPage from './components/NoMatchPage';
import Layout from './components/Layout';
import NavigationBar from './components/NavigationBar'
import './App.css';

//checkout https://www.npmjs.com/package/react-router-bootstrap

function App(props) {

  const { t, i18n } = useTranslation(['common', 'sopfeu', 'users', 'template']);

  return (
    <React.Fragment>
      <Header />
      <NavigationBar />
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/sopfeu" component={SopfeuPage} />
            <Route path="/users" component={UserPage} />
            <Route path="/template" component={TemplatePage} />
            <Route component={NoMatchPage} />
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
};

export default App
