import React from "react";
import "./TopInfoPanel.css";

const TopInfoPanel = ({ data }) => {
  if (!data) return <div>Laster henvendelse...</div>;

  return (
    <div className="TopInfoPanelWrapper">
      <h2>{data.productTitle}</h2>

      <div className="info-grid">
        <div>
          <p><strong>Virksomhet:</strong><br />{data.companyName}</p>
          <p><strong>Fra:</strong><br />{data.companyCity}</p>
          <p><strong>Nettside:</strong><br />
            {data.companyWebsite ? (
              <a href={data.companyWebsite} target="_blank" rel="noopener noreferrer">
                {data.companyWebsite}
              </a>
            ) : "Ikke oppgitt"}
          </p>
        </div>

        <div>
          <p><strong>Kontaktperson:</strong><br />{data.contactName}</p>
          <p><strong>E-post:</strong><br />{data.contactEmail}</p>
          <p><strong>Tlf.:</strong><br />{data.contactPhone}</p>
        </div>

        <div>
          <p><strong>Mottatt:</strong><br />{new Date(data.createdAt).toLocaleDateString("nb-NO")}</p>
          <p><strong>Casenr.:</strong><br />{data.caseNumber}</p>
          <p><strong>Status:</strong><br />{data.status}</p>
        </div>
      </div>

      <hr />

      <div className="full-width-section">
        <p><strong>Produktbeskrivelse:</strong><br />{data.productDescription}</p>
        <p><strong>Lagring og forvaltning:</strong><br />{data.storageDescription}</p>
        <p><strong>Prosjekteier:</strong><br />{data.projectOwner}</p>
        <p><strong>Utviklingsfase:</strong><br />{data.developmentStage}</p>
        <p><strong>Produkttype:</strong><br />{data.productType?.join(", ")}</p>
        <p><strong>Samarbeid ønskes:</strong><br />{data.collaboration === "yes" ? "Ja" : "Nei"}</p>
        <p><strong>Klar til bruk:</strong><br />{data.readyToUse === "yes" ? "Ja" : "Nei"}</p>
        <p><strong>Testet tidligere:</strong><br />{data.testedElsewhere === "yes" ? "Ja" : "Nei"}</p>
        {data.explanationIfTested && (
          <p><strong>Forklaring på tidligere testing:</strong><br />{data.explanationIfTested}</p>
        )}
        <p><strong>Info om testing:</strong><br />{data.testingInfo}</p>
        <p><strong>Samarbeidsbeskrivelse:</strong><br />{data.partnerDescription}</p>
        <p><strong>Vedlegg:</strong><br />
          <a href={data.attachmentUrl} target="_blank" rel="noopener noreferrer">
            Åpne vedlegg
          </a>
        </p>
        <p><strong>Tags:</strong><br />{data.tags?.length ? data.tags.join(", ") : "Ingen"}</p>
      </div>
    </div>
  );
};

export default TopInfoPanel;
