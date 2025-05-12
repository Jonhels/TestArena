import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../InquiryComponents/InquiryList.css";
import moreIcon from "../../assets/images/more-vertical.svg";
import api from "../../api/api";
import arrowUp from "../../assets/images/arrow-up.svg";
import arrowDown from "../../assets/images/arrow-down.svg";
import filterIcon from "../../assets/images/filter.svg";
import searchIcon from "../../assets/images/search.svg";

function ArchiveList({ inquiries = [], loading, error, setInquiries, setLoading, setError }) {
    const [filteredInquiries, setFilteredInquiries] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedResponsible, setSelectedResponsible] = useState("Alle");
    const [selectedCompany, setSelectedCompany] = useState("Alle");
    const [currentPage, setCurrentPage] = useState(1);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const navigate = useNavigate();
    const ITEMS_PER_PAGE = 8;

    useEffect(() => {
        filterInquiries();
    }, [inquiries, searchQuery, selectedResponsible, selectedCompany]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const dropdowns = document.querySelectorAll(".dropdown-menu, .menu-trigger, .arrow-icon");
            const clickedInside = Array.from(dropdowns).some((el) => el.contains(event.target));
            if (!clickedInside) setOpenDropdownId(null);
        };

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    const handleClick = (id) => navigate(`/arkiv/${id}`);

    const formatStatusLabel = (status) => {
        switch (status) {
            case "ulest": return "Ny";
            case "i arbeid": return "Pågående";
            case "ferdig": return "Avsluttet";
            default: return status;
        }
    };

    const statusDotColor = (status) => {
        switch (status) {
            case "ulest": return "green";
            case "i arbeid": return "orange";
            case "ferdig": return "red";
            default: return "gray";
        }
    };

    const filterInquiries = () => {
        let result = [...inquiries];

        if (selectedResponsible !== "Alle") {
            result = result.filter((inq) => (inq.assignedTo || "Ingen") === selectedResponsible);
        }

        if (selectedCompany !== "Alle") {
            result = result.filter((inq) => inq.companyName === selectedCompany);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (inq) =>
                    inq.productTitle?.toLowerCase().includes(q) ||
                    inq.companyName?.toLowerCase().includes(q) ||
                    inq.contactName?.toLowerCase().includes(q)
            );
        }

        setFilteredInquiries(result);
        setCurrentPage(1);
    };

    const uniqueResponsibles = [
        "Alle",
        ...new Set(inquiries.map((i) => i.assignedTo || "Ingen").filter(Boolean)),
    ];

    const uniqueCompanies = [
        "Alle",
        ...new Set(inquiries.map((i) => i.companyName).filter(Boolean)),
    ];

    const getInitials = (name) => {
        if (!name) return "?";
        const parts = name.trim().split(" ");
        return (parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "");
    };

    const totalPages = Math.ceil(filteredInquiries.length / ITEMS_PER_PAGE);
    const paginatedInquiries = filteredInquiries.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleRestore = async (e, inquiryId) => {
        e.stopPropagation();
        try {
            await api.put(`/inquiries/restore/${inquiryId}`);
            setInquiries((prev) => prev.filter((inq) => inq._id !== inquiryId));
            setOpenDropdownId(null);
        } catch (err) {
            console.error("Failed to restore inquiry", err);
        }
    };

    const handleDelete = async (e, inquiryId) => {
        e.stopPropagation();
        const confirmDelete = window.confirm("Er du sikker på at du vil slette denne henvendelsen?");
        if (!confirmDelete) return;
        try {
            await api.delete(`/inquiries/${inquiryId}`);
            setInquiries((prev) => prev.filter((inq) => inq._id !== inquiryId));
            setOpenDropdownId(null);
        } catch (err) {
            console.error("Failed to delete inquiry", err);
        }
    };


    const toggleMobileFilter = () => setShowMobileFilters((prev) => !prev);

    const renderPaginationInfo = () => (
        <span className="result-info">
            Viser {(currentPage - 1) * ITEMS_PER_PAGE + 1} –{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredInquiries.length)} av {filteredInquiries.length} henvendelser
        </span>
    );

    return (
        <div className="inquiry-wrapper">
            {/* Desktop Filter Bar */}
            <div className="filter-bar">
                <div className="filter-group">
                    <label>Ansvarlig</label>
                    <select value={selectedResponsible} onChange={(e) => setSelectedResponsible(e.target.value)}>
                        {uniqueResponsibles.map((res, idx) => (
                            <option key={idx} value={res}>{res}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Virksomhet</label>
                    <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
                        {uniqueCompanies.map((comp, idx) => (
                            <option key={idx} value={comp}>{comp}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group search">
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

            </div>

            {/* Mobile Search Bar */}
            <div className="filter-bar-mobile">
                <div className="mobile-search-input">
                    <input
                        type="text"
                        placeholder="Søk"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <img src={searchIcon} alt="Søk" className="search-icon" />
                </div>
                <button className="mobile-filter-toggle" onClick={toggleMobileFilter}>
                    <span>Filtre</span>
                    <img src={filterIcon} alt="Filtre" />
                </button>
            </div>

            {/* Mobile Filter Drawer */}
            {showMobileFilters && (
                <div className="mobile-filter-panel">
                    <div className="filter-group">
                        <label>Ansvarlig</label>
                        <select value={selectedResponsible} onChange={(e) => setSelectedResponsible(e.target.value)}>
                            {uniqueResponsibles.map((res, idx) => (
                                <option key={idx} value={res}>{res}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Virksomhet</label>
                        <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
                            {uniqueCompanies.map((comp, idx) => (
                                <option key={idx} value={comp}>{comp}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {/* Content */}
            {loading ? (
                <p>Laster inn...</p>
            ) : error ? (
                <p className="inquiry-error">{error}</p>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="inquiry-list">
                        <div className="inquiry-header">
                            <div>Tittel:</div>
                            <div>Virksomhet:</div>
                            <div>Kontaktperson:</div>
                            <div>Mottatt:</div>
                            <div>Case nr:</div>
                            <div>Ansvarlig:</div>
                            <div>Status:</div>
                            <div></div>
                        </div>

                        {paginatedInquiries.map((inq) => (
                            <div
                                key={inq._id}
                                className={`inquiry-row ${inq.status === "ulest" ? "new-inquiry" : ""}`}
                                onClick={() => handleClick(inq._id)}
                            >
                                <div title={inq.productTitle}>{inq.productTitle}</div>
                                <div title={inq.companyName}>{inq.companyName}</div>
                                <div title={inq.contactName}>{inq.contactName}</div>
                                <div>{inq.createdAt ? new Date(inq.createdAt).toLocaleDateString("nb-NO") : "–"}</div>
                                <div>{inq.caseNumber || "–"}</div>
                                <div>
                                    {inq.assignedTo && (
                                        <div className="inquiry-avatar">{getInitials(inq.assignedTo)}</div>
                                    )}
                                </div>
                                <div className="inquiry-status">
                                    {inq.status !== "ulest" && (
                                        <span
                                            className="inquiry-status-dot"
                                            style={{ backgroundColor: statusDotColor(inq.status) }}
                                        />
                                    )}
                                    {formatStatusLabel(inq.status)}
                                </div>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <div
                                        className="menu-trigger"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenDropdownId((prev) => (prev === inq._id ? null : inq._id));
                                        }}
                                    >
                                        <img src={moreIcon} alt="Mer" />
                                    </div>

                                    {openDropdownId === inq._id && (
                                        <div className="dropdown-menu">
                                            <p className="handlearchive" onClick={(e) => handleRestore(e, inq._id)}>Gjenopprette</p>
                                            <p className="deleteArchived" onClick={(e) => handleDelete(e, inq._id)}>Slette</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Card View */}
                    <div className="mobile-inquiry-list">
                        <div className="mobile-inquiry-wrapper">
                            <div className="mobile-inquiry-header">
                                <div className="mobile-title">Tittel:</div>
                                <div className="mobile-secondarytitle">Mottatt:</div>
                            </div>
                            <div className="mobile-inquiry-container">
                                {paginatedInquiries.map((inq) => (
                                    <div
                                        key={inq._id}
                                        className={`inquiry-card ${inq.status === "ulest" ? "new-inquiry" : ""}`}
                                        onClick={() => handleClick(inq._id)}
                                    >
                                        <div className="inquiry-card-body">
                                            <div className="inquiry-card-status">
                                                <div>{inq.productTitle}</div>
                                                <div>av {inq.companyName}</div>
                                            </div>
                                            <div>
                                                <div>{new Date(inq.createdAt).toLocaleDateString("nb-NO")}</div>
                                                <div>Status: {formatStatusLabel(inq.status)}</div>
                                            </div>
                                            <div>
                                                <img
                                                    src={openDropdownId === inq._id ? arrowUp : arrowDown}
                                                    alt="Toggle meny"
                                                    className="arrow-icon"
                                                    width={24}
                                                    height={24}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpenDropdownId((prev) => (prev === inq._id ? null : inq._id));
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {openDropdownId === inq._id && (
                                            <div className="inquiry-card-dropdown-wrapper">
                                                <div className="dropdown-menu mobile-dropdown">
                                                    <p className="handlearchive" onClick={(e) => handleRestore(e, inq._id)}>Gjenopprett</p>
                                                    <p className="deleteArchived " onClick={(e) => handleDelete(e, inq._id)}>Slette</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {renderPaginationInfo()}

                    {totalPages > 1 && (
                        <div className="pagination-wrapper">
                            <div className="pagination-controls">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                    &lt;
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) =>
                                    num === 1 || num === totalPages || Math.abs(num - currentPage) <= 1 ? (
                                        <button
                                            key={num}
                                            onClick={() => handlePageChange(num)}
                                            className={num === currentPage ? "active" : ""}
                                        >
                                            {num}
                                        </button>
                                    ) : num === currentPage - 2 || num === currentPage + 2 ? (
                                        <span key={num} className="dots">…</span>
                                    ) : null
                                )}
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                    &gt;
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ArchiveList;
