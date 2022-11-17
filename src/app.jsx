import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavigationBar from "./components/navigation-bar";
import Header from "./components/header";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Loading from "./components/loading";
import ProtectedRoute from "./auth/protected-route";
import HomePage from "./components/home-page";
import MapPage from "./components/map-page";
import SopfeuPage from "./components/sopfeu-page";
import ProfilePage from "./components/profile-page";
import TemplatePage from "./components/template-page";
import NoMatchPage from "./components/no-match-page";

function App(props) {
  const { isLoading } = useAuth0();

  if (isLoading) {
    <Loading />;
  }

  return (
    <React.Fragment>
      <Header />
      <NavigationBar />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/sopfeu" element={<SopfeuPage />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={ProfilePage} />}
          />
          <Route
            path="/template"
            element={<ProtectedRoute component={TemplatePage} />}
          />
          <Route component={NoMatchPage} />
        </Routes>
      </Layout>
      <Footer />
    </React.Fragment>
  );
}

export default App;
