import React from "react";
import { Route, Routes } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import PrivateRoute from "./helpers/private-route";
import NavigationBar from "./components/navigation-bar";
import Header from "./components/header";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Loading from "./components/loading";
import HomePage from "./components/home-page";
import MapPage from "./components/map-page";
import SopfeuPage from "./components/sopfeu-page";
import DevicePage from "./components/device-page";
import UserPage from "./components/user-page";
import ProfilePage from "./components/profile-page";
import TestPage from "./components/test-page";
import SupportPage from "./components/support-page";
import NoMatchPage from "./components/no-match-page";

function App(props) {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Header />
      <NavigationBar />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/map" element={<PrivateRoute><MapPage/></PrivateRoute>} />
          <Route path="/sopfeu" element={<PrivateRoute><SopfeuPage/></PrivateRoute>} />
          <Route path="/device" element={<PrivateRoute><DevicePage/></PrivateRoute>} />
          <Route path="/user" element={<PrivateRoute><UserPage/></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>} />
          <Route path="/test" element={<TestPage/>} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </Layout>
      <Footer />
    </React.Fragment>
  );
}

export default App;
