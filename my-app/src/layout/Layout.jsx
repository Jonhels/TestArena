// This component serves as the layout wrapper for the application.
// It includes the Navbar at the top and dynamically renders the main content passed as the "children" prop.
// The "children" prop represents any nested content or components that are rendered within the Layout.
// The Footer is positioned at the bottom of the page using flexbox styling.
import React from "react";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/footer/Footer";

const Layout = ({ children }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                width: "100vw",
                margin: 0,
                padding: 0,
            }}
        >
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;

