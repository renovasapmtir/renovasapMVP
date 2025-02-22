#!/bin/bash

echo "🚀 Configuration initiale de Rénov'ASAP..."

# Création des répertoires nécessaires
echo "📁 Création des répertoires..."
mkdir -p public/icons
mkdir -p public/screenshots

# Copie du fichier d'environnement
echo "🔧 Configuration de l'environnement..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Fichier .env.local créé"
else
    echo "ℹ️ Le fichier .env.local existe déjà"
fi

# Installation des dépendances
echo "📦 Installation des dépendances..."
if command -v npm &> /dev/null; then
    npm install
else
    echo "❌ npm n'est pas installé. Veuillez installer Node.js"
    exit 1
fi

# Création des répertoires pour les assets
echo "🎨 Création des répertoires pour les assets..."
directories=(
    "public/icons"
    "public/screenshots"
)

for dir in "${directories[@]}"; do
    if [ ! -d "$dir" ]; then
        mkdir -p "$dir"
        echo "✅ Répertoire $dir créé"
    else
        echo "ℹ️ Le répertoire $dir existe déjà"
    fi
done

echo "
🎉 Installation terminée !

Étapes suivantes :
1. Configurez les variables d'environnement dans .env.local
2. Ajoutez les icônes dans public/icons/
3. Ajoutez les captures d'écran dans public/screenshots/
4. Lancez le serveur de développement avec 'npm run dev'

Documentation : https://github.com/votre-repo/renovasap-app
"
