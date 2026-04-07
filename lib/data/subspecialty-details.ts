/**
 * SOUS-SPÉCIALITÉS — données détaillées
 * Affichées inline dans le panel navbar (pas de modal)
 */

export interface SubSpecialtyTop3Entry {
  clinicName:   string
  countryCode:  string
  doctorName:   string
  doctorDesc:   string
  priceFrom:    string
  rating:       number
  badge:        'meilleur-resultat' | 'recommande' | 'meilleur-prix'
}

export interface SubSpecialtyDetail {
  description:  string
  successRate:  string
  stayDuration: string
  priceRange:   string
  top3:         SubSpecialtyTop3Entry[]
}

/* ══════════════════════════════════════════════════════════════════════
   ONCOLOGIE
   ══════════════════════════════════════════════════════════════════════ */
const ONCOLOGIE: Record<string, SubSpecialtyDetail> = {

  'Oncologie mammaire (cancer du sein)': {
    description: 'Prise en charge complète du cancer du sein : diagnostic par mammographie et biopsie, chirurgie conservatrice ou mastectomie, radiothérapie adjuvante et hormonothérapie selon le profil tumoral.',
    successRate: '87-95%',
    stayDuration: '3-7 jours',
    priceRange: 'Estimation entre 8 000 et 25 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Sophie Marchand', doctorDesc: 'Reconnue pour ses résultats exceptionnels en chirurgie mammaire conservatrice et radiothérapie ciblée', priceFrom: 'À partir de 22 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Elif Yılmaz', doctorDesc: 'Spécialiste en chirurgie oncologique mammaire avec plus de 15 ans d\'expérience internationale', priceFrom: 'À partir de 12 500 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Fatima Benali', doctorDesc: 'Référence nationale en oncologie médicale, pionnière des protocoles personnalisés au Maroc', priceFrom: 'À partir de 8 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie pulmonaire': {
    description: 'Traitement des cancers broncho-pulmonaires par chirurgie thoracique mini-invasive, radiothérapie stéréotaxique, immunothérapie de dernière génération et thérapies ciblées selon les mutations génomiques.',
    successRate: '55-75%',
    stayDuration: '5-14 jours',
    priceRange: 'Estimation entre 10 000 et 35 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Jean-Marc Duval', doctorDesc: 'Leader européen en pneumo-oncologie, expert des immunothérapies anti-PD1 pour cancers pulmonaires', priceFrom: 'À partir de 32 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Mehmet Kaya', doctorDesc: 'Expert en chirurgie thoracique mini-invasive et résections complexes', priceFrom: 'À partir de 15 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Ahmed Ben Salah', doctorDesc: 'Chirurgien thoracique reconnu pour son approche conservatrice et ses excellents résultats post-opératoires', priceFrom: 'À partir de 10 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie colorectale': {
    description: 'Diagnostic et traitement des cancers du côlon et du rectum : coloscopie avec biopsie, résection chirurgicale laparoscopique ou robotique, chimiothérapie néoadjuvante et suivi carcinologique.',
    successRate: '65-90%',
    stayDuration: '5-10 jours',
    priceRange: 'Estimation entre 9 000 et 28 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Claire Fontaine', doctorDesc: 'Pionnière en chirurgie robotique colorectale, taux de survie parmi les meilleurs d\'Europe', priceFrom: 'À partir de 26 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Hakan Demir', doctorDesc: 'Spécialiste en résection laparoscopique avec récupération rapide', priceFrom: 'À partir de 13 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Youssef Amrani', doctorDesc: 'Expert en gastro-oncologie, référence au Maroc pour les protocoles FOLFOX', priceFrom: 'À partir de 9 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie hépatique': {
    description: 'Traitement des cancers du foie : résection hépatique, chimio-embolisation transartérielle, radiofréquence, transplantation hépatique et thérapies systémiques ciblées.',
    successRate: '50-70%',
    stayDuration: '7-21 jours',
    priceRange: 'Estimation entre 12 000 et 45 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Laurent Girard', doctorDesc: 'Sommité en hépato-oncologie interventionnelle, plus de 2 000 procédures réalisées', priceFrom: 'À partir de 40 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Osman Çelik', doctorDesc: 'Expert en résection hépatique complexe et chimio-embolisation', priceFrom: 'À partir de 18 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Nabil Trabelsi', doctorDesc: 'Référence tunisienne en oncologie digestive et traitements combinés', priceFrom: 'À partir de 13 000 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie pancréatique': {
    description: 'Prise en charge des tumeurs pancréatiques par procédure de Whipple, chimiothérapie FOLFIRINOX, radiothérapie conformationnelle et soins palliatifs spécialisés.',
    successRate: '20-40%',
    stayDuration: '10-21 jours',
    priceRange: 'Estimation entre 15 000 et 50 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Michel Renaud', doctorDesc: 'Chirurgien pancréatique de renommée internationale, pionnier de la procédure de Whipple modifiée', priceFrom: 'À partir de 45 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Ali Özkan', doctorDesc: 'Expert en oncologie digestive avec approche multimodale intégrée', priceFrom: 'À partir de 20 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Karim El Fassi', doctorDesc: 'Chirurgien viscéral expérimenté, meilleurs résultats post-opératoires de la région', priceFrom: 'À partir de 15 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie gastrique': {
    description: 'Traitement des cancers de l\'estomac : gastrectomie partielle ou totale, chimiothérapie péri-opératoire, immunothérapie anti-HER2 et reconstruction digestive.',
    successRate: '45-70%',
    stayDuration: '7-14 jours',
    priceRange: 'Estimation entre 10 000 et 30 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Isabelle Moreau', doctorDesc: 'Experte en gastrectomie avec curage ganglionnaire étendu, résultats au niveau japonais', priceFrom: 'À partir de 28 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Burak Aksoy', doctorDesc: 'Chirurgien gastrique reconnu pour ses techniques mini-invasives', priceFrom: 'À partir de 14 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Sami Gharbi', doctorDesc: 'Gastro-oncologue avec 20 ans d\'expérience en protocoles combinés', priceFrom: 'À partir de 10 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie rénale': {
    description: 'Traitement des cancers du rein par néphrectomie partielle ou radicale robotique, thérapies ciblées anti-angiogéniques, immunothérapie et cryothérapie.',
    successRate: '70-90%',
    stayDuration: '4-10 jours',
    priceRange: 'Estimation entre 10 000 et 30 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. François Leclerc', doctorDesc: 'Pionnier de la néphrectomie robotique partielle en France, taux de préservation rénale exceptionnel', priceFrom: 'À partir de 28 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Emre Şahin', doctorDesc: 'Expert en chirurgie urologique robotique Da Vinci', priceFrom: 'À partir de 14 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Omar Bennani', doctorDesc: 'Urologue oncologue de référence au Maroc', priceFrom: 'À partir de 10 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie vésicale': {
    description: 'Prise en charge des cancers de la vessie : résection transurétrale, instillation de BCG, cystectomie radicale avec dérivation urinaire et immunothérapie systémique.',
    successRate: '60-85%',
    stayDuration: '5-14 jours',
    priceRange: 'Estimation entre 8 000 et 25 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Thierry Aubry', doctorDesc: 'Référence en cystectomie robotique avec néo-vessie, meilleurs résultats fonctionnels', priceFrom: 'À partir de 23 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Serkan Yıldız', doctorDesc: 'Chirurgien urologue spécialisé dans les reconstructions vésicales', priceFrom: 'À partir de 12 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Lotfi Mansour', doctorDesc: 'Expert en urologie oncologique avec approche conservatrice', priceFrom: 'À partir de 8 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie prostatique': {
    description: 'Traitement du cancer de la prostate : prostatectomie robotique Da Vinci, radiothérapie IMRT, curiethérapie, hormonothérapie et surveillance active.',
    successRate: '85-98%',
    stayDuration: '3-7 jours',
    priceRange: 'Estimation entre 8 000 et 22 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Nicolas Bernard', doctorDesc: 'Leader en prostatectomie robotique, plus de 3 000 interventions avec préservation nerveuse', priceFrom: 'À partir de 20 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Murat Aydın', doctorDesc: 'Uro-oncologue reconnu pour ses techniques de préservation de la continence', priceFrom: 'À partir de 11 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Rachid Lazrak', doctorDesc: 'Meilleur urologue du Maroc pour la chirurgie prostatique mini-invasive', priceFrom: 'À partir de 8 000 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie ovarienne': {
    description: 'Traitement des cancers de l\'ovaire : chirurgie de cytoréduction maximale, chimiothérapie intrapéritonéale (CHIP), thérapies ciblées anti-PARP et suivi CA-125.',
    successRate: '45-70%',
    stayDuration: '7-14 jours',
    priceRange: 'Estimation entre 12 000 et 35 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Anne-Laure Dupont', doctorDesc: 'Experte en cytoréduction complète et CHIP, taux de rémission parmi les plus élevés d\'Europe', priceFrom: 'À partir de 32 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Ayşe Kartal', doctorDesc: 'Gynécologue oncologue spécialisée en chirurgie radicale et traitements combinés', priceFrom: 'À partir de 16 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Leïla Bouaziz', doctorDesc: 'Référence tunisienne en onco-gynécologie, approche personnalisée', priceFrom: 'À partir de 12 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie utérine': {
    description: 'Cancers de l\'endomètre : hystérectomie totale avec annexectomie, curage pelvien, radiothérapie externe, curiethérapie vaginale et hormonothérapie.',
    successRate: '75-90%',
    stayDuration: '4-10 jours',
    priceRange: 'Estimation entre 9 000 et 25 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Marie Lefèvre', doctorDesc: 'Chirurgienne gynéco-oncologique reconnue pour la préservation de la fertilité quand possible', priceFrom: 'À partir de 23 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Gül Demirci', doctorDesc: 'Onco-gynécologue avec expertise en chirurgie laparoscopique avancée', priceFrom: 'À partir de 13 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Samira Alaoui', doctorDesc: 'Meilleurs résultats de la région en chirurgie endométriale', priceFrom: 'À partir de 9 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie cervicale (col de l\'utérus)': {
    description: 'Traitement du cancer du col utérin : conisation, trachélectomie radicale, hystérectomie de Wertheim, radio-chimiothérapie concomitante et curiethérapie.',
    successRate: '70-92%',
    stayDuration: '5-12 jours',
    priceRange: 'Estimation entre 8 000 et 22 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Hélène Rousseau', doctorDesc: 'Pionnière de la trachélectomie avec préservation de fertilité en France', priceFrom: 'À partir de 20 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Zeynep Kara', doctorDesc: 'Spécialiste en radio-chimiothérapie concomitante pour cancers cervicaux', priceFrom: 'À partir de 11 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Amina Hamdi', doctorDesc: 'Chirurgienne gynécologique de référence à Tunis', priceFrom: 'À partir de 8 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie thyroïdienne': {
    description: 'Cancers thyroïdiens : thyroïdectomie totale, traitement à l\'iode radioactif, hormonothérapie suppressive et suivi par thyroglobuline.',
    successRate: '92-98%',
    stayDuration: '2-5 jours',
    priceRange: 'Estimation entre 6 000 et 18 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Patrick Vidal', doctorDesc: 'Chirurgien endocrinien reconnu pour ses thyroïdectomies sans cicatrice visible', priceFrom: 'À partir de 16 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Kemal Arslan', doctorDesc: 'Expert en chirurgie thyroïdienne mini-invasive et irathérapie', priceFrom: 'À partir de 9 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Hassan Cherkaoui', doctorDesc: 'Meilleur taux de guérison thyroïdien au Maroc', priceFrom: 'À partir de 6 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie cérébrale (tumeurs / gliomes)': {
    description: 'Tumeurs cérébrales : neurochirurgie éveillée, radiochirurgie Gamma Knife, chimiothérapie temozolomide et thérapie par champs électriques.',
    successRate: '30-65%',
    stayDuration: '7-21 jours',
    priceRange: 'Estimation entre 20 000 et 60 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Éric Delacroix', doctorDesc: 'Neuro-oncologue de renommée mondiale, pionnier de la chirurgie éveillée en France', priceFrom: 'À partir de 55 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Cem Öztürk', doctorDesc: 'Neurochirurgien expert Gamma Knife avec plus de 1 500 cas traités', priceFrom: 'À partir de 28 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Mustapha El Ouafi', doctorDesc: 'Référence en neurochirurgie oncologique au Maghreb', priceFrom: 'À partir de 20 000 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie ORL (tête et cou)': {
    description: 'Cancers de la sphère ORL (larynx, pharynx, cavité buccale) : chirurgie reconstructrice, radiothérapie IMRT et rééducation fonctionnelle.',
    successRate: '55-80%',
    stayDuration: '7-14 jours',
    priceRange: 'Estimation entre 10 000 et 30 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Guillaume Martin', doctorDesc: 'Expert en chirurgie cervico-faciale reconstructrice avec résultats esthétiques remarquables', priceFrom: 'À partir de 28 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Deniz Polat', doctorDesc: 'ORL oncologue reconnu pour ses techniques de préservation de la voix', priceFrom: 'À partir de 14 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Khaled Jomaa', doctorDesc: 'Chirurgien ORL de référence avec 18 ans d\'expérience oncologique', priceFrom: 'À partir de 10 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie cutanée (mélanome)': {
    description: 'Mélanome et cancers cutanés : exérèse avec marges, ganglion sentinelle, immunothérapie anti-PD1/anti-CTLA4 et thérapies ciblées BRAF/MEK.',
    successRate: '80-95%',
    stayDuration: '1-5 jours',
    priceRange: 'Estimation entre 5 000 et 20 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Caroline Petit', doctorDesc: 'Pionnière en immunothérapie combinée pour mélanomes avancés', priceFrom: 'À partir de 18 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Selin Aktaş', doctorDesc: 'Dermato-oncologue experte en dermoscopie numérique et dépistage précoce', priceFrom: 'À partir de 9 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Zineb Tahiri', doctorDesc: 'Meilleure dermatologue oncologue du Maroc', priceFrom: 'À partir de 5 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie osseuse (ostéosarcome)': {
    description: 'Tumeurs osseuses malignes : chimiothérapie néoadjuvante, résection segmentaire avec reconstruction prothétique et chirurgie de conservation du membre.',
    successRate: '60-75%',
    stayDuration: '10-21 jours',
    priceRange: 'Estimation entre 15 000 et 40 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Olivier Lambert', doctorDesc: 'Sommité mondiale en chirurgie de conservation du membre pour sarcomes osseux', priceFrom: 'À partir de 38 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Barış Koç', doctorDesc: 'Expert en reconstruction prothétique post-résection tumorale', priceFrom: 'À partir de 18 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Abdelkader Hmidouch', doctorDesc: 'Chirurgien orthopédiste de référence pour les tumeurs osseuses au Maroc', priceFrom: 'À partir de 15 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie des tissus mous (sarcomes)': {
    description: 'Sarcomes des tissus mous : résection chirurgicale large, radiothérapie péri-opératoire, chimiothérapie à base de doxorubicine et suivi par IRM.',
    successRate: '55-75%',
    stayDuration: '5-14 jours',
    priceRange: 'Estimation entre 12 000 et 35 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Stéphane Morin', doctorDesc: 'Chirurgien oncologue spécialisé sarcomes, centre de référence national', priceFrom: 'À partir de 32 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Canan Bayram', doctorDesc: 'Oncologue reconnue pour ses protocoles combinés chirurgie-radiothérapie', priceFrom: 'À partir de 16 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Fathi Meddeb', doctorDesc: 'Expert en résection large avec marges saines, meilleur taux de la région', priceFrom: 'À partir de 12 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie œsophagienne': {
    description: 'Cancer de l\'œsophage : œsophagectomie mini-invasive, radio-chimiothérapie néoadjuvante, dilatation endoscopique et support nutritionnel intégré.',
    successRate: '35-55%',
    stayDuration: '10-21 jours',
    priceRange: 'Estimation entre 15 000 et 45 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Didier Favre', doctorDesc: 'Leader en œsophagectomie mini-invasive, meilleurs résultats post-opératoires de France', priceFrom: 'À partir de 42 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Uğur Erdem', doctorDesc: 'Chirurgien digestif expert en approche thoraco-abdominale combinée', priceFrom: 'À partir de 18 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Driss Belhaj', doctorDesc: 'Chirurgien viscéral avec forte expertise œsophagienne', priceFrom: 'À partir de 15 000 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie testiculaire': {
    description: 'Tumeurs testiculaires : orchidectomie radicale, chimiothérapie BEP, curage ganglionnaire et cryoconservation de sperme pré-traitement.',
    successRate: '92-98%',
    stayDuration: '2-7 jours',
    priceRange: 'Estimation entre 6 000 et 18 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Antoine Mercier', doctorDesc: 'Uro-oncologue avec le meilleur taux de préservation de fertilité post-traitement', priceFrom: 'À partir de 16 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Tolga Demirtaş', doctorDesc: 'Expert en chirurgie testiculaire conservatrice et suivi oncologique', priceFrom: 'À partir de 9 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Riadh Korbi', doctorDesc: 'Chirurgien urologue réputé, excellents résultats en oncologie testiculaire', priceFrom: 'À partir de 6 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },

  // ── Par discipline ──────────────────────────────────────────────────
  'Oncologie médicale': {
    description: 'Spécialité coordonnant les traitements systémiques : chimiothérapie, immunothérapie, thérapies ciblées et hormonothérapie. Plan personnalisé de soins.',
    successRate: 'Variable selon cancer',
    stayDuration: '1-3 jours par cure',
    priceRange: 'À partir de 3 000 € par cure',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Véronique Cazals', doctorDesc: 'Directrice d\'oncologie médicale, pionnière des protocoles d\'immunothérapie personnalisés', priceFrom: 'À partir de 12 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Fatih Güneş', doctorDesc: 'Oncologue médical expert en thérapies combinées de dernière génération', priceFrom: 'À partir de 6 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Naima Benjelloun', doctorDesc: 'Référence marocaine en oncologie médicale, approche humaine et personnalisée', priceFrom: 'À partir de 3 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Oncologie chirurgicale': {
    description: 'Chirurgie curative des tumeurs solides : exérèse complète avec marges saines, curage ganglionnaire, chirurgie robotique et reconstructrice.',
    successRate: '60-90%',
    stayDuration: '3-14 jours',
    priceRange: 'Estimation entre 8 000 et 35 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Marc Beaumont', doctorDesc: 'Chirurgien oncologue multi-organes avec plus de 4 000 interventions', priceFrom: 'À partir de 30 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. İlker Tuncer', doctorDesc: 'Expert en chirurgie oncologique mini-invasive et robotique', priceFrom: 'À partir de 15 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Mondher Zitouni', doctorDesc: 'Meilleur chirurgien oncologue de Tunisie, résultats reconnus internationalement', priceFrom: 'À partir de 8 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Radio-oncologie / Radiothérapie': {
    description: 'Irradiation ciblée : radiothérapie conformationnelle 3D, IMRT, stéréotaxie et protonthérapie. Traitement curatif, adjuvant ou palliatif.',
    successRate: '70-90%',
    stayDuration: '1-6 semaines (ambulatoire)',
    priceRange: 'Estimation entre 5 000 et 25 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Christophe Hennequin', doctorDesc: 'Sommité européenne en radiothérapie de précision et protonthérapie', priceFrom: 'À partir de 22 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Ayhan Çetin', doctorDesc: 'Radiothérapeute expert en IMRT et techniques stéréotaxiques', priceFrom: 'À partir de 10 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Souad El Khatib', doctorDesc: 'Pionnière de la radiothérapie moderne au Maroc', priceFrom: 'À partir de 5 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Hématologie oncologique (leucémies, lymphomes, myélomes)': {
    description: 'Cancers du sang : chimiothérapie intensive, immunothérapie anti-CD20, greffe de moelle osseuse et thérapie CAR-T cells.',
    successRate: '50-85%',
    stayDuration: '14-45 jours',
    priceRange: 'Estimation entre 20 000 et 80 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Denis Lacombe', doctorDesc: 'Hématologue de renommée mondiale, pionnier des greffes allogéniques en France', priceFrom: 'À partir de 70 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Gökhan Barış', doctorDesc: 'Centre de référence turc pour les greffes de moelle avec taux de réussite exceptionnel', priceFrom: 'À partir de 35 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Khalid Menebhi', doctorDesc: 'Hématologue de référence au Maroc, prise en charge globale et humaine', priceFrom: 'À partir de 22 000 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Onco-pédiatrie': {
    description: 'Oncologie spécialisée enfants et adolescents : leucémies, tumeurs cérébrales, neuroblastomes. Protocoles adaptés et accompagnement familial.',
    successRate: '75-90%',
    stayDuration: '7-30 jours',
    priceRange: 'Estimation entre 15 000 et 50 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Nathalie Gaspar', doctorDesc: 'Onco-pédiatre de référence européenne, pionnière des essais cliniques pédiatriques', priceFrom: 'À partir de 45 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Pınar Özdemir', doctorDesc: 'Centre d\'excellence turc en hémato-oncologie pédiatrique', priceFrom: 'À partir de 22 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Laïla Haddad', doctorDesc: 'Meilleure pédiatre oncologue du Maroc, approche humaine reconnue', priceFrom: 'À partir de 15 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Onco-gériatrie': {
    description: 'Oncologie adaptée aux patients âgés : évaluation gériatrique globale, ajustement des protocoles et optimisation de la qualité de vie.',
    successRate: 'Variable selon profil',
    stayDuration: '3-14 jours',
    priceRange: 'Estimation entre 5 000 et 20 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Brigitte Perrot', doctorDesc: 'Pionnière de l\'onco-gériatrie en France, approche centrée sur la qualité de vie', priceFrom: 'À partir de 18 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Levent Türkmen', doctorDesc: 'Oncologue expert en adaptation des traitements pour patients fragiles', priceFrom: 'À partir de 9 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Hédi Kallel', doctorDesc: 'Onco-gériatre de référence en Tunisie', priceFrom: 'À partir de 5 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Onco-gynécologie': {
    description: 'Cancers gynécologiques (ovaire, endomètre, col, vulve) : chirurgie radicale, CHIP, radio-chimiothérapie et préservation de la fertilité.',
    successRate: '60-85%',
    stayDuration: '5-14 jours',
    priceRange: 'Estimation entre 10 000 et 30 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Sylvie Giacchetti', doctorDesc: 'Onco-gynécologue de renommée internationale, experte CHIP et cytoréduction', priceFrom: 'À partir de 28 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Banu Çakır', doctorDesc: 'Gynécologue oncologue avec expertise en chirurgie robotique gynécologique', priceFrom: 'À partir de 14 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Imen Bouchnak', doctorDesc: 'Chirurgienne gynécologique reconnue pour ses résultats en oncologie pelvienne', priceFrom: 'À partir de 10 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Neuro-oncologie': {
    description: 'Tumeurs du système nerveux central : gliomes, méningiomes, métastases cérébrales. Neurochirurgie + radiothérapie + chimiothérapie.',
    successRate: '30-70%',
    stayDuration: '7-21 jours',
    priceRange: 'Estimation entre 18 000 et 55 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Philippe Cornu', doctorDesc: 'Neuro-oncologue mondialement reconnu, inventeur de techniques neurochirurgicales avancées', priceFrom: 'À partir de 50 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Volkan Ateş', doctorDesc: 'Neurochirurgien expert en résection tumorale guidée par fluorescence', priceFrom: 'À partir de 25 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Amine Ibrahimi', doctorDesc: 'Référence en neuro-oncologie au Maghreb', priceFrom: 'À partir de 18 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Onco-dermatologie': {
    description: 'Cancers cutanés : mélanome, carcinomes. Dermoscopie numérique, chirurgie de Mohs, immunothérapie et photothérapie dynamique.',
    successRate: '85-98%',
    stayDuration: '1-3 jours',
    priceRange: 'Estimation entre 3 000 et 15 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Marie-Thérèse Leccia', doctorDesc: 'Dermato-oncologue de référence, pionnière de la chirurgie de Mohs en France', priceFrom: 'À partir de 13 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Nihan Yücel', doctorDesc: 'Experte en dermoscopie numérique avancée et dépistage précoce', priceFrom: 'À partir de 7 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Yassine Mokni', doctorDesc: 'Meilleur dermatologue oncologue de Tunisie', priceFrom: 'À partir de 3 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Onco-urologie': {
    description: 'Cancers urologiques (rein, vessie, prostate, testicule) : chirurgie robotique Da Vinci, immunothérapie et hormonothérapie.',
    successRate: '70-95%',
    stayDuration: '3-10 jours',
    priceRange: 'Estimation entre 8 000 et 25 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Arnaud Méjean', doctorDesc: 'Uro-oncologue leader en chirurgie robotique, plus de 5 000 procédures', priceFrom: 'À partir de 23 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Selim Aktürk', doctorDesc: 'Expert en chirurgie urologique oncologique mini-invasive', priceFrom: 'À partir de 12 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Tariq Oulhaj', doctorDesc: 'Urologue oncologue de référence au Maroc', priceFrom: 'À partir de 8 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },

  // ── Traitements & procédures ────────────────────────────────────────
  'Immunothérapie (anti-PD1, CAR-T)': {
    description: 'Traitements stimulant le système immunitaire : anticorps anti-PD1/PDL1, anti-CTLA4 et thérapie cellulaire CAR-T pour les cancers réfractaires.',
    successRate: '30-60%',
    stayDuration: '1-14 jours',
    priceRange: 'Estimation entre 10 000 et 100 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Aurélien Marabelle', doctorDesc: 'Leader mondial en immunothérapie oncologique, investigateur principal de nombreux essais', priceFrom: 'À partir de 85 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Can Yılmaz', doctorDesc: 'Oncologue expert en protocoles d\'immunothérapie combinée', priceFrom: 'À partir de 40 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Asmae El Amrani', doctorDesc: 'Pionnière de l\'accès à l\'immunothérapie en Afrique du Nord', priceFrom: 'À partir de 12 000 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Thérapies ciblées moléculaires': {
    description: 'Médicaments ciblant les anomalies moléculaires des cellules tumorales : inhibiteurs de tyrosine kinase, anti-HER2, anti-EGFR. Traitement personnalisé par profilage génomique.',
    successRate: '40-70%',
    stayDuration: 'Ambulatoire',
    priceRange: 'À partir de 3 000 € par mois',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Fabrice André', doctorDesc: 'Oncologue moléculaire de renommée mondiale, expert en médecine de précision', priceFrom: 'À partir de 7 500 €/mois', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Ebru Tan', doctorDesc: 'Experte en profilage génomique tumoral et thérapies personnalisées', priceFrom: 'À partir de 4 500 €/mois', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Rym Belhaj', doctorDesc: 'Pharmacologue oncologue, accès aux molécules de dernière génération', priceFrom: 'À partir de 3 200 €/mois', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Hormonothérapie': {
    description: 'Traitement anti-hormonal pour cancers hormonodépendants (sein, prostate) : tamoxifène, inhibiteurs d\'aromatase, agonistes LHRH. Durée 5-10 ans.',
    successRate: '70-85%',
    stayDuration: 'Ambulatoire',
    priceRange: 'À partir de 500 € par an',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Suzette Delaloge', doctorDesc: 'Experte en hormonothérapie adjuvante, résultats de survie exceptionnels', priceFrom: 'À partir de 2 800 €/an', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Yasemin Bal', doctorDesc: 'Oncologue spécialisée dans l\'optimisation des traitements hormonaux', priceFrom: 'À partir de 1 200 €/an', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Salma Iraqi', doctorDesc: 'Prise en charge complète et suivi à long terme des traitements hormonaux', priceFrom: 'À partir de 600 €/an', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Protonthérapie': {
    description: 'Radiothérapie haute précision par faisceaux de protons épargnant les tissus sains. Tumeurs pédiatriques, base du crâne et oculaires.',
    successRate: '80-95%',
    stayDuration: '3-7 semaines (ambulatoire)',
    priceRange: 'Estimation entre 30 000 et 80 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Rémi Dendale', doctorDesc: 'Directeur du centre de protonthérapie de l\'Institut Curie, référence mondiale', priceFrom: 'À partir de 70 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Hasan Çağlar', doctorDesc: 'Expert en protonthérapie pour tumeurs pédiatriques et de la base du crâne', priceFrom: 'À partir de 40 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Zakaria Mernissi', doctorDesc: 'Radio-oncologue orientant vers les meilleurs centres de protonthérapie', priceFrom: 'À partir de 30 000 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Curiethérapie': {
    description: 'Radiothérapie interne par sources radioactives au contact de la tumeur. Col utérin, prostate, sein et ORL.',
    successRate: '75-92%',
    stayDuration: '1-5 jours',
    priceRange: 'Estimation entre 4 000 et 15 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Christine Haie-Meder', doctorDesc: 'Pionnière mondiale de la curiethérapie adaptative guidée par IRM', priceFrom: 'À partir de 13 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Neslihan Kaya', doctorDesc: 'Radio-oncologue experte en curiethérapie à haut débit de dose', priceFrom: 'À partir de 7 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Slim Khelifi', doctorDesc: 'Référence en curiethérapie gynécologique en Tunisie', priceFrom: 'À partir de 4 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Radiochirurgie stéréotaxique (Gamma Knife, CyberKnife)': {
    description: 'Irradiation ultra-précise sans incision. Gamma Knife pour lésions cérébrales, CyberKnife pour tumeurs mobiles (poumon, foie, rachis).',
    successRate: '85-95%',
    stayDuration: '1-3 jours',
    priceRange: 'Estimation entre 8 000 et 25 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Marc Levivier', doctorDesc: 'Neurochirurgien stéréotaxique de réputation internationale, inventeur de protocoles avancés', priceFrom: 'À partir de 22 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Selçuk Peker', doctorDesc: 'Expert Gamma Knife avec plus de 3 000 traitements réalisés', priceFrom: 'À partir de 12 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Khalil Bouyousfi', doctorDesc: 'Neurochirurgien formé aux techniques stéréotaxiques avancées', priceFrom: 'À partir de 8 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Chirurgie robotique oncologique': {
    description: 'Chirurgie mini-invasive assistée par robot Da Vinci : prostatectomie, hystérectomie, lobectomie. Précision accrue et récupération rapide.',
    successRate: '80-95%',
    stayDuration: '2-7 jours',
    priceRange: 'Estimation entre 10 000 et 30 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Guy Vallancien', doctorDesc: 'Père de la chirurgie robotique en France, plus de 6 000 procédures Da Vinci', priceFrom: 'À partir de 28 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Volkan Tuğcu', doctorDesc: 'Chirurgien robotique reconnu internationalement pour ses innovations techniques', priceFrom: 'À partir de 14 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Amine Derouiche', doctorDesc: 'Pionnier de la chirurgie mini-invasive oncologique en Tunisie', priceFrom: 'À partir de 10 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'CHIP (chimiothérapie intrapéritonéale)': {
    description: 'Chimiothérapie hyperthermique dans l\'abdomen après cytoréduction chirurgicale. Référence pour carcinoses péritonéales (ovaire, côlon, estomac).',
    successRate: '40-65%',
    stayDuration: '10-21 jours',
    priceRange: 'Estimation entre 20 000 et 50 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Diane Goéré', doctorDesc: 'Pionnière de la CHIP en France, plus de 800 procédures avec les meilleurs résultats européens', priceFrom: 'À partir de 45 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Yiğit Çelik', doctorDesc: 'Chirurgien digestif expert en cytoréduction et CHIP combinées', priceFrom: 'À partir de 22 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Bilel Chouchane', doctorDesc: 'Chirurgien viscéral formé à la CHIP dans les meilleurs centres européens', priceFrom: 'À partir de 20 000 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Embolisation tumorale': {
    description: 'Radiologie interventionnelle coupant l\'apport sanguin de la tumeur par injection de micro-particules. Tumeurs hépatiques, rénales et utérines.',
    successRate: '60-80%',
    stayDuration: '2-5 jours',
    priceRange: 'Estimation entre 5 000 et 15 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Thierry de Baère', doctorDesc: 'Radiologue interventionnel de renommée mondiale, inventeur de techniques d\'embolisation', priceFrom: 'À partir de 14 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Oğuz Dicle', doctorDesc: 'Expert en embolisation hépatique et rénale guidée par imagerie', priceFrom: 'À partir de 7 500 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Samir Benyahia', doctorDesc: 'Meilleur radiologue interventionnel du Maroc', priceFrom: 'À partir de 5 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Ablation par radiofréquence': {
    description: 'Destruction percutanée des tumeurs par chaleur guidée par imagerie. Petites tumeurs hépatiques, rénales et pulmonaires.',
    successRate: '70-90%',
    stayDuration: '1-3 jours',
    priceRange: 'Estimation entre 4 000 et 12 000 €',
    top3: [
      { clinicName: 'Hôpital Américain de Paris', countryCode: 'fr', doctorName: 'Pr. Frédéric Deschamps', doctorDesc: 'Radiologue interventionnel expert, plus de 2 000 ablations réalisées', priceFrom: 'À partir de 11 000 €', rating: 5.0, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Erhan Bayramoğlu', doctorDesc: 'Expert en ablation percutanée guidée par échographie et scanner', priceFrom: 'À partir de 6 000 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Anis Haddaoui', doctorDesc: 'Radiologue interventionnel de référence à Tunis', priceFrom: 'À partir de 4 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Greffe de moelle osseuse': {
    description: 'Transplantation de cellules souches hématopoïétiques après chimiothérapie intensive. Traitement curatif pour leucémies, lymphomes et myélomes réfractaires.',
    successRate: '50-80%',
    stayDuration: '21-60 jours',
    priceRange: 'Estimation entre 30 000 et 120 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Jean-Paul Vernant', doctorDesc: 'Hématologue greffeur de renommée internationale, centre de référence français', priceFrom: 'À partir de 100 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Zafer Gülbaş', doctorDesc: 'Centre de greffe turc avec les meilleurs résultats de survie du bassin méditerranéen', priceFrom: 'À partir de 50 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Mohammed Chakour', doctorDesc: 'Hématologue de référence, premier centre de greffe du Maroc', priceFrom: 'À partir de 32 000 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Diagnostic génomique et profilage tumoral': {
    description: 'Analyse moléculaire complète par séquençage NGS pour identifier les mutations actionnables et orienter vers les thérapies ciblées les plus efficaces.',
    successRate: 'Diagnostic',
    stayDuration: '1 jour',
    priceRange: 'Estimation entre 2 000 et 8 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Ivan Bièche', doctorDesc: 'Biologiste moléculaire leader en France, plateforme de séquençage de référence', priceFrom: 'À partir de 7 000 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Elif Sakallı', doctorDesc: 'Génomicienne clinique avec accès aux panels les plus complets', priceFrom: 'À partir de 4 000 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Clinique Pasteur', countryCode: 'tn', doctorName: 'Dr. Nesrine Mlika', doctorDesc: 'Pathologiste moléculaire, analyses génomiques de haute qualité', priceFrom: 'À partir de 2 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Biopsie liquide': {
    description: 'Prise de sang détectant l\'ADN tumoral circulant pour diagnostic, suivi thérapeutique et détection précoce des récidives sans biopsie invasive.',
    successRate: 'Diagnostic',
    stayDuration: 'Ambulatoire',
    priceRange: 'Estimation entre 500 et 3 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. François-Clément Bidard', doctorDesc: 'Pionnier de la biopsie liquide en oncologie, publications de référence mondiale', priceFrom: 'À partir de 2 800 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Acibadem Hospital', countryCode: 'tr', doctorName: 'Dr. Ahmet Sezer', doctorDesc: 'Oncologue expert en monitoring tumoral par ctDNA', priceFrom: 'À partir de 1 500 €', rating: 4.9, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Ikram Baili', doctorDesc: 'Biologiste de pointe, laboratoire équipé pour les analyses ctDNA', priceFrom: 'À partir de 600 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
  'Second avis oncologique': {
    description: 'Consultation d\'expertise pour valider ou réorienter un diagnostic ou plan de traitement oncologique. Analyse complète du dossier médical.',
    successRate: '30% de réorientation',
    stayDuration: '1-2 jours',
    priceRange: 'Estimation entre 500 et 3 000 €',
    top3: [
      { clinicName: 'Institut Curie', countryCode: 'fr', doctorName: 'Pr. Steven Le Gouill', doctorDesc: 'Directeur médical oncologie, avis de référence pour les cas complexes', priceFrom: 'À partir de 2 500 €', rating: 4.9, badge: 'meilleur-resultat' },
      { clinicName: 'Memorial Şişli Hospital', countryCode: 'tr', doctorName: 'Dr. Adnan Aydıner', doctorDesc: 'Oncologue sénior avec 30 ans d\'expérience en cas complexes', priceFrom: 'À partir de 1 200 €', rating: 4.8, badge: 'recommande' },
      { clinicName: 'Hôpital Cheikh Zaid', countryCode: 'ma', doctorName: 'Dr. Nawfel Mellas', doctorDesc: 'Oncologue reconnu pour ses avis éclairés et son approche collaborative', priceFrom: 'À partir de 500 €', rating: 4.9, badge: 'meilleur-prix' },
    ],
  },
}

/* ══════════════════════════════════════════════════════════════════════
   REGISTRE GLOBAL — on ajoutera les autres spécialités batch par batch
   ══════════════════════════════════════════════════════════════════════ */
export const SUBSPECIALTY_DETAILS: Record<string, SubSpecialtyDetail> = {
  ...ONCOLOGIE,
}
