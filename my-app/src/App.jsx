import React from "react";
import './App.css'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
    return (
        <AuthProvider>
            <HelmetProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </HelmetProvider>
        </AuthProvider>
    );
};

export default App;
