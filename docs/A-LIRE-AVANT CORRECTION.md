# Carnet de bord

## Jour 1

Lecture et analyse du cahier des charges

- Installation du projet et des dépendance.
- Ecriture des models sequelize, utilisation de l'ia pour générer la seed en sequelize (trop long à faire à la main).
- Creation de l'index.js à la racine, creation d'une route et d'un controller pour la page d'acceuil.
- implémentation des middleware d'erreur et d'authentification.
- ajout des routes et controller d'authentification et d'un modèle User.
- Ajout des routes et controller pour les équipes, avec la possibilité de chercher une équipe avec l'id, d'en supprimer une avec l'id, puis d'ajouter un pokémon à une équipe, de supprimer ce pokemon de l'équipe et de supprimer complètement une équipe.
- implémentation d'une vérification de connexion pour accéder à une équipe.

## Jour 2

- creation de la route et du controller pour les pokemons, avec ajout des fonctionnalité demandé.
- creation de la route et du controller pour les types, avec ajout des fonctionnalité demandé.
- utilisation d'un middlware pour vérification des id rentré en paramètre lors de la requête.
- ajout de la fonctionnalité de comparaison entre deux pokemons.
- ajout d'une table de liaison entre une team et un User afin de lier une team à un User spécifique, modification de getAll() du controller team    afin de ressortir uniquement les teams relié à l'user courant.
- ajout d'une table de laison entre User et pokemon afin de vérifier qu'un utilisateur ne puisse voter qu'une seule fois pour un même pokemon.
- modification de la méthode de la suppression d'une équipe complète afin d'implémenter une confirmation avec plus de détailles.
- implémentation de la récupération des votes par pokemon, puis du podium.

## Jour 3

- Mise en place de swagger

## Jour 4

Amélioration de la méthode de vote, suppression du model userPokemonVote et utilisation d'une table de liaison auto généré par sequelize, modification de chaque méthode appelant la table de liaison de vote

utilisation de stackOverflow et de l'ia en cas de besoin
