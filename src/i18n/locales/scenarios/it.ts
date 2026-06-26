import type { ScenariosTranslation } from './types';

export const it: ScenariosTranslation = {
  scenarios: [
    {
      id: 'daily-life',
      label: 'Vita quotidiana',
      icon: 'heart',
      filename: 'sleep-hygiene.md',
      sourceNoteContext: "Una nota di riferimento di scienza della salute — che riassume le ricerche chiave sull'architettura del sonno, sul debito di sonno e sull'igiene pratica. Il tipo di articolo che salveresti per migliorare il tuo benessere.",
      sourceNote: `# Perché dormiamo: le scoperte chiave

Il sonno è la cosa singolarmente più efficace che possiamo fare per resettare il cervello e il corpo.

## Architettura del sonno
- Fase NREM 3 (sonno profondo): ripristino fisico, funzione immunitaria
- REM: elaborazione emotiva, creatività, consolidamento della memoria
- Ogni ciclo dura ~90 minuti, 4-5 cicli per notte sono l'ideale

## Il costo del debito di sonno
- Dopo 1 settimana a 6h/notte: le prestazioni cognitive equivalgono a un tasso alcolemico dello 0,05%
- Il debito di sonno cronico è collegato all'Alzheimer — la clearance glinfatica cala del 60%
- 5h di sonno → il testosterone cala del 10–15% negli uomini giovani e sani

## Igiene pratica del sonno
- Temperatura ottimale della camera: 18–19°C
- Niente luce blu 90 min prima di dormire — la sensibilità della melanopsina raggiunge il picco a 480nm
- Emivita della caffeina 6h: ultima assunzione entro le 14:00
- La costanza dell'orario di risveglio conta più di quella dell'orario di addormentamento

## Domande aperte
- I sonnellini compensano il debito notturno? Le evidenze sono contrastanti
- Melatonina: 0,3 mg è efficace quanto 3 mg. La maggior parte degli integratori è sovradosata.`,
      extractedItems: [
        { name: 'Matthew Walker', type: 'entity', lineIdx: 0 },
        { name: 'Sistema glinfatico', type: 'entity', lineIdx: 0 },
        { name: 'Architettura del sonno', type: 'concept', lineIdx: 0 },
        { name: 'Debito di sonno', type: 'concept', lineIdx: 0 },
        { name: 'Caffeina', type: 'entity', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Sistema glinfatico', path: 'wiki/entities/glymphatic-system.md', tags: ['Neuroscience', 'Brain'], summary: "Il sistema di smaltimento dei rifiuti del cervello che opera principalmente durante il sonno profondo. La privazione cronica di sonno riduce la clearance glinfatica fino al 60%, collegando il sonno scarso al rischio di Alzheimer." },
        { title: 'Matthew Walker', path: 'wiki/entities/matthew-walker.md', tags: ['Scientist', 'Author'], summary: 'Neuroscienziato e ricercatore del sonno, autore di "Why We Sleep". Ha dimostrato il ruolo critico del sonno profondo nella clearance glinfatica e i costi cognitivi cumulativi del debito di sonno.' },
        { title: 'Architettura del sonno', path: 'wiki/concepts/sleep-architecture.md', tags: ['Neuroscience', 'Sleep'], summary: 'La struttura dei cicli del sonno: NREM Fase 3 per il ripristino fisico e la funzione immunitaria, REM per l\'elaborazione emotiva e il consolidamento della memoria. Ogni ciclo dura ~90 minuti, con 4-5 cicli per notte ideali.' },
        { title: 'Debito di sonno', path: 'wiki/concepts/sleep-debt.md', tags: ['Health', 'Cognition'], summary: "L'effetto cumulativo di sonno insufficiente. Dopo una settimana a 6h/notte, le prestazioni cognitive equivalgono a un tasso alcolemico dello 0,05%. Collegato a interruzioni ormonali, ridotta sensibilità insulinica e degrado della corteccia prefrontale." },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 1, to: 0 }, { from: 1, to: 3 },
        { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 5 },
      ],
      chatQuestion: 'In che modo la privazione cronica di sonno influisce sulla salute del cervello a lungo termine?',
      chatAnswerLead: { text: '[[La privazione cronica di sonno]] compromette il [[sistema glinfatico]] — il meccanismo di smaltimento dei rifiuti del cervello che opera durante il sonno profondo. Le ricerche mostrano che la clearance cala fino al 60% con sonno scarso prolungato, creando un legame diretto con il rischio di malattie neurodegenerative.' },
      chatAnswerDetail: 'Oltre alla disfunzione glinfatica, il debito di sonno interrompe anche la produzione di testosterone (calo del 10–15% con 5h di sonno), compromette la sensibilità insulinica e degrada la funzione della corteccia prefrontale — l\'area responsabile delle decisioni e del controllo degli impulsi.',
      chatSource: 'sleep-hygiene.md',
    },

    {
      id: 'reading',
      label: 'Lettura profonda',
      icon: 'book-open',
      filename: 'thinking-fast-and-slow.md',
      sourceNoteContext: "Note di lettura personali dal classico di Kahneman — non un riassunto, ma una sintesi di ciò che ha davvero cambiato il modo in cui penso alle decisioni. Il tipo di note che scrivi dopo aver letto qualcosa che sposta davvero il tuo modello mentale.",
      sourceNote: `# Pensieri, lenti e veloci — Note di lettura

Il modello a doppio processo della cognizione di Kahneman. La tesi: crediamo di essere
razionali, ma siamo governati da un Sistema 1 intuitivo che commette errori sistematici.

## Sistema 1 vs Sistema 2
- Sistema 1: veloce, automatico, senza sforzo. Riconosce i volti, percepisce ostilità in
  una voce, risponde 2+2. Sempre attivo.
- Sistema 2: lento, deliberato, faticoso. Moltiplica 17×24, compila un modulo fiscale,
  verifica la validità di un argomento logico. Delegherà pigramente al Sistema 1.

Il problema centrale: il Sistema 2 è pigro. Avalla i giudizi improvvisati del Sistema 1
senza verificarli. Questa è la fonte della maggior parte dei bias cognitivi.

## Euristiche e bias chiave

**Euristica della disponibilità**
Giudichiamo la frequenza dalla facilità con cui gli esempi ci vengono in mente. Gli attacchi
di squalo sembrano più comuni delle complicazioni del diabete perché la copertura mediatica
li rende vividi — eppure il diabete uccide 200.000× più persone ogni anno.

**Ancoraggio**
L'esposizione a un numero ancora i giudizi successivi. Agenti immobiliari a cui viene
mostrata una stima di prezzo elevata il 15% più alta di quelli a cui ne viene mostrata una
bassa — anche quando insistono che l'ancoraggio non ha avuto effetto. L'effetto è inconscio.

**Avversione alla perdita**
Le perdite fanno circa il doppio del male rispetto al piacere che producono guadagni
equivalenti. Questo spiega perché:
- Le persone tengono azioni in perdita, vendono quelle in guadagno (effetto di disposition)
- "Spedizione gratuita" funziona meglio di "$5 di sconto"
- I tagli salariali generano indignazione, anche quando, al netto dell'inflazione, lo
  stipendio sale

## Teoria del prospetto (l'intuizione vincitrice del Nobel)
L'utilità è dipendente dal riferimento. Valutiamo gli esiti rispetto a un punto di riferimento,
non in termini assoluti. Un bonus di $1.000 fa piacere; un bonus di $1.000 quando il tuo
collega ne ha ricevuti $2.000 sembra una perdita.

## Cosa mi porto a casa
- Prima di qualsiasi decisione importante, forza l'attivazione del Sistema 2: scrivi il
  problema, elenca quali bias potrebbero applicarsi, dormici sopra.
- Riunioni: non presentare mai un numero per primo, a meno che tu non voglia ancorare la
  discussione.
- Finanza personale: automatizza le decisioni (Sistema 1) per proteggere il risparmio dalla
  spesa impulsiva. Imposta e dimentica.

## Domande a cui sto ancora pensando
- Il Sistema 1 può essere addestrato? Il riconoscimento di pattern dei grandi maestri di
  scacchi suggerisce di sì.
- Esistono ambiti in cui il Sistema 1 surclassa il Sistema 2? (Blink vs deliberazione?)
- Come interagisce con il ragionamento degli LLM? Gli LLM sono puro Sistema 2, o possono
  simulare l'intuizione del Sistema 1?`,
      extractedItems: [
        { name: 'Daniel Kahneman', type: 'entity', lineIdx: 0 },
        { name: 'Sistema 1', type: 'concept', lineIdx: 0 },
        { name: 'Sistema 2', type: 'concept', lineIdx: 0 },
        { name: 'Euristica della disponibilità', type: 'concept', lineIdx: 0 },
        { name: 'Ancoraggio', type: 'concept', lineIdx: 0 },
        { name: 'Avversione alla perdita', type: 'concept', lineIdx: 0 },
        { name: 'Teoria del prospetto', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Daniel Kahneman', path: 'wiki/entities/daniel-kahneman.md', tags: ['Psychologist', 'Nobel Laureate'], summary: 'Psicologo israelo-americano che ha vinto il Premio Nobel per l\'Economia nel 2002 per la Teoria del prospetto. Il suo lavoro con Amos Tversky ha fondato l\'economia comportamentale e ha rivelato i bias cognitivi sistematici che governano le decisioni umane.' },
        { title: 'Sistema 1', path: 'wiki/concepts/system-1.md', tags: ['Cognition', 'Psychology'], summary: 'Il sistema di pensiero veloce, automatico e senza sforzo che opera continuamente. Riconosce pattern, formula giudizi improvvisati e si affida all\'intuizione. È la fonte della maggior parte dei bias cognitivi perché opera al di sotto della consapevolezza cosciente.' },
        { title: 'Sistema 2', path: 'wiki/concepts/system-2.md', tags: ['Cognition', 'Psychology'], summary: 'Il sistema di pensiero lento, deliberato e faticoso, responsabile del ragionamento complesso, dell\'analisi logica e delle decisioni consapevoli. È pigro per design e spesso si limita ad avallare i giudizi del Sistema 1 senza verifica.' },
        { title: 'Effetto di ancoraggio', path: 'wiki/concepts/anchoring-effect.md', tags: ['Bias', 'Decision-Making'], summary: 'Un bias cognitivo in cui l\'esposizione a un numero iniziale influenza sproporzionatamente i giudizi successivi. L\'effetto opera nell\'inconscio — anche gli esperti che negano di esserne influenzati mostrano il pieno effetto di ancoraggio in esperimenti controllati.' },
        { title: 'Teoria del prospetto', path: 'wiki/concepts/prospect-theory.md', tags: ['Behavioral Economics', 'Psychology'], summary: 'Sviluppata da Kahneman e Tversky, la teoria del prospetto mostra che le persone valutano gli esiti rispetto a un punto di riferimento anziché in termini assoluti. L\'utilità è dipendente dal riferimento — lo stesso esito viene percepito diversamente a seconda dell\'inquadramento.' },
      ],
      links: [
        { from: 0, to: 1 }, { from: 0, to: 4 }, { from: 1, to: 2 }, { from: 1, to: 3 },
        { from: 3, to: 4 }, { from: 0, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Come interagiscono il Sistema 1 e il Sistema 2 nei processi decisionali?',
      chatAnswerLead: { text: '[[Il Sistema 1]] genera intuizioni e giudizi improvvisati in continuazione, mentre [[il Sistema 2]] li avalla pigramente senza verifica per la maggior parte del tempo. Un processo decisionale efficace richiede di forzare deliberatamente [[l\'attivazione del Sistema 2]] — scrivere il problema, elencare i potenziali bias, e dormirci sopra prima di agire.' },
      chatAnswerDetail: 'L\'intuizione chiave di Kahneman è che il Sistema 2 non è un controllo affidabile sul Sistema 1. Richiede uno sforzo cosciente per attivarsi, e per lo più si limita semplicemente a razionalizzare ciò che il Sistema 1 ha già deciso.',
      chatSource: 'thinking-fast-and-slow.md',
    },

    {
      id: 'inspiration',
      label: 'Ispirazione',
      icon: 'scissors',
      filename: 'thinking-clippings.md',
      sourceNoteContext: "Una raccolta di ritagli dal web salvati nel tempo — articoli, saggi e interviste che condividono un filo conduttore: come pensare meglio. Il tipo di frammenti che raccogli sperando che prima o poi si colleghino tra loro.",
      sourceNote: `# Modelli mentali e pensiero — Raccolta di ritagli

Raccolta disordinata. Aggiungo qualcosa ogni volta che un modello mentale riappare in più
libri o conversazioni.

## Su fatti e credenze
> Ritagliato da James Clear
"Gli esseri umani hanno bisogno di una visione del mondo ragionevolmente accurata per
poterlo attraversare. Ma 'accurata' non è l'unica cosa che la nostra mente privilegia.
Se un cervello prevede una ricompensa nell'adottare una certa credenza, è perfettamente
felice di farlo. Il risultato è che le credenze false possono essere mantenute non perché
sono vere, ma perché servono a uno scopo sociale — ci aiutano a legarci alla nostra tribù."

## Come pensare con la propria testa
> Ritagliato da Paul Graham
"Ci sono alcuni tipi di lavoro che non puoi fare bene se non pensi diversamente dai tuoi
pari. La difficoltà è che le persone spesso si sbagliano su dove cadono nello spettro.
Le persone dal pensiero più convenzionale sono fiduciose di essere indipendenti, mentre
quelle davvero indipendenti temono di non esserlo abbastanza."

## Pensiero di secondo ordine
> Ritagliato da Farnam Street
"Il pensiero di primo ordine è semplicistico e superficiale, e quasi tutti possono farlo.
Il pensiero di secondo ordine è la pratica di tracciare la catena di conseguenze che
seguono da una decisione. Molti risultati straordinari vengono da decisioni che sono
negative al primo ordine ma positive al secondo."

## Inversione
> Ritagliato da Farnam Street
"Il presupposto centrale dell'inversione è che non dovresti affrontare i problemi difficili
da una sola direzione. Esaminali invece in avanti e all'indietro. Charlie Munger: 'Tutto
ciò che voglio sapere è dove morirò, così non ci andrò mai.'"

## Sulle previsioni
> Ritagliato da Morgan Housel
"La maggior parte dei problemi è più complicata di quanto sembri, ma la maggior parte
delle soluzioni dovrebbe essere più semplice di quanto non sia. Leggi meno previsioni e
più storia. Studia più fallimenti e meno successi."

## Cosa voglio collegare
- Fatti vs credenze → meccanismo di legame sociale?
- Pensiero di secondo ordine + inversione → entrambi premiano la profondità rispetto
  all'ampiezza
- Lo spettro di Graham → come faccio a sapere dove mi colloco davvero?`,
      extractedItems: [
        { name: 'James Clear', type: 'entity', lineIdx: 0 },
        { name: 'Paul Graham', type: 'entity', lineIdx: 0 },
        { name: 'Charlie Munger', type: 'entity', lineIdx: 0 },
        { name: 'Pensiero di secondo ordine', type: 'concept', lineIdx: 0 },
        { name: 'Inversione', type: 'concept', lineIdx: 0 },
        { name: 'Indipendenza di pensiero', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'James Clear', path: 'wiki/entities/james-clear.md', tags: ['Author', 'Habits'], summary: 'Autore di "Atomic Habits" e scrittore su decisioni, abitudini e comportamento umano. Il suo lavoro esplora perché le persone mantengono credenze false e come l\'identità sociale plasmi ciò che troviamo convincente.' },
        { title: 'Paul Graham', path: 'wiki/entities/paul-graham.md', tags: ['Founder', 'Essayist'], summary: 'Co-fondatore di Y Combinator e saggista influente su startup, tecnologia e pensiero. Il suo saggio "How to Think for Yourself" scompone l\'indipendenza di pensiero in tre componenti: accuratezza verso la verità, resistenza alla conformità e curiosità.' },
        { title: 'Pensiero di secondo ordine', path: 'wiki/concepts/second-order-thinking.md', tags: ['Mental Model', 'Decision-Making'], summary: 'La pratica di tracciare catene di conseguenze oltre gli esiti immediati. Molti risultati straordinari vengono da decisioni negative al primo ordine ma positive al secondo. La tecnica chiave: chiedi ripetutamente "E quindi?".' },
        { title: 'Inversione', path: 'wiki/concepts/inversion.md', tags: ['Mental Model', 'Decision-Making'], summary: 'Un approccio di problem solving che esamina i problemi in avanti e all\'indietro. Invece di chiederti come ottenere un risultato, chiediti come garantirne l\'opposto — poi evita quelle cose. "Evitare la stupidità è più facile che cercare la genialità."' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 3 }, { from: 0, to: 1 },
        { from: 1, to: 4 }, { from: 0, to: 5 }, { from: 3, to: 4 },
      ],
      chatQuestion: 'Qual è il filo conduttore tra il pensiero di secondo ordine e l\'inversione?',
      chatAnswerLead: { text: '[[Il pensiero di secondo ordine]] e [[l\'inversione]] premiano entrambi la profondità rispetto all\'ampiezza e richiedono di resistere all\'intuizione immediata del Sistema 1. Il pensiero di secondo ordine traccia le conseguenze in avanti; l\'inversione traccia i fallimenti all\'indietro. Entrambi ti costringono a guardare oltre ciò che è ovvio.' },
      chatAnswerDetail: 'Dove differiscono: il pensiero di secondo ordine è additivo (cosa accade ancora?), mentre l\'inversione è sottrattiva (cosa devo evitare?). Usati insieme, formano un potente framework decisionale: usa l\'inversione per eliminare le opzioni sbagliate, poi il pensiero di secondo ordine per valutare quelle rimaste.',
      chatSource: 'thinking-clippings.md',
    },

    {
      id: 'creation',
      label: 'Creazione di contenuti',
      icon: 'mic',
      filename: 'podcast-episode-plan.md',
      sourceNoteContext: 'Un documento di pianificazione per la produzione di un episodio di podcast — ricerca sull\'ospite, domande strutturate, arco narrativo. Il tipo di documento che distingue interviste ben preparate da conversazioni che vagano.',
      sourceNote: `# The Knowledge Stack — Piano dell'episodio 12

Ospite: Dr. Andy Matuschak (ricercatore indipendente, ex Apple, ex Khan Academy)
Argomento: "Strumenti per il pensiero e il futuro della lettura"

## Background dell'ospite
- Ha guidato R&D su Khan Academy per gli algoritmi di apprendimento per padronanza
- Ha lavorato in Apple alle prime iniziative educative su iPad
- Dirige ora un laboratorio di ricerca indipendente che studia gli strumenti per il pensiero
- Noto per: metodologia delle "evergreen notes", pratica di ricerca del "lavorare in pubblico"
- Il suo saggio "Why books don't work" ha innescato un grande dibattito nella comunità PKM

## Domande centrali
1. Hai scritto che "i libri non funzionano" — la maggior parte delle persone dimentica il
   90% di ciò che legge. Che aspetto avrebbe un medium "che funziona" per il trasferimento
   di conoscenza?
2. Il tuo sistema di "evergreen notes" enfatizza atomicità e sintesi progressiva.
   In che cosa differisce dal prendere appunti tradizionale?
3. Sei stato esplicito sul divario tra la ricerca sugli strumenti per il pensiero e la
   loro adozione mainstream. Qual è il più grande ostacolo?
4. Con gli LLM ora in grado di rispondere a domande su qualsiasi libro all'istante, quale
   ruolo ha la lettura umana nel 2026?
5. La tua pratica di ricerca è radicalmente aperta — pubblichi pensieri incompiuti ogni
   giorno. Non crea rumore? Come bilancia profondità e velocità?

## Riferimenti chiave da citare
- Matuschak, A. (2019). "Why books don't work"
- Nielsen, M. (2018). "Augmenting human intellect"
- Engelbart, D. (1962). "Augmenting Human Intellect" — la madre di tutte le demo

## Domande aperte per dopo l'intervista
- Dovrei leggere il saggio completo sulle "Evergreen notes" di Andy prima di registrare?
- Serve un secondo ospite per il controcanto?
- Logistica di registrazione: messaggio vocale asincrono o video live?`,
      extractedItems: [
        { name: 'Andy Matuschak', type: 'entity', lineIdx: 0 },
        { name: 'Khan Academy', type: 'entity', lineIdx: 0 },
        { name: 'Douglas Engelbart', type: 'entity', lineIdx: 0 },
        { name: 'Evergreen Notes', type: 'concept', lineIdx: 0 },
        { name: 'Strumenti per il pensiero', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Andy Matuschak', path: 'wiki/entities/andy-matuschak.md', tags: ['Researcher', 'PKM'], summary: 'Ricercatore indipendente che studia gli strumenti per il pensiero. In passato in Khan Academy e Apple. Noto per il saggio "Why books don\'t work" e la metodologia delle "evergreen notes" per una gestione della conoscenza atomica e collegata.' },
        { title: 'Khan Academy', path: 'wiki/entities/khan-academy.md', tags: ['Education', 'Nonprofit'], summary: 'Piattaforma educativa online fondata da Sal Khan. Conosciuta per gli algoritmi di apprendimento per padronanza e il modello della flipped classroom. Matuschak ha guidato l\'R&D sui sistemi di apprendimento adattivo durante il suo mandato.' },
        { title: 'Evergreen Notes', path: 'wiki/concepts/evergreen-notes.md', tags: ['PKM', 'Methodology'], summary: 'Una metodologia di presa appunti che enfatizza atomicità, orientamento al concetto e sintesi progressiva. Le note sono scritte per essere permanentemente utili e continuamente raffinate, anziché catturare pensieri transitori.' },
        { title: 'Strumenti per il pensiero', path: 'wiki/concepts/tools-for-thought.md', tags: ['Technology', 'Cognition'], summary: 'Software e sistemi progettati per aumentare il pensiero, la memoria e la creatività umana. Nascono con "Augmenting Human Intellect" di Engelbart del 1962. Sfida chiave: colmare il divario tra prototipi di ricerca e adozione mainstream.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 0, to: 4 }, { from: 2, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Qual è la differenza fondamentale tra le evergreen notes e il prendere appunti tradizionale?',
      chatAnswerLead: { text: '[[Le evergreen notes]] sono scritte per essere permanentemente utili e continuamente raffinate, mentre il prendere appunti tradizionale cattura pensieri transitori per il richiamo a breve termine. Le evergreen notes enfatizzano [[l\'atomicità]] (un\'idea per nota), [[l\'orientamento al concetto]] (nominato per concetto, non per fonte) e [[la sintesi progressiva]] (distillazione su più livelli).' },
      chatAnswerDetail: 'Il passaggio chiave è da "cosa ho letto?" a "cosa credo?". Le note tradizionali sono bibliografiche; le evergreen notes sono epistemiche. Questo le rende componibili — puoi costruire nuove idee collegando note atomiche senza rileggere le fonti originali.',
      chatSource: 'podcast-episode-plan.md',
    },

    {
      id: 'academic',
      label: 'Ricerca accademica',
      icon: 'microscope',
      filename: 'attention-is-all-you-need.md',
      sourceNoteContext: 'Note di ricerca su un articolo fondativo dell\'AI — il tipo di approfondimento che fai quando hai bisogno di capire i fondamenti, non solo i titoli. Vaswani et al., 2017.',
      sourceNote: `# Attention Is All You Need — Note

L'articolo che ha ucciso le RNN e fatto nascere il Transformer. Vaswani et al., 2017.

## L'idea centrale
Invece di processare i token in sequenza (stile RNN), elabora tutto in parallelo usando
l'"attention" — lascia che ogni token guardi ogni altro token e decida quali contano.
L'intuizione chiave: l'elaborazione sequenziale era il collo di bottiglia, non una feature.

## Tre meccanismi di attenzione
- Self-Attention: ogni parola in una frase presta attenzione a ogni altra parola. Questo
cattura dipendenze a lungo raggio che le RNN perdono dopo ~50 token.
- Multi-Head Attention: esegui 8 operazioni di attenzione in parallelo, ciascuna impara
tipi diversi di relazione (sintassi, semantica, coreferenza). Concatena i risultati.
Ogni testa si specializza in qualcosa di diverso.
- Scaled Dot-Product: l'operazione Q·K^T divisa per sqrt(d_k). Senza il fattore di
scaling, i gradienti esplodono in alte dimensioni.

## Positional Encoding
Senza ricorrenza, il modello non ha alcuna idea dell'ordine delle parole. Il fix:
aggiungi onde seno/coseno di frequenze diverse agli embedding di input. Questo dà al
modello informazione di posizione senza aggiungere parametri.

## Perché ha cambiato tutto
- L'addestramento è parallelizzabile (le RNN si addestravano token per token, i Transformer
addestrano l'intera sequenza in una volta) → scala a dataset più grandi
- Dipendenze a lungo raggio: le RNN avevano una memoria di ~50 token; i Transformer non
hanno un limite fisso (limitati dalla context window, che è cresciuta da 512 a oltre 1M
di token)
- Questo articolo ha portato direttamente a: BERT (2018), GPT (2018+), ogni LLM moderno

## Domande aperte
- L'attention è davvero la forma finale? Gli State Space Model (Mamba, S4) sfidano la
complessità quadratica dell'attention
- Le teste multiple imparano davvero pattern distinti, o sono ridondanti?`,
      extractedItems: [
        { name: 'Vaswani et al.', type: 'entity', lineIdx: 0 },
        { name: 'Google Brain', type: 'entity', lineIdx: 0 },
        { name: 'BERT', type: 'entity', lineIdx: 0 },
        { name: 'Self-Attention', type: 'concept', lineIdx: 0 },
        { name: 'Multi-Head Attention', type: 'concept', lineIdx: 0 },
        { name: 'Positional Encoding', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Vaswani et al.', path: 'wiki/entities/vaswani-et-al.md', tags: ['AI', 'Researchers'], summary: 'Il team di Google Brain che ha pubblicato "Attention Is All You Need" (2017), introducendo l\'architettura Transformer. Il loro lavoro ha sostituito le RNN, abilitato l\'addestramento parallelo su larga scala e ha portato direttamente a BERT, GPT e ogni LLM moderno.' },
        { title: 'BERT', path: 'wiki/entities/bert.md', tags: ['AI', 'NLP'], summary: 'Bidirectional Encoder Representations from Transformers, pubblicato da Google nel 2018. Costruito direttamente sullo stack di encoder del Transformer, BERT ha raggiunto risultati state-of-the-art su 11 task di NLP e ha dimostrato la potenza del paradigma pre-training + fine-tuning.' },
        { title: 'Self-Attention', path: 'wiki/concepts/self-attention.md', tags: ['AI', 'NLP'], summary: 'Il meccanismo centrale del Transformer: ogni token in una sequenza presta attenzione a ogni altro token simultaneamente, calcolando relazioni pesate. Abilita l\'elaborazione parallela e cattura dipendenze a lungo raggio oltre il limite di ~50 token delle RNN.' },
        { title: 'Multi-Head Attention', path: 'wiki/concepts/multi-head-attention.md', tags: ['AI', 'NLP'], summary: 'Esegue più operazioni di attenzione in parallelo (tipicamente 8 teste), ciascuna impara tipi diversi di relazione (sintassi, semantica, coreferenza). Gli output vengono concatenati e proiettati, permettendo attenzione congiunta su diversi sottospazi di rappresentazione.' },
        { title: 'Positional Encoding', path: 'wiki/concepts/positional-encoding.md', tags: ['AI', 'NLP'], summary: 'Poiché i Transformer processano tutti i token in parallelo, non hanno una nozione inerente dell\'ordine delle parole. Il positional encoding aggiunge onde seno/coseno di frequenze variabili agli embedding di input, codificando la posizione senza aggiungere parametri addestrabili.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 2, to: 4 },
        { from: 3, to: 4 }, { from: 1, to: 5 },
      ],
      chatQuestion: 'L\'attention è la forma finale, o gli State Space Model la sostituiranno?',
      chatAnswerLead: { text: '[[L\'attention]] non è la forma finale — [[gli State Space Model]] (Mamba, S4) stanno già sfidando la sua complessità O(n²). Gli SSM raggiungono [[uno scaling lineare]] rispetto alla lunghezza della sequenza mantenendo prestazioni competitive nei task a contesto lungo.' },
      chatAnswerDetail: 'Tuttavia, l\'attention ha un enorme vantaggio di ecosistema: ogni LLM principale (GPT, Claude, Gemini) è costruito su di essa, e l\'hardware GPU è ottimizzato per la moltiplicazione tra matrici. Gli SSM devono dimostrare non solo efficienza teorica ma superiorità pratica su larga scala prima di sostituire completamente l\'attention.',
      chatSource: 'attention-is-all-you-need.md',
    },

    {
      id: 'business',
      label: 'Business',
      icon: 'trending-up',
      filename: 'stripe-strategy.md',
      sourceNoteContext: 'Un\'analisi di strategia competitiva — che scompone il modello di business, le leve di crescita e la posizione di mercato. Il tipo di nota di ricerca che un PM, consulente o fondatore scrive prima di una decisione strategica importante.',
      sourceNote: `# L'evoluzione strategica di Stripe

## Da strumento per sviluppatori a infrastruttura economica

Stripe è partita come "7 righe di codice per accettare pagamenti". Ma quella
formulazione nasconde la vera strategia: non hanno vinto rendendo i pagamenti più
facili — hanno vinto facendo dello sviluppatore l'acquirente.

## Mosse strategiche chiave
- **Distribuzione API-first**: ogni sviluppatore che integra Stripe diventa un
  sostenitore interno. Nessun team di vendita necessario per il segmento SMB
- **Prodotto composto**: Payments → Billing → Tax → Treasury → Issuing. Ogni
  prodotto sfrutta i dati del precedente. I costi di switch crescono in modo
  esponenziale — puoi sostituire un processore di pagamento, non puoi sostituire
  l'intero stack finanziario
- **Bypass del circuito di carte**: le integrazioni dirette di Stripe con
  Visa/Mastercard eliminano gli intermediari acquirer. Vantaggio di margine
  stimato di 15–25 bps rispetto ai concorrenti che passano per acquirer legacy

## Modello di ricavo
- 2,9% + $0,30 per transazione (pagamenti core)
- Billing/Tax/Radar: ulteriore 0,4–0,8% per transazione
- Quota di ricavo crescente da prodotti non-payment (Link, Capital, Atlas)
- Volume di pagamento totale stimato di oltre $1T (2023), con un ricavo netto implicito
  di oltre $14B

## Posizione competitiva
- vs Adyen: Stripe vince sull'esperienza sviluppatore; Adyen vince sull'enterprise
- vs Square: Stripe online-first; Square POS-first. Convergenza in corso
- Minaccia: build interne da parte di grandi merchant (Shopify, DoorDash)

## Domande aperte
- Stripe può mantenere la crescita senza espandersi nel lending o in servizi
  lending-adjacent?
- Espansione in Cina/SEA ancora minima — barriera regolatoria o scelta strategica?`,
      extractedItems: [
        { name: 'Stripe', type: 'entity', lineIdx: 0 },
        { name: 'Visa', type: 'entity', lineIdx: 0 },
        { name: 'Mastercard', type: 'entity', lineIdx: 0 },
        { name: 'Distribuzione API-First', type: 'concept', lineIdx: 0 },
        { name: 'Prodotto composto', type: 'concept', lineIdx: 0 },
        { name: 'Economia dei circuiti di carte', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Stripe', path: 'wiki/entities/stripe.md', tags: ['Fintech', 'SaaS'], summary: 'Azienda di infrastruttura di pagamento fondata nel 2010. Strategia centrale: distribuzione API-first che targettizza gli sviluppatori come acquirenti, per poi espandersi in prodotti composti (Billing, Tax, Treasury, Issuing). Volume di pagamento stimato di oltre $1T e ricavi netti di oltre $14B.' },
        { title: 'Visa & Mastercard', path: 'wiki/entities/visa-mastercard.md', tags: ['Fintech', 'Networks'], summary: 'I circuiti di carte globali dominanti che processano la maggior parte dei pagamenti dei consumatori. I processori di pagamento devono interagire con la loro infrastruttura — l\'integrazione diretta che bypassa gli acquirer può generare un vantaggio di margine di 15–25 bps.' },
        { title: 'Distribuzione API-First', path: 'wiki/concepts/api-first-distribution.md', tags: ['Strategy', 'Go-to-Market'], summary: 'Una strategia go-to-market in cui il prodotto è distribuito tramite API che targettizzano gli sviluppatori. Ogni integratore diventa un sostenitore interno, creando adozione bottom-up senza team di vendita tradizionali. Stripe è l\'archetipo.' },
        { title: 'Strategia di prodotto composto', path: 'wiki/concepts/compound-product.md', tags: ['Strategy', 'Product'], summary: 'Costruire prodotti interconnessi dove ogni nuovo layer sfrutta i dati dei precedenti. I costi di switch crescono in modo esponenziale — sostituire un prodotto è facile, sostituire l\'intero stack è quasi impossibile.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 1, to: 4 }, { from: 3, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Stripe può mantenere la crescita senza espandersi nel lending?',
      chatAnswerLead: { text: '[[Stripe]] affronta un classico tetto di crescita: i margini del processing dei pagamenti si stanno comprimendo (2,9% + $0,30 è già sotto pressione per via delle build interne di Shopify e DoorDash). L\'azienda deve o espandersi in servizi adiacenti a margine più alto (lending, capital) o accettare tassi di crescita inferiori.' },
      chatAnswerDetail: "La strategia di prodotto composto è la risposta di Stripe: ogni layer si costruisce sul precedente, rendendo l'intero stack progressivamente più difficile da sostituire. Ma il lending è il servizio finanziario a maggior margine — ed è quello in cui Stripe è stata più cauta nell'entrare.",
      chatSource: 'stripe-strategy.md',
    },
  ],
};
