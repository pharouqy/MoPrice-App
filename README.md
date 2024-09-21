# moprice

## Description

Ce projet est une application frontend pour moprice. Il utilise Vite comme outil de build et React pour la gestion de l'interface utilisateur.

## Configuration

### Variables d'environnement

Les variables d'environnement suivantes doivent être définies pour que l'application fonctionne correctement. Vous devez créer un fichier `.env` à la racine du projet avec le contenu suivant :

```env
VITE_API_URL=http://localhost:3000/auth
```

### Dépendances

Le projet utilise les dépendances suivantes :

- `axios`: ^1.7.7
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-router-dom`: ^6.26.1

### Dépendances de développement

- `@eslint/js`: ^9.9.0
- `@types/react`: ^18.3.3
- `@types/react-dom`: ^18.3.0
- `@vitejs/plugin-react`: ^4.3.1
- `eslint`: ^9.9.0
- `eslint-plugin-react`: ^7.35.0
- `eslint-plugin-react-hooks`: ^5.1.0-rc.0
- `eslint-plugin-react-refresh`: ^0.4.9
- `globals`: ^15.9.0
- `vite`: ^5.4.1

## Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/votre-utilisateur/moprice.git
cd moprice
```

2. Installez les dépendances :

```bash
npm install
```

## Démarrage

Pour démarrer l'application en mode développement, exécutez la commande suivante :

```bash
npm run dev
```

Pour construire l'application pour la production, exécutez la commande suivante :

```bash
npm run build
```

Pour prévisualiser la version de production, exécutez la commande suivante :

```bash
npm run preview
```

## Scripts

- `dev`: Démarre le serveur de développement.
- `build`: Construit l'application pour la production.
- `lint`: Exécute ESLint pour vérifier les erreurs de code.
- `preview`: Prévisualise la version de production.

## Auteur

Younsi Farouk

## Licence

Ce projet est sous licence ISC.

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer, veuillez suivre ces étapes :

1. Fork le projet.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/votre-fonctionnalite`).
3. Committez vos modifications (`git commit -m 'Ajout de la fonctionnalité'`).
4. Poussez la branche (`git push origin feature/votre-fonctionnalite`).
5. Ouvrez une Pull Request.

---

Merci d'utiliser moprice !
