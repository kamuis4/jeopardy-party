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
    id: 'anime-manga',
    name: 'Anime & Manga',
    description: 'Des shonens légendaires aux classiques du manga.',
    emoji: '🔥',
    categories: [
      {
        name: 'Naruto',
        questions: [
          { level: 1, points: 100, question: 'Quel est le nom de famille de Naruto ?', answer: 'Uzumaki', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel démon est scellé dans Naruto ?', answer: 'Kurama / Kyûbi', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Qui est le frère de Sasuke ?', answer: 'Itachi Uchiwa', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel est le nom du mode ultime utilisant Kurama et l’énergie naturelle ?', answer: 'Mode Ermite des Six Chemins', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel Hokage a inventé l’Edo Tensei ?', answer: 'Tobirama Senju', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'One Piece',
        questions: [
          { level: 1, points: 100, question: 'Quel est le rêve de Luffy ?', answer: 'Devenir le Roi des Pirates', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel est le nom du bateau principal des Mugiwara après Enies Lobby ?', answer: 'Le Thousand Sunny', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel fruit du démon possède Trafalgar Law ?', answer: 'Ope Ope no Mi', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Qui est le père de Portgas D. Ace ?', answer: 'Gol D. Roger', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel est le vrai nom du fruit de Luffy révélé à Wano ?', answer: 'Hito Hito no Mi, modèle Nika', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Dragon Ball',
        questions: [
          { level: 1, points: 100, question: 'De quelle planète vient Goku ?', answer: 'La planète Vegeta', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel personnage est connu comme le Prince des Saiyans ?', answer: 'Vegeta', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Qui a vaincu Cell ?', answer: 'Gohan', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel ange accompagne Beerus ?', answer: 'Whis', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel est le nom de la fusion entre Goku et Vegeta avec les Potaras ?', answer: 'Vegetto', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Attaque des Titans',
        questions: [
          { level: 1, points: 100, question: 'Quel est le nom du héros principal ?', answer: 'Eren Jäger', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Qui possède le Titan Colossal au début de l’histoire ?', answer: 'Bertholdt Hoover', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel est le nom du bataillon d’exploration ?', answer: 'Le Bataillon d’Exploration', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Qui est la véritable identité du Titan Féminin ?', answer: 'Annie Leonhart', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel est le nom du plan d’Eren pour écraser le monde ?', answer: 'Le Grand Terrassement', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Openings Anime',
        questions: [
          { level: 1, points: 100, question: 'Quel anime possède l’opening “Gurenge” ?', answer: 'Demon Slayer', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel groupe chante “The Rumbling” ?', answer: 'SiM', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Dans quel anime entend-on “We Are!” ?', answer: 'One Piece', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel opening de Death Note est chanté par Maximum The Hormone ?', answer: 'What’s Up, People?!', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel anime possède l’opening “Again” de Yui ?', answer: 'Fullmetal Alchemist: Brotherhood', type: 'text', mediaUrl: null },
        ]
      },
    ]
  },

  {
    id: 'cinema-series',
    name: 'Cinéma & Séries',
    description: 'Films cultes, séries mythiques et scènes légendaires.',
    emoji: '🎬',
    categories: [
      {
        name: 'Marvel',
        questions: [
          { level: 1, points: 100, question: 'Quel acteur joue Iron Man ?', answer: 'Robert Downey Jr.', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel est le vrai nom de Black Panther ?', answer: 'T’Challa', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quelle pierre contrôle le temps ?', answer: 'La Pierre du Temps', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel film conclut la Saga de l’Infini ?', answer: 'Avengers: Endgame', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel personnage a créé Ultron ?', answer: 'Tony Stark et Bruce Banner', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Star Wars',
        questions: [
          { level: 1, points: 100, question: 'Qui est le père de Luke Skywalker ?', answer: 'Dark Vador / Anakin Skywalker', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel est le nom du maître Jedi de Obi-Wan ?', answer: 'Qui-Gon Jinn', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quelle arme utilise principalement les Jedi ?', answer: 'Le sabre laser', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel est le nom de la planète désertique de Luke ?', answer: 'Tatooine', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel Sith a survécu coupé en deux dans Episode I ?', answer: 'Dark Maul', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Netflix',
        questions: [
          { level: 1, points: 100, question: 'Dans quelle série trouve-t-on Eleven ?', answer: 'Stranger Things', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quelle série suit des braqueurs en combinaison rouge ?', answer: 'La Casa de Papel', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel jeu mortel est au centre de Squid Game ?', answer: '1, 2, 3 Soleil', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel est le prénom du sorceleur dans The Witcher ?', answer: 'Geralt', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quelle ville est au centre de Dark ?', answer: 'Winden', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Films Cultes',
        questions: [
          { level: 1, points: 100, question: 'Quel film met en scène un iceberg célèbre ?', answer: 'Titanic', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Qui a réalisé Jurassic Park ?', answer: 'Steven Spielberg', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Dans Matrix, quelle pilule choisit Neo ?', answer: 'La pilule rouge', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel film contient la phrase “Why so serious?”', answer: 'The Dark Knight', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel film a remporté l’Oscar du meilleur film en 2020 ?', answer: 'Parasite', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Séries Post-Apo',
        questions: [
          { level: 1, points: 100, question: 'Quel champignon provoque l’infection dans The Last of Us ?', answer: 'Le Cordyceps', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel personnage principal manie une arbalète dans The Walking Dead ?', answer: 'Daryl Dixon', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Dans quelle série les passagers du vol 828 disparaissent-ils ?', answer: 'Manifest', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quelle série Marvel suit une école de mutants ?', answer: 'The Gifted', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel bunker protège les survivants dans la série Silo ?', answer: 'Le Silo', type: 'text', mediaUrl: null },
        ]
      },
    ]
  },

  {
    id: 'musique',
    name: 'Musique',
    description: 'Rap, pop, openings anime et classiques intemporels.',
    emoji: '🎵',
    categories: [
      {
        name: 'Rap FR',
        questions: [
          { level: 1, points: 100, question: 'Quel rappeur a sorti “Sapés comme jamais” ?', answer: 'Maître Gims', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel artiste est surnommé “Le Duc de Boulogne” ?', answer: 'Booba', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel groupe a créé l’album “L’école du micro d’argent” ?', answer: 'IAM', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel rappeur a sorti “Jefe” ?', answer: 'Ninho', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel artiste français a rempli le Stade de France avec “Civilisation Tour” ?', answer: 'Orelsan', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Hits Internationaux',
        questions: [
          { level: 1, points: 100, question: 'Qui chante “Blinding Lights” ?', answer: 'The Weeknd', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel groupe a créé “Bohemian Rhapsody” ?', answer: 'Queen', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel artiste est surnommé le King of Pop ?', answer: 'Michael Jackson', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel groupe de K-pop a sorti “Dynamite” ?', answer: 'BTS', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel artiste a sorti l’album “After Hours” ?', answer: 'The Weeknd', type: 'text', mediaUrl: null },
        ]
      },
    ]
  },

  {
    id: 'internet-memes',
    name: 'Internet & Memes',
    description: 'L’humour d’internet et les références impossibles à expliquer à tes parents.',
    emoji: '😂',
    categories: [
      {
        name: 'Memes',
        questions: [
          { level: 1, points: 100, question: 'Quel chien est devenu le célèbre meme “Doge” ?', answer: 'Un Shiba Inu', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quelle plateforme a popularisé les vidéos courtes verticales ?', answer: 'TikTok', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Que signifie “NPC” dans les memes gaming ?', answer: 'Non-Player Character', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel streamer est connu pour dire “Wesh alors” ?', answer: 'Squeezie', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel meme montre un homme regardant une autre femme pendant que sa copine le fixe ?', answer: 'Distracted Boyfriend', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'YouTube & Twitch',
        questions: [
          { level: 1, points: 100, question: 'Quel youtubeur français a créé le GP Explorer ?', answer: 'Squeezie', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quelle plateforme appartient à Amazon ?', answer: 'Twitch', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel streamer est connu sous le pseudo “Kameto” ?', answer: 'Kamel Kebir', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quelle équipe esport a été créée par Kameto et Prime ?', answer: 'Karmine Corp', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel événement français réunit des streamers pour des dons caritatifs ?', answer: 'Le Z Event', type: 'text', mediaUrl: null },
        ]
      },
    ]
  },
   {
      id: 'univers-gaming',
    name: 'Univers Gaming',
    description: 'Les licences et jeux qui ont marqué des générations.',
    emoji: '🎮',
    categories: [
      {
        name: 'Minecraft',
        questions: [
          { level: 1, points: 100, question: 'Quel matériau faut-il pour fabriquer une pioche en diamant ?', answer: 'Des diamants et des bâtons', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Comment s’appelle la dimension du dragon ?', answer: 'L’End', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel mob explose près du joueur ?', answer: 'Le Creeper', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel minerai permet de fabriquer une table d’enchantement ?', answer: 'Le diamant', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel objet permet de localiser une forteresse de l’End ?', answer: 'L’Œil de l’Ender', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Fortnite',
        questions: [
          { level: 1, points: 100, question: 'Combien de joueurs composent une partie classique ?', answer: '100', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel mode oppose uniquement deux équipes géantes ?', answer: 'Le mode 50v50', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quelle entreprise développe Fortnite ?', answer: 'Epic Games', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel matériau possède le plus de points de vie ?', answer: 'Le métal', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel personnage emblématique est lié au cube Kevin ?', answer: 'Le Cube / Kevin', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'League of Legends',
        questions: [
          { level: 1, points: 100, question: 'Quel objectif principal faut-il détruire pour gagner ?', answer: 'Le Nexus', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Combien de lanes possède la carte classique ?', answer: '3', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel champion utilise une lanterne ?', answer: 'Thresh', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel monstre donne un buff violet ?', answer: 'Le Baron Nashor', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel joueur est surnommé le GOAT de LoL ?', answer: 'Faker', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Pokémon',
        questions: [
          { level: 1, points: 100, question: 'Quel Pokémon est numéro 25 ?', answer: 'Pikachu', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel type est super efficace contre l’eau ?', answer: 'Le type Électrik ou Plante', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel Pokémon légendaire apparaît sur Pokémon Argent ?', answer: 'Lugia', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel professeur donne le premier Pokémon à Sacha dans l’anime ?', answer: 'Le Professeur Chen', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel Pokémon possède la capacité “Multécaille” ?', answer: 'Dracolosse', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Call of Duty',
        questions: [
          { level: 1, points: 100, question: 'Quel mode emblématique oppose des équipes en ligne ?', answer: 'Le multijoueur', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel mode contient des zombies ?', answer: 'Le mode Zombies', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel studio développe principalement Black Ops ?', answer: 'Treyarch', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Comment s’appelle le Battle Royale de COD ?', answer: 'Warzone', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel personnage emblématique dit “Remember, no Russian” ?', answer: 'Makarov', type: 'text', mediaUrl: null },
        ]
      },
    ]
  },
    {
    id: 'anime-underrated',
    name: 'Anime Underrated',
    description: 'Des animes moins mainstream mais adorés des vrais fans.',
    emoji: '🌌',
    categories: [
      {
        name: '86 Eighty-Six',
        questions: [
          { level: 1, points: 100, question: 'Quel est le nom de l’escadron principal ?', answer: 'Spearhead Squadron', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Comment les pilotes des drones sont-ils appelés ?', answer: 'Les Eighty-Six', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel est le prénom du protagoniste masculin ?', answer: 'Shinei / Shin', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel pays discrimine les Eighty-Six ?', answer: 'La République de San Magnolia', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel surnom est donné à Shin sur le champ de bataille ?', answer: 'Le Faucheur', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Summertime Render',
        questions: [
          { level: 1, points: 100, question: 'Sur quelle île se déroule l’histoire ?', answer: 'Hitogashima', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel phénomène étrange touche les habitants ?', answer: 'Les Ombres / Shadows', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel pouvoir possède Shinpei ?', answer: 'Revenir dans le temps après sa mort', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Comment s’appelle la fille blonde liée aux Shadows ?', answer: 'Ushio', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel œil spécial Shinpei reçoit-il ?', answer: 'L’œil de Hizuru / l’œil de Haine', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Heavenly Delusion',
        questions: [
          { level: 1, points: 100, question: 'Quel duo principal voyage dans le Japon détruit ?', answer: 'Maru et Kiruko', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel est le nom des monstres dans la série ?', answer: 'Les Hiruko', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel est l’objectif principal de Maru ?', answer: 'Trouver le “paradis”', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel pouvoir spécial possède Maru ?', answer: 'Le Maru Touch', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel est le vrai lien entre Kiruko et Haruki ?', answer: 'Le cerveau de Haruki est dans le corps de Kiriko', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Link Click',
        questions: [
          { level: 1, points: 100, question: 'Quel pouvoir permet de voyager dans des photos ?', answer: 'Entrer dans les photos', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Comment s’appellent les deux protagonistes ?', answer: 'Cheng Xiaoshi et Lu Guang', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Combien de temps Cheng peut-il rester dans une photo ?', answer: '12 heures', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Qui analyse les événements depuis l’extérieur ?', answer: 'Lu Guang', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel thème central revient constamment ?', answer: 'Les conséquences de changer le passé', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Vivy Fluorite Eye’s Song',
        questions: [
          { level: 1, points: 100, question: 'Quel est le métier de Vivy au début ?', answer: 'Chanteuse IA', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel ours IA vient du futur ?', answer: 'Matsumoto', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quelle catastrophe cherchent-ils à empêcher ?', answer: 'La guerre des IA contre les humains', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Combien d’années dans le futur vient Matsumoto ?', answer: '100 ans', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quelle est la mission principale de Vivy ?', answer: 'Rendre les humains heureux grâce à ses chansons', type: 'text', mediaUrl: null },
        ]
      },
    ]
  },

  {
    id: 'anime-psychologique',
    name: 'Anime Psychologique',
    description: 'Mind games, mystères et animes qui retournent le cerveau.',
    emoji: '🧠',
    categories: [
      {
        name: 'Monster',
        questions: [
          { level: 1, points: 100, question: 'Quel métier exerce Kenzo Tenma ?', answer: 'Chirurgien', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel est le prénom du principal antagoniste ?', answer: 'Johan', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Dans quel pays se déroule majoritairement l’histoire ?', answer: 'L’Allemagne', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Pourquoi Tenma devient-il recherché ?', answer: 'Il est accusé de meurtres', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel livre revient souvent dans l’histoire de Johan ?', answer: 'Le Monstre Sans Nom', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Psycho-Pass',
        questions: [
          { level: 1, points: 100, question: 'Quel système analyse les criminels ?', answer: 'Le système Sibyl', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quelle arme utilise les inspecteurs ?', answer: 'Le Dominator', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel est le prénom de l’héroïne principale ?', answer: 'Akane', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel antagoniste est immunisé au Sibyl System ?', answer: 'Makishima', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Que mesure le Psycho-Pass ?', answer: 'L’état mental et criminel d’une personne', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Ergo Proxy',
        questions: [
          { level: 1, points: 100, question: 'Quel est le prénom de l’héroïne ?', answer: 'Re-l Mayer', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Comment s’appellent les robots conscients ?', answer: 'AutoReivs', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel virus touche les AutoReivs ?', answer: 'Le virus Cogito', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel Proxy accompagne souvent Re-l ?', answer: 'Vincent / Ergo Proxy', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel thème domine la série ?', answer: 'L’identité humaine et la conscience', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Paranoia Agent',
        questions: [
          { level: 1, points: 100, question: 'Quelle arme utilise le mystérieux agresseur ?', answer: 'Une batte de baseball', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel est le surnom du garçon ?', answer: 'Shonen Bat', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel réalisateur a créé cet anime ?', answer: 'Satoshi Kon', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel thème revient souvent ?', answer: 'La fuite de la réalité', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel objet est lié à Maromi ?', answer: 'Une peluche rose', type: 'text', mediaUrl: null },
        ]
      },
      {
    id: 'manga',
    name: 'Manga',
    description: 'L\'univers des cases et des bulles, du Shonen au Seinen.',
    emoji: '📖',
    categories: [
      {
        name: 'Shonen Hits',
        questions: [
          { level: 1, points: 100, question: 'Qui est le protagoniste de One Piece qui souhaite devenir le Roi des Pirates ?', answer: 'Luffy', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Dans Naruto, quel démon est scellé à l\'intérieur du héros ?', answer: 'Kyubi (ou Kurama / le Renard à neuf queues)', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel est le nom de l\'école de super-héros dans My Hero Academia ?', answer: 'U.A. (ou Yuei)', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Dans Bleach, comment s\'appelle le sabre d\'un Shinigami ?', answer: 'Un Zanpakuto', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Dans Hunter x Hunter, quelle est la spécialité de Nen de Kurapika ?', answer: 'La Matérialisation (Spécialisation quand ses yeux sont rouges)', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Seinen & Dark',
        questions: [
          { level: 1, points: 100, question: 'Dans quel manga Denji fusionne-t-il avec son chien-démon tronçonneuse ?', answer: 'Chainsaw Man', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel manga de dark fantasy suit les aventures de Guts, le Chevalier Noir ?', answer: 'Berserk', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Dans Tokyo Ghoul, quel est l\'aliment que les goules peuvent consommer comme les humains ?', answer: 'Le café', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Qui est l\'auteur du thriller psychologique "Monster" ?', answer: 'Naoki Urasawa', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Dans Vinland Saga, de quel personnage historique Thorfinn cherche-t-il à se venger au début ?', answer: 'Askeladd', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Sports',
        questions: [
          { level: 1, points: 100, question: 'Quel manga de football a popularisé le concept de "Blue Lock" ?', answer: 'Blue Lock', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel sport est au centre du manga Haikyuu!! ?', answer: 'Le Volley-ball', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel est le nom du protagoniste dans le manga de boxe Ippo ?', answer: 'Ippo Makunouchi', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Dans Slam Dunk, pour quel lycée joue Hanamichi Sakuragi ?', answer: 'Shohoku', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel manga de sport de Takehiko Inoue traite du basket-ball en fauteuil roulant ?', answer: 'Real', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Classiques',
        questions: [
          { level: 1, points: 100, question: 'Quel manga d\'Akira Toriyama met en scène les boules de cristal ?', answer: 'Dragon Ball', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Dans Death Note, quel est le nom du Shinigami qui accompagne Light ?', answer: 'Ryuk', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Qui est le créateur d\'Astro Boy, considéré comme le "Dieu du Manga" ?', answer: 'Osamu Tezuka', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Dans Fullmetal Alchemist, quelle est la loi fondamentale de l\'alchimie ?', answer: 'L\'échange équivalent', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'En quelle année a débuté la publication de Jojo\'s Bizarre Adventure au Japon ?', answer: '1987', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Animes & Studios',
        questions: [
          { level: 1, points: 100, question: 'Quel studio a produit les films "Le Voyage de Chihiro" et "Mon Voisin Totoro" ?', answer: 'Studio Ghibli', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel studio est célèbre pour l\'animation de l\'Attaque des Titans (saisons 1 à 3) ?', answer: 'WIT Studio', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Qui a réalisé le film d\'animation culte "Your Name" ?', answer: 'Makoto Shinkai', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel studio s\'occupe de l\'adaptation de Demon Slayer ?', answer: 'ufotable', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel compositeur est célèbre pour avoir signé les musiques de Cowboy Bebop ?', answer: 'Yoko Kanno', type: 'text', mediaUrl: null },
        ]
      }
    ]
  },
  {
    id: 'webtoon',
    name: 'Webtoon',
    description: 'L\'univers de la lecture verticale coréenne.',
    emoji: '📱',
    categories: [
      {
        name: 'Action & Fantasy',
        questions: [
          { level: 1, points: 100, question: 'Qui est le chasseur principal de Solo Leveling ?', answer: 'Sung Jin-woo', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Dans Tower of God, comment appelle-t-on ceux qui n\'ont pas été choisis par la Tour ?', answer: 'Les irréguliers', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel est l\'arme principale de Mori Jin dans The God of High School ?', answer: 'Le bâton Ruyi Jingu (ou Yeoui)', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Dans quel Webtoon le héros est-il le seul à connaître la fin du roman qu\'il lisait ?', answer: 'Omniscient Reader\'s Viewpoint', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Dans Survival Story of a Sword King, combien d\'années le héros reste-t-il bloqué dans la zone tutorielle ?', answer: '22 ans', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Romance & Drama',
        questions: [
          { level: 1, points: 100, question: 'Quel Webtoon raconte l\'histoire de Jugyeong qui maîtrise l\'art du maquillage ?', answer: 'True Beauty', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Dans Lore Olympus, de quelle déesse Hadès tombe-t-il amoureux ?', answer: 'Perséphone', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Dans "Remarried Empress", quel est le nom de l\'impératrice qui demande le divorce ?', answer: 'Navier Ellie Trovi', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel Webtoon suit les relations complexes entre Seol Hong et Jung Yoo à l\'université ?', answer: 'Cheese in the Trap', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Dans "See You in My 19th Life", quel est le nom de l\'héroïne qui se souvient de ses vies passées ?', answer: 'Ban Ji-eum', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Lycée & Société',
        questions: [
          { level: 1, points: 100, question: 'Dans Lookism, quel est le pouvoir particulier du protagoniste Daniel Park ?', answer: 'Il possède deux corps', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel Webtoon suit un lycéen très fort protégé par un chat qui est en réalité un éveilleur puissant ?', answer: 'Eleceed', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Dans "Weak Hero", quel est le surnom du protagoniste Gray Yeon ?', answer: 'Le Serpent Blanc (White Mamba)', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel Webtoon traite d\'un système de points sociaux où les élèves s\'entretuent ?', answer: 'Pyramid Game', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Dans "Wind Breaker", quelle est la discipline sportive pratiquée par Jay Jo ?', answer: 'Le cyclisme (vélo de route / fixie)', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Systèmes & Isekai',
        questions: [
          { level: 1, points: 100, question: 'Comment appelle-t-on le genre où un personnage est transporté dans un autre monde ?', answer: 'Isekai', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Dans "The Greatest Estate Developer", quelle est la profession d\'origine de Lloyd ?', answer: 'Ingénieur en génie civil', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Dans "SSS-Class Suicide Hunter", quel est le pouvoir unique du héros au début ?', answer: 'Copier une compétence de celui qui l\'a tué (en mourant lui-même)', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel est le titre du Webtoon où le héros devient le secrétaire d\'une succube ?', answer: 'What\'s Wrong with Being the Villainess? (ou similaire)', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Dans "Trash of the Count\'s Family", quel est le nom du personnage dans lequel Cale s\'est réincarné ?', answer: 'Cale Henituse', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Plateformes & Culture',
        questions: [
          { level: 1, points: 100, question: 'De quel pays sont originaires les Webtoons ?', answer: 'Corée du Sud', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quelle est la couleur dominante du logo de l\'application Webtoon (Naver) ?', answer: 'Vert', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Comment appelle-t-on la monnaie virtuelle sur la plateforme Webtoon pour lire en avance ?', answer: 'Les Coins (ou pièces)', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel est le nom de la plateforme concurrente appartenant à Kakao ?', answer: 'Tapas (ou Kakao Webtoon)', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel terme coréen désigne spécifiquement la bande dessinée (papier ou web) ?', answer: 'Manhwa', type: 'text', mediaUrl: null },
        ]
      }
    ]
  },
  {
    id: 'pokemon',
    name: 'Pokémon',
    description: 'Devenez le Maître de la Ligue avec ce pack complet.',
    emoji: '✨',
    categories: [
      {
        name: 'Premières Générations',
        questions: [
          { level: 1, points: 100, question: 'Quel Pokémon est le numéro 001 du Pokédex ?', answer: 'Bulbizarre', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Comment s\'appelle le célèbre professeur de la région de Kanto ?', answer: 'Professeur Chen', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel Pokémon légendaire peut-on trouver au fond des Îles Écume ?', answer: 'Artikodin', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quelle ville de Kanto n\'a pas d\'Arène mais possède une Tour Pokémon ?', answer: 'Lavanville', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Dans les versions Rouge et Bleu, quel est le seul moyen d\'obtenir un Lippoutou ?', answer: 'Par un échange interne (contre un Tartard)', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Évolutions',
        questions: [
          { level: 1, points: 100, question: 'De quel type devient Dracaufeu après son évolution de Reptincel ?', answer: 'Feu / Vol', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quelle pierre est nécessaire pour faire évoluer Pikachu en Raichu ?', answer: 'Pierre Foudre', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Combien d\'évolutions différentes Évoli possède-t-il actuellement ?', answer: '8', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel Pokémon évolue en Alakazam uniquement via un échange ?', answer: 'Kadabra', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Comment fait-on évoluer Sepiatop en Sepiatroce dans les jeux récents ?', answer: 'En retournant la console à l\'envers lors du passage de niveau', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Légendaires',
        questions: [
          { level: 1, points: 100, question: 'Quel Pokémon est le maître du trio des oiseaux légendaires ?', answer: 'Lugia', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel Pokémon a été créé par l\'homme à partir de l\'ADN de Mew ?', answer: 'Mewtwo', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Qui est le Dieu créateur de l\'univers Pokémon ?', answer: 'Arceus', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel duo de légendaires représente l\'Espace et le Temps à Sinnoh ?', answer: 'Palkia et Dialga', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel Pokémon légendaire de la 3G est capable de calmer le conflit entre Groudon et Kyogre ?', answer: 'Rayquaza', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Types & Stratégie',
        questions: [
          { level: 1, points: 100, question: 'Le type Eau est-il super efficace contre le type Feu ?', answer: 'Oui', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel type est totalement immunisé aux attaques de type Spectre ?', answer: 'Normal', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel est le seul type qui n\'a qu\'une seule faiblesse (le type Sol) ?', answer: 'Électrik', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel objet permet à un Pokémon de regagner un peu de PV à chaque tour ?', answer: 'Les Restes (Leftovers)', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quelle capacité permet d\'attaquer en premier si l\'adversaire utilise une capacité offensive ?', answer: 'Coup Bas (Sucker Punch)', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Régions',
        questions: [
          { level: 1, points: 100, question: 'Dans quelle région se déroulent les jeux Épée et Bouclier ?', answer: 'Galar', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quelle région est inspirée par la France ?', answer: 'Kalos', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Comment s\'appelle l\'archipel tropical de la 7ème génération ?', answer: 'Alola', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quelle région est divisée entre le monde réel et le Monde Distorsion ?', answer: 'Sinnoh', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Dans quelle région peut-on visiter les Ruines Alpha ?', answer: 'Johto', type: 'text', mediaUrl: null },
        ]
      }
    ]
  },
  {
    id: 'genshin',
    name: 'Genshin Impact',
    description: 'Testez vos connaissances sur le monde de Teyvat.',
    emoji: '🌬️',
    categories: [
      {
        name: 'Les Archons',
        questions: [
          { level: 1, points: 100, question: 'Qui est l\'Archon Anémo et protecteur de Mondstadt ?', answer: 'Venti (ou Barbatos)', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel est le nom de l\'Archon Géo qui travaille au Funérarium de Liyue ?', answer: 'Zhongli (ou Morax)', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quelle est l\'arme de prédilection de la Shogun Raiden, l\'Archon Électro ?', answer: 'L\'arme d\'hast (Lance)', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Comment s\'appelle l\'Archon Dendro retenue au Sanctuaire de Surasthana ?', answer: 'Nahida (ou Buer / la Petite Reine Kusanali)', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'L\'Archon Hydro Furina est l\'idole de quelle nation ?', answer: 'Fontaine', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Nations de Teyvat',
        questions: [
          { level: 1, points: 100, question: 'Quelle nation est inspirée par l\'Allemagne médiévale et le thème du vent ?', answer: 'Mondstadt', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Dans quelle nation se trouve la célèbre Chambre d\'Or ?', answer: 'Liyue', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quelle île d\'Inazuma est recouverte d\'un orage perpétuel au début de l\'histoire ?', answer: 'Yashiori (ou Seirai)', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Comment s\'appelle la zone désertique immense ajoutée à Sumeru ?', answer: 'Le Désert de Sumeru', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quelle cité sous-marine se trouve sous l\'île de Watatsumi ?', answer: 'Enkanomiya', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Personnages',
        questions: [
          { level: 1, points: 100, question: 'Quelle chevalière de Mondstadt est surnommée la "Chevalière de l\'Étincelle" ?', answer: 'Klee', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel personnage de Liyue est un exorciste qui a trop d\'énergie positive ?', answer: 'Chongyun', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Qui est le capitaine de la Flotte du Crucifix ?', answer: 'Beidou', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel personnage de Mondstadt est en réalité un homoncule créé par l\'alchimiste Rhinedottir ?', answer: 'Albedo', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Comment s\'appelle le véritable propriétaire de la Taverne du Cadeau de l\'Ange ?', answer: 'Diluc', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Ennemis & Boss',
        questions: [
          { level: 1, points: 100, question: 'Quel est le nom de l\'organisation masquée qui sert de sbires aux Fatui ?', answer: 'Les Brutocollinus (Hilichurls)', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel boss hebdomadaire se trouve dans l\'Antre du Dragon ?', answer: 'Dvalin (Stormterror)', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Comment s\'appelle l\'Onzième Exécuteur des Fatui que l\'on affronte à la Chambre d\'Or ?', answer: 'Tartaglia (Childe)', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel ennemi est le "Prince" ou la "Princesse" de l\'Ordre de l\'Abîme ?', answer: 'Le jumeau perdu (le Voyageur opposé)', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel est le nom du boss divin créé par l\'Académie de Sumeru utilisant le corps de Scaramouche ?', answer: 'Shouki no Kami', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Systèmes de Jeu',
        questions: [
          { level: 1, points: 100, question: 'Quel est l\'objet nécessaire pour faire des vœux sur les bannières limitées ?', answer: 'Pierre de la fatalité', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Combien de personnages peut-on avoir dans une équipe active en exploration ?', answer: '4', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Comment s\'appelle le système de "Housing" (maison) dans Genshin ?', answer: 'La Sérénithéière', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel est le niveau maximum qu\'un personnage peut atteindre ?', answer: '90', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel est le nom de la réaction élémentaire produite par l\'Hydro et le Dendro ?', answer: 'Fleurissement (Bloom)', type: 'text', mediaUrl: null },
        ]
      }
    ]
  },
  {
    id: 'hsr',
    name: 'Honkai: Star Rail',
    description: 'En route vers les confins de la galaxie.',
    emoji: '🚂',
    categories: [
      {
        name: 'Équipage de l\'Express',
        questions: [
          { level: 1, points: 100, question: 'Quel est le nom de la jeune fille qui adore prendre des photos avec son appareil ?', answer: 'March 7th', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Qui est le contrôleur (mascotte) de l\'Astral Express ?', answer: 'Pom-Pom', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel membre de l\'équipage est un ancien Grand Maître de l\'escrime à bord d\'un vaisseau de l\'Alliance ?', answer: 'Dan Heng', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Qui a réparé l\'Astral Express après qu\'il ait été endommagé ?', answer: 'Himeko', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel est le nom de la Voie suivie par l\'équipage de l\'Astral Express ?', answer: 'La Voie de la Pionnerie (The Trailblaze)', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Mondes & Destinations',
        questions: [
          { level: 1, points: 100, question: 'Sur quelle station spatiale commence le tutoriel du jeu ?', answer: 'Station spatiale Herta', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quelle est la dernière ville protégée du froid éternel sur Jarilo-VI ?', answer: 'Belobog', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Comment s\'appelle le gigantesque vaisseau de l\'Alliance Xianzhou que l\'on visite en premier ?', answer: 'Le Luofu', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quelle est la "Planète des Festivités" où se déroule l\'arc suivant ?', answer: 'Penacony', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel groupe mystérieux dirige la ville de Belobog depuis des générations ?', answer: 'Les Gardes de la Crinière d\'Argent (Silvermane Guards)', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Aeons & Voies',
        questions: [
          { level: 1, points: 100, question: 'Quel Aeon régit la Voie de la Destruction ?', answer: 'Nanook', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Comment s\'appelle l\'Aeon de la Préservation, vénéré à Belobog ?', answer: 'Qlipoth', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel Aeon est à la tête de la Voie de l\'Abondance, ennemi juré de l\'Alliance ?', answer: 'Yaoshi', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'L\'Aeon de l\'Érudition, qui a créé le Simulateur d\'Univers, s\'appelle ?', answer: 'Nous', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel Aeon disparu était lié à la Voie de la Pionnerie ?', answer: 'Akivili', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Antagonistes',
        questions: [
          { level: 1, points: 100, question: 'Quel groupe cherche à répandre le Stellaron à travers l\'univers ?', answer: 'Les Chasseurs de Stellaron', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quelle ennemie utilise des fils de soie et joue du violon invisible pendant ses attaques ?', answer: 'Kafka', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Qui est l\'immortel qui manie une épée brisée et cherche Dan Heng ?', answer: 'Blade', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Quel monstre est le boss final de la zone de Belobog sur Jarilo-VI ?', answer: 'Cocolia, Mère de la Tromperie', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Qui est le chef des Chasseurs de Stellaron ?', answer: 'Elio', type: 'text', mediaUrl: null },
        ]
      },
      {
        name: 'Mécaniques de Combat',
        questions: [
          { level: 1, points: 100, question: 'Quel type d\'attaque consomme des points de compétence (SP) ?', answer: 'La Compétence (Skill)', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Comment appelle-t-on l\'attaque spéciale qui nécessite de charger une jauge d\'énergie ?', answer: 'L\'Ultime (Ultimate)', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel effet se produit lorsqu\'on réduit la jauge de robustesse d\'un ennemi à zéro ?', answer: 'Une Rupture de Faiblesse (Weakness Break)', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'Comment s\'appelle le mode de jeu roguelike créé par Herta ?', answer: 'L\'Univers Simulé', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Combien de types d\'éléments différents existent dans le jeu (Physique, Feu, Glace, etc.) ?', answer: '7 (Physique, Feu, Glace, Foudre, Vent, Quantique, Imaginaire)', type: 'text', mediaUrl: null },
        ]
      }
    ]
  },
      {
        name: 'Serial Experiments Lain',
        questions: [
          { level: 1, points: 100, question: 'Quel est le prénom de l’héroïne ?', answer: 'Lain', type: 'text', mediaUrl: null },
          { level: 2, points: 200, question: 'Quel réseau virtuel domine la série ?', answer: 'The Wired', type: 'text', mediaUrl: null },
          { level: 3, points: 300, question: 'Quel thème principal explore l’anime ?', answer: 'Internet et l’identité', type: 'text', mediaUrl: null },
          { level: 4, points: 400, question: 'En quelle décennie l’anime est-il sorti ?', answer: 'Les années 90', type: 'text', mediaUrl: null },
          { level: 5, points: 500, question: 'Quel message culte est associé à Lain ?', answer: 'Present Day, Present Time', type: 'text', mediaUrl: null },
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
