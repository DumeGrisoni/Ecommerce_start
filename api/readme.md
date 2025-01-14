# Server API pour Ecommerce

Le server hébergé sur Genezio

## Explication de l'API

- L'API utilise Node.js et Express.js pour le serveur.
- Drizzle ORM est utiliser pour créer les modèles.
- Utiliser Thunder Client pour tester les routes.
- Modifier les noms des routes si besoin.
- Creer ou modifier les modèles si besoin et modifier drizzle.config.ts dans l'array schema.
- Lors de la création d'un modèle et une fois qu'il est terminer ajouter .js a la fin des imports de fichier.
- Modifier les middlewares si besoin de vérification de token et de role.
- Une fois que tout est bon executer npm run:build pour compiler le projet.
- Tester le server avec node --env-file=.env dist/src/index.js
- Deployer le server sur Genezio en retournant dans le dossier principal cd .. puis genezio deploy.

## Routes

- /products
- /orders
- /auth
