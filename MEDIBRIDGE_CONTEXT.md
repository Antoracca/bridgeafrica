# MEDIBRIDGE_CONTEXT — Fichier de Référence Universelle

> **TOUTE IA travaillant sur ce projet DOIT lire ce fichier EN PREMIER.**
> En cas de réinitialisation de contexte, revenir ici avant toute modification.

---

## 1. PROJET

**Nom** : MediBridge (produit) / BridgeAfrica (société)
**Type** : Plateforme de tourisme médical — connecte patients africains à des cliniques internationales
**Stack** : Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · Supabase · Framer Motion · shadcn/ui
**Répertoire worktree actif** : `.claude/worktrees/interesting-benz` (branche `claude/interesting-benz`)
**Répertoire principal** : `~/BRIGDE/bridgeafrica` (branche `main` — NE PAS travailler ici)

---

## 2. ARCHITECTURE HOMEPAGE — 9 SECTIONS DANS L'ORDRE

```
app/page.tsx                     ← Orchestrateur (importer toutes les sections ici)
  │
  ├─ components/home/Navbar.tsx      [1] Navigation fixe + 3 mega menus
  ├─ components/home/Hero.tsx        [2] Hero + Lottie animations rotatoires
  ├─ components/home/Destinations.tsx [3] Slider destinations full-bleed + métriques
  ├─ components/home/HowItWorks.tsx  [4] 4 étapes — layout éditorial à dividers
  ├─ components/home/TopClinics.tsx  [5] Ticker défilant + bento grid cliniques
  ├─ components/home/TopDoctors.tsx  [6] Carousel médecins partenaires
  ├─ components/home/Technology.tsx  [7] Phone simulator (app MediBridge)
  ├─ components/home/Packages.tsx    [8] Cards packages tout-inclus
  ├─ [CTA inline dans page.tsx]      [8b] Section Call-to-Action
  └─ components/home/Footer.tsx      [9] Footer dark
```

**Fichiers de support :**
```
app/layout.tsx                   ← Root layout (Geist font, Supabase, Toaster, InitialPageLoader)
app/globals.css                  ← Variables CSS + animations custom
tailwind.config.ts               ← Tokens de couleurs (SOURCE DE VÉRITÉ)
lib/data/homepage.ts             ← Données partagées (destinations, cliniques, spécialités)
```

---

## 3. SYSTÈME DE COULEURS — RÈGLES ABSOLUES

### 3.1 Tokens Tailwind (tailwind.config.ts) — SOURCE DE VÉRITÉ

| Classe Tailwind         | Valeur HEX  | Usage                                    |
|------------------------|-------------|------------------------------------------|
| `brand-navy`           | `#0D1F3E`   | Titres foncés, dégradés                  |
| `brand-teal`           | `#489C8C`   | Couleur principale, boutons CTA          |
| `brand-teal-dark`      | `#3A7E6E`   | Hover des boutons teal                   |
| `brand-teal-light`     | `#6DB8A8`   | Accents, dégradés                        |
| `brand-teal-pale`      | `#E8F5F2`   | Backgrounds subtils, badges              |
| `brand-teal-border`    | `#B8DDD7`   | Bordures dans thème teal                 |
| `brand-cream`          | `#FAF9F7`   | Fond des sections "chaudes"              |

### 3.2 Variables CSS (globals.css) — synchronisées avec tailwind

- `--primary: 168 37% 45%` = **brand-teal #489C8C** (identiques — NE PAS désynchroniser)
- `--ring: 168 37% 45%` = brand-teal
- shadcn/ui utilise `bg-primary` ; composants custom utilisent `bg-brand-teal` → même couleur

### 3.3 RÈGLES STRICTES

```
✅ TOUJOURS utiliser les tokens brand-*
✅ TOUJOURS utiliser bg-brand-cream pour les sections fond crème
✅ TOUJOURS utiliser bg-white pour les sections fond blanc
✅ TOUJOURS utiliser bg-slate-950 pour le footer uniquement

❌ JAMAIS bg-[#faf9f7] ou tout autre hex hardcodé
❌ JAMAIS blue-50, blue-100, blue-200, cyan-50, cyan-100, cyan-200 dans les backgrounds de sections
❌ JAMAIS purple-100, purple-600, green-600 pour des éléments de brand identity
```

### 3.4 Exceptions sémantiques acceptées (couleurs hors-brand tolérées)

| Couleur | Où | Pourquoi |
|---|---|---|
| `text-green-600` / `bg-green-50` | TopClinics, Technology | Sémantique : "vérifié", "succès", checkmarks |
| `text-emerald-600` | TopClinics stats | Sémantique : taux de réussite |
| `text-purple-600` | TopClinics stats | Code couleur métriques (années d'expérience) |
| `from-purple-100`, `from-cyan-100` | Hero floating cards | Accents décoratifs distincts par carte |
| `#faf9f7` en inline style | Destinations.tsx:149 | Gradient CSS inline (token impossible ici) |

---

## 4. SYSTÈME DE LAYOUT — RÈGLE ABSOLUE

**Container standard pour TOUTES les sections :**
```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14">
```

- `max-w-7xl` = 1280px max (PAS `container` Tailwind qui donne 1400px)
- `px-4` mobile → `px-8` sm → `px-14` lg
- **NE JAMAIS** utiliser `container mx-auto px-4` seul (padding insuffisant sur desktop)

---

## 5. ALTERNANCE DES FONDS DE SECTIONS

```
[1] Navbar     → fixe, transparent/blanc
[2] Hero       → bg-white
[3] Destinations → bg-brand-cream
[4] HowItWorks  → bg-brand-cream
[5] TopClinics  → bg-white
[6] TopDoctors  → bg-white
[7] Technology  → bg-brand-cream
[8] Packages    → bg-brand-cream
[8b] CTA        → bg-white
[9] Footer      → bg-slate-950
```
Pattern : white → (cream,cream) → (white,white) → (cream,cream) → white → dark

---

## 6. DONNÉES PARTAGÉES — SOURCE UNIQUE

**Fichier** : `lib/data/homepage.ts`

| Export | Utilisé par | Contenu |
|---|---|---|
| `NAV_DESTINATIONS` | Navbar mega menu | 10 pays avec code drapeau |
| `NAV_CLINICS` | Navbar mega menu | 4 cliniques featured |
| `NAV_SPECIALTY_DATA` | Navbar mega menu | 9 spécialités (sans icônes) |
| `NAV_SERVICES` | Navbar mega menu | 4 services inclus |

> Les données des composants `Destinations.tsx` (4 villes avec images), `TopClinics.tsx` (6 cliniques avec stats) et `TopDoctors.tsx` (6 médecins) sont différentes en structure — elles restent locales à chaque composant.

---

## 7. PROBLÈMES CORRIGÉS (session 2026-04-02)

### P1 — Token cream jamais utilisé ✅
- `bg-[#faf9f7]` → `bg-brand-cream` dans Destinations, HowItWorks, Technology

### P2 — Couleurs hors-système brand ✅
- TopDoctors : `from-blue-50 via-white to-cyan-50` → `bg-white`
- TopClinics : `hover:border-blue-200` → `hover:border-brand-teal-border`
- TopClinics : `bg-cyan-100/30` → `bg-brand-teal-pale/20`
- Packages : `bg-purple-100/50` → `bg-brand-teal-pale/30`
- Packages : `border-blue-200` → `border-brand-teal-border`
- Packages : `bg-slate-50` section → `bg-brand-cream`
- Footer : `bg-purple-600` / `bg-green-600` → `bg-brand-teal`
- Footer : `hover:text-blue-400` / `hover:text-purple-400` → `hover:text-brand-teal-light`
- Footer : `group-hover:bg-purple-500` → `group-hover:bg-brand-teal`
- page.tsx : `selection:bg-blue-100 selection:text-blue-900` → brand-teal-pale/brand-navy

### P3 — Double système de containers ✅
- Toutes sections normalisées : `max-w-7xl mx-auto px-4 sm:px-8 lg:px-14`
- TopClinics, TopDoctors, Packages, page.tsx CTA migrés depuis `container mx-auto px-4`
- Destinations, HowItWorks, Technology : `px-5` → `px-4`

### P4 — Désynchronisation --primary / brand-teal ✅
- `globals.css` : `--primary: 168 37% 45%` (hue corrigé de 170→168 pour matcher #489C8C exactement)
- `tailwind.config.ts` : commentaire de synchronisation ajouté
- Règle : tout changement de brand-teal doit être répercuté sur --primary

### P5 — Données dupliquées dans Navbar ✅
- Créé `lib/data/homepage.ts` comme source unique
- `Navbar.tsx` importe `NAV_DESTINATIONS`, `NAV_CLINICS`, `NAV_SPECIALTY_DATA`, `NAV_SERVICES`

---

## 8. FICHIERS À LIRE AVANT TOUTE MODIFICATION

Dans cet ordre :
1. `MEDIBRIDGE_CONTEXT.md` (ce fichier)
2. `tailwind.config.ts` (tokens couleurs)
3. `app/globals.css` (variables CSS)
4. `app/page.tsx` (ordre des sections)
5. Le(s) composant(s) concerné(s)

---

## 9. COMMANDES UTILES

```bash
# Lancer le dev server (DEPUIS LE WORKTREE, PAS main)
cd ~/BRIGDE/bridgeafrica/.claude/worktrees/interesting-benz
pnpm run dev
# → localhost:3000

# Vérifier les couleurs hors-système
grep -rn "blue-[0-9]\|cyan-[0-9]\|purple-[0-9]\|#[0-9a-f]\{6\}" components/home/ app/page.tsx
```

---

## 10. NOTES IMPORTANTES

- Le projet tourne sur **branche `claude/interesting-benz`** dans un **git worktree** — PAS sur main
- Next.js version : **16.1.1** (dernière, avec Turbopack)
- Font : **Geist** (variable CSS `--font-geist-sans`)
- Authentification : **Supabase** (3 rôles : `patient`, `medecin_referent`, `clinique`)
- Images : **Unsplash** (preconnect configuré dans layout.tsx)
- Animations : **Framer Motion** (utilisé dans tous les composants homepage)

---

## 11. ESPACE PATIENT — ARCHITECTURE & RÈGLE ZÉRO DONNÉE MOCKÉE

### 11.1 Règle fondamentale : ZÉRO fausse donnée
- **Strictement interdit** d'inventer des faux antécédents, fausses opérations (*« Prothèse totale du genou »*), faux médecins (*« Dr. Fatima El Amrani »*), faux numéros d'urgence, faux devis de 3 500 €, faux vols RAM ou faux badges de notification.
- Tous les écrans vides affichent de véritables **Empty States professionnels** rassurants et explicatifs avec des call-to-action (CTA) fonctionnels.

### 11.2 Cartographie des Vues Patient
```
app/(dashboard)/patient/dashboard-router.tsx  ← Routeur piloté par ?view=
  │
  ├─ ?view=dashboard        → DashboardOverview.tsx / dashboard-mobile.tsx (Stats réelles, onboarding ou dossiers actifs)
  ├─ ?view=dossiers         → DossiersView.tsx (Dossiers réels Supabase + Empty State)
  ├─ ?view=new              → MedicalCaseForm.tsx (Formulaire multi-étapes 100% brand-teal)
  ├─ ?view=messages         → MessagesView.tsx (Messagerie chiffrée HDS + Empty State)
  ├─ ?view=rdv              → AppointmentsView.tsx (Agenda des consultations + Empty State)
  ├─ ?view=documents        → DocumentsView.tsx (Coffre-fort HDS drag & drop + Empty State)
  ├─ ?view=finances         → FinancesView.tsx (Factures, devis & séquestre + Empty State)
  ├─ ?view=voyage           → TravelView.tsx (Conciergerie & 4 piliers logistiques + Empty State)
  ├─ ?view=teleconsultation → TeleconsultationView.tsx (Test équipement WebRTC caméra/micro)
  └─ ?view=historique/...   → Placeholders d'intégration synchronisés
```

### 11.3 Structure des Pages dédiées
- `/patient/dossier` : Liste réelle connectée à `supabase.from('medical_cases')`.
- `/patient/dossier/new` : Formulaire de création.
- `/patient/dossier/[id]` : Détail complet du dossier connecté.
- `/patient/messages` : Vue messagerie unifiée.
- `/patient/notifications` : Liste temps réel des alertes Supabase sans mock data.
- `/patient/profile`, `/patient/settings`, `/patient/help` : Profil, paramètres et FAQ médicale.
