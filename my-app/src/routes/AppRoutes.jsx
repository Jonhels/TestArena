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
import Login from "../pages/Login/Login";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardFiles/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layout/DashboardLayout";
import Archive from "../pages/DashboardFiles/Archive/Archive";
import Calendar from "../pages/DashboardFiles/Calendar/Calendar";
import Contacts from "../pages/DashboardFiles/Contacts/Contacts";
import Inquiries from "../pages/DashboardFiles/Inquiries/Inquiries";
import Settings from "../pages/DashboardFiles/Settings/settings";

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
      <Route
        path="/admin-login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      {/* Fjern route for register, har den bare nå fordi vi kan lage brukere når vi utvikler */}
      <Route
        path="/register"
        element={
          <Layout>
            <RegisterPage />
          </Layout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/inquiries"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Inquiries />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Calendar />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/contacts"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Contacts />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/archive"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Archive />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  </Suspense>
);

export default AppRoutes;
