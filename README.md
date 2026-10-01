# 🌟 Product Experience Platform

![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Flutter](https://img.shields.io/badge/Flutter-02569B?logo=flutter&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

## 📌 Description

**Product Experience Platform** est une plateforme web et mobile où les utilisateurs partagent leurs expériences, avis et recommandations sur des produits.

L'objectif est de créer une communauté qui aide à mieux choisir ses achats. Les produits sont classés par catégories :

- 📱 Électronique
- 👕 Mode
- 🍔 Alimentation
- 🏠 Maison & Décoration
- 🎮 Loisirs
- et bien d'autres

## Sommaire

- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#️-architecture)
- [Technologies](#️-technologies)
- [Installation](#️-installation)
- [Auteure](#-auteure)

## 🚀 Fonctionnalités

### 👤 Utilisateurs

- Création de compte et authentification
- Gestion du profil
- Publication et modification de ses avis
- Interaction avec la communauté

### ⭐ Avis et recommandations

- Ajout d'expériences
- Notation des produits
- Commentaires et recommandations
- Classement des produits populaires

### 🛍️ Produits

- Organisation par catégories
- Recherche de produits
- Consultation des expériences des autres membres
- Filtrage par type de produit

### 📱 Web et mobile

- Interface web responsive
- Application mobile multiplateforme
- Expérience utilisateur fluide

## 🏗️ Architecture

Le projet sépare clairement les clients (web et mobile), l'API et la base de données.

```mermaid
flowchart LR
    W["Application web<br/>React"] -->|HTTP / JSON| API["API REST<br/>Django REST Framework"]
    M["Application mobile<br/>Flutter"] -->|HTTP / JSON| API
    API --> DB[("PostgreSQL")]
```

## 🛠️ Technologies

| Couche | Technologies |
|---|---|
| Backend | Python, Django, Django REST Framework |
| Frontend web | React.js |
| Mobile | Flutter |
| Base de données | PostgreSQL |
| DevOps et infrastructure | Docker, Ansible, Vagrant, Ubuntu |
| Gestion de code | Git, GitHub |

## ⚙️ Installation

### 📋 Prérequis

Python 3, Node.js, Flutter SDK, Docker, PostgreSQL et Git.

### 1. Cloner le projet

```bash
git clone https://github.com/BouoniManar/Forum_partage_experience.git
cd Forum_partage_experience
```

### 2. Backend (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate             # Windows (PowerShell)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Créer au préalable la base PostgreSQL et renseigner ses identifiants dans la configuration du backend (sans jamais publier de mot de passe).

### 3. Frontend web (React)

```bash
cd frontend
npm install
npm start
```

### 4. Application mobile (Flutter)

```bash
cd mobile
flutter pub get
flutter run
```

## 🐳 Déploiement

L'infrastructure est conteneurisée avec **Docker**. **Ansible** et **Vagrant** servent à provisionner et automatiser un environnement Ubuntu reproductible.

<!--
## 📸 Captures d'écran
Ajoute tes images dans un dossier docs/ puis décommente ce bloc :

![Accueil](docs/accueil.png)
![Liste des avis](docs/avis.png)
-->

## 👩‍💻 Auteure

**Manar Bouoni** — Développeuse Full Stack
[GitHub](https://github.com/BouoniManar) · [LinkedIn](https://linkedin.com/in/bouoni-manar-700b90222)
