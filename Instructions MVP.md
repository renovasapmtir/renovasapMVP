**Spécifications complètes du MVP de la plateforme web Rénov'ASAP**

**Objectif** La plateforme web Rénov'ASAP permet aux utilisateurs de réserver rapidement des services de petites interventions (-2h) dans les domaines suivants :

* **Plomberie** : fuite d'eau, robinet défectueux, chasse d'eau cassée.  
* **Électricité** : prise ou interrupteur à remplacer, disjoncteur défaillant.  
* **Bricolage** : montage de meuble, fixation d'étagères.  
* **Ménage express** : nettoyage après sinistre, vitres, désinfection.

La plateforme repose sur **Google Spreadsheet** comme backend API pour la gestion des utilisateurs, des interventions et du suivi, et sur **Stripe** pour les paiements.

---

### **Technologies et Outils**

| Fonctionnalité | Technologie / Outil |
| ----- | ----- |
| Développement web | Next.js (React) / Node.js |
| Backend API | Google Spreadsheet |
| Gestion des utilisateurs | Google Spreadsheet, Connexion Gmail, Vérification numéro de téléphone |
| Suivi des interventions | Google Spreadsheet |
| Paiement | Stripe |
| Back-end API | Google Spreadsheet |

---

### **Instructions pour le développement**

1. **Initialisation du projet Web**

   * Créer un projet **Next.js** avec TypeScript.

Installer les dépendances suivantes :  
 "dependencies": {

  "next": "latest",

  "react": "latest",

  "react-dom": "latest",

  "@mui/material": "latest",

  "axios": "latest",

  "google-auth-library": "latest",

  "stripe": "latest"

}

*   
2. **Authentification et Gestion des utilisateurs**

   * Ajouter la connexion via **Google Sign-In**.  
   * Gérer la vérification du numéro de téléphone via un code envoyé et stocké sur Google Spreadsheet.  
   * Sauvegarder les données utilisateurs sur Google Spreadsheet avec les champs suivants :  
     * **Nom**  
     * **Numéro de téléphone**  
     * **Adresse**  
     * **Accès (digicode, étage, instructions)**  
     * **ID Google**  
3. **Interface Utilisateur (UI)**

   * Développer une interface avec **4 pages principales** :  
     * **Profil** : informations utilisateur.  
     * **Réservation** : choix du service et du créneau.  
     * **Historique** : suivi des interventions.  
     * **Abonnements** : gestion des offres récurrentes.  
   * Utiliser **Material-UI** pour le design.  
4. **Gestion des Réservations**

   * Intégrer un formulaire de réservation avec choix du type de service et du créneau.  
   * Utiliser **Google Spreadsheet** comme backend API pour stocker les réservations et afficher l'historique.  
5. **Intégration de Stripe pour les paiements**

   * Configurer **Stripe** et gérer les paiements via un serveur Node.js.  
   * Enregistrer les transactions sur **Google Spreadsheet**.  
6. **Déploiement**

   * Configurer le serveur API sur **Railway.app** ou **Render**.

---

### **Roadmap Future (Post-MVP)**

🔹 Ajout d'un abonnement pour interventions récurrentes. 🔹 Suivi en temps réel des intervenants. 🔹 Interface dédiée pour les artisans (gestion des missions). 🔹 Système de notation et avis des clients.

La plateforme **Rénov'ASAP** est conçue pour être simple, rapide et efficace, avec une centralisation des données sur **Google Spreadsheet** comme backend API et une gestion des paiements via **Stripe**.

