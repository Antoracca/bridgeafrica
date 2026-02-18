# MediBridge Africa — Documentation Complète du Dépôt

> Plateforme de tourisme médical construite avec **Next.js 16 (App Router)**, **Supabase**, **TypeScript** et **Tailwind CSS**.
>
> Cette documentation a été réécrite pour donner une vue globale du code, des dossiers, des flux fonctionnels, des APIs, de la base de données, et des conventions techniques du projet.

---

## 1) Vision produit

MediBridge Africa est une plateforme qui connecte :

- des **patients** à la recherche de soins spécialisés,
- des **médecins référents** qui orientent les dossiers,
- des **cliniques** qui proposent des devis et une prise en charge.

Le produit couvre une logique de **parcours médical international** :

1. inscription / authentification,
2. création d’un dossier médical,
3. qualification et suivi du dossier,
4. devis et acceptation,
5. préparation du voyage médical,
6. traitement et clôture.

Le code actuel contient :

- une landing page marketing,
- un espace d’authentification,
- des dashboards par rôle,
- des formulaires métier,
- une intégration Supabase (Auth + DB + Storage + RLS),
- des migrations SQL pour fonctions RPC et politiques de sécurité.

---

## 2) Stack technique

### Front-end

- **Next.js 16.1.1** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Radix UI** + composants UI personnalisés
- **Lucide React** pour les icônes
- **Lottie React** pour animations

### Formulaires & validation

- **react-hook-form**
- **zod**
- **@hookform/resolvers**

### Backend / BaaS

- **Supabase Auth**
- **Supabase Postgres**
- **Supabase Storage**
- **@supabase/ssr** et **@supabase/supabase-js**

### Outils de qualité

- **ESLint 9**
- **TypeScript 5**

---

## 3) Démarrage rapide

### Prérequis

- Node.js 20+
- npm
- Un projet Supabase configuré

### Installation

```bash
npm install
```

### Lancer en développement

```bash
npm run dev
```

Application disponible sur : `http://localhost:3000`

### Build production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## 4) Variables d’environnement attendues

Créer un fichier `.env.local` (ou variables CI/CD) :

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Notes importantes :

- `SUPABASE_SERVICE_ROLE_KEY` est nécessaire pour certaines routes serveur sensibles (ex: renvoi d’email de confirmation).
- Ne jamais exposer la `SERVICE_ROLE_KEY` côté client.

---

## 5) Architecture globale

Le dépôt suit une architecture **feature + couche technique**.

### Racine

- `app/` : routes App Router (pages, layouts, API route handlers)
- `components/` : composants UI et composants métier
- `lib/` : actions serveur, clients Supabase, utilitaires
- `hooks/` : hooks personnalisés
- `contexts/` : context React global (loader)
- `supabase/migrations/` : SQL migrations
- `types/` : types TypeScript (dont schéma DB)
- `public/` : assets statiques (svg, animations json)
- `docs/` : documents projet (notes/pdfs)

---

## 6) Détail des routes `app/`

### 6.1 Landing page publique

- `/` : page marketing avec sections (Hero, Destinations, HowItWorks, TopClinics, TopDoctors, Technology, Packages, Footer).

### 6.2 Authentification

Groupe `(auth)` :

- `/login`
- `/register`
- `/complete-profile`
- `/success`
- `/check-email`

Routes `auth/` (callbacks techniques) :

- `/auth/callback`
- `/auth/confirmation`
- `/auth/auth-code-error`

### 6.3 Dashboard multi-rôles

Groupe `(dashboard)` :

- `/patient`
- `/patient/dossier`
- `/patient/dossier/new`
- `/patient/dossier/[id]`
- `/patient/messages`
- `/patient/notifications`
- `/patient/help`
- `/patient/settings`
- `/patient/profile`

- `/medecin`
- `/medecin/dossiers`
- `/medecin/dossier/[id]`
- `/medecin/messages`
- `/medecin/patients`

- `/clinique`
- `/clinique/dossiers`
- `/clinique/dossier/[id]`
- `/clinique/devis`
- `/clinique/planning`

- `/admin`

### 6.4 API routes Auth

- `POST /api/auth/check-email` : vérifie disponibilité email (inscription)
- `POST /api/auth/verify-email` : vérifie existence email (login)
- `POST /api/auth/check-phone` : vérifie disponibilité téléphone
- `POST /api/auth/check-name` : vérification informative de nom/prénom
- `POST /api/auth/resend-confirmation` : renvoie email de confirmation

---

## 7) Middleware & sécurité de session

Le middleware global (`middleware.ts`) appelle `updateSession` de `lib/supabase/middleware.ts`.

Objectifs :

- maintenir la session Supabase à jour,
- propager correctement les cookies côté server components,
- protéger les parcours auth/dashboards.

Le matcher exclut notamment :

- `_next/static`
- `_next/image`
- `favicon.ico`
- assets images statiques (`svg`, `png`, etc.)

---

## 8) Couche `lib/` (logique applicative)

### 8.1 `lib/actions/auth.ts`

Actions serveur principales :

- `login(formData)`
- `signup(formData)`
- `updateProfile(formData)`
- `uploadProfilePicture(formData)`
- `deleteProfilePicture()`
- `signInWithOAuth(provider)`
- `resendConfirmationEmail(email)`
- `completeOAuthProfile(formData)`
- `logout()`

Points clés :

- validation zod robuste,
- détection explicite des erreurs `email_not_confirmed`,
- redirection selon rôle (`patient`, `medecin_referent`, `clinique`, `admin`),
- normalisation des entrées utilisateur avant vérification DB,
- intégration RPC Supabase pour contrôles d’unicité.

### 8.2 `lib/actions/cases.ts`

Actions serveur métier dossiers :

- `getPatientStats(patientId)`
- `getDoctorStats()`
- `createMedicalCase(formData)`
- `updateCaseStatus(caseId, newStatus)`

Rôle :

- création des dossiers médicaux,
- lecture d’indicateurs par statut,
- transitions de statut du workflow.

### 8.3 `lib/utils/validation.ts`

Fonctions importantes :

- `normalizePhone`
- `normalizeEmail`
- `normalizeName`
- `validatePassword`
- `validateEmailDomain`

Spécificités intéressantes :

- validation forte des mots de passe,
- contrôle des TLD et domaines email populaires pour limiter fautes de frappe (`gmail.mo`, etc.),
- conventions de normalisation avant persistance/requêtes.

### 8.4 Clients Supabase

- `lib/supabase/client.ts` : client côté navigateur
- `lib/supabase/server.ts` : client côté serveur
- `lib/supabase/middleware.ts` : rafraîchissement session dans middleware

---

## 9) `components/` : structure UI et métier

### 9.1 `components/home/`

Composants de la landing :

- `Navbar`
- `Hero`
- `Destinations`
- `HowItWorks`
- `TopClinics`
- `TopDoctors`
- `Technology`
- `Packages`
- `Footer`

### 9.2 `components/forms/`

Formulaires métier :

- `RegisterForm`
- `LoginForm`
- `CompleteProfileForm`
- `PatientProfileForm`
- `MedicalCaseForm`
- `QuoteForm`

Caractéristiques :

- couplage react-hook-form + zod,
- UX enrichie (messages d’erreur précis, vérifications asynchrones),
- parcours login avec gestion non-confirmation email,
- intégration loader global et feedback utilisateur.

### 9.3 `components/dashboard/`

Composants transverses dashboard :

- `AppSidebar`
- `DynamicBreadcrumb`
- `StatsCard`
- `StatusBadge`

### 9.4 `components/cases/`

Affichage et actions sur dossiers :

- `CaseCard`
- `CaseActions`
- `CaseTimeline`

### 9.5 `components/loaders/`

- `InitialPageLoader`
- `GlobalLoader`
- `PageLoader`
- `MiniLoader`

### 9.6 `components/ui/`

Bibliothèque UI interne basée sur Radix + Tailwind.

Exemples :

- inputs/buttons/forms,
- dialog/popover/select/tooltip,
- table/tabs/badge/switch,
- `country-select`,
- `password-strength-indicator`,
- composants animation/visuels (`LottieAnimation`, `BackgroundSlideshow`).

---

## 10) Hooks personnalisés

Dans `hooks/` :

- `useDebounce` : anti-spam des validations asynchrones
- `useEmailVerification` : polling confirmation email
- `useIsMobile` : détection responsive (hook utilitaire)
- `usePasswordValidation` : score + règles de robustesse

Ces hooks sont utilisés pour améliorer l’UX des formulaires et du dashboard mobile.

---

## 11) Context global

`contexts/LoadingContext.tsx` expose :

- `showLoader(message?)`
- `hideLoader()`
- `isLoading`
- `message`

Particularités :

- timeout de sécurité (auto-hide ~10s),
- cleanup systématique des timers,
- affichage du composant `GlobalLoader` au niveau racine.

---

## 12) Base de données (vue d’ensemble)

Le typage `types/database.types.ts` montre un modèle riche avec tables principales :

- `users`
- `profiles`
- `medical_cases`
- `quotes`
- `messages`
- `notifications`
- `documents`
- `appointments`
- `payments`
- `reviews`
- `audit_logs`
- etc. (selon version du schéma).

### Exemple de statuts importants

`medical_cases.status` inclut :

- `draft`
- `submitted`
- `under_review`
- `approved`
- `quote_sent`
- `quote_accepted`
- `visa_pending`
- `travel_booked`
- `in_treatment`
- `completed`
- `cancelled`

Ce cycle couvre le parcours opérationnel complet du tourisme médical.

---

## 13) Migrations Supabase (contenu actuel)

Les scripts SQL présents servent à :

1. créer/mettre à jour des fonctions RPC,
2. gérer l’identité OAuth et les profils,
3. configurer le bucket `profile-pictures`,
4. appliquer/corriger les policies storage,
5. vérifier et enrichir la table `profiles`.

Fichiers notables :

- `20251229_create_all_rpc_functions.sql`
- `20251229_create_storage_bucket_and_policies.sql`
- `20251229_fix_storage_policies.sql`
- `20251229_secure_storage_policies.sql`
- `20251229_copy_google_avatar_to_profile.sql`
- `20251229_check_and_update_profiles_table.sql`
- `20251229_create_delete_identity_function.sql`

### Observations architecture DB

- usage d’**RPC** pour certains checks d’unicité (email/téléphone/nom),
- présence d’itérations successives sur les policies storage (durcissement sécurité),
- trigger `handle_new_user` pour hydrater automatiquement `profiles`.

---

## 14) Flux fonctionnels clés

### 14.1 Inscription

1. l’utilisateur soumet le formulaire register,
2. validation zod + validation domaine email + mot de passe,
3. normalisation email/téléphone/nom,
4. checks d’existence via RPC,
5. création utilisateur Supabase,
6. redirection vers page de confirmation email.

### 14.2 Connexion

1. vérification email (existence) côté API,
2. tentative `signInWithPassword`,
3. si email non confirmé → renvoi automatique du mail + redirection `/check-email`,
4. sinon redirection dashboard selon rôle.

### 14.3 OAuth

- support Google / Apple côté action serveur,
- possibilité de compléter les données profil post-auth.

### 14.4 Dossier médical

1. patient crée un dossier,
2. statut initial puis évolutions métier,
3. affichage de statistiques par rôle.

---

## 15) Responsive et expérience mobile

Le projet intègre des adaptations mobiles explicites :

- composants dashboard mobiles (`dashboard-mobile.tsx`),
- logique de routing/composition selon viewport (`dashboard-router.tsx`),
- breakpoints tailwind personnalisés (`xs`),
- composants sidebar + trigger mobile dans layout dashboard.

---

## 16) Configurations clés

### `next.config.ts`

`remotePatterns` autorisés pour images externes :

- `images.unsplash.com`
- `flagcdn.com`

### `tailwind.config.ts`

- dark mode par classe,
- tokens CSS (couleurs, radius),
- animations accordion,
- chemin de scan couvrant `app`, `components`, `hooks`, `lib`.

### `app/layout.tsx`

- fonts Geist + Geist Mono,
- `InitialPageLoader`,
- `LoadingProvider`,
- Toaster global (sonner),
- metadata FR orientée MediBridge.

---

## 17) Conventions implicites observées

- nomenclature claire par rôle (`patient`, `medecin`, `clinique`, `admin`),
- séparation UI générique vs UI métier,
- validations côté client + côté serveur (defense-in-depth),
- messages utilisateurs majoritairement en français,
- gestion des erreurs détaillée côté auth.

---

## 18) Dette technique / points d’attention

Recommandations après lecture du dépôt :

1. **Centraliser les statuts métier** dans un enum partagé (`lib/constants`).
2. **Documenter explicitement les RPC Supabase** (signature + usage + sécurité).
3. **Ajouter tests automatisés** sur :
   - validation email/téléphone,
   - flux signup/login,
   - transitions de statuts dossiers.
4. **Ajouter diagramme d’architecture** (client/server/db) dans `docs/`.
5. **Versionner un `.env.example`** pour onboarding rapide.
6. **Ajouter scripts npm** pour check type + format.
7. **Uniformiser les conventions de langue** (FR/EN) dans labels techniques.

---

## 19) Proposition de roadmap technique

### Court terme

- renforcer tests unitaires des utilitaires,
- tests intégration des API auth,
- stabiliser policies storage version finale.

### Moyen terme

- journalisation structurée (logs corrélés par requête),
- observabilité (Sentry / OpenTelemetry),
- cache ciblé sur pages dashboard lourdes.

### Long terme

- moteur de matching patient-clinique assisté IA,
- orchestration workflow dossier plus fine (BPM simple),
- module multi-langue complet (FR/EN/AR).

---

## 20) Inventaire condensé des dossiers

### `app/`

- routes publiques + auth + dashboards + API handlers.

### `components/`

- UI primitives, formulaires métier, modules dashboard/cases/home/loaders.

### `lib/`

- actions serveur et utilitaires cœur.

### `hooks/`

- utilitaires UX (debounce, verification, password score, mobile).

### `contexts/`

- état global du loader.

### `supabase/migrations/`

- scripts SQL structurels, RPC, storage, sécurité.

### `types/`

- typage DB.

### `public/`

- assets graphiques et animations.

### `docs/`

- documents de cadrage/notes projet.

---

## 21) Checklist onboarding développeur

- [ ] Installer dépendances avec `npm install`
- [ ] Configurer `.env.local`
- [ ] Vérifier connexion Supabase
- [ ] Lancer `npm run dev`
- [ ] Tester parcours register/login
- [ ] Vérifier upload avatar
- [ ] Créer un dossier médical de test
- [ ] Tester navigation dashboard par rôle
- [ ] Exécuter `npm run lint`

---

## 22) Bonnes pratiques d’exploitation

- protéger strictement les secrets en production,
- surveiller les policies RLS/storage à chaque migration,
- valider les flux OAuth sur chaque environnement,
- suivre les erreurs auth les plus fréquentes (email non confirmé, credentials invalides),
- garder la UX de loader cohérente et non bloquante.

---

## 23) Conclusion

Le dépôt MediBridge Africa est déjà structuré autour de fondations solides :

- App Router moderne,
- séparation claire UI / logique serveur,
- intégration Supabase complète,
- base métier orientée parcours patient.

La priorité suivante est surtout la **fiabilisation** :

- tests,
- documentation des RPC/policies,
- consolidation des conventions.

Si tu veux, je peux ensuite te produire :

1. un **diagramme d’architecture** (Mermaid),
2. un **README “contributeur”** séparé (`CONTRIBUTING.md`),
3. une **cartographie détaillée fichier par fichier** avec dépendances croisées,
4. un **plan de test QA** prêt à exécuter.

---

## 24) Annexes utiles

### Scripts npm disponibles

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

### Dépendances majeures (résumé)

- next, react, react-dom
- @supabase/ssr, @supabase/supabase-js
- react-hook-form, zod
- tailwindcss, radix-ui
- lucide-react, framer-motion, sonner, lottie-react

### Remarque orthographe package

Le `name` dans `package.json` est actuellement `brigdeafrica` (probable typo de `bridgeafrica`).

---

## 25) Statut de cette documentation

Cette version est volontairement longue et opérationnelle afin de servir de base de référence pour :

- onboarding dev,
- revues de code,
- transmission à une équipe produit/tech,
- préparation CI/CD.

N’hésite pas à demander une variante plus concise (1 page), ou une version orientée uniquement architecture backend.
