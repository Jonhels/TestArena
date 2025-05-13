import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Layout from "../layout/site/Layout";
import Home from "../pages/site/Home/Home";
import Services from "../pages/site/Services/Services";
import AboutUs from "../pages/site/AboutUs/AboutUs";
import Contact from "../pages/site/Contact/Contact";
import InquiryForm from "../pages/site/InquiryForm/InquiryForm";
import NotFound from "../pages/site/NotFound/NotFound";
import Loader from "../components/common/Loader/Loader";
import Login from "../pages/site/Login/Login";
import Register from "../pages/site/Register/Register";
import PasswordResetRequest from "../pages/site/PasswordResetRequest/PasswordResetRequest";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layout/admin/DashboardLayout";
import Archive from "../pages/admin/Archive/Archive";
import Calendar from "../pages/admin/Calendar/Calendar";
import Contacts from "../pages/admin/Contacts/Contacts";
import Inquiries from "../pages/admin/Inquiries/Inquiries";
import Settings from "../pages/admin/Settings/Settings";
import InquiriesOpen from "../pages/admin/Inquiries/InquiriesOpen";
import TestCase from "../pages/site/TestCase/TestCase";
import ArchiveOpen from "../pages/admin/Archive/ArchiveOpen";

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
        path="/testcase"
        element={
          <Layout>
            <TestCase />
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
            <Register />
          </Layout>
        }
      />
      <Route
        path="/password-reset-request"
        element={
          <Layout>
            <PasswordResetRequest />
          </Layout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/henvendelser"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Inquiries />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/kalender"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Calendar />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/kontakter"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Contacts />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/arkiv"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Archive />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/instillinger"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/henvendelser/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <InquiriesOpen />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/arkiv/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ArchiveOpen />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  </Suspense>
);

export default AppRoutes;
