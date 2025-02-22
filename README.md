# Rénov'ASAP - Application de Réservation de Services

Application web permettant aux utilisateurs de réserver rapidement des services de petites interventions dans les domaines de la plomberie, électricité, bricolage et ménage express.

## Technologies Utilisées

- Next.js (React)
- TypeScript
- Material-UI
- Google Authentication
- Google Spreadsheet (Backend)
- Stripe (Paiements)

## Fonctionnalités

- Authentification via Google
- Réservation de services avec choix du créneau
- Profil utilisateur
- Historique des interventions
- Système d'abonnement (en développement)
- Paiement sécurisé via Stripe

## Configuration Requise

1. Node.js (version recommandée : >=18.x)
2. npm ou yarn
3. Compte Google Cloud Platform avec:
   - OAuth 2.0 configuré
   - API Google Sheets activée
4. Compte Stripe

## Configuration PWA

Pour activer les fonctionnalités PWA, vous devez ajouter les fichiers suivants dans le dossier `/public` :

### Icons requis (à générer avec un outil comme realfavicongenerator.net)
```
public/
├── favicon.ico
└── icons/
    ├── icon-192x192.png
    ├── icon-512x512.png
    └── icon.svg
```

### Screenshots pour le manifest PWA
```
public/
└── screenshots/
    ├── home.jpg       (1170x2532)
    └── reservation.jpg (1170x2532)
```

Note: Les icônes doivent respecter les dimensions spécifiées pour une compatibilité optimale avec tous les appareils.

## Installation

1. Cloner le projet :
```bash
git clone [url-du-repo]
cd renovasap-app
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
```bash
cp .env.example .env.local
```
Remplir les variables dans .env.local avec vos propres valeurs.

4. Configuration Google :
   - Créer un projet sur Google Cloud Console
   - Activer l'API Google Sheets
   - Configurer l'authentification OAuth 2.0
   - Créer un Google Spreadsheet et noter son ID

5. Configuration Stripe :
   - Créer un compte Stripe
   - Récupérer les clés API (Publishable et Secret)

## Lancement du Projet

Pour le développement :
```bash
npm run dev
```

Pour la production :
```bash
npm run build
npm start
```

## Structure du Projet

```
renovasap-app/
├── app/
│   ├── api/            # Routes API
│   ├── components/     # Composants React
│   ├── services/       # Services (Google, Stripe)
│   ├── styles/         # Styles et thème
│   └── [pages]/       # Pages de l'application
├── public/            # Assets statiques
└── middleware.ts      # Middleware Next.js
```

## Routes Principales

- `/` - Page d'accueil/réservation
- `/profile` - Profil utilisateur
- `/reservation` - Réservation de services
- `/historique` - Historique des interventions
- `/abonnements` - Gestion des abonnements

## Déploiement

1. Créer un compte sur Railway.app ou Render
2. Connecter le repository GitHub
3. Configurer les variables d'environnement
4. Déployer l'application

## Prochaines Évolutions

- [ ] Ajout d'un abonnement pour interventions récurrentes
- [ ] Suivi en temps réel des intervenants
- [ ] Interface dédiée pour les artisans
- [ ] Système de notation et avis des clients

## Support

Pour toute question ou assistance :
- Créer une issue sur GitHub
- Contacter l'équipe de développement

## Licence

Ce projet est sous licence MIT.
"# renovasapMVP" 
