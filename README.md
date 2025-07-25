# 🎮 Lootopia

**Lootopia** est un jeu de chasse au trésor interactif disponible sur **navigateur** et **mobile**.  
Les joueurs explorent des cartes pour découvrir des trésors (loots), participent à des **enchères en temps réel** pour vendre leurs objets, peuvent **transformer les loots rares en NFT**, et grimpent dans un **classement compétitif** en collectionnant des **trophées** et en montant en **rang**.

## ✨ Fonctionnalités principales

- 🗺️ Exploration interactive d’environnements à la recherche de loots cachés  
- 💰 Système d’enchères en ligne pour vendre les objets trouvés  
- 🪙 Possibilité de transformer les loots rares en **NFTs**  
- 🏆 **Classement en temps réel** avec des rangs et des trophées à collectionner  
- 📱 Compatible navigateur et mobile

---

## 🚀 Lancer le projet en local

### 1. Cloner le dépôt

```bash
git clone https://github.com/Jackson93150/Lootopia.git
cd lootopia
```


### 2. Configurer les variables d'environnement

Chaque microservice doit posseder un fichier `.env`.  
Avant de démarrer, vous devez **copier le fichier `.env.exemple` de la racine et le renommer en `.env` dans chaque microservice**, puis le configurer selon votre environnement local.
Pareille pour le dossier Frontend

### 3. Lancer les microservices backend

Depuis la racine du projet :
```bash
docker compose up --build
```

> Cette commande va construire et démarrer tous les microservices nécessaires (API, base de données, enchères, gestion des NFTs, classement, etc.).

### 4. Lancer le frontend

Dans un second terminal :
```bash
cd frontend
npm install
npm run dev
```

L'application sera disponible sur http://localhost:3001

---

## 🛠️ Stack technique

- **Frontend** : NextJs
- **Backend** : Architecture microservices (Nestjs)
- **Docker** : Orchestration via Docker Compose
- **Blockchain / NFT** : Ethereum testnet Sepolia
