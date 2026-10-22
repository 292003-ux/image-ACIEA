# Fichiers sources fournis

- `photos/` : photographies et visuels fournis par l’ACIEA (logo officiel `ccc.jpg`, photos d’activités,
  portraits). Une sélection est importée dans la médiathèque par `pnpm seed` (voir `scripts/seed-content.ts`).
  Les portraits ne sont pas importés tant que les noms, fonctions et consentements ne sont pas validés.
- `facebook-export/` : export HTML de la page Facebook officielle, utilisé comme source documentaire
  pour les actualités et les jalons. Exclu de l’image Docker.
- `12-empty.docx` : fichier vide présent dans le dépôt initial (conservé tel quel).
