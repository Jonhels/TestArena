import "./ContactsHeader.css";

const ContactsHeader = ({ inquiries = [] }) => {

  return (
    <div className="contacts-header-wrapper">
      <div className="contacts-summary">
        <h2 className="contacts-title">Kontakter</h2>
        <p className="contacts-subtext">
          Her finner du en oversikt over alle kontakter.
        </p>
      </div>
    </div>
  );
};

export default ContactsHeader;
