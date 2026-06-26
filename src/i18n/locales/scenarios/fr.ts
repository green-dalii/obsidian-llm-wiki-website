import type { ScenariosTranslation } from './types';

export const fr: ScenariosTranslation = {
  scenarios: [
    {
      id: 'daily-life',
      label: 'Vie quotidienne',
      icon: 'heart',
      filename: 'sleep-hygiene.md',
      sourceNoteContext: "Une note de référence en science de la santé — synthétisant les recherches clés sur l'architecture du sommeil, la dette de sommeil et l'hygiène pratique. Le genre d'article que vous enregistreriez pour améliorer votre bien-être.",
      sourceNote: `# Pourquoi nous dormons : conclusions clés

Le sommeil est la chose la plus efficace que nous puissions faire pour réinitialiser notre cerveau et notre corps.

## Architecture du sommeil
- NREM Stade 3 (sommeil profond) : restauration physique, fonction immunitaire
- REM : traitement émotionnel, créativité, consolidation de la mémoire
- Chaque cycle dure ~90 min, 4 à 5 cycles par nuit sont l'idéal

## Le coût de la dette de sommeil
- Après 1 semaine à 6 h/nuit : les performances cognitives équivalent à 0,05 % d'alcoolémie
- Dette de sommeil chronique liée à Alzheimer — la clairance glymphatique chute de 60 %
- 5 h de sommeil → la testostérone chute de 10–15 % chez les jeunes hommes en bonne santé

## Hygiène du sommeil en pratique
- Température optimale de la chambre : 18–19 °C
- Pas de lumière bleue 90 min avant le coucher — la sensibilité à la mélanopsine culmine à 480 nm
- Demi-vie de la caféine : 6 h ; dernière prise avant 14 h
- La régularité du réveil compte plus que celle du coucher

## Questions ouvertes
- Les siestes compensent-elles la dette nocturne ? Les preuves sont mitigées
- Mélatonine : 0,3 mg est aussi efficace que 3 mg. La plupart des compléments sont surdosés.`,
      extractedItems: [
        { name: 'Matthew Walker', type: 'entity', lineIdx: 0 },
        { name: 'Système glymphatique', type: 'entity', lineIdx: 0 },
        { name: 'Architecture du sommeil', type: 'concept', lineIdx: 0 },
        { name: 'Dette de sommeil', type: 'concept', lineIdx: 0 },
        { name: 'Caféine', type: 'entity', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Système glymphatique', path: 'wiki/entities/glymphatic-system.md', tags: ['Neuroscience', 'Cerveau'], summary: "Le système d'élimination des déchets du cerveau qui opère principalement pendant le sommeil profond. La privation chronique de sommeil réduit la clairance glymphatique jusqu'à 60 %, reliant le manque de sommeil au risque d'Alzheimer." },
        { title: 'Matthew Walker', path: 'wiki/entities/matthew-walker.md', tags: ['Scientifique', 'Auteur'], summary: "Neuroscientifique et chercheur sur le sommeil, auteur de \"Why We Sleep\". A démontré le rôle crucial du sommeil profond dans la clairance glymphatique et les coûts cognitifs cumulés de la dette de sommeil." },
        { title: 'Architecture du sommeil', path: 'wiki/concepts/sleep-architecture.md', tags: ['Neuroscience', 'Sommeil'], summary: "La structure des cycles de sommeil : NREM Stade 3 pour la restauration physique et la fonction immunitaire, REM pour le traitement émotionnel et la consolidation de la mémoire. Chaque cycle dure ~90 minutes, 4 à 5 cycles par nuit étant l'idéal." },
        { title: 'Dette de sommeil', path: 'wiki/concepts/sleep-debt.md', tags: ['Santé', 'Cognition'], summary: "L'effet cumulé d'un sommeil insuffisant. Après une semaine à 6 h/nuit, les performances cognitives équivalent à 0,05 % d'alcoolémie. Liée à des perturbations hormonales, une sensibilité à l'insuline altérée et une dégradation du cortex préfrontal." },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 1, to: 0 }, { from: 1, to: 3 },
        { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 5 },
      ],
      chatQuestion: 'Comment la privation chronique de sommeil affecte-t-elle la santé cérébrale à long terme ?',
      chatAnswerLead: { text: '[[La privation chronique de sommeil]] altère le [[système glymphatique]] — le mécanisme d\'élimination des déchets du cerveau qui opère pendant le sommeil profond. Les recherches montrent que la clairance chute jusqu\'à 60 % avec un sommeil durablement mauvais, créant un lien direct avec le risque de maladie neurodégénérative.' },
      chatAnswerDetail: 'Au-delà du dysfonctionnement glymphatique, la dette de sommeil perturbe aussi la production de testostérone (chute de 10–15 % avec 5 h de sommeil), altère la sensibilité à l\'insuline et dégrade la fonction du cortex préfrontal — la zone responsable de la prise de décision et du contrôle des impulsions.',
      chatSource: 'sleep-hygiene.md',
    },

    {
      id: 'reading',
      label: 'Lecture approfondie',
      icon: 'book-open',
      filename: 'thinking-fast-and-slow.md',
      sourceNoteContext: "Notes de lecture personnelles issues du classique de Kahneman — pas un résumé, mais un digest de ce qui a vraiment changé ma façon de penser les décisions. Le genre de notes que l'on écrit après avoir lu quelque chose qui déplace réellement notre modèle mental.",
      sourceNote: `# Système 1 / Système 2 — Notes de lecture

Le modèle de cognition à deux systèmes de Kahneman. La thèse : nous nous croyons
rationnels, mais nous sommes gouvernés par un Système 1 intuitif qui commet des
erreurs systématiques.

## Système 1 vs Système 2
- Système 1 : rapide, automatique, sans effort. Reconnaît les visages, détecte
  l'hostilité dans une voix, répond 2+2. Toujours actif.
- Système 2 : lent, délibéré, coûteux en effort. Multiplie 17×24, remplit une
  déclaration d'impôts, vérifie la validité d'un argument logique. Se rabat
  paresseusement sur le Système 1.

Le problème central : le Système 2 est paresseux. Il entérine les jugements
instantanés du Système 1 sans les vérifier. C'est la source de la plupart des
biais cognitifs.

## Heuristiques et biais clés

**Heuristique de disponibilité**
Nous jugeons la fréquence par la facilité avec laquelle des exemples nous viennent
à l'esprit. Les attaques de requin paraissent plus fréquentes que les complications
du diabète parce que la couverture médiatique les rend vivaces — pourtant le diabète
tue 200 000 fois plus de personnes chaque année.

**Ancrage**
L'exposition à un chiffre ancre les jugements suivants. Des agents immobiliers
ayant reçu une estimation de prix de listing 15 % plus élevée que ceux ayant reçu
une estimation basse — même lorsqu'ils affirment que l'ancre n'a eu aucun effet.
L'effet est inconscient.

**Aversion à la perte**
Les pertes font environ deux fois plus mal que les gains équivalents ne font plaisir.
Cela explique pourquoi :
- Les gens conservent leurs actions perdantes, vendent les gagnantes (effet de disposition)
- « La livraison gratuite » fonctionne mieux que « 5 $ de réduction »
- Les baisses de salaire suscitent l'indignation, même lorsque le pouvoir d'achat augmente

## Thééma des perspectives (l'idée qui a valu le Nobel)
L'utilité dépend d'un point de référence. Nous évaluons les résultats relativement
à un point de référence, pas en termes absolus. Une prime de 1 000 $ fait plaisir ;
une prime de 1 000 $ quand votre collègue en a reçu 2 000 ressemble à une perte.

## Mes enseignements
- Avant toute décision importante, forcer l'activation du Système 2 : écrire le
  problème, lister les biais susceptibles de s'appliquer, dormir dessus.
- En réunion : ne jamais présenter un chiffre en premier, à moins de vouloir
  ancrer la discussion.
- Finances personnelles : automatiser les décisions (Système 1) pour protéger
  l'épargne des dépenses impulsives. Régler et oublier.

## Questions que je me pose encore
- Le Système 1 peut-il être entraîné ? La reconnaissance de patterns des
  grands maîtres d'échecs suggère que oui.
- Existe-t-il des domaines où le Système 1 surpasse le Système 2 ? (Blink
  vs délibération ?)
- Comment cela interagit-il avec le raisonnement des LLM ? Les LLM sont-ils
  un pur Système 2, ou peuvent-ils simuler l'intuition du Système 1 ?`,
      extractedItems: [
        { name: 'Daniel Kahneman', type: 'entity', lineIdx: 0 },
        { name: 'Système 1', type: 'concept', lineIdx: 0 },
        { name: 'Système 2', type: 'concept', lineIdx: 0 },
        { name: 'Heuristique de disponibilité', type: 'concept', lineIdx: 0 },
        { name: 'Ancrage', type: 'concept', lineIdx: 0 },
        { name: 'Aversion à la perte', type: 'concept', lineIdx: 0 },
        { name: 'Théorie des perspectives', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Daniel Kahneman', path: 'wiki/entities/daniel-kahneman.md', tags: ['Psychologue', 'Prix Nobel'], summary: "Psychologue israélo-américain ayant reçu le prix Nobel d'économie 2002 pour la théorie des perspectives. Ses travaux avec Amos Tversky ont fondé l'économie comportementale et révélé les biais cognitifs systématiques qui gouvernent la décision humaine." },
        { title: 'Système 1', path: 'wiki/concepts/system-1.md', tags: ['Cognition', 'Psychologie'], summary: "Le système de pensée rapide, automatique et sans effort, qui opère en continu. Il reconnaît des patterns, formule des jugements instantanés et s'appuie sur l'intuition. C'est la source de la plupart des biais cognitifs car il opère en deçà de la conscience." },
        { title: 'Système 2', path: 'wiki/concepts/system-2.md', tags: ['Cognition', 'Psychologie'], summary: "Le système de pensée lent, délibéré et coûteux en effort, responsable du raisonnement complexe, de l'analyse logique et de la décision consciente. Il est paresseux par conception et se contente souvent d'entériner les jugements du Système 1 sans vérification." },
        { title: 'Effet d\'ancrage', path: 'wiki/concepts/anchoring-effect.md', tags: ['Biais', 'Prise de décision'], summary: "Biais cognitif où l'exposition à un nombre initial influence disproportionnellement les jugements suivants. L'effet opère inconsciemment — même des experts qui nient être influencés présentent l'ancrage en pleine puissance dans des expériences contrôlées." },
        { title: 'Théorie des perspectives', path: 'wiki/concepts/prospect-theory.md', tags: ['Économie comportementale', 'Psychologie'], summary: "Développée par Kahneman et Tversky, la théorie des perspectives montre que les individus évaluent les résultats relativement à un point de référence plutôt qu'en termes absolus. L'utilité dépend du référent — le même résultat est vécu différemment selon le cadrage." },
      ],
      links: [
        { from: 0, to: 1 }, { from: 0, to: 4 }, { from: 1, to: 2 }, { from: 1, to: 3 },
        { from: 3, to: 4 }, { from: 0, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Comment le Système 1 interagit-il avec le Système 2 dans la prise de décision ?',
      chatAnswerLead: { text: '[[Le Système 1]] génère en continu des intuitions et des jugements instantanés, tandis que [[le Système 2]] les entérine paresseusement sans vérification la plupart du temps. Une décision efficace exige d\'activer délibérément [[le Système 2]] — écrire le problème, lister les biais potentiels et dormir dessus avant d\'agir.' },
      chatAnswerDetail: "L'idée clé de Kahneman est que le Système 2 n'est pas un vérificateur fiable du Système 1. Son activation demande un effort conscient, et la plupart du temps il se contente de rationaliser ce que le Système 1 a déjà décidé.",
      chatSource: 'thinking-fast-and-slow.md',
    },

    {
      id: 'inspiration',
      label: 'Inspiration',
      icon: 'scissors',
      filename: 'thinking-clippings.md',
      sourceNoteContext: "Une collection de coupures web sauvegardées au fil du temps — articles, essais et entretiens qui partagent un fil commun : comment mieux penser. Le genre de bribes que l'on accumule en espérant qu'elles finiront par se connecter.",
      sourceNote: `# Modèles mentaux & pensée — Recueil de coupures

Collection disparate. J'y ajoute à chaque fois qu'un modèle mental surgit dans
plusieurs livres ou conversations.

## Sur les faits et les croyances
> Coupé de James Clear
« Les humains ont besoin d'une vision du monde raisonnablement précise pour s'y
orienter. Mais "précise" n'est pas la seule chose que nos esprits privilégient.
Si un cerveau anticipe une récompense à adopter une croyance particulière, il est
parfaitement heureux de le faire. Le résultat est que des croyances fausses
peuvent être tenues non pas parce qu'elles sont vraies, mais parce qu'elles
servent un but social — elles nous aident à nous lier à notre tribu. »

## Comment penser par soi-même
> Coupé de Paul Graham
« Il existe des travaux que l'on ne peut bien faire qu'en pensant différemment
de ses pairs. La difficulté est que les gens se trompent souvent sur leur
position dans ce spectre. Les personnes les plus conventionnelles sont certaines
d'être indépendantes d'esprit, tandis que celles qui le sont vraiment craignent
de ne pas l'être assez. »

## La pensée de second ordre
> Coupé de Farnam Street
« La pensée de premier ordre est simpliste et superficielle, et à peu près tout
le monde peut la pratiquer. La pensée de second ordre consiste à suivre la chaîne
des conséquences qui découlent d'une décision. Beaucoup de résultats
extraordinaires viennent de décisions de premier ordre négatives mais de second
ordre positives. »

## L'inversion
> Coupé de Farnam Street
« Le postulat central de l'inversion est qu'il ne faut pas approcher les problèmes
difficiles dans une seule direction. Au lieu de cela, examinez-les à la fois en
avant et en arrière. Charlie Munger : "Tout ce que je veux savoir, c'est où je
vais mourir, pour ne jamais y aller." »

## Sur les prévisions
> Coupé de Morgan Housel
« La plupart des problèmes sont plus compliqués qu'ils n'en ont l'air, mais la
plupart des solutions devraient être plus simples qu'elles ne le sont. Lisez
moins de prévisions et plus d'histoire. Étudiez plus d'échecs et moins de
succès. »

## Ce que je veux relier
- Faits vs croyances → mécanisme de lien social ?
- Pensée de second ordre + inversion → les deux récompensent la profondeur sur l'étendue
- Le spectre de Graham → comment savoir où je me situe vraiment ?`,
      extractedItems: [
        { name: 'James Clear', type: 'entity', lineIdx: 0 },
        { name: 'Paul Graham', type: 'entity', lineIdx: 0 },
        { name: 'Charlie Munger', type: 'entity', lineIdx: 0 },
        { name: 'Pensée de second ordre', type: 'concept', lineIdx: 0 },
        { name: 'Inversion', type: 'concept', lineIdx: 0 },
        { name: 'Indépendance d\'esprit', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'James Clear', path: 'wiki/entities/james-clear.md', tags: ['Auteur', 'Habitudes'], summary: "Auteur d'\"Atomic Habits\" et écrivain sur la décision, les habitudes et le comportement humain. Ses travaux explorent pourquoi les gens tiennent des croyances fausses et comment l'identité sociale façonne ce qui nous paraît convaincant." },
        { title: 'Paul Graham', path: 'wiki/entities/paul-graham.md', tags: ['Fondateur', 'Essayiste'], summary: "Co-fondateur de Y Combinator et essayiste influent sur les startups, la technologie et la pensée. Son essai \"How to Think for Yourself\" décompose l'indépendance d'esprit en trois composantes : la rigueur envers la vérité, la résistance à la conformité et la curiosité." },
        { title: 'Pensée de second ordre', path: 'wiki/concepts/second-order-thinking.md', tags: ['Modèle mental', 'Prise de décision'], summary: "La pratique de remonter les chaînes de conséquences au-delà des résultats immédiats. Beaucoup de résultats extraordinaires viennent de décisions négatives au premier ordre mais positives au second. La technique clé : répéter \"Et ensuite ?\"." },
        { title: 'Inversion', path: 'wiki/concepts/inversion.md', tags: ['Modèle mental', 'Prise de décision'], summary: "Une approche de résolution de problèmes qui examine les problèmes en avant et en arrière. Au lieu de demander comment atteindre un résultat, demandez comment en garantir l'opposé — puis évitez ces choses. \"Éviter la stupidité est plus facile que chercher la brillance.\"" },
      ],
      links: [
        { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 3 }, { from: 0, to: 1 },
        { from: 1, to: 4 }, { from: 0, to: 5 }, { from: 3, to: 4 },
      ],
      chatQuestion: 'Quel est le fil commun entre la pensée de second ordre et l\'inversion ?',
      chatAnswerLead: { text: '[[La pensée de second ordre]] et [[l\'inversion]] récompensent toutes deux la profondeur sur l\'étendue et exigent de résister à l\'intuition immédiate du Système 1. La pensée de second ordre suit les conséquences vers l\'avant ; l\'inversion suit les échecs vers l\'arrière. Les deux vous forcent à regarder au-delà de l\'évident.' },
      chatAnswerDetail: "Là où elles diffèrent : la pensée de second ordre est additive (que se passe-t-il d'autre ?), tandis que l'inversion est soustractive (que dois-je éviter ?). Utilisées ensemble, elles forment un cadre de décision puissant : l'inversion élimine les mauvaises options, puis la pensée de second ordre évalue celles qui restent.",
      chatSource: 'thinking-clippings.md',
    },

    {
      id: 'creation',
      label: 'Création de contenu',
      icon: 'mic',
      filename: 'podcast-episode-plan.md',
      sourceNoteContext: "Un document de planification de production pour un épisode de podcast — recherche sur l'invité, questions structurées, arc narratif. Le genre de document qui distingue les interviews bien préparées des conversations qui partent dans tous les sens.",
      sourceNote: `# The Knowledge Stack — Plan de l'épisode 12

Invité : Dr Andy Matuschak (chercheur indépendant, ex-Apple, ex-Khan Academy)
Sujet : « Outils pour la pensée et futur de la lecture »

## Parcours de l'invité
- A dirigé la R&D chez Khan Academy sur les algorithmes d'apprentissage par maîtrise
- A travaillé chez Apple sur les premières initiatives éducatives pour iPad
- Dirige aujourd'hui un laboratoire de recherche indépendant sur les outils pour la pensée
- Connu pour : la méthodologie « evergreen notes », la pratique de recherche « Working in public »
- Son essai « Why books don't work » a suscité un débat majeur dans la communauté PKM

## Questions centrales
1. Tu as écrit que « les livres ne fonctionnent pas » — la plupart des gens oublient
   90 % de ce qu'ils lisent. À quoi ressemblerait un support « qui fonctionne » pour
   le transfert de connaissances ?
2. Ton système « evergreen notes » met l'accent sur l'atomicité et la summarisation
   progressive. En quoi diffère-t-il de la prise de notes traditionnelle ?
3. Tu t'es exprimé sur le fossé entre la recherche en outils pour la pensée et leur
   adoption grand public. Quel est le plus gros blocage ?
4. Les LLM pouvant désormais répondre instantanément à des questions sur n'importe
   quel livre, quel est le rôle de la lecture humaine en 2026 ?
5. Ta pratique de recherche est radicalement ouverte — tu publies quotidiennement des
   pensées à moitié finies. Cela ne crée-t-il pas du bruit ? Comment équilibres-tu
   profondeur et rapidité ?

## Références clés à mentionner
- Matuschak, A. (2019). « Why books don't work »
- Nielsen, M. (2018). « Augmenting human intellect »
- Engelbart, D. (1962). « Augmenting Human Intellect » — la mère de toutes les démos

## Questions ouvertes pour l'après-interview
- Faut-il que je lise l'essai complet « Evergreen notes » d'Andy avant l'enregistrement ?
- Ai-je besoin d'un second invité pour le contrepoint ?
- Logistique d'enregistrement : mémo vocal asynchrone ou vidéo en direct ?`,
      extractedItems: [
        { name: 'Andy Matuschak', type: 'entity', lineIdx: 0 },
        { name: 'Khan Academy', type: 'entity', lineIdx: 0 },
        { name: 'Douglas Engelbart', type: 'entity', lineIdx: 0 },
        { name: 'Evergreen Notes', type: 'concept', lineIdx: 0 },
        { name: 'Outils pour la pensée', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Andy Matuschak', path: 'wiki/entities/andy-matuschak.md', tags: ['Chercheur', 'PKM'], summary: "Chercheur indépendant travaillant sur les outils pour la pensée. Anciennement chez Khan Academy et Apple. Connu pour son essai \"Why books don't work\" et la méthodologie \"evergreen notes\" pour une gestion atomique et liée des connaissances." },
        { title: 'Khan Academy', path: 'wiki/entities/khan-academy.md', tags: ['Éducation', 'Association'], summary: "Plateforme d'éducation en ligne fondée par Sal Khan. Connue pour ses algorithmes d'apprentissage par maîtrise et le modèle de classe inversée. Matuschak y a dirigé la R&D sur les systèmes d'apprentissage adaptatif." },
        { title: 'Evergreen Notes', path: 'wiki/concepts/evergreen-notes.md', tags: ['PKM', 'Méthodologie'], summary: "Méthodologie de prise de notes mettant l'accent sur l'atomicité, l'orientation par concept et la summarisation progressive. Les notes sont écrites pour être durablement utiles et continuellement affinées, plutôt que pour saisir des pensées fugaces." },
        { title: 'Outils pour la pensée', path: 'wiki/concepts/tools-for-thought.md', tags: ['Technologie', 'Cognition'], summary: "Logiciels et systèmes conçus pour augmenter la pensée, la mémoire et la créativité humaines. Origine avec \"Augmenting Human Intellect\" d'Engelbart (1962). Défi clé : combler le fossé entre prototypes de recherche et adoption grand public." },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 0, to: 4 }, { from: 2, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Quelle est la différence centrale entre les evergreen notes et la prise de notes traditionnelle ?',
      chatAnswerLead: { text: '[[Les evergreen notes]] sont écrites pour être durablement utiles et continuellement affinées, tandis que la prise de notes traditionnelle saisit des pensées fugaces pour un rappel à court terme. Les evergreen notes mettent l\'accent sur [[l\'atomicité]] (une idée par note), [[l\'orientation par concept]] (nommées d\'après le concept, pas la source) et [[la summarisation progressive]] (distillation multi-couche).' },
      chatAnswerDetail: 'Le basculement clé va de « qu\'ai-je lu ? » à « que crois-je ? ». Les notes traditionnelles sont bibliographiques ; les evergreen notes sont épistémiques. Cela les rend composables — on peut construire de nouvelles idées en reliant des notes atomiques sans relire les sources originales.',
      chatSource: 'podcast-episode-plan.md',
    },

    {
      id: 'academic',
      label: 'Recherche académique',
      icon: 'microscope',
      filename: 'attention-is-all-you-need.md',
      sourceNoteContext: "Notes de recherche sur un article fondateur de l'IA — le genre d'exploration approfondie qu'on fait quand on a besoin de comprendre les fondations, pas seulement les titres. Vaswani et al., 2017.",
      sourceNote: `# Attention Is All You Need — Notes

L'article qui a tué les RNN et donné naissance au Transformer. Vaswani et al., 2017.

## L'idée centrale
Plutôt que de traiter les tokens séquentiellement (style RNN), tout traiter en
parallèle grâce à l'« attention » — laisser chaque token regarder tous les autres
et décider lesquels comptent. L'insight clé : le traitement séquentiel était le
goulot d'étranglement, pas une fonctionnalité.

## Trois mécanismes d'attention
- Self-Attention : chaque mot d'une phrase fait attention à tous les autres mots.
  Cela capture les dépendances longue distance que les RNN perdent au-delà
  d'environ 50 tokens.
- Multi-Head Attention : exécuter 8 opérations d'attention en parallèle, chacune
  apprenant différents types de relations (syntaxe, sémantique, coréférence).
  On concatène les résultats. Chaque tête se spécialise dans quelque chose.
- Scaled Dot-Product : l'opération Q·K^T divisée par sqrt(d_k). Sans le facteur
  d'échelle, les gradients explosent en haute dimension.

## Encodage positionnel
Comme il n'y a pas de récurrence, le modèle n'a aucune notion de l'ordre des mots.
L'astuce : ajouter aux embeddings d'entrée des ondes sinusoïdales/cosinusoïdales
de fréquences différentes. Cela donne au modèle l'information de position sans
ajouter de paramètres.

## Pourquoi cela a tout changé
- L'entraînement est parallélisable (les RNN s'entraînaient token par token, les
  Transformers entraînent toute la séquence d'un coup) → passage à l'échelle
  sur de plus grands jeux de données
- Dépendances longue distance : les RNN avaient une mémoire d'environ 50 tokens ;
  les Transformers n'ont pas de limite fixe (limitée par la fenêtre de contexte,
  passée de 512 à 1 M+ tokens)
- Cet article a directement mené à : BERT (2018), GPT (2018+), tous les LLM modernes

## Questions ouvertes
- L'attention est-elle vraiment la forme finale ? Les State Space Models (Mamba,
  S4) contestent la complexité quadratique de l'attention
- Les multiples têtes apprennent-elles réellement des patterns distincts, ou
  sont-elles redondantes ?`,
      extractedItems: [
        { name: 'Vaswani et al.', type: 'entity', lineIdx: 0 },
        { name: 'Google Brain', type: 'entity', lineIdx: 0 },
        { name: 'BERT', type: 'entity', lineIdx: 0 },
        { name: 'Self-Attention', type: 'concept', lineIdx: 0 },
        { name: 'Multi-Head Attention', type: 'concept', lineIdx: 0 },
        { name: 'Encodage positionnel', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Vaswani et al.', path: 'wiki/entities/vaswani-et-al.md', tags: ['IA', 'Chercheurs'], summary: "L'équipe de Google Brain qui a publié \"Attention Is All You Need\" (2017), introduisant l'architecture Transformer. Leurs travaux ont remplacé les RNN, permis l'entraînement parallèle à grande échelle et mené directement à BERT, GPT et tous les LLM modernes." },
        { title: 'BERT', path: 'wiki/entities/bert.md', tags: ['IA', 'NLP'], summary: "Bidirectional Encoder Representations from Transformers, publié par Google en 2018. Construit directement sur la pile d'encodeurs du Transformer, BERT a atteint des résultats à l'état de l'art sur 11 tâches de NLP et démontré la puissance du pré-entraînement suivi du fine-tuning." },
        { title: 'Self-Attention', path: 'wiki/concepts/self-attention.md', tags: ['IA', 'NLP'], summary: "Le mécanisme central du Transformer : chaque token d'une séquence fait attention à tous les autres tokens simultanément, calculant des relations pondérées. Il permet le traitement parallèle et capture les dépendances longue distance au-delà de la limite d'environ 50 tokens des RNN." },
        { title: 'Multi-Head Attention', path: 'wiki/concepts/multi-head-attention.md', tags: ['IA', 'NLP'], summary: "Exécute plusieurs opérations d'attention en parallèle (typiquement 8 têtes), chacune apprenant différents types de relations (syntaxe, sémantique, coréférence). Les sorties sont concaténées et projetées, permettant une attention conjointe sur différents sous-espaces de représentation." },
        { title: 'Encodage positionnel', path: 'wiki/concepts/positional-encoding.md', tags: ['IA', 'NLP'], summary: "Comme les Transformers traitent tous les tokens en parallèle, ils n'ont aucune notion intrinsèque de l'ordre des mots. L'encodage positionnel ajoute aux embeddings d'entrée des ondes sinusoïdales/cosinusoïdales de fréquences variées, encodant la position sans paramètres entraînables." },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 2, to: 4 },
        { from: 3, to: 4 }, { from: 1, to: 5 },
      ],
      chatQuestion: 'L\'attention est-elle la forme finale, ou les State Space Models vont-ils la remplacer ?',
      chatAnswerLead: { text: '[[L\'attention]] n\'est pas la forme finale — [[les State Space Models]] (Mamba, S4) contestent déjà sa complexité O(n²). Les SSM atteignent [[une mise à l\'échelle linéaire]] avec la longueur de séquence tout en maintenant des performances compétitives sur les tâches long-contexte.' },
      chatAnswerDetail: "Cependant, l'attention dispose d'un avantage d'écosystème massif : tous les grands LLM (GPT, Claude, Gemini) reposent dessus, et le matériel GPU est optimisé pour la multiplication matricielle. Les SSM doivent prouver non seulement une efficacité théorique mais une supériorité pratique à grande échelle avant de remplacer l'attention entièrement.",
      chatSource: 'attention-is-all-you-need.md',
    },

    {
      id: 'business',
      label: 'Affaires',
      icon: 'trending-up',
      filename: 'stripe-strategy.md',
      sourceNoteContext: "Une analyse de stratégie concurrentielle — décortiquant le modèle économique, les leviers de croissance et la position sur le marché. Le genre de note de recherche qu'écrivent un PM, un consultant ou un fondateur avant une décision stratégique majeure.",
      sourceNote: `# L'évolution stratégique de Stripe

## D'un outil développeur à une infrastructure économique

Stripe a commencé avec « 7 lignes de code pour accepter les paiements ». Mais
cette formulation occulte la vraie stratégie : Stripe n'a pas gagné en rendant
les paiements plus faciles — Stripe a gagné en faisant du développeur
l'acheteur.

## Mouvements stratégiques clés
- **Distribution API-first** : chaque développeur qui intègre Stripe devient un
  champion interne. Pas d'équipe commerciale nécessaire pour le segment PME
- **Produit composé** : Payments → Billing → Tax → Treasury → Issuing. Chaque
  produit exploite les données du précédent. Les coûts de basculement
  augmentent exponentiellement — on peut remplacer un processeur de paiement,
  on ne peut pas remplacer toute sa stack financière
- **Contournement des réseaux cartes** : les intégrations directes de Stripe
  avec Visa/Mastercard suppriment les acquéreurs intermédiaires. Avantage de
  marge estimé à 15–25 pb sur les concurrents qui passent par des acquéreurs
  historiques

## Modèle de revenus
- 2,9 % + 0,30 $ par transaction (cœur de paiements)
- Billing/Tax/Radar : 0,4–0,8 % supplémentaire par transaction
- Part croissante des revenus provenant des produits hors paiement (Link, Capital, Atlas)
- Volume de paiement total estimé à 1 000 G$+ (2023), impliquant ~14 G$+ de revenu net

## Position concurrentielle
- vs Adyen : Stripe gagne sur l'expérience développeur ; Adyen gagne sur l'entreprise
- vs Square : Stripe d'abord en ligne ; Square d'abord en point de vente. Convergence
- Menace : constructions internes par les grands commerçants (Shopify, DoorDash)

## Questions ouvertes
- Stripe peut-elle maintenir sa croissance sans s'étendre au crédit/adjacent au crédit ?
- L'expansion Chine/Asie du Sud-Est reste minimale — barrière réglementaire ou choix stratégique ?`,
      extractedItems: [
        { name: 'Stripe', type: 'entity', lineIdx: 0 },
        { name: 'Visa', type: 'entity', lineIdx: 0 },
        { name: 'Mastercard', type: 'entity', lineIdx: 0 },
        { name: 'Distribution API-First', type: 'concept', lineIdx: 0 },
        { name: 'Produit composé', type: 'concept', lineIdx: 0 },
        { name: 'Économie des réseaux cartes', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Stripe', path: 'wiki/entities/stripe.md', tags: ['Fintech', 'SaaS'], summary: "Société d'infrastructure de paiement fondée en 2010. Stratégie de base : distribution API-first ciblant les développeurs comme acheteurs, puis expansion en produits composés (Billing, Tax, Treasury, Issuing). Volume de paiement estimé à 1 000 G$+ et revenu net de 14 G$+." },
        { title: 'Visa & Mastercard', path: 'wiki/entities/visa-mastercard.md', tags: ['Fintech', 'Réseaux'], summary: "Les réseaux cartes mondiaux dominants qui traitent la majorité des paiements consommateurs. Les processeurs de paiement doivent interagir avec leur infrastructure — une intégration directe contournant les acquéreurs peut apporter 15–25 pb d'avantage de marge." },
        { title: 'Distribution API-First', path: 'wiki/concepts/api-first-distribution.md', tags: ['Stratégie', 'Go-to-Market'], summary: "Stratégie go-to-market où le produit est distribué via des API ciblant les développeurs. Chaque intégrateur devient un champion interne, créant une adoption bottom-up sans équipes commerciales traditionnelles. Stripe en est l'archétype." },
        { title: 'Stratégie de produit composé', path: 'wiki/concepts/compound-product.md', tags: ['Stratégie', 'Produit'], summary: "Construire des produits interconnectés où chaque nouvelle couche exploite les données des précédentes. Les coûts de basculement augmentent exponentiellement — remplacer un produit est facile, remplacer toute la stack est presque impossible." },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 1, to: 4 }, { from: 3, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Stripe peut-elle maintenir sa croissance sans s\'étendre au crédit ?',
      chatAnswerLead: { text: '[[Stripe]] fait face à un plafond de croissance classique : les marges du traitement de paiement se compriment (2,9 % + 0,30 $ est déjà sous pression des constructions internes de Shopify, DoorDash). L\'entreprise doit soit s\'étendre à des services adjacents à plus haute marge (crédit, capital), soit accepter des taux de croissance plus faibles.' },
      chatAnswerDetail: "La stratégie de produit composé est la réponse de Stripe : chaque couche s'appuie sur la précédente, rendant la stack entière progressivement plus difficile à remplacer. Mais le crédit est le service financier à la plus haute marge — et celui dans lequel Stripe s'est montré le plus prudent à entrer.",
      chatSource: 'stripe-strategy.md',
    },
  ],
};
