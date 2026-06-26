import type { ScenariosTranslation } from './types';

export const de: ScenariosTranslation = {
  scenarios: [
    {
      id: 'daily-life',
      label: 'Alltag',
      icon: 'heart',
      filename: 'sleep-hygiene.md',
      sourceNoteContext: 'Eine gesundheitswissenschaftliche Referenznotiz – sie fasst die wichtigsten Erkenntnisse zu Schlafarchitektur, Schlafschuld und praktischer Schlafhygiene zusammen. Die Art von Artikel, die man speichert, um das eigene Wohlbefinden zu verbessern.',
      sourceNote: `# Warum wir schlafen: Wichtigste Erkenntnisse

Schlaf ist das mit Abstand wirksamste Mittel, um Gehirn und Körper zu regenerieren.

## Schlafarchitektur
- NREM-Stadium 3 (Tiefschlaf): körperliche Erholung, Immunsystem
- REM: emotionale Verarbeitung, Kreativität, Gedächtniskonsolidierung
- Jeder Zyklus ~90 Min., idealerweise 4–5 Zyklen pro Nacht

## Die Kosten von Schlafschuld
- Nach 1 Woche mit 6h/Nacht: kognitive Leistungsfähigkeit entspricht 0,05 % BAK
- Chronische Schlafschuld wird mit Alzheimer in Verbindung gebracht – die glymphatische Clearance sinkt um 60 %
- 5h Schlaf → Testosteron sinkt bei gesunden jungen Männern um 10–15 %

## Praktische Schlafhygiene
- Optimale Schlafzimmertemperatur: 18–19 °C
- Kein blaues Licht 90 Min. vor dem Schlafen – die Melanopsin-Empfindlichkeit erreicht ihr Maximum bei 480 nm
- Halbwertszeit von Koffein: 6 Std. – letzte Aufnahme vor 14 Uhr
- Aufstehzeit-Konstanz ist wichtiger als Einschlafzeit-Konstanz

## Offene Fragen
- Können Mittagsschläfe nächtliche Schlafschuld ausgleichen? Die Evidenz ist gemischt
- Melatonin: 0,3 mg wirkt genauso wie 3 mg. Die meisten Nahrungsergänzungsmittel sind überdosiert.`,
      extractedItems: [
        { name: 'Matthew Walker', type: 'entity', lineIdx: 0 },
        { name: 'Glymphatisches System', type: 'entity', lineIdx: 0 },
        { name: 'Schlafarchitektur', type: 'concept', lineIdx: 0 },
        { name: 'Schlafschuld', type: 'concept', lineIdx: 0 },
        { name: 'Koffein', type: 'entity', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Glymphatisches System', path: 'wiki/entities/glymphatic-system.md', tags: ['Neuroscience', 'Brain'], summary: 'Das Abfallentsorgungssystem des Gehirns, das vor allem im Tiefschlaf aktiv ist. Chronische Schlafentzug reduziert die glymphatische Clearance um bis zu 60 % – das verbindet schlechten Schlaf mit dem Alzheimer-Risiko.' },
        { title: 'Matthew Walker', path: 'wiki/entities/matthew-walker.md', tags: ['Scientist', 'Author'], summary: 'Neurowissenschaftler und Schlafforscher, Autor von „Why We Sleep". Er wies die entscheidende Rolle des Tiefschlafs für die glymphatische Clearance und die kumulativen kognitiven Kosten von Schlafschuld nach.' },
        { title: 'Schlafarchitektur', path: 'wiki/concepts/sleep-architecture.md', tags: ['Neuroscience', 'Sleep'], summary: 'Die Struktur der Schlafzyklen: NREM-Stadium 3 für körperliche Erholung und Immunsystem, REM für emotionale Verarbeitung und Gedächtniskonsolidierung. Jeder Zyklus dauert ~90 Minuten, idealerweise 4–5 Zyklen pro Nacht.' },
        { title: 'Schlafschuld', path: 'wiki/concepts/sleep-debt.md', tags: ['Health', 'Cognition'], summary: 'Die kumulative Wirkung von zu wenig Schlaf. Nach einer Woche mit 6h/Nacht entspricht die kognitive Leistungsfähigkeit 0,05 % BAK. Schlafschuld wird mit hormonellen Störungen, eingeschränkter Insulinsensitivität und einer Degradation des präfrontalen Kortex in Verbindung gebracht.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 1, to: 0 }, { from: 1, to: 3 },
        { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 5 },
      ],
      chatQuestion: 'Wie wirkt sich chronischer Schlafentzug auf die langfristige Gesundheit des Gehirns aus?',
      chatAnswerLead: { text: '[[Chronischer Schlafentzug]] beeinträchtigt das [[glymphatische System]] – den Abfallentsorgungsmechanismus des Gehirns, der im Tiefschlaf aktiv ist. Studien zeigen, dass die Clearance bei anhaltend schlechtem Schlaf um bis zu 60 % sinkt – eine direkte Verbindung zum Risiko neurodegenerativer Erkrankungen.' },
      chatAnswerDetail: 'Neben der glymphatischen Dysfunktion stört Schlafschuld auch die Testosteronproduktion (10–15 % Abfall bei 5 Std. Schlaf), beeinträchtigt die Insulinsensitivität und reduziert die Funktion des präfrontalen Kortex – der Region, die für Entscheidungsfindung und Impulskontrolle zuständig ist.',
      chatSource: 'sleep-hygiene.md',
    },

    {
      id: 'reading',
      label: 'Tiefes Lesen',
      icon: 'book-open',
      filename: 'thinking-fast-and-slow.md',
      sourceNoteContext: 'Persönliche Lese­notizen zu Kahnemans Klassiker – keine Zusammenfassung, sondern das Destillat dessen, was meine Sicht auf Entscheidungen wirklich verändert hat. Die Art Notizen, die man schreibt, nachdem einen ein Buch tatsächlich aus der Bahn geworfen hat.',
      sourceNote: `# Thinking, Fast and Slow – Lese­notizen

Kahnemans Zwei-Systeme-Modell der Kognition. Die These: Wir glauben, rational zu sein,
aber wir werden von einem intuitiven System 1 gesteuert, das systematische Fehler macht.

## System 1 vs. System 2
- System 1: schnell, automatisch, mühelos. Erkennt Gesichter, hört Feindseligkeit aus einer
  Stimme, rechnet 2+2. Läuft immer.
- System 2: langsam, bedacht, anstrengend. Rechnet 17×24, füllt Steuerformulare aus,
  prüft die Gültigkeit eines logischen Arguments. Fällt träge auf System 1 zurück.

Das Kernproblem: System 2 ist faul. Es übernimmt die Schnellschüsse von System 1, ohne
sie zu überprüfen. Hier entspringen die meisten kognitiven Verzerrungen.

## Wichtige Heuristiken und Verzerrungen

**Verfügbarkeitsheuristik**
Wir beurteilen Häufigkeit danach, wie leicht uns Beispiele einfallen. Haiangriffe wirken
verbreiteter als Diabeteskomplikationen, weil die Medienberichterstattung sie lebhaft
macht – dabei sterben jährlich 200.000-mal mehr Menschen an Diabetes.

**Ankereffekt**
Die Konfrontation mit einer Zahl verankert nachfolgende Urteile. Immobilienmakler, denen
ein hoher Schätzwert gezeigt wurde, lagen 15 % über denen mit einem niedrigen –
selbst wenn sie beharren, der Anker habe sie nicht beeinflusst. Der Effekt ist unbewusst.

**Verlustaversion**
Verluste schmerzen etwa doppelt so stark wie gleich große Gewinne erfreuen. Das erklärt:
- Menschen halten Verlustpositionen und verkaufen Gewinner (Dispositionseffekt)
- „Kostenloser Versand" wirkt besser als „5 € Rabatt"
- Lohnkürzungen lösen Empörung aus, selbst wenn inflationsbereinigt mehr gezahlt wird

## Prospekttheorie (die nobelpreisgekrönte Erkenntnis)
Der Nutzen ist referenzabhängig. Wir bewerten Ergebnisse relativ zu einem Referenzpunkt,
nicht in absoluten Größen. Ein Bonus von 1.000 € fühlt sich großartig an; ein Bonus von
1.000 € fühlt sich wie ein Verlust an, wenn der Kollege 2.000 € bekommen hat.

## Meine Erkenntnisse
- Vor jeder wichtigen Entscheidung System 2 erzwingen: Problem aufschreiben,
  mögliche Verzerrungen auflisten, eine Nacht darüber schlafen.
- Meetings: Niemals als Erster eine Zahl nennen – außer du willst die Diskussion ankern.
- Persönliche Finanzen: Entscheidungen automatisieren (System 1), um Ersparnisse vor
  impulsiven Käufen zu schützen. Einmal einrichten, nie wieder anfassen.

## Fragen, die mich weiter beschäftigen
- Kann System 1 trainiert werden? Schachgroßmeister deuten mit ihrer Mustererkennung auf „ja".
- Gibt es Domänen, in denen System 1 System 2 überlegen ist? (Blink vs. Deliberation?)
- Wie interagiert das mit LLM-Reasoning? Sind LLMs reines System 2, oder können sie
  System-1-Intuition simulieren?`,
      extractedItems: [
        { name: 'Daniel Kahneman', type: 'entity', lineIdx: 0 },
        { name: 'System 1', type: 'concept', lineIdx: 0 },
        { name: 'System 2', type: 'concept', lineIdx: 0 },
        { name: 'Verfügbarkeitsheuristik', type: 'concept', lineIdx: 0 },
        { name: 'Ankereffekt', type: 'concept', lineIdx: 0 },
        { name: 'Verlustaversion', type: 'concept', lineIdx: 0 },
        { name: 'Prospekttheorie', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Daniel Kahneman', path: 'wiki/entities/daniel-kahneman.md', tags: ['Psychologist', 'Nobel Laureate'], summary: 'Israelisch-US-amerikanischer Psychologe, der 2002 den Nobelpreis für Wirtschaftswissenschaften für die Prospekttheorie erhielt. Seine Arbeit mit Amos Tversky begründete die Verhaltensökonomie und deckte die systematischen kognitiven Verzerrungen auf, die menschliche Entscheidungen bestimmen.' },
        { title: 'System 1', path: 'wiki/concepts/system-1.md', tags: ['Cognition', 'Psychology'], summary: 'Das schnelle, automatische und mühelose Denksystem, das durchgehend aktiv ist. Es erkennt Muster, fällt spontane Urteile und verlässt sich auf Intuition. Da es unterhalb der bewussten Wahrnehmung arbeitet, ist es die Quelle der meisten kognitiven Verzerrungen.' },
        { title: 'System 2', path: 'wiki/concepts/system-2.md', tags: ['Cognition', 'Psychology'], summary: 'Das langsame, bedachte und anstrengende Denksystem, das für komplexes Reasoning, logische Analyse und bewusste Entscheidungen zuständig ist. Es ist faul und übernimmt häufig ungeprüft die Urteile von System 1.' },
        { title: 'Ankereffekt', path: 'wiki/concepts/anchoring-effect.md', tags: ['Bias', 'Decision-Making'], summary: 'Eine kognitive Verzerrung, bei der die Konfrontation mit einer Ausgangszahl nachfolgende Urteile unverhältnismäßig stark beeinflusst. Der Effekt wirkt unbewusst – selbst Experten, die jeden Einfluss bestreiten, zeigen den vollen Ankereffekt in kontrollierten Experimenten.' },
        { title: 'Prospekttheorie', path: 'wiki/concepts/prospect-theory.md', tags: ['Behavioral Economics', 'Psychology'], summary: 'Entwickelt von Kahneman und Tversky, zeigt die Prospekttheorie, dass Menschen Ergebnisse relativ zu einem Referenzpunkt und nicht in absoluten Größen bewerten. Der Nutzen ist referenzabhängig – dasselbe Ergebnis fühlt sich je nach Framing unterschiedlich an.' },
      ],
      links: [
        { from: 0, to: 1 }, { from: 0, to: 4 }, { from: 1, to: 2 }, { from: 1, to: 3 },
        { from: 3, to: 4 }, { from: 0, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Wie arbeiten System 1 und System 2 bei Entscheidungen zusammen?',
      chatAnswerLead: { text: '[[System 1]] erzeugt unablässig Intuitionen und Schnellurteile, während [[System 2]] diese meist ungeprüft übernimmt. Effektive Entscheidungen erfordern eine bewusste Aktivierung von [[System 2]] – Problem aufschreiben, mögliche Verzerrungen auflisten, eine Nacht darüber schlafen.' },
      chatAnswerDetail: 'Die zentrale Einsicht Kahnemans: System 2 ist kein verlässlicher Kontrolleur von System 1. Es muss bewusst aktiviert werden, und die meiste Zeit rationalisiert es nur das, was System 1 bereits entschieden hat.',
      chatSource: 'thinking-fast-and-slow.md',
    },

    {
      id: 'inspiration',
      label: 'Inspiration',
      icon: 'scissors',
      filename: 'thinking-clippings.md',
      sourceNoteContext: 'Eine Sammlung von Web-Clippings über die Zeit – Artikel, Essays und Interviews, die einen gemeinsamen roten Faden teilen: besseres Denken. Die Art Schnipsel, die man sammelt in der Hoffnung, dass sie sich irgendwann verbinden.',
      sourceNote: `# Mentale Modelle & Denken – Clipping-Sammlung

Zufällige Sammlung. Ich ergänze sie, sobald ein mentales Modell in mehreren Büchern oder
Gesprächen auftaucht.

## Über Fakten und Überzeugungen
> Aus einem Clip von James Clear
„Menschen brauchen eine einigermaßen akkurate Sicht auf die Welt, um sich in ihr
zurechtzufinden. Aber ‚akkurat' ist nicht das Einzige, was unser Geist priorisiert. Wenn
ein Gehirn eine Belohnung für eine bestimmte Überzeugung antizipiert, übernimmt es sie
gern. Das Ergebnis: Falsche Überzeugungen werden nicht gehalten, weil sie wahr sind,
sondern weil sie einen sozialen Zweck erfüllen – sie helfen uns, uns mit unserer Gruppe
zu verbinden."

## Wie man für sich selbst denkt
> Aus einem Clip von Paul Graham
„Es gibt Arbeiten, die man nur gut macht, wenn man anders denkt als die Kollegen. Das
Problem: Menschen irren sich oft, wo sie auf dem Spektrum stehen. Die Konventionellsten
sind überzeugt, unabhängig zu sein – während die wirklich Unabhängigen sich sorgen, dass
sie vielleicht nicht unabhängig genug sind."

## Denken zweiter Ordnung
> Aus einem Clip von Farnam Street
„Denken erster Ordnung ist simpel und oberflächlich – fast jeder kann es. Denken
zweiter Ordnung heißt, die Konsequenzkette nachzuzeichnen, die einer Entscheidung
folgt. Viele außergewöhnliche Ergebnisse stammen aus Entscheidungen, die im ersten
Schritt negativ, im zweiten aber positiv sind."

## Inversion
> Aus einem Clip von Farnam Street
„Die Grundprämisse der Inversion: Man darf schwierige Probleme nicht nur aus einer
Richtung angehen. Stattdessen untersucht man sie vorwärts und rückwärts. Charlie Munger:
‚Ich will nur wissen, wo ich sterben werde, damit ich nie dorthin gehe.'"

## Über Prognosen
> Aus einem Clip von Morgan Housel
„Die meisten Probleme sind komplizierter, als sie aussehen – aber die meisten Lösungen
sollten einfacher sein, als sie sind. Lies weniger Prognosen und mehr Geschichte.
Studiere mehr Misserfolge und weniger Erfolge."

## Was ich verbinden will
- Fakten vs. Überzeugungen → sozialer Bindungsmechanismus?
- Denken zweiter Ordnung + Inversion → beide belohnen Tiefe statt Breite
- Grahams Spektrum → wo stehe ich wirklich?`,
      extractedItems: [
        { name: 'James Clear', type: 'entity', lineIdx: 0 },
        { name: 'Paul Graham', type: 'entity', lineIdx: 0 },
        { name: 'Charlie Munger', type: 'entity', lineIdx: 0 },
        { name: 'Denken zweiter Ordnung', type: 'concept', lineIdx: 0 },
        { name: 'Inversion', type: 'concept', lineIdx: 0 },
        { name: 'Unabhängiges Denken', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'James Clear', path: 'wiki/entities/james-clear.md', tags: ['Author', 'Habits'], summary: 'Autor von „Atomic Habits" und Autor zu Entscheidungsfindung, Gewohnheiten und menschlichem Verhalten. Seine Arbeiten untersuchen, warum Menschen falsche Überzeugungen halten und wie soziale Identität prägt, was wir überzeugend finden.' },
        { title: 'Paul Graham', path: 'wiki/entities/paul-graham.md', tags: ['Founder', 'Essayist'], summary: 'Mitgründer von Y Combinator und einflussreicher Essayist zu Startups, Technologie und Denken. Sein Essay „How to Think for Yourself" zerlegt unabhängiges Denken in drei Komponenten: Wahrheitsgewissenhaftigkeit, Widerstand gegen Konformität und Neugier.' },
        { title: 'Denken zweiter Ordnung', path: 'wiki/concepts/second-order-thinking.md', tags: ['Mental Model', 'Decision-Making'], summary: 'Die Praxis, Konsequenzketten über das Offensichtliche hinaus nachzuzeichnen. Viele außergewöhnliche Ergebnisse entspringen Entscheidungen, die im ersten Schritt negativ, im zweiten aber positiv sind. Schlüsselfrage: wiederholt „Und dann was?" fragen.' },
        { title: 'Inversion', path: 'wiki/concepts/inversion.md', tags: ['Mental Model', 'Decision-Making'], summary: 'Ein Problemlösungsansatz, der Probleme vorwärts und rückwärts untersucht. Statt zu fragen, wie man ein Ziel erreicht, fragt man, wie man das Gegenteil garantiert – und vermeidet diese Dinge. „Dummheit vermeiden ist leichter, als Brillanz zu suchen."' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 3 }, { from: 0, to: 1 },
        { from: 1, to: 4 }, { from: 0, to: 5 }, { from: 3, to: 4 },
      ],
      chatQuestion: 'Was ist die gemeinsame Grundidee von Denken zweiter Ordnung und Inversion?',
      chatAnswerLead: { text: '[[Denken zweiter Ordnung]] und [[Inversion]] belohnen beide Tiefe statt Breite und verlangen, der spontanen Intuition von System 1 zu widerstehen. Denken zweiter Ordnung zeichnet Konsequenzen vorwärts; Inversion zeichnet Fehlschläge rückwärts. Beide zwingen dazu, über das Offensichtliche hinauszublicken.' },
      chatAnswerDetail: 'Wo sie sich unterscheiden: Denken zweiter Ordnung ist additiv (was passiert noch?), Inversion ist subtraktiv (was sollte ich vermeiden?). Zusammen ergeben sie ein starkes Entscheidungs­gerüst: Inversion streicht schlechte Optionen, Denken zweiter Ordnung bewertet die verbleibenden.',
      chatSource: 'thinking-clippings.md',
    },

    {
      id: 'creation',
      label: 'Content-Erstellung',
      icon: 'mic',
      filename: 'podcast-episode-plan.md',
      sourceNoteContext: 'Ein Produktionsplan für eine Podcast-Folge – Recherche zum Gast, strukturierte Fragen, narrativer Bogen. Die Art von Dokument, die gut vorbereitete Interviews von ausschweifenden Gesprächen unterscheidet.',
      sourceNote: `# The Knowledge Stack – Plan zu Folge 12

Gast: Dr. Andy Matuschak (unabhängiger Forscher, ehem. Apple, ehem. Khan Academy)
Thema: „Tools for Thought und die Zukunft des Lesens"

## Hintergrund zum Gast
- Leitete bei Khan Academy R&D zu Mastery-Learning-Algorithmen
- Arbeitete bei Apple an frühen iPad-Bildungsinitiativen
- Führt heute ein unabhängiges Forschungslabor zu „Tools for Thought"
- Bekannt für: „Evergreen Notes"-Methodik, „Working in public"-Forschungspraxis
- Sein Essay „Why books don't work" löste in der PKM-Community intensive Debatten aus

## Kernfragen
1. Du hast geschrieben, „Bücher funktionieren nicht" – die meisten vergessen 90 % dessen,
   was sie lesen. Wie sähe ein „funktionierendes" Medium für Wissenstransfer aus?
2. Dein „Evergreen Notes"-System betont Atomarität und progressive Verdichtung. Wie
   unterscheidet es sich vom traditionellen Notieren?
3. Du hast wiederholt die Lücke zwischen „Tools-for-Thought"-Forschung und Mainstream-
   Verbreitung betont. Was ist der größte Blocker?
4. Wenn LLMs heute jede Frage zu jedem Buch in Sekunden beantworten können – welche
   Rolle bleibt dem menschlichen Lesen im Jahr 2026?
5. Deine Forschungspraxis ist radikal offen – du veröffentlichst täglich halbfertige
   Gedanken. Erzeugt das nicht Lärm? Wie balancierst du Tiefe und Geschwindigkeit?

## Wichtige Quellen, die wir erwähnen sollten
- Matuschak, A. (2019). „Why books don't work"
- Nielsen, M. (2018). „Augmenting human intellect"
- Engelbart, D. (1962). „Augmenting Human Intellect" – die „Mutter aller Demos"

## Offene Fragen nach dem Interview
- Sollte ich Andys vollständigen „Evergreen Notes"-Essay vor der Aufnahme lesen?
- Brauche ich einen zweiten Gast für einen Gegenpol?
- Aufnahmelogistik: asynchrone Sprachnachricht oder Live-Video?`,
      extractedItems: [
        { name: 'Andy Matuschak', type: 'entity', lineIdx: 0 },
        { name: 'Khan Academy', type: 'entity', lineIdx: 0 },
        { name: 'Douglas Engelbart', type: 'entity', lineIdx: 0 },
        { name: 'Evergreen Notes', type: 'concept', lineIdx: 0 },
        { name: 'Tools for Thought', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Andy Matuschak', path: 'wiki/entities/andy-matuschak.md', tags: ['Researcher', 'PKM'], summary: 'Unabhängiger Forscher zu „Tools for Thought". Früher bei Khan Academy und Apple. Bekannt durch den Essay „Why books don\'t work" und die „Evergreen Notes"-Methodik für atomares, vernetztes Wissensmanagement.' },
        { title: 'Khan Academy', path: 'wiki/entities/khan-academy.md', tags: ['Education', 'Nonprofit'], summary: 'Online-Bildungsplattform, gegründet von Sal Khan. Bekannt für Mastery-Learning-Algorithmen und das Flipped-Classroom-Modell. Matuschak leitete dort R&D für adaptive Lernsysteme.' },
        { title: 'Evergreen Notes', path: 'wiki/concepts/evergreen-notes.md', tags: ['PKM', 'Methodology'], summary: 'Eine Notiz-Methodik, die auf Atomarität, Konzept­orientierung und progressiver Verdichtung basiert. Notizen werden dauerhaft nutzbar und kontinuierlich verfeinert – anders als flüchtige Mitschriften, die nur kurzfristig erinnert werden.' },
        { title: 'Tools for Thought', path: 'wiki/concepts/tools-for-thought.md', tags: ['Technology', 'Cognition'], summary: 'Software und Systeme zur Erweiterung menschlichen Denkens, Erinnerns und Kreativität. Der Ursprung liegt in Engelbarts „Augmenting Human Intellect" von 1962. Zentrale Herausforderung: die Lücke zwischen Forschungs­prototypen und Mainstream-Verbreitung zu schließen.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 0, to: 4 }, { from: 2, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Was ist der zentrale Unterschied zwischen Evergreen Notes und klassischem Notieren?',
      chatAnswerLead: { text: '[[Evergreen Notes]] werden dauerhaft nutzbar geschrieben und kontinuierlich verfeinert, während klassische Notizen flüchtige Gedanken zur kurzfristigen Erinnerung festhalten. Evergreen Notes setzen auf [[Atomarität]] (eine Idee pro Notiz), [[Konzept­orientierung]] (Titel nach Konzept, nicht nach Quelle) und [[progressive Verdichtung]] (mehrschichtige Destillation).' },
      chatAnswerDetail: 'Die entscheidende Verschiebung: weg von „Was habe ich gelesen?" hin zu „Was glaube ich?". Klassische Notizen sind bibliografisch; Evergreen Notes sind epistemisch. Dadurch werden sie komponierbar – man kann neue Ideen aus atomaren Notizen verknüpfen, ohne die Originalquellen erneut zu lesen.',
      chatSource: 'podcast-episode-plan.md',
    },

    {
      id: 'academic',
      label: 'Wissenschaftliche Recherche',
      icon: 'microscope',
      filename: 'attention-is-all-you-need.md',
      sourceNoteContext: 'Forschungsnotizen zu einem wegweisenden KI-Paper – die Art Deep-Dive, die nötig ist, wenn man die Grundlagen verstehen will, nicht nur die Schlagzeilen. Vaswani et al., 2017.',
      sourceNote: `# Attention Is All You Need – Notizen

Das Paper, das RNNs beerdigte und den Transformer hervorbrachte. Vaswani et al., 2017.

## Die Kernidee
Statt Tokens sequenziell zu verarbeiten (RNN-Stil), wird alles parallel verarbeitet
– mit „Attention": Jeder Token betrachtet jeden anderen und entscheidet, welche
relevant sind. Die zentrale Einsicht: Sequenzielle Verarbeitung war der Flaschenhals,
kein Feature.

## Drei Attention-Mechanismen
- Self-Attention: Jedes Wort im Satz attendet auf jedes andere. Das erfasst
  Langstrecken­abhängigkeiten, die RNNs nach ~50 Tokens verlieren.
- Multi-Head Attention: 8 parallele Attention-Operationen, jede lernt unterschiedliche
  Beziehungstypen (Syntax, Semantik, Koreferenz). Die Ergebnisse werden konkateniert.
  Jeder Head spezialisiert sich auf etwas anderes.
- Scaled Dot-Product: Die Q·K^T-Operation, geteilt durch sqrt(d_k). Ohne den
  Skalierungsfaktor explodieren die Gradienten in hohen Dimensionen.

## Positional Encoding
Da es keine Rekurrenz mehr gibt, hat das Modell keine Ahnung von Wortreihenfolge.
Die Lösung: Sinus-/Kosinus-Wellen verschiedener Frequenzen werden zu den Input-
Embeddings addiert. So bekommt das Modell Positionsinformation, ohne zusätzliche
Parameter.

## Warum das alles verändert hat
- Training wurde parallelisierbar (RNNs Token für Token, Transformer die ganze
  Sequenz auf einmal) → Skalierung auf größere Datensätze
- Langstrecken­abhängigkeiten: RNNs hatten ein ~50-Token-Gedächtnis; Transformer haben
  keine feste Grenze (begrenzt durch das Kontextfenster, das von 512 auf 1 Mio.+
  Tokens wuchs)
- Dieses Paper führte direkt zu: BERT (2018), GPT (2018+), jedem modernen LLM

## Offene Fragen
- Ist Attention wirklich die Endform? State Space Models (Mamba, S4) fordern die
  quadratische Komplexität der Attention heraus
- Lernen mehrere Heads tatsächlich unterschiedliche Muster – oder sind sie redundant?`,
      extractedItems: [
        { name: 'Vaswani et al.', type: 'entity', lineIdx: 0 },
        { name: 'Google Brain', type: 'entity', lineIdx: 0 },
        { name: 'BERT', type: 'entity', lineIdx: 0 },
        { name: 'Self-Attention', type: 'concept', lineIdx: 0 },
        { name: 'Multi-Head Attention', type: 'concept', lineIdx: 0 },
        { name: 'Positional Encoding', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Vaswani et al.', path: 'wiki/entities/vaswani-et-al.md', tags: ['AI', 'Researchers'], summary: 'Das Google-Brain-Team, das 2017 „Attention Is All You Need" veröffentlichte und die Transformer-Architektur einführte. Ihre Arbeit ersetzte RNNs, ermöglichte paralleles Training im großen Maßstab und führte direkt zu BERT, GPT und jedem modernen LLM.' },
        { title: 'BERT', path: 'wiki/entities/bert.md', tags: ['AI', 'NLP'], summary: 'Bidirectional Encoder Representations from Transformers, 2018 von Google veröffentlicht. Direkt auf dem Encoder-Stack des Transformers aufgebaut, erzielte BERT State-of-the-Art-Ergebnisse in 11 NLP-Aufgaben und demonstrierte die Kraft von Pre-Training + Fine-Tuning.' },
        { title: 'Self-Attention', path: 'wiki/concepts/self-attention.md', tags: ['AI', 'NLP'], summary: 'Der Kernmechanismus des Transformers: Jeder Token einer Sequenz attendet gleichzeitig auf jeden anderen Token und berechnet gewichtete Beziehungen. Ermöglicht parallele Verarbeitung und erfasst Langstrecken­abhängigkeiten jenseits der ~50-Token-Grenze von RNNs.' },
        { title: 'Multi-Head Attention', path: 'wiki/concepts/multi-head-attention.md', tags: ['AI', 'NLP'], summary: 'Führt mehrere parallele Attention-Operationen aus (typischerweise 8 Heads), die jeweils unterschiedliche Beziehungstypen lernen (Syntax, Semantik, Koreferenz). Die Ausgaben werden konkateniert und projiziert – so entsteht eine gemeinsame Attention über verschiedene Repräsentations­unterräume.' },
        { title: 'Positional Encoding', path: 'wiki/concepts/positional-encoding.md', tags: ['AI', 'NLP'], summary: 'Da Transformer alle Tokens parallel verarbeiten, haben sie keine inhärente Wortreihenfolge. Positional Encoding addiert Sinus-/Kosinus-Wellen unterschiedlicher Frequenz zu den Input-Embeddings und codiert so die Position, ohne trainierbare Parameter einzuführen.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 2, to: 4 },
        { from: 3, to: 4 }, { from: 1, to: 5 },
      ],
      chatQuestion: 'Ist Attention die Endform – oder werden State Space Models sie ablösen?',
      chatAnswerLead: { text: '[[Attention]] ist nicht die Endform – [[State Space Models]] (Mamba, S4) fordern ihre O(n²)-Komplexität bereits heraus. SSMs erreichen eine [[lineare Skalierung]] mit der Sequenzlänge und bleiben bei Long-Context-Aufgaben konkurrenzfähig.' },
      chatAnswerDetail: 'Allerdings hat Attention einen enormen Ökosystemvorteil: Jedes große LLM (GPT, Claude, Gemini) baut darauf auf, und GPU-Hardware ist auf Matrixmultiplikation optimiert. SSMs müssen nicht nur theoretische Effizienz, sondern praktische Überlegenheit im großen Maßstab beweisen, bevor sie Attention vollständig ersetzen können.',
      chatSource: 'attention-is-all-you-need.md',
    },

    {
      id: 'business',
      label: 'Business',
      icon: 'trending-up',
      filename: 'stripe-strategy.md',
      sourceNoteContext: 'Eine Wettbewerbsanalyse – Aufschlüsselung von Geschäftsmodell, Wachstumshebeln und Marktposition. Die Art Recherche­notiz, die ein PM, Berater oder Gründer vor einer wichtigen strategischen Entscheidung schreibt.',
      sourceNote: `# Stripes strategische Entwicklung

## Vom Entwickler-Tool zur wirtschaftlichen Infrastruktur

Stripe startete mit „7 Zeilen Code, um Zahlungen zu akzeptieren". Aber diese
Beschreibung verschleiert die eigentliche Strategie: Stripe gewann nicht, weil
Zahlungen einfacher wurden – sondern weil das Unternehmen den Entwickler selbst
zum Käufer machte.

## Zentrale strategische Schritte
- **API-first-Distribution**: Jeder Entwickler, der Stripe integriert, wird zum
  internen Fürsprecher. Kein klassischer Vertrieb nötig, um den KMU-Markt zu erschließen
- **Verbundprodukt**: Payments → Billing → Tax → Treasury → Issuing. Jedes Produkt
  nutzt die Daten des vorherigen. Die Wechselkosten steigen exponentiell – einen
  Payment-Prozessor kann man ersetzen, seinen gesamten Finanzstack nicht
- **Umgehung der Karten­netzwerke**: Stripes direkte Integrationen mit Visa/Mastercard
  eliminieren Acquirer als Mittelsmänner. Geschätzter 15–25 bps-Margenvorteil gegenüber
  Wettbewerbern, die über Legacy-Acquirer routen

## Umsatzmodell
- 2,9 % + 0,30 $ pro Transaktion (Kern-Payments)
- Billing/Tax/Radar: zusätzliche 0,4–0,8 % pro Transaktion
- Wachsender Umsatzanteil aus Nicht-Payment-Produkten (Link, Capital, Atlas)
- Geschätztes Zahlungsvolumen von über 1 Bio. $ (2023), was auf ~14 Mrd. $ Nettoumsatz
  hindeutet

## Wettbewerbsposition
- vs. Adyen: Stripe gewinnt bei Developer Experience; Adyen gewinnt im Enterprise-Segment
- vs. Square: Stripe ist online-first, Square ist POS-first. Beide konvergieren
- Bedrohung: Eigenentwicklungen großer Händler (Shopify, DoorDash)

## Offene Fragen
- Kann Stripe das Wachstum beibehalten, ohne ins Kreditgeschäft oder angrenzende
  Bereiche zu expandieren?
- China/SEA-Expansion ist nach wie vor minimal – regulatorische Hürde oder bewusste
  strategische Entscheidung?`,
      extractedItems: [
        { name: 'Stripe', type: 'entity', lineIdx: 0 },
        { name: 'Visa', type: 'entity', lineIdx: 0 },
        { name: 'Mastercard', type: 'entity', lineIdx: 0 },
        { name: 'API-First-Distribution', type: 'concept', lineIdx: 0 },
        { name: 'Verbundprodukt', type: 'concept', lineIdx: 0 },
        { name: 'Karten­netzwerk-Ökonomie', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Stripe', path: 'wiki/entities/stripe.md', tags: ['Fintech', 'SaaS'], summary: 'Payment-Infrastrukturunternehmen, gegründet 2010. Kernstrategie: API-first-Distribution, die Entwickler als Käufer anspricht, dann Expansion in Verbundprodukte (Billing, Tax, Treasury, Issuing). Geschätztes Zahlungsvolumen über 1 Bio. $ und ~14 Mrd. $ Nettoumsatz.' },
        { title: 'Visa & Mastercard', path: 'wiki/entities/visa-mastercard.md', tags: ['Fintech', 'Networks'], summary: 'Die dominierenden globalen Karten­netzwerke, die den Großteil der Konsumentenzahlungen verarbeiten. Payment-Prozessoren müssen mit ihrer Infrastruktur interagieren – eine Direktintegration unter Umgehung der Acquirer kann einen 15–25-bps-Margenvorteil bringen.' },
        { title: 'API-First-Distribution', path: 'wiki/concepts/api-first-distribution.md', tags: ['Strategy', 'Go-to-Market'], summary: 'Eine Go-to-Market-Strategie, bei der das Produkt über APIs an Entwickler distribuiert wird. Jeder Integrator wird zum internen Fürsprecher – das erzeugt Bottom-up-Adoption ohne klassische Vertriebsteams. Stripe ist der Archetyp.' },
        { title: 'Verbundprodukt-Strategie', path: 'wiki/concepts/compound-product.md', tags: ['Strategy', 'Product'], summary: 'Aufbau vernetzter Produkte, in denen jede neue Schicht die Daten der vorherigen nutzt. Die Wechselkosten steigen exponentiell – ein einzelnes Produkt zu ersetzen ist einfach, den gesamten Stack zu ersetzen fast unmöglich.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 1, to: 4 }, { from: 3, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Kann Stripe das Wachstum beibehalten, ohne ins Kreditgeschäft zu expandieren?',
      chatAnswerLead: { text: '[[Stripe]] steht vor einer klassischen Wachstumsdecke: Die Margen im Payment-Processing geraten unter Druck (2,9 % + 0,30 $ stehen bereits durch Eigenentwicklungen von Shopify, DoorDash unter Druck). Das Unternehmen muss entweder in margenstärkere angrenzende Services (Kreditgeschäft, Capital) expandieren – oder niedrigere Wachstumsraten akzeptieren.' },
      chatAnswerDetail: 'Die Verbundprodukt-Strategie ist Stripes Antwort: Jede Schicht baut auf der vorherigen auf und macht den gesamten Stack immer schwerer ersetzbar. Aber das Kreditgeschäft ist der margenträchtigste Finanzservice – und der, bei dem Stripe bisher am vorsichtigsten war.',
      chatSource: 'stripe-strategy.md',
    },
  ],
};
