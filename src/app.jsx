import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./components/home-page";
import MapPage from "./components/map";
import SopfeuPage from "./components/sopfeu-page";
import TemplatePage from "./components/template-page";
import NoMatchPage from "./components/no-match-page";
import Layout from "./components/layout";
import NavigationBar from "./components/navigation-bar";

function App(props) {
  return (
    <React.Fragment>
      <Header />
      <NavigationBar />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/map" element={<MapPage/>} />
          <Route path="/sopfeu" element={<SopfeuPage/>} />
          <Route path="/template" element={<TemplatePage/>} />
          <Route component={NoMatchPage} />
        </Routes>
      </Layout>
      <Footer />
    </React.Fragment>
  );
}

export default App;
