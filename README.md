# Application de gestion des contacts

## Informations

- Étudiant : Saa Emile Basile Tolno
- Groupe : L2TI1 G2
- Dépôt : 

## Description

Cette application Vue.js permet d’afficher, créer et modifier un carnet de contacts. Chaque contact contient un nom, un prénom, un téléphone, un e-mail et une photo.

## Technologies et prérequis

- Vue 3 avec Composition API et `<script setup>`
- Vite
- Vue Router
- JavaScript, HTML et CSS
- Node.js et npm installés

## Installation et lancement

```bash
npm install
npm run dev
```

Pour tester depuis un téléphone connecté au même réseau :

```bash
npm run dev -- --host
```

J’ouvre ensuite dans le téléphone l’adresse IP locale du PC indiquée par Vite, par exemple `http://192.168.1.10:5173`. La caméra et certaines API peuvent exiger HTTPS lorsqu’on n’est pas sur `localhost`. Si nécessaire, je peux utiliser un tunnel HTTPS de développement ou configurer un certificat local.

## Fonctionnalités réalisées

- Liste de cinq contacts fournis dans l’exercice avec avatars SVG en data URI.
- Ajout et modification avec le même composant `ContactForm`.
- Photo choisie dans la galerie ou par l’input caméra, avec prévisualisation.
- Redimensionnement de la photo à 300 px maximum avant stockage.
- Liens `tel:` et `mailto:`.
- Validation du nom, prénom, téléphone et e-mail.
- Copie de travail pour empêcher un retour non enregistré de modifier le contact.
- Persistance dans `localStorage` et repli si le stockage est indisponible.
- Route 404 et message spécifique pour un contact inexistant.

## Choix techniques

Le tableau réactif est placé au niveau du module dans `useContacts.js`, ce qui permet aux deux vues de partager le même état. Le formulaire reçoit une copie du contact et n’envoie cette copie au store qu’après validation et clic sur Enregistrer. Les photos sont lues avec `FileReader`, dessinées dans un canvas puis exportées en JPEG pour limiter la taille de `localStorage`. L’accès caméra repose sur un input `capture="environment"` ; si l’API caméra n’est pas disponible, un message propose la galerie.

## Limites connues

- La disponibilité réelle de la caméra dépend du navigateur, du matériel et des permissions.
- Le stockage local est limité par le navigateur.
- Les données restent uniquement dans le navigateur utilisé.
- Aucun compte utilisateur ni synchronisation entre appareils n’est prévu.

## Difficultés rencontrées

1. Conserver une copie indépendante du contact pour que le bouton Retour annule bien les changements.
2. Convertir et redimensionner une image de téléphone sans ajouter de bibliothèque externe.
3. Gérer les exceptions de `localStorage` lorsque le navigateur refuse l’écriture ou manque d’espace.
4. Prévoir un comportement clair lorsque la caméra n’est pas disponible.

## Captures à insérer

- `captures/01-liste.png` : liste avec les cinq contacts et leurs photos.
- `captures/02-modification.png` : formulaire de modification.
- `captures/03-ajout-photo.png` : prévisualisation d’une nouvelle photo.
- `captures/04-validation.png` : messages d’erreur du formulaire.
- `captures/05-persistance.png` : liste après rechargement.
