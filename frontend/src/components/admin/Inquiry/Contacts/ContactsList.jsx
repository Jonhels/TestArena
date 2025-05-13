import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../InquiryList/InquiryList.css";
import moreIcon from "../../../../assets/icons/more-vertical.svg";
import filterIcon from "../../../../assets/icons/filter.svg";
import searchIcon from "../../../../assets/icons/search.svg";
import adduser from "../../../../assets/icons/add-user.svg";
import AddContactForm from "./AddContactForm";
import api from "../../../../api/api";
import "./ContactsList.css";

function ContactsList({ contacts = [], loading, error, setContacts }) {
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("Alle");
  const [selectedPosition, setSelectedPosition] = useState("Alle");
  const [sortOrder, setSortOrder] = useState("asc");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 8;

  const uniqueCompanies = ["Alle", ...new Set(contacts.map(c => c.businessName).filter(Boolean))];
  const uniquePositions = ["Alle", ...new Set(contacts.map(c => c.responsibility).filter(Boolean))];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    filterAndSortContacts();
  }, [contacts, searchQuery, selectedCompany, selectedPosition, sortOrder]);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown-menu") && !e.target.closest(".menu-trigger")) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  useEffect(() => {
    if (!showAddModal) return;
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAddModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAddModal]);

  const filterAndSortContacts = () => {
    let result = [...contacts];
    if (selectedCompany !== "Alle") result = result.filter(c => c.businessName === selectedCompany);
    if (selectedPosition !== "Alle") result = result.filter(c => c.responsibility === selectedPosition);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.businessName?.toLowerCase().includes(q) ||
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    setFilteredContacts(result);
    setCurrentPage(1);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      if (!window.confirm("Er du sikker på at du vil slette denne kontakten?")) return;
      await api.delete(`/kontakter/${id}`);
      setContacts(prev => prev.filter(c => c._id !== id));
      setOpenDropdownId(null);
    } catch (err) {
      console.error("Failed to delete contact:", err.response?.data || err.message);
    }
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/kontakter/${id}`);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(filteredContacts.length / ITEMS_PER_PAGE)) {
      setCurrentPage(page);
    }
  };

  const toggleMobileFilter = () => setShowMobileFilters(prev => !prev);

  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="inquiry-wrapper">
      {/* DESKTOP FILTER BAR */}
      {!isMobile && (
        <div className="filter-bar">
          <div className="filterContact-group">
            <label>Virksomhet</label>
            <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
              {uniqueCompanies.map((company, idx) => (
                <option key={idx} value={company}>{company}</option>
              ))}
            </select>
          </div>
          <div className="filterContact-group">
            <label>Sorter alfabetisk</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </div>
          <div className="filterContact-group">
            <label>Stilling</label>
            <select value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
              {uniquePositions.map((pos, idx) => (
                <option key={idx} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          <div className="search">
            <label>Søk</label>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Søk"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img src={searchIcon} alt="Søk" className="search-icon" />
            </div>
          </div>
          <div className="filterContact-group">
            <label>&nbsp;</label>
            <button className="adduser" onClick={() => setShowAddModal(true)}>
              <img src={adduser} /> Legg til kontakt
            </button>
          </div>
        </div>
      )}

      {/* MOBILE HEADER BUTTONS */}
      {isMobile && (
        <div className="mobile-filter-buttons">
          <button className="mobile-filter-toggle" onClick={toggleMobileFilter}>
            <span>Filtre</span>
            <img src={filterIcon} alt="Filtre" />
          </button>
          <button className="adduser" onClick={() => setShowAddModal(true)}>
            <img src={adduser} />
          </button>
        </div>
      )}

      {/* MOBILE FILTER PANEL */}
      {isMobile && showMobileFilters && (
        <div className="mobile-filter-panel">
          <div className="filterContact-group">
            <label className="mobilelabelvirksomhet">Virksomhet</label>
            <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
              {uniqueCompanies.map((company, idx) => (
                <option key={idx} value={company}>{company}</option>
              ))}
            </select>
          </div>
          <div className="filterContact-group">
            <label className="mobilelabelstilling">Stilling</label>
            <select value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
              {uniquePositions.map((pos, idx) => (
                <option key={idx} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* CONTENT */}
      {loading ? (
        <p>Laster inn...</p>
      ) : error ? (
        <p className="inquiry-error">{error}</p>
      ) : (
        <>
          {isMobile ? (
            <div className="mobile-inquiry-list">
              <div className="mobile-contacts-wrapper">
                <div className="mobile-table-header">
                  <div>Virksomhet</div>
                  <div>Stilling</div>
                </div>
                <div>
                  {paginatedContacts.map((c) => (
                    <div key={c._id} className="mobile-inquiry-row" onClick={() => navigate(`/kontakter/${c._id}`)}>
                      <div className="mobile-inquiry-avatar">
                        {(c.businessName?.split(" ").slice(0, 2).map(w => w[0]).join("") || "??")}
                      </div>
                      <div className="mobile-inquiry-info">
                        <div className="mobile-inquiry-name">
                          <div>{c.businessName}</div>
                          <div className="mobile-inquiry-sub">{c.name}</div>
                        </div>
                        <div className="mobile-inquiry-role">{c.responsibility}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="contacts-table">
              <div className="contacts-table-header">
                <div>Virksomhet</div>
                <div>Kontaktperson</div>
                <div>Stilling</div>
                <div>E-post</div>
                <div>Telefon</div>
                <div></div>
              </div>
              {paginatedContacts.map((c) => (
                <div key={c._id} className="contacts-table-row" onClick={() => navigate(`/kontakter/${c._id}`)}>
                  <div className="inquiry-status">
                    <div className="contact-avatar">{c.businessName?.slice(0, 2).toUpperCase()}</div>
                    <span>{c.businessName}</span>
                  </div>
                  <div>{c.name}</div>
                  <div>{c.responsibility}</div>
                  <div>{c.email}</div>
                  <div>{c.phone}</div>
                  <div>
                    <div
                      className="menu-trigger"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId((prev) => (prev === c._id ? null : c._id));
                      }}
                    >
                      <img src={moreIcon} alt="Mer" />
                    </div>
                    {openDropdownId === c._id && (
                      <div className="dropdown-menu">
                        <p className="handlearchive" onClick={(e) => handleEdit(e, c._id)}>Rediger</p>
                        <p className="deleteArchived" onClick={(e) => handleDelete(e, c._id)}>Slett</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <span className="result-info">
            Viser {(currentPage - 1) * ITEMS_PER_PAGE + 1} – {Math.min(currentPage * ITEMS_PER_PAGE, filteredContacts.length)} av {filteredContacts.length} kontakter
          </span>

          {Math.ceil(filteredContacts.length / ITEMS_PER_PAGE) > 1 && (
            <div className="pagination-wrapper">
              <div className="pagination-controls">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
                {Array.from({ length: Math.ceil(filteredContacts.length / ITEMS_PER_PAGE) }, (_, i) => i + 1).map((num) =>
                  num === 1 || num === Math.ceil(filteredContacts.length / ITEMS_PER_PAGE) || Math.abs(num - currentPage) <= 1 ? (
                    <button key={num} onClick={() => handlePageChange(num)} className={num === currentPage ? "active" : ""}>
                      {num}
                    </button>
                  ) : num === currentPage - 2 || num === currentPage + 2 ? (
                    <span key={num} className="dots">…</span>
                  ) : null
                )}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(filteredContacts.length / ITEMS_PER_PAGE)}>&gt;</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <AddContactForm
              onClose={() => setShowAddModal(false)}
              onAdd={(newContact) => {
                setContacts(prev => [...prev, newContact]);
                setShowAddModal(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactsList;
