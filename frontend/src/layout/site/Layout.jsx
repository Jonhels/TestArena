import PropTypes from "prop-types";
import Navbar from "../../components/site/common/NavBar/Navbar";
import Footer from "../../components/site/common/Footer/Footer";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__main">{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
