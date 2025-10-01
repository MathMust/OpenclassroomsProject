# OlympicGamesStarter

![Angular](https://img.shields.io/badge/Angular-18.0.3-red) ![Version](https://img.shields.io/badge/Version-1.0.0-blue)

---

## Table des matières
- [À propos](#à-propos)
- [Technologies](#technologies)
- [Installation](#installation)
- [Lancement](#lancement)
- [Architecture et bonnes pratiques](#architecture-et-bonnes-pratiques)
- [Pages et fonctionnalités](#pages-et-fonctionnalités)
- [Contribuer](#contribuer)

---

## À propos
Cette application fournit un dashboard interactif pour visualiser le nombre de médailles par pays et accéder aux détails de chaque pays. L’application est **responsive**, adaptée aux ordinateurs et appareils mobiles.

---

## Technologies
- [Angular 18](https://angular.io/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [RxJS](https://rxjs.dev/)  
- HTML & CSS (responsive)  
- [Chart.js](https://www.chartjs.org/)
- [ngx-charts](https://www.npmjs.com/package/@swimlane/ngx-charts)

---

## Installation
Clonez le dépôt et installez les dépendances :  

```bash
git clone https://github.com/MathMust/OpenclassroomsProject.git
npm install
```
---

## Lancement
### Serveur de développement

```bash
ng serve 
# ou utiliser => npm start
```
Ouvrez votre navigateur à `http://localhost:4200/`. L’application se rechargera automatiquement si vous modifiez les fichiers sources.

### Build pour production

```bash
ng build 
# ou utiliser => npm run build
```
Les fichiers compilés seront stockés dans le dossier `dist/`.

---

## Architecture et bonnes pratiques

L’architecture du projet suit les standards Angular :

- `components/` : composants réutilisables
- `pages/` : composants utilisés pour le routing
- `core/` : logique métier (services et modèles)

Bonnes pratiques à respecter :

- Utiliser des services pour les appels HTTP
- Utiliser RxJS et les Observables
- Se désabonner des Observables pour éviter les fuites mémoire
- Typage strict pour éviter l’usage de any

---

## Pages et fonctionnalités

1. Dashboard (page d’accueil)
- Présentation du contexte de l’application
- Graphique (pie) représentant le nombre de médailles par pays
- Navigation vers la page détail en cliquant sur un pays
- Récupération automatique des données au chargement

2. Page détail d’un pays
- Affichage automatique des données du pays sélectionné :
  - Nombre de participations aux JO
  - Nombre total de médailles
  - Nombre total d’athlètes
- Graphique de l’évolution des médailles par édition (line)
- Bouton pour revenir facilement à la page d’accueil

## Contribuer

Pour contribuer :

1. Fork le dépôt
2. Créez votre branche : `git checkout -b ma-branche`
3. Committez vos modifications : `git commit -m "Description du changement"`
4. Push : `git push origin ma-branche`
5. Créez une Pull Request
