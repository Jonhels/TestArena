import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import AboutUs from "../pages/AboutUs/AboutUs";
import Contact from "../pages/Contact/Contact";
import InquiryForm from "../pages/InquiryForm/InquiryForm";
import NotFound from "../pages/NotFound/NotFound";
import Loader from "../components/Loader/Loader";

const AppRoutes = () => (
  <Suspense fallback={<Loader message="Laster siden..." />}>
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/tjenester"
        element={
          <Layout>
            <Services />
          </Layout>
        }
      />
      <Route
        path="/om-oss"
        element={
          <Layout>
            <AboutUs />
          </Layout>
        }
      />
      <Route
        path="/kontakt"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/henvendelsesskjema"
        element={
          <Layout>
            <InquiryForm />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  </Suspense>
);

export default AppRoutes;
