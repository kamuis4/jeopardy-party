// ─────────────────────────────────────────────────────────────
//  JEOPARDY PARTY — Sample Question Packs
//  Replace with MongoDB/Supabase queries in production
// ─────────────────────────────────────────────────────────────

const PACKS = [
  {
    id: 'culture-generale',
    name: 'Culture Générale',
    description: 'Testez vos connaissances sur l\'histoire, les sciences, la géographie et plus.',
    emoji: '🌍',
    categories: [
      {
        name: 'Histoire',
        questions: [
          { level: 1, points: 100, question: 'En quelle année a eu lieu la Révolution Française ?', answer: '1789', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel empire a été fondé par Gengis Khan au XIIIe siècle ?', answer: 'L\'Empire Mongol', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Qui était le premier président des États-Unis ?', answer: 'George Washington', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'En quelle année le mur de Berlin est-il tombé ?', answer: '1989', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel traité a mis fin à la Première Guerre Mondiale ?', answer: 'Le Traité de Versailles', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Sciences',
        questions: [
          { level: 1, points: 100, question: 'Quelle est la formule chimique de l\'eau ?', answer: 'H₂O', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Combien de chromosomes possède un être humain ?', answer: '46', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quelle planète est la plus grande du système solaire ?', answer: 'Jupiter', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel élément chimique a le symbole "Au" ?', answer: 'L\'or (Aurum)', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quelle est la vitesse de la lumière dans le vide ?', answer: '299 792 458 m/s (environ 300 000 km/s)', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Géographie',
        questions: [
          { level: 1, points: 100, question: 'Quelle est la capitale de la France ?', answer: 'Paris', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel est le plus grand océan du monde ?', answer: 'L\'océan Pacifique', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Dans quel pays se trouve le Machu Picchu ?', answer: 'Le Pérou', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel est le plus long fleuve du monde ?', answer: 'Le Nil (ou l\'Amazone selon les mesures)', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quelle est la capitale du Kazakhstan ?', answer: 'Astana', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Culture Pop',
        questions: [
          { level: 1, points: 100, question: 'Dans quelle ville se déroule la série "Stranger Things" ?', answer: 'Hawkins (Indiana)', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Qui a chanté "Thriller" en 1982 ?', answer: 'Michael Jackson', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel film de Pixar met en scène un robot solitaire sur Terre ?', answer: 'WALL-E', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Dans quel pays est né le jeu de société "Catan" ?', answer: 'L\'Allemagne', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel auteur a écrit "Le Seigneur des Anneaux" ?', answer: 'J.R.R. Tolkien', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Sport',
        questions: [
          { level: 1, points: 100, question: 'Combien y a-t-il de joueurs dans une équipe de football ?', answer: '11 joueurs', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Dans quel sport pratique-t-on le "slam dunk" ?', answer: 'Le basket-ball', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Combien de sets faut-il gagner pour remporter un match de tennis en Grand Chelem (hommes) ?', answer: '3 sets sur 5', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quelle ville a accueilli les premiers Jeux Olympiques modernes en 1896 ?', answer: 'Athènes', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel pays a remporté le plus de Coupes du Monde de football ?', answer: 'Le Brésil (5 titres)', type: 'text', mediaUrl: null },
        ]
      },
    ]
  },
  {
    id: 'tech-gaming',
    name: 'Tech & Gaming',
    description: 'Geeks, développeurs et gamers : c\'est votre heure de briller.',
    emoji: '🎮',
    categories: [
      {
        name: 'Jeux Vidéo',
        questions: [
          { level: 1, points: 100, question: 'Dans quelle franchise de jeux vidéo trouve-t-on le personnage "Link" ?', answer: 'The Legend of Zelda', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel studio a créé "The Witcher" ?', answer: 'CD Projekt Red', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'En quelle année est sorti le premier "Doom" ?', answer: '1993', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel jeu de Valve a popularisé le Battle Royale ?', answer: 'Counter-Strike: GO (Danger Zone) — ou répondre PUBG si hors-Valve', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Combien de Pokémon y avait-il dans la 1ère génération ?', answer: '151', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Développement',
        questions: [
          { level: 1, points: 100, question: 'Que signifie l\'acronyme "HTML" ?', answer: 'HyperText Markup Language', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel symbole est utilisé pour démarrer un commentaire sur une seule ligne en JavaScript ?', answer: '//', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel framework JavaScript a été créé par Facebook (Meta) ?', answer: 'React', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quelle structure de données suit le principe LIFO (Last In, First Out) ?', answer: 'Une pile (Stack)', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel algorithme de tri a une complexité moyenne de O(n log n) ?', answer: 'Quicksort, Mergesort, Heapsort (accepter les trois)', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Internet & Tech',
        questions: [
          { level: 1, points: 100, question: 'Quel pays est le berceau d\'origine d\'Apple ?', answer: 'Les États-Unis', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'En quelle année a été fondé Google ?', answer: '1998', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel protocole sécurise les échanges sur le web (cadenas dans le navigateur) ?', answer: 'HTTPS / TLS', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel moteur JavaScript est utilisé par Node.js ?', answer: 'V8 (de Google)', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel terme désigne une attaque où un serveur est submergé de requêtes pour le rendre inaccessible ?', answer: 'DDoS (Distributed Denial of Service)', type: 'text', mediaUrl: null },
        ]
      },
    ]
  }
];

module.exports = PACKS;
