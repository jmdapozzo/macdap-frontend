import React from 'react'
import { useTranslation } from 'react-i18next';
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch } from 'react-router-dom';
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./components/home-page";
import MapPage from "./components/map"
import SopfeuPage from './components/sopfeu-page';
import UserPage from './components/user-page';
import ProfilePage from './components/profile-page';
import ExternalAPIPage from './components/external-api';
import TemplatePage from './components/template-page';
import NoMatchPage from './components/no-match-page';
import Layout from './components/layout';
import NavigationBar from './components/navigation-bar'
import Loading from './components/loading'
import ProtectedRoute from "./auth/protected-route";

//checkout https://www.npmjs.com/package/react-router-bootstrap

function App(props) {

  const { t, i18n } = useTranslation(['common', 'sopfeu', 'users', 'template']);
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Header />
      <NavigationBar />
      <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/map" component={MapPage} />
            <Route path="/sopfeu" component={SopfeuPage} />
            <Route path="/users" component={UserPage} />
            <ProtectedRoute path="/profile" component={ProfilePage} />
            <Route path="/external-api" component={ExternalAPIPage} />
            <Route path="/template" component={TemplatePage} />
            <Route component={NoMatchPage} />
          </Switch>
      </Layout>
      <Footer />
    </React.Fragment>
  );
};

export default App
