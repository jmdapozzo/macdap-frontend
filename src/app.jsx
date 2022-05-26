import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./components/home-page";
import MapPage from "./components/map";
import SopfeuPage from "./components/sopfeu-page";
import UserPage from "./components/user-page";
import TemplatePage from "./components/template-page";
import NoMatchPage from "./components/no-match-page";
import Layout from "./components/layout";
import NavigationBar from "./components/navigation-bar";
import Loading from "./components/loading";

//checkout https://www.npmjs.com/package/react-router-bootstrap

function App(props) {
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
          <Route path="/template" component={TemplatePage} />
          <Route component={NoMatchPage} />
        </Switch>
      </Layout>
      <Footer />
    </React.Fragment>
  );
}

export default App;
