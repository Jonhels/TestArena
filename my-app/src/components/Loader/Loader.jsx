import PropTypes from "prop-types";
import "./Loader.css";

const Loader = ({ message = "Laster..." }) => {
  return (
    <div className="loader-wrapper fade-in">
      <div className="loader"></div>
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
};

Loader.propTypes = {
  message: PropTypes.string,
};

export default Loader;
