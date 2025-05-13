const stepTwoProductInfoTranslations = {
  no: {
    title: "Om produktet",
    productTitle: "Tittel",
    productDescription:
      "Kort beskrivelse av produktet og den tekniske løsningen",
    developmentStage: "Status for produktutvikling",
    stages: [
      "Tidlig konseptfase",
      "Prototypefase",
      "CE-merket produkt",
      "Annet",
    ],
    productType: "Produkttilpasninger",
    types: [
      "Medisinsk utstyr klasse I",
      "Medisinsk utstyr klasse IIa",
      "Medisinsk utstyr klasse IIb",
      "Medisinsk utstyr klasse III",
      "E-helseløsning",
      "Uklassifisert treningsutstyr",
      "Uklassifisert ikke-medisinsk",
    ],
    partnerDescription:
      "Beskriv behovet for samarbeid og hvilken kompetanse virksomheten har",
    storageDescription: "Hvordan lagres løsningen og hvem har tilgang?",
    projectOwner: "Hvordan er eierskapet til løsningen i prosjektet?",
    readyToUse: "Gjelder henvendelsen et ferdig produkt eller tjeneste?",
    select: "Velg et alternativ",
    yes: "Ja",
    no: "Nei",
    back: "Tilbake",
    next: "Neste",
    errors: {
      productTitle: "Tittel er påkrevd",
      productDescription: "Beskrivelse er påkrevd",
      developmentStage: "Velg status for utvikling",
      productType: "Velg minst én type",
      partnerDescription: "Beskriv samarbeid og kompetanse",
      storageDescription: "Beskriv lagring og tilgang",
      projectOwner: "Beskriv eierskap",
      readyToUse: "Velg et alternativ",
    },
    tooltips: {
      productDescription:
        "Beskriv produktet, tjenesten eller ideen til løsningen. Hvis produktet eller tjenesten er en e-helseløsning, vennligst beskriv kort den tekniske løsningen og eventuelle behov for informasjonsutveksling med andre systemer.",
      partnerDescription:
        "Beskriv så tydelig som mulig hva slags samarbeid eller utviklingsstøtte bedriften din har behov for. Eksempler: klinisk erfaring, brukere eller pasientinnsikt, erfaring av testing osv. Gi en kort beskrivelse av hvilken kompetanse virksomheten stiller med.",
      storageDescription:
        "Beskriv kort hvordan den tekniske løsningen er tenkt implementert, med særlig fokus på lagring av data, tilgangsstyring og hvem som skal ha tilgang til det som blir registrert.",
      readyToUse: "Hjelp oss vurdere om løsningen er klar til implementering.",
    },
  },
  en: {
    title: "About the product",
    productTitle: "Title",
    productDescription:
      "Short description of the product and technical solution",
    developmentStage: "Product development status",
    stages: [
      "Early concept phase",
      "Prototype phase",
      "CE-marked product",
      "Other",
    ],
    productType: "Product classifications",
    types: [
      "Medical device class I",
      "Medical device class IIa",
      "Medical device class IIb",
      "Medical device class III",
      "E-health solution",
      "Non-classified training device",
      "Non-classified non-medical",
    ],
    partnerDescription:
      "Describe the need for collaboration and the company's competence",
    storageDescription: "How is the solution stored and who has access?",
    projectOwner: "How is ownership of the solution defined in the project?",
    readyToUse: "Is this a ready-to-use product or service?",
    select: "Select an option",
    yes: "Yes",
    no: "No",
    back: "Back",
    next: "Next",
    errors: {
      productTitle: "Title is required",
      productDescription: "Description is required",
      developmentStage: "Please select a development stage",
      productType: "Please select at least one type",
      partnerDescription: "Please describe collaboration and competence",
      storageDescription: "Please describe storage and access",
      projectOwner: "Please describe ownership",
      readyToUse: "Please select an option",
    },
    tooltips: {
      productDescription:
        "Describe the product, service, or solution idea. If this is an e-health solution, include a short technical description and any integration needs with other systems.",
      partnerDescription:
        "Describe clearly what kind of collaboration or development support your company needs. For example: clinical experience, users or patient insight, testing experience. Also describe your company's relevant competence.",
      storageDescription:
        "Briefly explain how the solution handles data — including data storage, access control, and who has access to the recorded information.",
      readyToUse:
        "Help us understand if the solution is ready for implementation.",
    },
  },
};

export default stepTwoProductInfoTranslations;
