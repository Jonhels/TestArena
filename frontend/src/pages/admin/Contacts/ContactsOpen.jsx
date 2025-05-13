import { Link, useNavigate, useParams } from "react-router-dom";
import ContactDetails from "../../../components/admin/Inquiry/Contacts/ContactsDetails";
import back from "../../../assets/icons/arrow-left.svg";

const ContactsOpen = () => {
  return (
    <div className="contact-open-wrapper">
    <div className="back-button-container">
        <img src={back} alt="Tilbake" />
        <Link to="/kontakter">
          <p>Tilbake til kontakter</p>
        </Link>
      </div>
      <ContactDetails />
    </div>
  );
};

export default ContactsOpen;
