/**
 * SERVICES INCLUS — données détaillées pour le panel navbar
 * Chaque service a une description enrichie, les étapes clés et les avantages
 */

export interface ServiceDetail {
  headline:    string
  description: string
  steps:       { title: string; desc: string }[]
  highlights:  string[]
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {

  'Constitution du Dossier': {
    headline: 'Un dossier médical complet, préparé par nos experts',
    description: 'Notre équipe médicale prend en charge l\'intégralité de votre dossier : collecte des documents, traduction certifiée, analyse par un comité d\'experts et transmission sécurisée aux établissements partenaires.',
    steps: [
      { title: 'Collecte des documents', desc: 'Imageries, bilans sanguins, comptes-rendus opératoires, ordonnances — nous listons précisément ce dont vous avez besoin.' },
      { title: 'Traduction certifiée', desc: 'Traduction médicale par des professionnels assermentés dans la langue du pays de destination.' },
      { title: 'Comité d\'experts', desc: 'Votre dossier est analysé par un comité médical pluridisciplinaire qui valide la faisabilité et oriente vers le meilleur établissement.' },
      { title: 'Transmission sécurisée', desc: 'Envoi crypté et conforme RGPD directement aux équipes médicales de l\'établissement choisi.' },
    ],
    highlights: [
      'Dossier prêt en 48 à 72 heures',
      'Traduction certifiée incluse',
      'Validation par comité médical',
      'Confidentialité et conformité RGPD',
    ],
  },

  'Visa Médical': {
    headline: 'Votre visa médical obtenu sans stress',
    description: 'Nous prenons en charge toutes les démarches administratives liées à l\'obtention de votre visa médical : lettre d\'invitation de l\'établissement, constitution du dossier consulaire et suivi jusqu\'à l\'obtention.',
    steps: [
      { title: 'Lettre d\'invitation', desc: 'L\'établissement partenaire émet une lettre officielle d\'invitation médicale, document clé pour votre demande de visa.' },
      { title: 'Constitution du dossier', desc: 'Nous préparons l\'ensemble des pièces requises : formulaire, photos, justificatifs financiers, attestation d\'hébergement.' },
      { title: 'Dépôt et suivi', desc: 'Accompagnement au dépôt de la demande et suivi actif auprès du consulat jusqu\'à l\'obtention du visa.' },
      { title: 'Assistance d\'urgence', desc: 'En cas de délai serré, activation de la procédure accélérée avec nos contacts consulaires.' },
    ],
    highlights: [
      'Taux d\'obtention supérieur à 95%',
      'Procédure accélérée disponible',
      'Accompagnement personnalisé',
      'Lettre d\'invitation officielle',
    ],
  },

  'Billetterie Aérienne': {
    headline: 'Vos vols organisés aux meilleurs tarifs',
    description: 'Réservation et gestion complète de vos vols internationaux : recherche des meilleurs tarifs, flexibilité des dates selon le planning médical et accompagnement pour les patients à mobilité réduite.',
    steps: [
      { title: 'Recherche tarifaire', desc: 'Comparaison des meilleures options sur toutes les compagnies avec priorité aux vols directs et aux horaires adaptés.' },
      { title: 'Coordination médicale', desc: 'Dates de vol synchronisées avec le planning opératoire et les rendez-vous pré/post-opératoires.' },
      { title: 'Réservation et émission', desc: 'Billet émis avec assurance annulation médicale et options de modification flexibles.' },
      { title: 'Assistance spéciale', desc: 'Organisation de l\'assistance aéroportuaire, fauteuil roulant, civière médicale si nécessaire.' },
    ],
    highlights: [
      'Tarifs négociés avec les compagnies',
      'Flexibilité de modification incluse',
      'Assistance mobilité réduite',
      'Assurance annulation médicale',
    ],
  },

  'Transferts VIP': {
    headline: 'Transport privé, de l\'aéroport à la clinique',
    description: 'Service de transport terrestre privé couvrant tous vos déplacements : accueil personnalisé à l\'aéroport, transferts clinique-hôtel et mise à disposition d\'un véhicule avec chauffeur pendant votre séjour.',
    steps: [
      { title: 'Accueil aéroport', desc: 'Chauffeur avec panneau nominatif à la sortie des arrivées, prise en charge des bagages et transfert direct.' },
      { title: 'Transferts quotidiens', desc: 'Navettes entre votre hébergement et l\'établissement médical, à chaque rendez-vous et intervention.' },
      { title: 'Véhicule dédié', desc: 'Berline ou minivan climatisé selon vos besoins, avec chauffeur professionnel bilingue.' },
      { title: 'Transfert retour', desc: 'Acheminement à l\'aéroport le jour du départ, avec marge de sécurité et assistance bagages.' },
    ],
    highlights: [
      'Véhicule privé avec chauffeur',
      'Disponible 24h/24',
      'Chauffeur bilingue',
      'Accueil personnalisé aéroport',
    ],
  },

  'Hébergement': {
    headline: 'Hôtels premium à proximité de votre clinique',
    description: 'Sélection d\'hôtels partenaires de qualité à proximité immédiate des établissements médicaux. Chambres adaptées aux patients en convalescence, avec services spéciaux et tarifs préférentiels négociés.',
    steps: [
      { title: 'Sélection personnalisée', desc: 'Choix d\'hôtels selon la proximité de l\'établissement, le niveau de confort souhaité et votre budget.' },
      { title: 'Réservation garantie', desc: 'Chambre réservée avec confirmation immédiate et conditions d\'annulation flexibles.' },
      { title: 'Services adaptés', desc: 'Régime alimentaire spécial, lit médicalisé, chambre communicante pour l\'accompagnant si nécessaire.' },
      { title: 'Conciergerie', desc: 'Service de conciergerie pour toute demande pendant votre séjour : restaurant, pharmacie, courses.' },
    ],
    highlights: [
      'Tarifs préférentiels négociés',
      'Proximité immédiate des cliniques',
      'Chambres adaptées convalescence',
      'Annulation flexible',
    ],
  },

  'Interprétariat': {
    headline: 'Un interprète dédié tout au long de votre séjour',
    description: 'Traducteur professionnel natif mis à votre disposition pour chaque consultation, intervention et interaction avec les équipes médicales. Communication fluide garantie dans votre langue maternelle.',
    steps: [
      { title: 'Attribution d\'un interprète', desc: 'Interprète professionnel natif, formé au vocabulaire médical, assigné dès votre arrivée.' },
      { title: 'Consultations médicales', desc: 'Présence à chaque rendez-vous pour traduire les échanges avec les médecins et infirmiers.' },
      { title: 'Documents et consentements', desc: 'Explication détaillée de tous les documents à signer : consentements, protocoles, prescriptions.' },
      { title: 'Disponibilité étendue', desc: 'Joignable par téléphone en dehors des rendez-vous pour toute question ou urgence.' },
    ],
    highlights: [
      'Interprète médical certifié',
      'Disponible pendant tout le séjour',
      'Vocabulaire médical spécialisé',
      'Accompagnement humain et rassurant',
    ],
  },

  'Assurance Voyage': {
    headline: 'Couverture complète, sérénité totale',
    description: 'Assurance voyage et santé internationale couvrant les complications médicales, le rapatriement sanitaire, l\'annulation et la prolongation de séjour en cas de nécessité médicale.',
    steps: [
      { title: 'Souscription simplifiée', desc: 'Formulaire unique, couverture activée immédiatement après validation de votre dossier.' },
      { title: 'Couverture médicale', desc: 'Prise en charge des complications post-opératoires, hospitalisations imprévues et médicaments.' },
      { title: 'Rapatriement sanitaire', desc: 'Garantie de rapatriement par avion médicalisé en cas de nécessité, sans franchise.' },
      { title: 'Prolongation de séjour', desc: 'Couverture étendue automatiquement si prolongation médicalement justifiée.' },
    ],
    highlights: [
      'Rapatriement sanitaire inclus',
      'Complications couvertes',
      'Prolongation automatique si nécessaire',
      'Aucune franchise',
    ],
  },

  'Suivi Post-Opératoire': {
    headline: 'Continuité des soins après votre retour',
    description: 'Programme de suivi médical à distance après votre retour : téléconsultations avec le chirurgien, transmission des résultats d\'analyses et coordination avec votre médecin traitant local.',
    steps: [
      { title: 'Planning de suivi', desc: 'Calendrier personnalisé de consultations de contrôle : J+7, J+15, J+30, J+90 selon l\'intervention.' },
      { title: 'Téléconsultations', desc: 'Rendez-vous vidéo sécurisé avec votre chirurgien pour évaluation de la cicatrisation et ajustement du traitement.' },
      { title: 'Transmission des résultats', desc: 'Envoi sécurisé de vos analyses et imageries de contrôle à l\'équipe médicale du pays de soins.' },
      { title: 'Coordination locale', desc: 'Mise en relation avec votre médecin traitant, partage du protocole post-opératoire et des recommandations.' },
    ],
    highlights: [
      'Suivi jusqu\'à 12 mois',
      'Téléconsultation avec le chirurgien',
      'Coordination médecin traitant',
      'Plateforme sécurisée',
    ],
  },
}

/* ── SERVICES PREMIUM — détails pour le panel navbar ──────────────── */

export const PREMIUM_SERVICE_DETAILS: Record<string, ServiceDetail> = {

  'Accompagnateur Médical Dédié': {
    headline: 'Un professionnel de santé à vos côtés, du début à la fin',
    description: 'Un infirmier ou coordinateur médical expérimenté vous accompagne personnellement durant tout votre séjour : de l\'accueil à l\'aéroport jusqu\'au suivi post-opératoire sur place.',
    steps: [
      { title: 'Briefing pré-départ', desc: 'Appel vidéo avec votre accompagnateur pour préparer le séjour, revoir le protocole et répondre à vos questions.' },
      { title: 'Accueil et installation', desc: 'Votre accompagnateur vous retrouve dès l\'arrivée et reste présent à chaque rendez-vous médical.' },
      { title: 'Présence en clinique', desc: 'Présent le jour de l\'intervention et pendant la phase de récupération en établissement.' },
      { title: 'Suivi quotidien', desc: 'Visite quotidienne à l\'hôtel, contrôle des paramètres, gestion des médicaments et lien direct avec l\'équipe médicale.' },
    ],
    highlights: [
      'Professionnel de santé certifié',
      'Disponible 24h/24 pendant le séjour',
      'Lien direct avec l\'équipe médicale',
      'Accompagnement humain et rassurant',
    ],
  },

  'Chambre VIP en Clinique': {
    headline: 'Le confort d\'un hôtel 5 étoiles, dans votre clinique',
    description: 'Suite privée au sein de l\'établissement médical : espace salon, lit accompagnant, restauration premium, Wi-Fi haut débit et services hôteliers haut de gamme pour une convalescence optimale.',
    steps: [
      { title: 'Réservation de la suite', desc: 'Sélection de la chambre VIP selon disponibilité et durée de séjour, avec confirmation garantie.' },
      { title: 'Installation premium', desc: 'Suite privée avec lit accompagnant, espace salon, écran plat, minibar et vue dégagée.' },
      { title: 'Restauration sur mesure', desc: 'Menus élaborés par un chef, adaptés à votre régime post-opératoire et vos préférences.' },
      { title: 'Services conciergerie', desc: 'Pressing, journaux, fleurs, appels internationaux — tout est géré par l\'équipe dédiée.' },
    ],
    highlights: [
      'Suite privée avec salon',
      'Lit accompagnant inclus',
      'Restauration gastronomique adaptée',
      'Services hôteliers complets',
    ],
  },

  'Second Avis International': {
    headline: 'La certitude d\'un double regard médical',
    description: 'Avant toute intervention, votre dossier est soumis à un expert d\'un second pays pour validation indépendante du diagnostic, du protocole proposé et des alternatives thérapeutiques.',
    steps: [
      { title: 'Transmission du dossier', desc: 'Votre dossier médical complet est envoyé de manière sécurisée à un spécialiste d\'un second pays.' },
      { title: 'Analyse indépendante', desc: 'L\'expert analyse le diagnostic, le protocole et les alternatives sans influence du premier avis.' },
      { title: 'Rapport détaillé', desc: 'Vous recevez un rapport complet avec les conclusions, recommandations et éventuelles alternatives.' },
      { title: 'Consultation de synthèse', desc: 'Appel vidéo avec nos coordinateurs pour croiser les deux avis et prendre votre décision en toute sérénité.' },
    ],
    highlights: [
      'Expert d\'un second pays',
      'Analyse 100% indépendante',
      'Rapport détaillé sous 5 jours',
      'Sérénité avant l\'intervention',
    ],
  },

  'Conciergerie 24/7': {
    headline: 'Une ligne directe dédiée, jour et nuit',
    description: 'Numéro personnel avec un interlocuteur unique qui gère toutes vos demandes pendant le séjour : médicales, logistiques ou personnelles, 7 jours sur 7, 24 heures sur 24.',
    steps: [
      { title: 'Attribution d\'un concierge', desc: 'Un interlocuteur unique vous est assigné avant le départ, avec ligne directe WhatsApp et téléphone.' },
      { title: 'Demandes médicales', desc: 'Questions post-consultation, renouvellement d\'ordonnance, prise de rendez-vous complémentaire.' },
      { title: 'Demandes logistiques', desc: 'Modification de vol, réservation restaurant, pharmacie, courses — tout est géré pour vous.' },
      { title: 'Urgences', desc: 'En cas d\'urgence médicale, votre concierge coordonne immédiatement avec l\'équipe soignante.' },
    ],
    highlights: [
      'Interlocuteur unique dédié',
      'Disponible 24h/24, 7j/7',
      'WhatsApp + téléphone',
      'Coordination d\'urgence',
    ],
  },

  'Programme de Récupération': {
    headline: 'Convalescence encadrée en résidence médicalisée',
    description: 'Séjour de récupération dans une résidence partenaire spécialisée : kinésithérapie quotidienne, soins infirmiers, suivi médical et environnement calme pour une guérison optimale.',
    steps: [
      { title: 'Transfert post-clinique', desc: 'Transport médicalisé de la clinique vers la résidence de convalescence partenaire.' },
      { title: 'Programme personnalisé', desc: 'Plan de récupération établi par votre chirurgien : kinésithérapie, soins, mobilisation progressive.' },
      { title: 'Soins quotidiens', desc: 'Pansements, contrôle des paramètres, kinésithérapie et suivi infirmier matin et soir.' },
      { title: 'Validation de sortie', desc: 'Consultation finale avec le médecin de la résidence avant autorisation de retour.' },
    ],
    highlights: [
      'Résidence médicalisée partenaire',
      'Kinésithérapie quotidienne',
      'Suivi infirmier continu',
      'Environnement calme et sécurisé',
    ],
  },

  'Évacuation Sanitaire Express': {
    headline: 'Rapatriement médicalisé sous 24 heures',
    description: 'En cas de complication majeure, activation immédiate d\'un rapatriement par avion médicalisé avec équipe soignante à bord, vers l\'hôpital de votre choix dans votre pays d\'origine.',
    steps: [
      { title: 'Déclenchement', desc: 'Activation immédiate sur décision médicale — notre cellule EVASAN est opérationnelle 24h/24.' },
      { title: 'Coordination médicale', desc: 'Transfert du dossier à l\'hôpital d\'accueil, préparation de l\'équipe médicale de vol.' },
      { title: 'Transport médicalisé', desc: 'Avion sanitaire avec médecin et infirmier à bord, matériel de réanimation et monitoring continu.' },
      { title: 'Prise en charge à l\'arrivée', desc: 'Transfert direct vers l\'établissement de destination avec continuité des soins garantie.' },
    ],
    highlights: [
      'Délai d\'activation < 24 heures',
      'Équipe médicale à bord',
      'Coordination hôpital d\'accueil',
      'Sans franchise ni plafond',
    ],
  },

  'Coordination Multi-Spécialités': {
    headline: 'Un parcours combiné entre plusieurs pays',
    description: 'Quand votre traitement nécessite plusieurs spécialistes dans différents pays, nous orchestrons l\'ensemble : planning, transferts, dossiers médicaux et continuité des soins entre chaque étape.',
    steps: [
      { title: 'Analyse du parcours', desc: 'Notre comité médical définit l\'itinéraire optimal : ordre des interventions, pays et établissements.' },
      { title: 'Planification intégrée', desc: 'Coordination des dates entre les équipes médicales de chaque pays pour minimiser les délais.' },
      { title: 'Logistique inter-pays', desc: 'Vols, hébergements et transferts organisés entre chaque étape du parcours.' },
      { title: 'Continuité médicale', desc: 'Dossier médical partagé en temps réel entre les équipes, compte-rendus traduits et transmis.' },
    ],
    highlights: [
      'Parcours multi-pays optimisé',
      'Un seul interlocuteur',
      'Dossier médical partagé',
      'Logistique intégrée bout en bout',
    ],
  },

  'Accompagnement Famille & Proche': {
    headline: 'Votre accompagnant voyage en toute sérénité',
    description: 'Organisation complète du séjour pour votre accompagnant : billet d\'avion, hébergement, visa, transferts et programme d\'activités locales pendant vos jours de repos.',
    steps: [
      { title: 'Billetterie et visa', desc: 'Réservation du vol et assistance visa pour votre accompagnant, sur le même itinéraire.' },
      { title: 'Hébergement', desc: 'Chambre communicante ou suite familiale dans le même hôtel partenaire.' },
      { title: 'Transferts partagés', desc: 'Votre accompagnant bénéficie des mêmes transferts VIP : aéroport, clinique, hôtel.' },
      { title: 'Programme découverte', desc: 'Activités culturelles et touristiques proposées pendant les jours de repos ou d\'attente.' },
    ],
    highlights: [
      'Vol et hébergement organisés',
      'Assistance visa accompagnant',
      'Transferts VIP partagés',
      'Programme d\'activités locales',
    ],
  },
}
