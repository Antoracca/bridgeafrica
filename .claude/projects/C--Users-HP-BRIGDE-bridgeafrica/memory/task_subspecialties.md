---
name: Tâche future — sous-spécialités par spécialité
description: Coder les détails (SubSpecialtyDetail) pour chaque sous-spécialité de chaque spécialité médicale — données + panel inline navbar
type: project
---

## Tâche à compléter : sous-spécialités détaillées

Oncologie est terminé (44 sous-spécialités dans `lib/data/subspecialty-details.ts`).

**Restant à faire — par batch, spécialité par spécialité :**

1. PMA & Fertilité (~25 sous-spécialités)
2. Greffe Capillaire (~20 sous-spécialités)
3. Chirurgie Esthétique (~40 sous-spécialités)
4. Ophtalmologie (~30 sous-spécialités)
5. Chirurgie Bariatrique (~15 sous-spécialités)
6. Cardiologie (~40 sous-spécialités)
7. Neurologie (~35 sous-spécialités)
8. Orthopédie (~35 sous-spécialités)
9. Urologie (~25 sous-spécialités)
10. Dentaire & Implantologie (~30 sous-spécialités)
11. Gynécologie (~30 sous-spécialités)

**Pour chaque sous-spécialité :**
- description (1-2 phrases en français)
- successRate, stayDuration, priceRange ("Estimation entre X et Y €")
- top3 cliniques avec : clinicName, countryCode, doctorName, doctorDesc (phrase contextuelle), priceFrom ("À partir de X €"), rating, badge

**Fichier cible :** `lib/data/subspecialty-details.ts` — ajouter chaque batch dans le registre `SUBSPECIALTY_DETAILS`

**Why:** Permet aux utilisateurs de cliquer sur chaque sous-spécialité dans la navbar et voir les détails + top 3 cliniques inline (pas de modal)

**How to apply:** Travailler batch par batch, valider chaque spécialité avant de passer à la suivante
