import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-message">
        Oops! The page youre looking for doesnt exist.
      </p>
      <Link to="/register" className="not-found-link">
        Register here
      </Link>
    </div>
  );
};

export default NotFoundPage;
