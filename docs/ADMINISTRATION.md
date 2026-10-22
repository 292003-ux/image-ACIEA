# Guide de l’administration (Payload CMS)

Accès : `https://<domaine>/admin`. L’interface est disponible en français et en anglais
(sélecteur dans le compte utilisateur). Le sélecteur de **langue de contenu** (en haut de chaque
fiche) permet de saisir la version FR puis EN de chaque champ traduisible.

## Modules

| Groupe          | Modules                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| Pages du site   | Accueil, À propos, SAAGDO (textes, images, jalons, valeurs, message du président, documents)                      |
| Contenus        | Pages (dont mentions légales, confidentialité, CGU), Domaines, Projets, Actualités, Publications, Événements, FAQ |
| Institution     | Partenaires, Équipe, Témoignages validés, Indicateurs d’impact                                                    |
| Médiathèque     | Médias (images/vidéos), Documents (PDF, DOCX, XLSX, PPTX publics)                                                 |
| Demandes reçues | Messages de contact, Demandes de partenariat, Abonnés newsletter, Pièces jointes reçues (privées)                 |
| Paramètres      | Paramètres du site (identité, logo, favicon, contact, réseaux sociaux, SEO, conservation des données), Menus      |
| Administration  | Comptes administrateurs, Journal d’audit                                                                          |

Le **tableau de bord** liste toutes les collections ; chaque liste permet recherche, filtres, colonnes
et actions groupées.

## Rôles et permissions (appliqués côté serveur)

| Action                                    | Super admin |                     Admin                     | Éditeur | Contributeur |
| ----------------------------------------- | :---------: | :-------------------------------------------: | :-----: | :----------: |
| Créer des brouillons                      |      ✔︎      |                       ✔︎                       |    ✔︎    |      ✔︎       |
| Modifier ses brouillons non publiés       |      ✔︎      |                       ✔︎                       |    ✔︎    |      ✔︎       |
| Modifier tout contenu                     |      ✔︎      |                       ✔︎                       |    ✔︎    |      ✘       |
| **Publier / dépublier / programmer**      |      ✔︎      |                       ✔︎                       |    ✔︎    |      ✘       |
| Supprimer des contenus                    |      ✔︎      |                       ✔︎                       |    ✔︎    |      ✘       |
| Pages du site (Accueil, À propos, SAAGDO) |      ✔︎      |                       ✔︎                       |    ✔︎    |      ✘       |
| Paramètres du site, menus                 |      ✔︎      |                       ✔︎                       |    ✘    |      ✘       |
| Demandes reçues (données personnelles)    |      ✔︎      |                       ✔︎                       |    ✘    |      ✘       |
| Gérer les comptes                         |      ✔︎      | ✔︎ (sauf super admins, sans élévation de rôle) |    ✘    |      ✘       |
| Consulter le journal d’audit              |      ✔︎      |                       ✔︎                       |    ✘    |      ✘       |

Les comptes sont verrouillés 15 minutes après 5 échecs de connexion ; les tentatives sont en plus
limitées par adresse IP.

## Flux éditorial

1. Le contributeur crée un contenu (enregistré automatiquement en **brouillon**) et passe la
   « Validation éditoriale » à _Soumis à relecture_.
2. L’éditeur relit (bouton **Aperçu** pour les actualités), ajoute éventuellement des _notes de relecture_,
   puis **publie** — immédiatement ou à une date programmée (« Programmer la publication »).
3. Chaque création, publication, dépublication, suppression et connexion est tracée dans le **journal d’audit**.
4. L’historique des **versions** permet de comparer et restaurer une version antérieure.

## Règles de fiabilité intégrées

- **Indicateurs d’impact** : publication impossible sans _date de vérification_ et _validé par_.
- **Témoignages** : publication impossible sans consentement écrit coché.
- **Partenaires financiers** : une source de vérification est obligatoire.
- **Réalisations et indicateurs de projet** : seuls ceux cochés « vérifié » s’affichent.
- **Carte** : un projet n’apparaît sur la carte que si ses coordonnées sont renseignées **et** cochées « vérifiées ».
- **Équipe** : un membre n’apparaît que si le consentement à la publication du portrait est coché.
- **Médias** : la provenance « visuel d’illustration » affiche automatiquement la mention sur le site.
- **Traductions** : tant que « Les traductions anglaises ont été validées » n’est pas cochée
  (Paramètres → SEO & langues), un bandeau indique sur la version anglaise que la version française fait foi.
  Un contenu non traduit affiche la version française accompagnée d’une mention explicite.

## Tâches courantes

- **Changer le logo / favicon** : Paramètres du site → Identité.
- **Images de l’accueil** : Pages du site → Accueil → onglet Hero (image principale, mosaïque, vidéo légère facultative).
- **Lier la vraie plateforme SAAGDO** : Pages du site → SAAGDO → « URL officielle de la plateforme » (le bouton s’active).
- **Message du président** : À propos → Gouvernance → « Afficher » coché, texte officiel (un paragraphe par bloc, séparés par une ligne vide ; le premier paragraphe sert d’extrait sur la page « À propos ») et signataire choisi dans l’équipe.
- **Ajouter un document institutionnel** : Médiathèque → Documents, puis l’associer dans À propos → Gouvernance
  ou dans une Publication.
- **Traiter une demande** : Demandes reçues → ouvrir → changer le statut (Nouveau, En cours, Répondu, Clôturé, Spam).
  Les pièces jointes ne sont téléchargeables que par les administrateurs connectés.
- **Durée de conservation** : Paramètres → Formulaires & données (purge automatique quotidienne).
- **Menus** : Paramètres → Menus (laisser vide pour la navigation par défaut : À propos · Nos actions · SAAGDO · Actualités · Contact, plus le bouton « Devenir partenaire »). Dans le pied de page, Événements, Publications et Galerie n’apparaissent que lorsqu’ils ont du contenu publié.
