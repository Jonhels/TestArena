import React from "react";

const TopInfoPanel = ({ data }) => {
    if (!data) return <div>Laster henvendelse...</div>;

    return (
        <div className="top-info-panel">
            <h2>{data.productTitle}</h2>
            <p>Virksomhet: {data.companyName}</p>
            <p>Fra: {data.companyCity}</p>
            <p>Nettside: {
                data.companyWebsite ? (
                    <a href={data.companyWebsite} target="_blank" rel="noopener noreferrer">
                        {data.companyWebsite}
                    </a>
                ) : "Ikke oppgitt"
            }</p>
            <div className="divider">
                <p>Kontaktperson: {data.contactName}</p>
                <p>E-post: {data.contactEmail}</p>
                <p>Tlf.: {data.contactPhone}</p>
                <p>Mottatt: {new Date(data.createdAt).toLocaleDateString("nb-NO")}</p>
                <p>Casenr.: {data.caseNumber}</p>
                <p>Status: {data.status}</p>
                <p>Produktbeskrivelse: {data.productDescription}</p>
                <p>Lagring og forvaltning: {data.storageDescription}</p>
                <p>Prosjekteier: {data.projectOwner}</p>
                <p>Utviklingsfase: {data.developmentStage}</p>
                <p>Produkttype: {data.productType?.join(", ")}</p>
                <p>Samarbeid ønskes: {data.collaboration === "yes" ? "Ja" : "Nei"}</p>
                <p>Klar til bruk: {data.readyToUse === "yes" ? "Ja" : "Nei"}</p>
                <p>Testet tidligere: {data.testedElsewhere === "yes" ? "Ja" : "Nei"}</p>
                {data.explanationIfTested && (
                    <p>Forklaring på tidligere testing: {data.explanationIfTested}</p>
                )}
                <p>Info om testing: {data.testingInfo}</p>
                <p>Samarbeidsbeskrivelse: {data.partnerDescription}</p>
                <p>Vedlegg: <a href={data.attachmentUrl} target="_blank" rel="noopener noreferrer">Åpne vedlegg</a></p>
                <p>Tags: {data.tags?.length ? data.tags.join(", ") : "Ingen"}</p>

            </div>

        </div>
    );
};

export default TopInfoPanel;
