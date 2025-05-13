import React from "react";
import "./InquiryOpenStyles.css";
import api from "../../api/api";

const InquiryDetails = ({ data }) => {
    if (!data) return <div>Laster henvendelse...</div>;

    return (
        <div className="top-info-panel">
            {/* Produktinfo */}
            <section className="info-section">
                <h2 className="section-title">Om produktet</h2>

                <article className="info-block">
                    <p className="info-label">Kort beskrivelse av produkt eller tjeneste og den tekniske løsningen</p>
                    <p>{data.productDescription || "Ikke oppgitt"}</p>
                </article>

                <article className="info-block">
                    <p className="info-label">Status for produktutvikling</p>
                    <p>{data.developmentStage || "Ikke oppgitt"}</p>
                </article>

                <article className="info-block">
                    <p className="info-label">Produktbeskrivelse</p>
                    {data.productType?.length ? (
                        <ul className="bullet-list">
                            {data.productType.map((type, idx) => (
                                <li key={idx}>{type}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Ikke oppgitt</p>
                    )}
                </article>

                <article className="info-block">
                    <p className="info-label">Beskriv behovet for samarbeid og hvilken kompetanse virksomheten stiller med</p>
                    <p>{data.partnerDescription || "Ikke oppgitt"}</p>
                </article>
            </section>

            {/* Tilleggsinformasjon */}
            <section className="info-section">
                <h2 className="section-title">Tilleggsinformasjon</h2>

                <article className="info-block">
                    <p className="info-label">Nytteeffekt</p>
                    <p>{data.userExperience || "Ikke oppgitt"}</p>
                </article>

                <article className="info-block">
                    <p className="info-label">Testing</p>

                    <div className="info-sub-block">
                        <span className="info-sub-label">Informasjon om testing:</span>
                        <p className="info-sub-value">{data.testingInfo || "Ikke oppgitt"}</p>
                    </div>

                    <div className="info-sub-block">
                        <span className="info-sub-label">Testet andre steder:</span>
                        <p className="info-sub-value">{data.testedElsewhere || "Ikke oppgitt"}</p>
                    </div>

                    <div className="info-sub-block">
                        <span className="info-sub-label">Forklaring hvis testet:</span>
                        <p className="info-sub-value">{data.explanationIfTested || "Ikke oppgitt"}</p>
                    </div>
                </article>


                <article className="info-block">
                    <p className="info-label">Samarbeid</p>
                    <p>{data.collaboration || "Ikke oppgitt"}</p>
                </article>

                <article className="info-block">
                    <p className="info-label">Markedsanalyse</p>
                    <p>{data.marketAnalysis || "Ikke oppgitt"}</p>
                </article>

                <article className="info-block">
                    <p className="info-label">Vedlagte filer</p>
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
                </article>
            </section>
        </div>
    );
};

export default InquiryDetails;
