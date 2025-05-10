import React from "react";
import "./InquiryOpenStyles.css";
import api from "../../api/api";


const InquiryDetails = ({ data }) => {
    if (!data) return <div>Laster henvendelse...</div>;

    return (
        <div className="top-info-panel">
            <div className="info-section">
                <h2 className="section-title">Om produktet</h2>

                <div className="info-block">
                    <p className="info-label"><strong>Kort beskrivelse av produkt eller tjeneste og den tekniske løsningen</strong></p>
                    <p>{data.productDescription || "Ikke oppgitt"}</p>
                </div>

                <div className="info-block">
                    <p className="info-label"><strong>Status for produktutvikling:</strong> {data.developmentStage || "Ikke oppgitt"}</p>
                </div>

                <div className="info-block">
                    <p className="info-label"><strong>Produktbeskrivelse:</strong></p>
                    {data.productType?.length ? (
                        <ul className="bullet-list">
                            {data.productType.map((type, idx) => (
                                <li key={idx}>{type}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Ikke oppgitt</p>
                    )}
                </div>

                <div className="info-block">
                    <p className="info-label"><strong>Beskriv behovet for samarbeid og hvilken kompetanse virksomheten stiller med</strong></p>
                    <p>{data.partnerDescription || "Ikke oppgitt"}</p>
                </div>
            </div>

            <div className="info-section">
                <h2 className="section-title">Tilleggsinformasjon</h2>

                <div className="info-block">
                    <p className="info-label"><strong>Nytteeffekt</strong></p>
                    <p>{data.userExperience || "Ikke oppgitt"}</p>
                </div>

                <div className="info-block">
                    <p className="info-label"><strong>Testing</strong></p>
                    <p><strong>Informasjon om testing:</strong> {data.testingInfo || "Ikke oppgitt"}</p>
                    <p><strong>Testet andre steder:</strong> {data.testedElsewhere || "Ikke oppgitt"}</p>
                    <p><strong>Forklaring hvis testet:</strong> {data.explanationIfTested || "Ikke oppgitt"}</p>
                </div>

                <div className="info-block">
                    <p className="info-label"><strong>Samarbeid</strong></p>
                    <p>{data.collaboration || "Ikke oppgitt"}</p>
                </div>

                <div className="info-block">
                    <p className="info-label"><strong>Markedsanalyse</strong></p>
                    <p>{data.marketAnalysis || "Ikke oppgitt"}</p>
                </div>

                <div className="info-block">
                    <p className="info-label"><strong>Vedlagte filer:</strong></p>
                    {data.attachmentUrl ? (
                        <a
                            href={`${api.defaults.baseURL.replace("/api", "")}${data.attachmentUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Last ned vedlegg
                        </a>
                    ) : (
                        <p>Ingen</p>
                    )}
                </div>



            </div>
        </div>
    );
};

export default InquiryDetails;
