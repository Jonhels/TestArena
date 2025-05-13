import { useState, useRef, useEffect } from "react";
import api from "../../../../api/api";
import pencil from "../../../../assets/icons/pencil.svg";
import "./InquiryOpenStyles.css";

const TopInfoPanel = ({ data }) => {
  const [tagInput, setTagInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [tagError, setTagError] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (data?.tags) {
      setTags(data.tags);
    }
  }, [data]);

  const tagInputRef = useRef(null);
  const editButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editMode &&
        tagInputRef.current &&
        !tagInputRef.current.contains(event.target) &&
        editButtonRef.current &&
        !editButtonRef.current.contains(event.target)
      ) {
        setEditMode(false);
        setTagInput("");
        setTagError("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editMode]);

  if (!data) return <div>Laster henvendelse...</div>;
  const handleAddTag = async () => {
    const newTag = tagInput.trim();

    if (!newTag) {
      return;
    }

    if (tags.includes(newTag)) {
      setTagError("Denne taggen finnes allerede");
      return;
    }

    if (tags.length >= 3) {
      setTagError("Maks 3 tags tillatt");
      return;
    }

    try {
      const response = await api.post(`/inquiries/tag/${data._id}`, {
        tag: newTag,
      });
      setTags(response.data.inquiry.tags);
      setTagInput("");
      setTagError("");
    } catch (error) {
      console.error("Kunne ikke legge til tag:", error);
      setTagError("Kunne ikke legge til tag");
    }
  };

  const handleDeleteTag = async (tagToDelete) => {
    try {
      const response = await api.delete(`/inquiries/tag/${data._id}`, {
        data: { tag: tagToDelete },
      });
      setTags(response.data.inquiry.tags);
    } catch (error) {
      console.error("Kunne ikke slette tag:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="top-info-panel">
      <div className="top-info-panel-header">
        <h2 className="section-title">
          {data.companyName} - {data.productTitle}
        </h2>
      </div>

      <div className="BlueBorderline"></div>

      <div className="top-info-panel-content">
        <div>
          <p>Virksomhet: {data.companyName}</p>
          <p>Fra: {data.companyCity}</p>
          <p>
            Nettside:{" "}
            {data.companyWebsite ? (
              <a
                href={data.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.companyWebsite}
              </a>
            ) : (
              "Ingen nettside tilgjengelig"
            )}
          </p>
        </div>

        <div>
          <p>Kontaktperson: {data.contactName}</p>
          <p>E-post: {data.contactEmail}</p>
          <p>Tlf: {data.contactPhone}</p>
        </div>

        <div className="top-info-textbox">
          <p>Mottatt: {new Date(data.createdAt).toLocaleDateString("nb-NO")}</p>
          <p>Casenr: {data.caseNumber}</p>

          <div className="tags-section">
            <span>Tags: </span>
            {tags.map((tag, index) => (
              <span key={index} className="tag-pill">
                {tag}
                <button
                  className="delete-tag"
                  onClick={() => handleDeleteTag(tag)}
                  aria-label={`Fjern tag ${tag}`}
                >
                  &times;
                </button>
              </span>
            ))}

            <button
              ref={editButtonRef}
              className="edit-icon"
              onClick={() => {
                setEditMode((prev) => !prev);
                setTagInput("");
                setTagError("");
              }}
            >
              <img src={pencil} alt="Edit" />
              <span>Edit</span>
            </button>
          </div>

          {editMode && (
            <div className="tag-edit-field" ref={tagInputRef}>
              <div className="tag-input-container">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                    setTagError("");
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ny tag"
                  maxLength={10}
                />
                <button onClick={handleAddTag}>Legg til</button>
              </div>
              {tagError && <p className="tag-error">{tagError}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopInfoPanel;
