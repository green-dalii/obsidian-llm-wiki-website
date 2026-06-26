import type { ScenariosTranslation } from './types';

export const es: ScenariosTranslation = {
  scenarios: [
    {
      id: 'daily-life',
      label: 'Vida diaria',
      icon: 'heart',
      filename: 'sleep-hygiene.md',
      sourceNoteContext: "Una nota de referencia de ciencia de la salud: resume investigaciones clave sobre la arquitectura del sueño, la deuda de sueño y la higiene práctica. El tipo de artículo que guardarías para mejorar tu propio bienestar.",
      sourceNote: `# Por qué dormimos: hallazgos clave

El sueño es lo más efectivo que podemos hacer para reiniciar nuestro cerebro y cuerpo.

## Arquitectura del sueño
- NREM Etapa 3 (sueño profundo): restauración física, función inmunitaria
- REM: procesamiento emocional, creatividad, consolidación de la memoria
- Cada ciclo dura ~90 min; lo ideal son 4-5 ciclos por noche

## El costo de la deuda de sueño
- Tras 1 semana con 6 h/noche: el rendimiento cognitivo equivale a 0.05% de alcoholemia
- La deuda crónica de sueño se relaciona con el Alzheimer: el aclaramiento glinfático cae un 60%
- 5 h de sueño → la testosterona cae un 10-15% en hombres jóvenes sanos

## Higiene práctica del sueño
- Temperatura óptima del dormitorio: 18-19 °C
- Sin luz azul 90 min antes de dormir: la sensibilidad de la melanopsina alcanza su pico a 480 nm
- Vida media de la cafeína: 6 h; última ingesta antes de las 2 pm
- La constancia al despertar importa más que la constancia al acostarse

## Preguntas abiertas
- ¿Las siestas compensan la deuda nocturna? La evidencia es mixta
- Melatonina: 0.3 mg es tan efectiva como 3 mg. La mayoría de los suplementos están sobredosificados.`,
      extractedItems: [
        { name: 'Matthew Walker', type: 'entity', lineIdx: 0 },
        { name: 'Sistema glinfático', type: 'entity', lineIdx: 0 },
        { name: 'Arquitectura del sueño', type: 'concept', lineIdx: 0 },
        { name: 'Deuda de sueño', type: 'concept', lineIdx: 0 },
        { name: 'Cafeína', type: 'entity', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Sistema glinfático', path: 'wiki/entities/glymphatic-system.md', tags: ['Neuroscience', 'Brain'], summary: "El sistema de aclaramiento de residuos del cerebro que opera principalmente durante el sueño profundo. La privación crónica de sueño reduce el aclaramiento glinfático hasta un 60%, vinculando el mal dormir con el riesgo de Alzheimer." },
        { title: 'Matthew Walker', path: 'wiki/entities/matthew-walker.md', tags: ['Scientist', 'Author'], summary: 'Neurocientífico e investigador del sueño, autor de "Por qué dormimos". Demostró el papel crítico del sueño profundo en el aclaramiento glinfático y los costos cognitivos acumulativos de la deuda de sueño.' },
        { title: 'Arquitectura del sueño', path: 'wiki/concepts/sleep-architecture.md', tags: ['Neuroscience', 'Sleep'], summary: 'La estructura de los ciclos de sueño: NREM Etapa 3 para la restauración física y la función inmunitaria, REM para el procesamiento emocional y la consolidación de la memoria. Cada ciclo dura ~90 minutos; lo ideal son 4-5 ciclos por noche.' },
        { title: 'Deuda de sueño', path: 'wiki/concepts/sleep-debt.md', tags: ['Health', 'Cognition'], summary: 'El efecto acumulado del sueño insuficiente. Tras una semana con 6 h/noche, el rendimiento cognitivo equivale a 0.05% de alcoholemia. Se relaciona con disrupción hormonal, menor sensibilidad a la insulina y degradación de la corteza prefrontal.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 1, to: 0 }, { from: 1, to: 3 },
        { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 5 },
      ],
      chatQuestion: '¿Cómo afecta la privación crónica de sueño a la salud cerebral a largo plazo?',
      chatAnswerLead: { text: '[[La privación crónica de sueño]] deteriora el [[sistema glinfático]], el mecanismo de aclaramiento de residuos del cerebro que opera durante el sueño profundo. Las investigaciones muestran que el aclaramiento cae hasta un 60% con sueño deficiente sostenido, creando un vínculo directo con el riesgo de enfermedades neurodegenerativas.' },
      chatAnswerDetail: 'Más allá de la disfunción glinfática, la deuda de sueño también altera la producción de testosterona (caída del 10-15% con 5 h de sueño), perjudica la sensibilidad a la insulina y degrada la función de la corteza prefrontal, el área responsable de la toma de decisiones y el control de impulsos.',
      chatSource: 'sleep-hygiene.md',
    },

    {
      id: 'reading',
      label: 'Lectura profunda',
      icon: 'book-open',
      filename: 'thinking-fast-and-slow.md',
      sourceNoteContext: "Notas personales de lectura del clásico de Kahneman: no un resumen, sino un compendio de lo que realmente cambió mi forma de pensar sobre las decisiones. El tipo de notas que escribes después de leer algo que genuinamente transforma tu modelo mental.",
      sourceNote: `# Pensar, rápido y despacio — Notas de lectura

El modelo de cognición de doble proceso de Kahneman. La tesis: creemos ser racionales,
pero nos gobierna un Sistema 1 intuitivo que comete errores sistemáticos.

## Sistema 1 vs Sistema 2
- Sistema 1: rápido, automático, sin esfuerzo. Reconoce caras, detecta hostilidad en una
  voz, responde 2+2. Siempre activo.
- Sistema 2: lento, deliberado, costoso. Multiplica 17×24, rellena un formulario fiscal,
  verifica la validez de un argumento lógico. Perezosamente delega en el Sistema 1.

El problema central: el Sistema 2 es perezoso. Avala los juicios instantáneos del Sistema 1
sin verificarlos. Aquí nacen la mayoría de los sesgos cognitivos.

## Heurísticas y sesgos clave

**Heurística de disponibilidad**
Juzgamos la frecuencia por lo fácil que nos vienen ejemplos a la mente. Los ataques de tiburón
parecen más comunes que las complicaciones de la diabetes porque la cobertura mediática los hace
vívidos, y sin embargo la diabetes mata 200 000 veces más personas al año.

**Anclaje**
La exposición a un número ancla los juicios posteriores. Agentes inmobiliarios a los que se
muestra un precio de listing un 15% más alto que a otros terminan con estimaciones más altas,
incluso cuando insisten en que el ancla no les afectó. El efecto es inconsciente.

**Aversión a la pérdida**
Las pérdidas duelen aproximadamente el doble que el placer de ganancias equivalentes. Esto explica por qué:
- Las personas retienen acciones perdedoras y venden las ganadoras (efecto de disposición)
- "Envío gratis" funciona mejor que "$5 de descuento"
- Los recortes salariales generan indignación, aun cuando el salario real ajustado por inflación sube

## Teoría del prospecto (la visión ganadora del Nobel)
La utilidad es dependiente de la referencia. Evaluamos los resultados respecto a un punto de
referencia, no en términos absolutos. Un bono de $1000 se siente genial; un bono de $1000
cuando tu compañero recibió $2000 se siente como una pérdida.

## Mis conclusiones
- Antes de cualquier decisión importante, fuerza la activación del Sistema 2: escribe el problema,
  enumera qué sesgos podrían aplicarse, duerme en ello.
- Reuniones: nunca presentes un número primero a menos que quieras anclar la discusión.
- Finanzas personales: automatiza las decisiones (Sistema 1) para proteger los ahorros del gasto
  impulsivo. Configúralo y olvídate.

## Preguntas que sigo dándole vueltas
- ¿Se puede entrenar el Sistema 1? El reconocimiento de patrones de los grandes maestros de
  ajedrez sugiere que sí.
- ¿Hay dominios donde el Sistema 1 supera al Sistema 2? (¿Blink frente a la deliberación?)
- ¿Cómo interactúa esto con el razonamiento de los LLM? ¿Son los LLM un Sistema 2 puro, o pueden
  simular la intuición del Sistema 1?`,
      extractedItems: [
        { name: 'Daniel Kahneman', type: 'entity', lineIdx: 0 },
        { name: 'Sistema 1', type: 'concept', lineIdx: 0 },
        { name: 'Sistema 2', type: 'concept', lineIdx: 0 },
        { name: 'Heurística de disponibilidad', type: 'concept', lineIdx: 0 },
        { name: 'Anclaje', type: 'concept', lineIdx: 0 },
        { name: 'Aversión a la pérdida', type: 'concept', lineIdx: 0 },
        { name: 'Teoría del prospecto', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Daniel Kahneman', path: 'wiki/entities/daniel-kahneman.md', tags: ['Psychologist', 'Nobel Laureate'], summary: 'Psicólogo israelí-estadounidense que ganó el Premio Nobel de Economía en 2002 por la Teoría del prospecto. Su trabajo junto a Amos Tversky fundó la economía del comportamiento y reveló los sesgos cognitivos sistemáticos que gobiernan la toma de decisiones humana.' },
        { title: 'Sistema 1', path: 'wiki/concepts/system-1.md', tags: ['Cognition', 'Psychology'], summary: 'El sistema de pensamiento rápido, automático y sin esfuerzo que opera de forma continua. Reconoce patrones, emite juicios instantáneos y se basa en la intuición. Es la fuente de la mayoría de los sesgos cognitivos porque opera por debajo de la conciencia.' },
        { title: 'Sistema 2', path: 'wiki/concepts/system-2.md', tags: ['Cognition', 'Psychology'], summary: 'El sistema de pensamiento lento, deliberado y costoso, responsable del razonamiento complejo, el análisis lógico y la toma de decisiones consciente. Es perezoso por diseño y a menudo delega en los juicios del Sistema 1 sin verificarlos.' },
        { title: 'Efecto de anclaje', path: 'wiki/concepts/anchoring-effect.md', tags: ['Bias', 'Decision-Making'], summary: 'Un sesgo cognitivo por el cual la exposición a un número inicial influye desproporcionadamente en los juicios posteriores. El efecto opera de forma inconsciente: incluso expertos que niegan estar influenciados muestran el efecto completo en experimentos controlados.' },
        { title: 'Teoría del prospecto', path: 'wiki/concepts/prospect-theory.md', tags: ['Behavioral Economics', 'Psychology'], summary: 'Desarrollada por Kahneman y Tversky, la teoría del prospecto muestra que las personas evalúan los resultados respecto a un punto de referencia, no en términos absolutos. La utilidad es dependiente de la referencia: el mismo resultado se siente distinto según el marco.' },
      ],
      links: [
        { from: 0, to: 1 }, { from: 0, to: 4 }, { from: 1, to: 2 }, { from: 1, to: 3 },
        { from: 3, to: 4 }, { from: 0, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: '¿Cómo interactúan el Sistema 1 y el Sistema 2 en la toma de decisiones?',
      chatAnswerLead: { text: '[[El Sistema 1]] genera intuiciones y juicios instantáneos de forma continua, mientras que [[el Sistema 2]] perezosamente los avala sin verificación la mayor parte del tiempo. La toma de decisiones efectiva requiere forzar deliberadamente [[la activación del Sistema 2]]: escribir el problema, listar los sesgos potenciales y dormir en ello antes de actuar.' },
      chatAnswerDetail: 'La clave de Kahneman es que el Sistema 2 no es un revisor confiable del Sistema 1. Requiere esfuerzo consciente para activarse, y la mayoría del tiempo simplemente racionaliza lo que el Sistema 1 ya decidió.',
      chatSource: 'thinking-fast-and-slow.md',
    },

    {
      id: 'inspiration',
      label: 'Inspiración',
      icon: 'scissors',
      filename: 'thinking-clippings.md',
      sourceNoteContext: "Una colección de recortes web guardados a lo largo del tiempo: artículos, ensayos y entrevistas que comparten un hilo conductor: cómo pensar mejor. El tipo de fragmentos que recopilas esperando que algún día conecten.",
      sourceNote: `# Modelos mentales y pensamiento — Colección de recortes

Colección ecléctica. La actualizo cada vez que un modelo mental aparece en varios
libros o conversaciones.

## Sobre hechos y creencias
> Recortado de James Clear
"Los humanos necesitamos una visión razonablemente precisa del mundo para navegarlo. Pero
'precisa' no es lo único que priorizan nuestras mentes. Si un cerebro anticipa una recompensa
por adoptar una creencia particular, es perfectamente feliz de hacerlo. El resultado es que
las creencias falsas pueden mantenerse no porque sean verdaderas, sino porque cumplen una
función social: nos ayudan a vincularnos con nuestra tribu."

## Cómo pensar por ti mismo
> Recortado de Paul Graham
"Hay algunos tipos de trabajo que no puedes hacer bien a menos que pienses diferente de
tus pares. La dificultad es que las personas a menudo se equivocan sobre dónde caen en el
espectro. Las personas más convencionales están seguras de ser independientes, mientras que
las genuinamente independientes temen no serlo lo suficiente."

## Pensamiento de segundo orden
> Recortado de Farnam Street
"El pensamiento de primer orden es simplista y superficial, y casi cualquiera puede hacerlo.
El pensamiento de segundo orden es la práctica de rastrear la cadena de consecuencias que
siguen a una decisión. Muchos resultados extraordinarios provienen de decisiones que son
negativas en primer orden pero positivas en segundo orden."

## Inversión
> Recortado de Farnam Street
"La premisa central de la inversión es que no debes abordar problemas difíciles desde una
sola dirección. En su lugar, examínalos hacia adelante y hacia atrás. Charlie Munger:
'Todo lo que quiero saber es dónde voy a morir, para no ir nunca allí.'"

## Sobre pronósticos
> Recortado de Morgan Housel
"La mayoría de los problemas son más complicados de lo que parecen, pero la mayoría de
las soluciones deberían ser más simples de lo que son. Lee menos pronósticos y más historia.
Estudia más fracasos y menos éxitos."

## Lo que quiero conectar
- Hechos vs creencias → ¿mecanismo de vínculo social?
- Pensamiento de segundo orden + inversión → ambos recompensan la profundidad sobre la amplitud
- El espectro de Graham → ¿cómo sé dónde caigo realmente?`,
      extractedItems: [
        { name: 'James Clear', type: 'entity', lineIdx: 0 },
        { name: 'Paul Graham', type: 'entity', lineIdx: 0 },
        { name: 'Charlie Munger', type: 'entity', lineIdx: 0 },
        { name: 'Pensamiento de segundo orden', type: 'concept', lineIdx: 0 },
        { name: 'Inversión', type: 'concept', lineIdx: 0 },
        { name: 'Pensamiento independiente', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'James Clear', path: 'wiki/entities/james-clear.md', tags: ['Author', 'Habits'], summary: 'Autor de "Atomic Habits" y escritor sobre toma de decisiones, hábitos y comportamiento humano. Su trabajo explora por qué las personas sostienen creencias falsas y cómo la identidad social moldea lo que nos resulta convincente.' },
        { title: 'Paul Graham', path: 'wiki/entities/paul-graham.md', tags: ['Founder', 'Essayist'], summary: 'Cofundador de Y Combinator y ensayista influyente sobre startups, tecnología y pensamiento. Su ensayo "How to Think for Yourself" descompone la independencia de pensamiento en tres componentes: escrupulosidad con la verdad, resistencia a la conformidad y curiosidad.' },
        { title: 'Pensamiento de segundo orden', path: 'wiki/concepts/second-order-thinking.md', tags: ['Mental Model', 'Decision-Making'], summary: 'La práctica de rastrear cadenas de consecuencias más allá de los resultados inmediatos. Muchos resultados extraordinarios provienen de decisiones que son negativas en primer orden pero positivas en segundo orden. La técnica clave: preguntar una y otra vez "¿Y entonces qué?".' },
        { title: 'Inversión', path: 'wiki/concepts/inversion.md', tags: ['Mental Model', 'Decision-Making'], summary: 'Un enfoque de resolución de problemas que examina los problemas hacia adelante y hacia atrás. En lugar de preguntar cómo lograr un resultado, pregunta cómo garantizar lo contrario y luego evita esas cosas. "Evitar la estupidez es más fácil que buscar la brillantez."' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 3 }, { from: 0, to: 1 },
        { from: 1, to: 4 }, { from: 0, to: 5 }, { from: 3, to: 4 },
      ],
      chatQuestion: '¿Cuál es el hilo común entre el pensamiento de segundo orden y la inversión?',
      chatAnswerLead: { text: '[[El pensamiento de segundo orden]] y [[la inversión]] recompensan ambos la profundidad sobre la amplitud y requieren resistir la intuición inmediata del Sistema 1. El pensamiento de segundo orden rastrea consecuencias hacia adelante; la inversión rastrea fracasos hacia atrás. Ambos te obligan a mirar más allá de lo obvio.' },
      chatAnswerDetail: 'Donde difieren: el pensamiento de segundo orden es aditivo (¿qué más ocurre?), mientras que la inversión es substractiva (¿qué debo evitar?). Usados juntos, forman un marco poderoso: usa la inversión para eliminar opciones malas y luego el pensamiento de segundo orden para evaluar las que quedan.',
      chatSource: 'thinking-clippings.md',
    },

    {
      id: 'creation',
      label: 'Creación de contenido',
      icon: 'mic',
      filename: 'podcast-episode-plan.md',
      sourceNoteContext: 'Un documento de planificación de producción para un episodio de podcast: investigación sobre el invitado, preguntas estructuradas, arco narrativo. El tipo de documento que separa una entrevista bien preparada de una conversación divagante.',
      sourceNote: `# The Knowledge Stack — Plan del episodio 12

Invitado: Dr. Andy Matuschak (investigador independiente, ex-Apple, ex-Khan Academy)
Tema: "Herramientas para pensar y el futuro de la lectura"

## Perfil del invitado
- Lideró I+D en Khan Academy sobre algoritmos de aprendizaje por dominio
- Trabajó en Apple en las primeras iniciativas educativas para iPad
- Dirige ahora un laboratorio de investigación independiente sobre herramientas para pensar
- Conocido por: la metodología "Evergreen notes", la práctica de investigación "Working in public"
- Su ensayo "Why books don't work" generó un gran debate en la comunidad PKM

## Preguntas centrales
1. Escribiste que "los libros no funcionan": la mayoría olvida el 90% de lo que lee.
   ¿Cómo sería un medio "funcional" para la transferencia de conocimiento?
2. Tu sistema de "evergreen notes" enfatiza la atomicidad y la summarización progresiva.
   ¿En qué se diferencia de la toma de notas tradicional?
3. Has sido vocal sobre la brecha entre la investigación en herramientas para pensar y la
   adopción masiva. ¿Cuál es el mayor bloqueo?
4. Con los LLM ya capaces de responder preguntas sobre cualquier libro al instante,
   ¿cuál es el rol de la lectura humana en 2026?
5. Tu práctica de investigación es radicalmente abierta: publicas pensamientos a medio terminar
   cada día. ¿No genera ruido? ¿Cómo equilibras profundidad y velocidad?

## Referencias clave a mencionar
- Matuschak, A. (2019). "Why books don't work"
- Nielsen, M. (2018). "Augmenting human intellect"
- Engelbart, D. (1962). "Augmenting Human Intellect" — la madre de todas las demos

## Preguntas abiertas para después de la entrevista
- ¿Debería leer el ensayo completo de Andy sobre "Evergreen notes" antes de grabar?
- ¿Necesito un segundo invitado como contrapunto?
- Logística de grabación: ¿nota de voz asíncrona o vídeo en directo?`,
      extractedItems: [
        { name: 'Andy Matuschak', type: 'entity', lineIdx: 0 },
        { name: 'Khan Academy', type: 'entity', lineIdx: 0 },
        { name: 'Douglas Engelbart', type: 'entity', lineIdx: 0 },
        { name: 'Evergreen Notes', type: 'concept', lineIdx: 0 },
        { name: 'Herramientas para pensar', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Andy Matuschak', path: 'wiki/entities/andy-matuschak.md', tags: ['Researcher', 'PKM'], summary: 'Investigador independiente dedicado a las herramientas para pensar. Anteriormente en Khan Academy y Apple. Conocido por el ensayo "Why books don\'t work" y la metodología "evergreen notes" para una gestión del conocimiento atómica y enlazada.' },
        { title: 'Khan Academy', path: 'wiki/entities/khan-academy.md', tags: ['Education', 'Nonprofit'], summary: 'Plataforma educativa en línea fundada por Sal Khan. Reconocida por sus algoritmos de aprendizaje por dominio y el modelo de aula invertida. Matuschak lideró la I+D en sistemas de aprendizaje adaptativo durante su etapa allí.' },
        { title: 'Evergreen Notes', path: 'wiki/concepts/evergreen-notes.md', tags: ['PKM', 'Methodology'], summary: 'Una metodología de toma de notas que enfatiza la atomicidad, la orientación a conceptos y la summarización progresiva. Las notas se escriben para ser permanentemente útiles y refinadas continuamente, en lugar de capturar pensamientos fugaces.' },
        { title: 'Herramientas para pensar', path: 'wiki/concepts/tools-for-thought.md', tags: ['Technology', 'Cognition'], summary: 'Software y sistemas diseñados para aumentar el pensamiento, la memoria y la creatividad humanas. Nacieron con el "Augmenting Human Intellect" de Engelbart en 1962. Desafío clave: cerrar la brecha entre los prototipos de investigación y la adopción masiva.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 0, to: 4 }, { from: 2, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: '¿Cuál es la diferencia esencial entre las evergreen notes y la toma de notas tradicional?',
      chatAnswerLead: { text: '[[Las evergreen notes]] se escriben para ser permanentemente útiles y refinadas continuamente, mientras que la toma de notas tradicional captura pensamientos fugaces para el recuerdo a corto plazo. Las evergreen notes enfatizan [[la atomicidad]] (una idea por nota), [[la orientación a conceptos]] (nombradas por concepto, no por fuente) y [[la summarización progresiva]] (destilación en varias capas).' },
      chatAnswerDetail: 'El cambio clave es pasar de "¿qué leí?" a "¿qué creo?". Las notas tradicionales son bibliográficas; las evergreen notes son epistémicas. Esto las hace componibles: puedes construir nuevas ideas enlazando notas atómicas sin releer las fuentes originales.',
      chatSource: 'podcast-episode-plan.md',
    },

    {
      id: 'academic',
      label: 'Investigación académica',
      icon: 'microscope',
      filename: 'attention-is-all-you-need.md',
      sourceNoteContext: 'Notas de investigación sobre un paper seminal de IA: el tipo de inmersión profunda que haces cuando necesitas entender los fundamentos, no solo los titulares. Vaswani et al., 2017.',
      sourceNote: `# Attention Is All You Need — Notas

El paper que mató las RNN y dio a luz al Transformer. Vaswani et al., 2017.

## La idea central
En lugar de procesar tokens secuencialmente (estilo RNN), procesa todo en paralelo
usando "atención": deja que cada token mire a todos los demás y decida cuáles importan.
La clave: el procesamiento secuencial era el cuello de botella, no una característica.

## Tres mecanismos de atención
- Self-Attention: cada palabra de una oración atiende a todas las demás. Esto captura
dependencias de largo alcance que las RNN pierden tras ~50 tokens.
- Multi-Head Attention: ejecuta 8 operaciones de atención en paralelo, cada una aprendiendo
distintos tipos de relaciones (sintaxis, semántica, correferencia). Concatena los resultados.
Cada cabeza se especializa en algo diferente.
- Scaled Dot-Product: la operación Q·K^T dividida por sqrt(d_k). Sin el factor de
escalado, los gradientes explotan en dimensiones altas.

## Codificación posicional
Como no hay recurrencia, el modelo no tiene idea del orden de las palabras. La solución:
añade ondas seno/coseno de distintas frecuencias a los embeddings de entrada. Esto da al
modelo información de posición sin añadir parámetros.

## Por qué esto lo cambió todo
- El entrenamiento se volvió paralelizable (las RNN entrenaban token a token, los Transformers
entrenan toda la secuencia a la vez) → escalar a conjuntos de datos más grandes
- Dependencias de largo alcance: las RNN tenían memoria de ~50 tokens; los Transformers no
tienen un límite fijo (acotado por la ventana de contexto, que creció de 512 a más de 1M de tokens)
- Este paper condujo directamente a: BERT (2018), GPT (2018+), cada LLM moderno

## Preguntas abiertas
- ¿Es la atención realmente la forma final? Los State Space Models (Mamba, S4) desafían
la complejidad cuadrática de la atención
- ¿Aprenden realmente patrones distintos las múltiples cabezas, o son redundantes?`,
      extractedItems: [
        { name: 'Vaswani et al.', type: 'entity', lineIdx: 0 },
        { name: 'Google Brain', type: 'entity', lineIdx: 0 },
        { name: 'BERT', type: 'entity', lineIdx: 0 },
        { name: 'Self-Attention', type: 'concept', lineIdx: 0 },
        { name: 'Multi-Head Attention', type: 'concept', lineIdx: 0 },
        { name: 'Codificación posicional', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Vaswani et al.', path: 'wiki/entities/vaswani-et-al.md', tags: ['AI', 'Researchers'], summary: 'El equipo de Google Brain que publicó "Attention Is All You Need" (2017), introduciendo la arquitectura Transformer. Su trabajo reemplazó las RNN, hizo posible el entrenamiento paralelo a escala y condujo directamente a BERT, GPT y cada LLM moderno.' },
        { title: 'BERT', path: 'wiki/entities/bert.md', tags: ['AI', 'NLP'], summary: 'Bidirectional Encoder Representations from Transformers, publicado por Google en 2018. Construido directamente sobre la pila de encoders del Transformer, BERT logró resultados de estado del arte en 11 tareas de NLP y demostró el poder del preentrenamiento + fine-tuning.' },
        { title: 'Self-Attention', path: 'wiki/concepts/self-attention.md', tags: ['AI', 'NLP'], summary: 'El mecanismo central del Transformer: cada token de una secuencia atiende simultáneamente a todos los demás tokens, calculando relaciones ponderadas. Habilita el procesamiento paralelo y captura dependencias de largo alcance más allá del límite de ~50 tokens de las RNN.' },
        { title: 'Multi-Head Attention', path: 'wiki/concepts/multi-head-attention.md', tags: ['AI', 'NLP'], summary: 'Ejecuta múltiples operaciones de atención en paralelo (típicamente 8 cabezas), cada una aprendiendo distintos tipos de relaciones (sintaxis, semántica, correferencia). Las salidas se concatenan y proyectan, permitiendo atención conjunta sobre distintos subespacios de representación.' },
        { title: 'Codificación posicional', path: 'wiki/concepts/positional-encoding.md', tags: ['AI', 'NLP'], summary: 'Como los Transformers procesan todos los tokens en paralelo, no tienen una noción inherente del orden de las palabras. La codificación posicional añade ondas seno/coseno de frecuencias variables a los embeddings de entrada, codificando la posición sin añadir parámetros entrenables.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 2, to: 4 },
        { from: 3, to: 4 }, { from: 1, to: 5 },
      ],
      chatQuestion: '¿Es la atención la forma final, o los State Space Models la reemplazarán?',
      chatAnswerLead: { text: '[[La atención]] no es la forma final: los [[State Space Models]] (Mamba, S4) ya están desafiando su complejidad O(n²). Los SSM logran [[escalado lineal]] con la longitud de la secuencia manteniendo un rendimiento competitivo en tareas de contexto largo.' },
      chatAnswerDetail: 'Sin embargo, la atención tiene una enorme ventaja de ecosistema: cada LLM importante (GPT, Claude, Gemini) está construido sobre ella, y el hardware GPU está optimizado para la multiplicación de matrices. Los SSM necesitan demostrar no solo eficiencia teórica, sino superioridad práctica a escala, antes de reemplazar a la atención por completo.',
      chatSource: 'attention-is-all-you-need.md',
    },

    {
      id: 'business',
      label: 'Negocios',
      icon: 'trending-up',
      filename: 'stripe-strategy.md',
      sourceNoteContext: 'Un análisis de estrategia competitiva: desglosa el modelo de negocio, las palancas de crecimiento y la posición de mercado. El tipo de nota de investigación que un PM, consultor o fundador escribe antes de una decisión estratégica importante.',
      sourceNote: `# La evolución estratégica de Stripe

## De herramienta para desarrolladores a infraestructura económica

Stripe empezó como "7 líneas de código para aceptar pagos". Pero esa formulación
oscurece la estrategia real: no ganaron haciendo los pagos más fáciles, sino haciendo
del desarrollador el comprador.

## Movimientos estratégicos clave
- **Distribución API-first**: cada desarrollador que integra Stripe se convierte en un
  defensor interno. No se necesita equipo de ventas para el segmento SMB
- **Producto compuesto**: Payments → Billing → Tax → Treasury → Issuing. Cada producto
  aprovecha datos del anterior. Los costes de cambio crecen exponencialmente: puedes
  reemplazar un procesador de pagos, pero no puedes reemplazar toda tu pila financiera
- **Bypass de redes de tarjetas**: las integraciones directas de Stripe con Visa/Mastercard
  eliminan intermediarios adquirentes. Ventaja estimada de margen de 15-25 pb frente a
  competidores que enrutan a través de adquirentes heredados

## Modelo de ingresos
- 2.9% + $0.30 por transacción (pagos básicos)
- Billing/Tax/Radar: 0.4-0.8% adicional por transacción
- Creciente participación en ingresos de productos no relacionados con pagos (Link, Capital, Atlas)
- Volumen total de pagos estimado en $1T+ (2023), lo que implica ~$14B+ de ingresos netos

## Posición competitiva
- vs Adyen: Stripe gana en experiencia de desarrollador; Adyen gana en enterprise
- vs Square: Stripe online-first; Square POS-first. Convergiendo
- Amenaza: desarrollos internos de grandes merchants (Shopify, DoorDash)

## Preguntas abiertas
- ¿Puede Stripe mantener el crecimiento sin expandirse hacia préstamos o áreas adyacentes?
- La expansión en China/SEA sigue siendo mínima: ¿barrera regulatoria o decisión estratégica?`,
      extractedItems: [
        { name: 'Stripe', type: 'entity', lineIdx: 0 },
        { name: 'Visa', type: 'entity', lineIdx: 0 },
        { name: 'Mastercard', type: 'entity', lineIdx: 0 },
        { name: 'Distribución API-First', type: 'concept', lineIdx: 0 },
        { name: 'Producto compuesto', type: 'concept', lineIdx: 0 },
        { name: 'Economía de redes de tarjetas', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Stripe', path: 'wiki/entities/stripe.md', tags: ['Fintech', 'SaaS'], summary: 'Compañía de infraestructura de pagos fundada en 2010. Estrategia central: distribución API-first dirigida a desarrolladores como compradores, expandiéndose luego a productos compuestos (Billing, Tax, Treasury, Issuing). Volumen de pagos estimado en $1T+ e ingresos netos de $14B+.' },
        { title: 'Visa y Mastercard', path: 'wiki/entities/visa-mastercard.md', tags: ['Fintech', 'Networks'], summary: 'Las redes de tarjetas globales dominantes que procesan la mayoría de los pagos de consumo. Los procesadores de pagos deben interactuar con su infraestructura: la integración directa que evita adquirentes puede aportar una ventaja de margen de 15-25 pb.' },
        { title: 'Distribución API-First', path: 'wiki/concepts/api-first-distribution.md', tags: ['Strategy', 'Go-to-Market'], summary: 'Una estrategia go-to-market en la que el producto se distribuye a través de APIs dirigidas a desarrolladores. Cada integrador se convierte en un defensor interno, generando adopción bottom-up sin equipos comerciales tradicionales. Stripe es el arquetipo.' },
        { title: 'Estrategia de producto compuesto', path: 'wiki/concepts/compound-product.md', tags: ['Strategy', 'Product'], summary: 'Construir productos interconectados donde cada nueva capa aprovecha datos de las anteriores. Los costes de cambio crecen exponencialmente: reemplazar un producto es fácil, reemplazar toda la pila es casi imposible.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 1, to: 4 }, { from: 3, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: '¿Puede Stripe mantener el crecimiento sin expandirse a préstamos?',
      chatAnswerLead: { text: '[[Stripe]] se enfrenta a un techo de crecimiento clásico: los márgenes del procesamiento de pagos se están comprimiendo (2.9% + $0.30 ya está bajo presión por los desarrollos internos de Shopify y DoorDash). La compañía debe expandirse a servicios adyacentes de mayor margen (préstamos, capital) o aceptar tasas de crecimiento más bajas.' },
      chatAnswerDetail: "La estrategia de producto compuesto es la respuesta de Stripe: cada capa se construye sobre la anterior, haciendo que toda la pila sea progresivamente más difícil de reemplazar. Pero los préstamos son el servicio financiero con mayor margen, y el que Stripe más cautela ha mostrado en abordar.",
      chatSource: 'stripe-strategy.md',
    },
  ],
};