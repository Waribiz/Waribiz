# Waribiz

Plateforme de formations digitales sécurisée avec système de parrainage intégré, permettant la vente et la distribution contrôlée de contenus éducatifs (vidéos et ebooks).

## Technologies
- Frontend: HTML5, CSS3, JavaScript
- Backend: PHP 8+, MySQL/MariaDB
- Sécurité: Sessions PHP, protection des fichiers

## Structure du projet
```
/waribiz/
├── /public/              (accessible web)
│   ├── /assets/          (CSS, JS, images)
│   │   ├── /css/
│   │   ├── /js/
│   │   └── /img/
│   ├── /videos/          (accès protégé via PHP)
│   └── index.php
├── /admin/               (interface administration)
├── /includes/            (classes et fonctions PHP)
├── /templates/           (vues HTML)
├── /protected/           (fichiers formations hors web)
└── /uploads/             (fichiers uploadés)
```
```

