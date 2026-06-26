import type { ScenariosTranslation } from './types';

export const pt: ScenariosTranslation = {
  scenarios: [
    {
      id: 'daily-life',
      label: 'Vida diária',
      icon: 'heart',
      filename: 'sleep-hygiene.md',
      sourceNoteContext: "Uma nota de referência em ciência da saúde — resumindo as principais pesquisas sobre arquitetura do sono, dívida de sono e higiene prática do sono. O tipo de artigo que você salva para melhorar seu próprio bem-estar.",
      sourceNote: `# Por Que Dormimos: Principais Descobertas

Dormir é a coisa mais eficaz que podemos fazer para resetar nosso cérebro e corpo.

## Arquitetura do Sono
- NREM Estágio 3 (sono profundo): restauração física, função imunológica
- REM: processamento emocional, criatividade, consolidação de memória
- Cada ciclo ~90 min, 4–5 ciclos por noite é o ideal

## O Custo da Dívida de Sono
- Após 1 semana dormindo 6h/noite: o desempenho cognitivo equivale a 0,05% de BAC (teor alcoólico no sangue)
- Dívida crônica de sono ligada ao Alzheimer — a limpeza glinfática cai 60%
- 5h de sono → testosterona cai 10–15% em homens jovens saudáveis

## Higiene Prática do Sono
- Temperatura ideal do quarto: 18–19°C
- Sem luz azul 90 min antes de dormir — a sensibilidade da melanopsina atinge o pico em 480nm
- Meia-vida da cafeína: 6h. Última ingestão antes das 14h
- Consistência no horário de acordar importa mais que consistência no horário de dormir

## Questões em Aberto
- Cochilos compensam a dívida noturna? As evidências são mistas
- Melatonina: 0,3mg é tão eficaz quanto 3mg. A maioria dos suplementos é superdosada.`,
      extractedItems: [
        { name: 'Matthew Walker', type: 'entity', lineIdx: 0 },
        { name: 'Sistema Glinfático', type: 'entity', lineIdx: 0 },
        { name: 'Arquitetura do Sono', type: 'concept', lineIdx: 0 },
        { name: 'Dívida de Sono', type: 'concept', lineIdx: 0 },
        { name: 'Cafeína', type: 'entity', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Sistema Glinfático', path: 'wiki/entities/glymphatic-system.md', tags: ['Neuroscience', 'Brain'], summary: "O sistema de limpeza de resíduos do cérebro que opera principalmente durante o sono profundo. A privação crônica de sono reduz a limpeza glinfática em até 60%, ligando o sono ruim ao risco de Alzheimer." },
        { title: 'Matthew Walker', path: 'wiki/entities/matthew-walker.md', tags: ['Scientist', 'Author'], summary: 'Neurocientista e pesquisador do sono, autor de "Por Que Dormimos". Demonstrou o papel crítico do sono profundo na limpeza glinfática e os custos cognitivos cumulativos da dívida de sono.' },
        { title: 'Arquitetura do Sono', path: 'wiki/concepts/sleep-architecture.md', tags: ['Neuroscience', 'Sleep'], summary: 'A estrutura dos ciclos de sono: NREM Estágio 3 para restauração física e função imunológica, REM para processamento emocional e consolidação de memória. Cada ciclo dura ~90 minutos, com 4–5 ciclos por noite como o ideal.' },
        { title: 'Dívida de Sono', path: 'wiki/concepts/sleep-debt.md', tags: ['Health', 'Cognition'], summary: 'O efeito cumulativo de sono insuficiente. Após uma semana dormindo 6h/noite, o desempenho cognitivo equivale a 0,05% de BAC. Ligado a desequilíbrio hormonal, sensibilidade reduzida à insulina e degradação do córtex pré-frontal.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 1, to: 0 }, { from: 1, to: 3 },
        { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 5 },
      ],
      chatQuestion: 'Como a privação crônica de sono afeta a saúde do cérebro a longo prazo?',
      chatAnswerLead: { text: '[[Privação crônica de sono]] prejudica o [[sistema glinfático]] — o mecanismo de limpeza de resíduos do cérebro que opera durante o sono profundo. Pesquisas mostram que a limpeza cai em até 60% com sono persistentemente ruim, criando uma ligação direta com o risco de doenças neurodegenerativas.' },
      chatAnswerDetail: 'Além da disfunção glinfática, a dívida de sono também interrompe a produção de testosterona (queda de 10–15% com 5h de sono), prejudica a sensibilidade à insulina e degrada a função do córtex pré-frontal — a área responsável por tomada de decisão e controle de impulsos.',
      chatSource: 'sleep-hygiene.md',
    },

    {
      id: 'reading',
      label: 'Leitura Profunda',
      icon: 'book-open',
      filename: 'thinking-fast-and-slow.md',
      sourceNoteContext: "Notas pessoais de leitura do clássico de Kahneman — não um resumo, mas uma digestão do que de fato mudou a forma como penso sobre decisões. O tipo de nota que você escreve depois de ler algo que genuinamente muda seu modelo mental.",
      sourceNote: `# Thinking, Fast and Slow — Notas de Leitura

O modelo de cognição de duplo processo de Kahneman. A tese: achamos que somos
racionais, mas somos governados por um Sistema 1 intuitivo que comete erros
sistemáticos.

## Sistema 1 vs Sistema 2
- Sistema 1: rápido, automático, sem esforço. Reconhece rostos, detecta hostilidade
  em uma voz, responde 2+2. Sempre ativo.
- Sistema 2: lento, deliberado, exige esforço. Multiplica 17×24, preenche um formulário
  de imposto, verifica a validade de um argumento lógico. Por padrão, entrega ao
  Sistema 1.

O problema central: o Sistema 2 é preguiçoso. Ele endossa os julgamentos instantâneos
do Sistema 1 sem verificá-los. Essa é a origem da maioria dos vieses cognitivos.

## Heurísticas e Vieses Principais

**Heurística da Disponibilidade**
Julgamos frequência pela facilidade com que exemplos vêm à mente. Ataques de tubarão
parecem mais comuns que complicações de diabetes porque a cobertura midiática os torna
vividos — ainda que o diabetes mate 200.000× mais pessoas por ano.

**Ancoragem**
A exposição a um número ancora julgamentos subsequentes. Corretores de imóveis que
recebem uma estimativa de preço de listagem 15% mais alta que os que recebem uma
estimativa baixa — mesmo quando insistem que a âncora não teve efeito. O efeito é
inconsciente.

**Aversão à Perda**
Perdas doem cerca de duas vezes mais do que ganhos equivalentes proporcionam prazer.
Isso explica por que:
- Pessoas seguram ações perdedoras e vendem as vencedoras (efeito de disposição)
- "Frete grátis" funciona melhor que "US$ 5 de desconto"
- Cortes salariais são recebidos com indignação, mesmo quando o salário ajustado pela
  inflação subiu

## Teoria do Prospecto (o insight que rendeu o Nobel)
A utilidade é dependente de referência. Avaliamos resultados em relação a um ponto de
referência, não em termos absolutos. Um bônus de US$ 1.000 parece ótimo; um bônus de
US$ 1.000 quando seu colega recebeu US$ 2.000 parece uma perda.

## Minhas Conclusões
- Antes de qualquer decisão importante, force a ativação do Sistema 2: escreva o
  problema, liste quais vieses podem se aplicar, durma sobre o assunto.
- Reuniões: nunca apresente um número primeiro, a menos que queira ancorar a discussão.
- Finanças pessoais: automatize decisões (Sistema 1) para proteger a poupança de gastos
  impulsivos. Configure e esqueça.

## Questões que Ainda Penso
- O Sistema 1 pode ser treinado? O reconhecimento de padrões de grandes mestres de
  xadrez sugere que sim.
- Existem domínios onde o Sistema 1 supera o Sistema 2? (Blink vs. deliberação?)
- Como isso interage com o raciocínio de LLMs? LLMs são puro Sistema 2, ou conseguem
  simular a intuição do Sistema 1?`,
      extractedItems: [
        { name: 'Daniel Kahneman', type: 'entity', lineIdx: 0 },
        { name: 'Sistema 1', type: 'concept', lineIdx: 0 },
        { name: 'Sistema 2', type: 'concept', lineIdx: 0 },
        { name: 'Heurística da Disponibilidade', type: 'concept', lineIdx: 0 },
        { name: 'Ancoragem', type: 'concept', lineIdx: 0 },
        { name: 'Aversão à Perda', type: 'concept', lineIdx: 0 },
        { name: 'Teoria do Prospecto', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Daniel Kahneman', path: 'wiki/entities/daniel-kahneman.md', tags: ['Psychologist', 'Nobel Laureate'], summary: 'Psicólogo israelense-americano que ganhou o Prêmio Nobel de Economia de 2002 pela Teoria do Prospecto. Seu trabalho com Amos Tversky fundou a economia comportamental e revelou os vieses cognitivos sistemáticos que governam a tomada de decisão humana.' },
        { title: 'Sistema 1', path: 'wiki/concepts/system-1.md', tags: ['Cognition', 'Psychology'], summary: 'O sistema de pensamento rápido, automático e sem esforço que opera continuamente. Ele reconhece padrões, faz julgamentos instantâneos e depende da intuição. É a fonte da maioria dos vieses cognitivos porque opera abaixo da consciência.' },
        { title: 'Sistema 2', path: 'wiki/concepts/system-2.md', tags: ['Cognition', 'Psychology'], summary: 'O sistema de pensamento lento, deliberado e exigente, responsável pelo raciocínio complexo, análise lógica e tomada de decisão consciente. É preguiçoso por design e frequentemente aceita sem verificar os julgamentos do Sistema 1.' },
        { title: 'Efeito de Ancoragem', path: 'wiki/concepts/anchoring-effect.md', tags: ['Bias', 'Decision-Making'], summary: 'Um viés cognitivo em que a exposição a um número inicial influencia desproporcionalmente julgamentos subsequentes. O efeito opera de forma inconsciente — mesmo especialistas que negam ser influenciados apresentam o efeito de ancoragem completo em experimentos controlados.' },
        { title: 'Teoria do Prospecto', path: 'wiki/concepts/prospect-theory.md', tags: ['Behavioral Economics', 'Psychology'], summary: 'Desenvolvida por Kahneman e Tversky, a teoria do prospecto mostra que as pessoas avaliam resultados em relação a um ponto de referência, e não em termos absolutos. A utilidade é dependente de referência — o mesmo resultado parece diferente dependendo do enquadramento.' },
      ],
      links: [
        { from: 0, to: 1 }, { from: 0, to: 4 }, { from: 1, to: 2 }, { from: 1, to: 3 },
        { from: 3, to: 4 }, { from: 0, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Como o Sistema 1 interage com o Sistema 2 na tomada de decisão?',
      chatAnswerLead: { text: '[[Sistema 1]] gera intuições e julgamentos instantâneos continuamente, enquanto [[Sistema 2]] preguiçosamente os endossa sem verificação na maior parte do tempo. A tomada de decisão eficaz exige forçar deliberadamente a [[ativação do Sistema 2]] — escrever o problema, listar vieses potenciais e dormir sobre ele antes de agir.' },
      chatAnswerDetail: 'O insight central de Kahneman é que o Sistema 2 não é uma verificação confiável do Sistema 1. Ele exige esforço consciente para ser ativado, e na maior parte do tempo apenas racionaliza o que o Sistema 1 já decidiu.',
      chatSource: 'thinking-fast-and-slow.md',
    },

    {
      id: 'inspiration',
      label: 'Inspiração',
      icon: 'scissors',
      filename: 'thinking-clippings.md',
      sourceNoteContext: "Uma coleção de recortes da web salvos ao longo do tempo — artigos, ensaios e entrevistas que compartilham um fio condutor: como pensar melhor. O tipo de fragmentos que você guarda esperando que um dia se conectem.",
      sourceNote: `# Modelos Mentais & Pensamento — Coleção de Recortes

Coleção aleatória. Adiciono a ela sempre que um modelo mental aparece em vários
livros ou conversas.

## Sobre Fatos e Crenças
> Recortado de James Clear
"Humanos precisam de uma visão razoavelmente precisa do mundo para navegar nele. Mas
'precisa' não é a única coisa que nossas mentes priorizam. Se um cérebro antecipa uma
recompensa por adotar uma crença específica, fica feliz em fazê-lo. O resultado é que
crenças falsas podem ser sustentadas não porque são verdadeiras, mas porque servem a
um propósito social — elas nos ajudam a nos vincular ao nosso grupo."

## Como Pensar por Conta Própria
> Recortado de Paul Graham
"Existem alguns tipos de trabalho que você não consegue fazer bem a menos que pense
de forma diferente de seus pares. A dificuldade é que as pessoas frequentemente se
enganam sobre onde se situam no espectro. As pessoas mais convencionais têm certeza
de que são independentes, enquanto as genuinamente independentes se preocupam em não
ser independentes o suficiente."

## Pensamento de Segunda Ordem
> Recortado de Farnam Street
"O pensamento de primeira ordem é simplista e superficial, e praticamente qualquer
um consegue fazê-lo. O pensamento de segunda ordem é a prática de rastrear a cadeia
de consequências que seguem de uma decisão. Muitos resultados extraordinários vêm
de decisões que são de primeira ordem negativas, mas de segunda ordem positivas."

## Inversão
> Recortado de Farnam Street
"A premissa central da inversão é que você não deve abordar problemas difíceis
apenas de uma direção. Em vez disso, examine-os para frente e para trás. Charlie
Munger: 'Tudo que quero saber é onde vou morrer, para que eu nunca vá lá.'"

## Sobre Previsão
> Recortado de Morgan Housel
"A maioria dos problemas é mais complicada do que parece, mas a maioria das soluções
deveria ser mais simples do que é. Leia menos previsões e mais história. Estude mais
fracassos e menos sucessos."

## O Que Quero Conectar
- Fatos vs crenças → mecanismo de vínculo social?
- Pensamento de segunda ordem + inversão → ambos recompensam profundidade em vez de amplitude
- O espectro de Graham → como sei onde realmente me encaixo?`,
      extractedItems: [
        { name: 'James Clear', type: 'entity', lineIdx: 0 },
        { name: 'Paul Graham', type: 'entity', lineIdx: 0 },
        { name: 'Charlie Munger', type: 'entity', lineIdx: 0 },
        { name: 'Pensamento de Segunda Ordem', type: 'concept', lineIdx: 0 },
        { name: 'Inversão', type: 'concept', lineIdx: 0 },
        { name: 'Independência de Pensamento', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'James Clear', path: 'wiki/entities/james-clear.md', tags: ['Author', 'Habits'], summary: 'Autor de "Hábitos Atômicos" e escritor sobre tomada de decisão, hábitos e comportamento humano. Seu trabalho explora por que as pessoas sustentam crenças falsas e como a identidade social molda o que achamos convincente.' },
        { title: 'Paul Graham', path: 'wiki/entities/paul-graham.md', tags: ['Founder', 'Essayist'], summary: 'Co-fundador da Y Combinator e ensaísta influente sobre startups, tecnologia e pensamento. Seu ensaio "How to Think for Yourself" disseca a independência de pensamento em três componentes: escrúpulo com a verdade, resistência à conformidade e curiosidade.' },
        { title: 'Pensamento de Segunda Ordem', path: 'wiki/concepts/second-order-thinking.md', tags: ['Mental Model', 'Decision-Making'], summary: 'A prática de rastrear cadeias de consequências além dos resultados imediatos. Muitos resultados extraordinários vêm de decisões que são de primeira ordem negativas, mas de segunda ordem positivas. A técnica-chave: perguntar repetidamente "E depois o quê?"' },
        { title: 'Inversão', path: 'wiki/concepts/inversion.md', tags: ['Mental Model', 'Decision-Making'], summary: 'Uma abordagem de resolução de problemas que examina problemas para frente e para trás. Em vez de perguntar como alcançar um resultado, pergunte como garantir o oposto — depois evite essas coisas. "Evitar a estupidez é mais fácil do que buscar a genialidade."' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 3 }, { from: 0, to: 1 },
        { from: 1, to: 4 }, { from: 0, to: 5 }, { from: 3, to: 4 },
      ],
      chatQuestion: 'Qual é o fio condutor entre o Pensamento de Segunda Ordem e a Inversão?',
      chatAnswerLead: { text: '[[Pensamento de Segunda Ordem]] e [[Inversão]] ambos recompensam profundidade em vez de amplitude e exigem resistência à intuição imediata do Sistema 1. O pensamento de segunda ordem rastreia consequências para frente; a inversão rastreia fracassos para trás. Ambos forçam você a olhar além do óbvio.' },
      chatAnswerDetail: 'Onde eles diferem: o pensamento de segunda ordem é aditivo (o que mais acontece?), enquanto a inversão é subtrativa (o que devo evitar?). Usados em conjunto, formam uma estrutura poderosa de decisão: use a inversão para eliminar opções ruins, depois use o pensamento de segunda ordem para avaliar as que restam.',
      chatSource: 'thinking-clippings.md',
    },

    {
      id: 'creation',
      label: 'Criação de Conteúdo',
      icon: 'mic',
      filename: 'podcast-episode-plan.md',
      sourceNoteContext: 'Um documento de planejamento de produção para um episódio de podcast — pesquisa sobre o convidado, perguntas estruturadas, arco narrativo. O tipo de documento que separa entrevistas bem preparadas de conversas prolixas.',
      sourceNote: `# The Knowledge Stack — Plano do Episódio 12

Convidado: Dr. Andy Matuschak (pesquisador independente, ex-Apple, ex-Khan Academy)
Tópico: "Ferramentas para o Pensamento e o Futuro da Leitura"

## Contexto do Convidado
- Liderou P&D na Khan Academy em algoritmos de aprendizagem por domínio
- Trabalhou na Apple em iniciativas educacionais para os primeiros iPads
- Hoje dirige um laboratório de pesquisa independente que estuda ferramentas para o
  pensamento
- Conhecido por: metodologia "evergreen notes", prática de pesquisa "trabalhando em
  público"
- Seu ensaio "Why books don't work" provocou grande debate na comunidade PKM

## Perguntas Centrais
1. Você escreveu que "livros não funcionam" — a maioria das pessoas esquece 90% do
   que lê. Como seria um meio "que funciona" para transferência de conhecimento?
2. Seu sistema de "evergreen notes" enfatiza atomicidade e sumarização progressiva.
   Como isso difere da tomada de notas tradicional?
3. Você tem sido vocal sobre o abismo entre pesquisa em ferramentas para o pensamento
   e adoção pelo público geral. Qual é o maior bloqueador?
4. Com LLMs agora capazes de responder perguntas sobre qualquer livro instantaneamente,
   qual é o papel da leitura humana em 2026?
5. Sua prática de pesquisa é radicalmente aberta — você publica pensamentos
   inacabados diariamente. Isso não gera ruído? Como você equilibra profundidade com
   velocidade?

## Referências-Chave a Mencionar
- Matuschak, A. (2019). "Why books don't work"
- Nielsen, M. (2018). "Augmenting human intellect"
- Engelbart, D. (1962). "Augmenting Human Intellect" — a mãe de todas as demos

## Questões em Aberto Pós-Entrevista
- Devo ler o ensaio completo de Andy sobre "Evergreen notes" antes de gravar?
- Preciso de um segundo convidado para contraponto?
- Logística de gravação: mensagem de voz assíncrona ou vídeo ao vivo?`,
      extractedItems: [
        { name: 'Andy Matuschak', type: 'entity', lineIdx: 0 },
        { name: 'Khan Academy', type: 'entity', lineIdx: 0 },
        { name: 'Douglas Engelbart', type: 'entity', lineIdx: 0 },
        { name: 'Evergreen Notes', type: 'concept', lineIdx: 0 },
        { name: 'Ferramentas para o Pensamento', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Andy Matuschak', path: 'wiki/entities/andy-matuschak.md', tags: ['Researcher', 'PKM'], summary: 'Pesquisador independente que estuda ferramentas para o pensamento. Anteriormente na Khan Academy e Apple. Conhecido pelo ensaio "Why books don\'t work" e pela metodologia "evergreen notes" para gestão atômica e interconectada do conhecimento.' },
        { title: 'Khan Academy', path: 'wiki/entities/khan-academy.md', tags: ['Education', 'Nonprofit'], summary: 'Plataforma de educação online fundada por Sal Khan. Conhecida pelos algoritmos de aprendizagem por domínio e pelo modelo de sala de aula invertida. Matuschak liderou P&D em sistemas adaptativos de aprendizagem durante seu período lá.' },
        { title: 'Evergreen Notes', path: 'wiki/concepts/evergreen-notes.md', tags: ['PKM', 'Methodology'], summary: 'Uma metodologia de tomada de notas que enfatiza atomicidade, orientação por conceitos e sumarização progressiva. As notas são escritas para serem permanentemente úteis e continuamente refinadas, em vez de capturar pensamentos transitórios.' },
        { title: 'Ferramentas para o Pensamento', path: 'wiki/concepts/tools-for-thought.md', tags: ['Technology', 'Cognition'], summary: 'Software e sistemas projetados para ampliar o pensamento, a memória e a criatividade humana. Originou-se com "Augmenting Human Intellect" de Engelbart, em 1962. Desafio-chave: reduzir o abismo entre protótipos de pesquisa e adoção pelo público geral.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 0, to: 4 }, { from: 2, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Qual é a diferença central entre evergreen notes e a tomada de notas tradicional?',
      chatAnswerLead: { text: '[[Evergreen notes]] são escritas para serem permanentemente úteis e continuamente refinadas, enquanto a tomada de notas tradicional captura pensamentos transitórios para recuperação de curto prazo. Evergreen notes enfatizam [[atomicidade]] (uma ideia por nota), [[orientação por conceitos]] (nomeadas pelo conceito, não pela fonte) e [[sumarização progressiva]] (destilação em múltiplas camadas).' },
      chatAnswerDetail: 'A mudança central é de "o que eu li?" para "no que eu acredito?". Notas tradicionais são bibliográficas; evergreen notes são epistêmicas. Isso as torna composíveis — você pode construir novas ideias vinculando notas atômicas sem reler as fontes originais.',
      chatSource: 'podcast-episode-plan.md',
    },

    {
      id: 'academic',
      label: 'Pesquisa Acadêmica',
      icon: 'microscope',
      filename: 'attention-is-all-you-need.md',
      sourceNoteContext: 'Notas de pesquisa sobre um artigo seminal de IA — o tipo de análise aprofundada que você faz quando precisa entender os fundamentos, não apenas os destaques. Vaswani et al., 2017.',
      sourceNote: `# Attention Is All You Need — Notas

O artigo que matou as RNNs e deu origem ao Transformer. Vaswani et al., 2017.

## A Ideia Central
Em vez de processar tokens sequencialmente (estilo RNN), processa tudo em paralelo
usando "atenção" — deixa cada token olhar para todos os outros tokens e decidir quais
importam. O insight-chave: o processamento sequencial era o gargalo, não uma
característica.

## Três Mecanismos de Atenção
- Self-Attention: cada palavra em uma frase atende a todas as outras palavras. Isso
captura dependências de longo alcance que as RNNs perdem após ~50 tokens.
- Multi-Head Attention: executa 8 operações de atenção em paralelo, cada uma aprendendo
diferentes tipos de relação (sintaxe, semântica, correferência). Concatena os
resultados. Cada cabeça se especializa em algo diferente.
- Scaled Dot-Product: a operação Q·K^T dividida por sqrt(d_k). Sem o fator de
escala, os gradientes explodem em dimensões altas.

## Positional Encoding
Como não há recorrência, o modelo não tem ideia da ordem das palavras. A solução:
adiciona ondas seno/cosseno de diferentes frequências aos embeddings de entrada.
Isso dá ao modelo informação posicional sem adicionar parâmetros.

## Por Que Isso Mudou Tudo
- O treinamento se tornou paralelizável (RNNs treinavam token a token, Transformers
treinam a sequência inteira de uma vez) → escala para conjuntos de dados maiores
- Dependências de longo alcance: RNNs tinham memória de ~50 tokens; Transformers não
têm limite fixo (limitados pela janela de contexto, que cresceu de 512 para 1M+ tokens)
- Este artigo levou diretamente a: BERT (2018), GPT (2018+), todos os LLMs modernos

## Questões em Aberto
- Atenção é realmente a forma final? State Space Models (Mamba, S4) desafiam
a complexidade quadrática da atenção
- Múltiplas cabeças realmente aprendem padrões distintos, ou são redundantes?`,
      extractedItems: [
        { name: 'Vaswani et al.', type: 'entity', lineIdx: 0 },
        { name: 'Google Brain', type: 'entity', lineIdx: 0 },
        { name: 'BERT', type: 'entity', lineIdx: 0 },
        { name: 'Self-Attention', type: 'concept', lineIdx: 0 },
        { name: 'Multi-Head Attention', type: 'concept', lineIdx: 0 },
        { name: 'Positional Encoding', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Vaswani et al.', path: 'wiki/entities/vaswani-et-al.md', tags: ['AI', 'Researchers'], summary: 'A equipe do Google Brain que publicou "Attention Is All You Need" (2017), introduzindo a arquitetura Transformer. Seu trabalho substituiu as RNNs, viabilizou o treinamento paralelo em escala e levou diretamente ao BERT, ao GPT e a todos os LLMs modernos.' },
        { title: 'BERT', path: 'wiki/entities/bert.md', tags: ['AI', 'NLP'], summary: 'Bidirectional Encoder Representations from Transformers, publicado pelo Google em 2018. Construído diretamente sobre a pilha de encoders do Transformer, BERT alcançou resultados estado-da-arte em 11 tarefas de PLN e demonstrou o poder do paradigma pré-treinamento + ajuste fino.' },
        { title: 'Self-Attention', path: 'wiki/concepts/self-attention.md', tags: ['AI', 'NLP'], summary: 'O mecanismo central do Transformer: cada token em uma sequência atende a todos os outros tokens simultaneamente, computando relações ponderadas. Possibilita o processamento paralelo e captura dependências de longo alcance além do limite de ~50 tokens das RNNs.' },
        { title: 'Multi-Head Attention', path: 'wiki/concepts/multi-head-attention.md', tags: ['AI', 'NLP'], summary: 'Executa múltiplas operações de atenção em paralelo (tipicamente 8 cabeças), cada uma aprendendo diferentes tipos de relação (sintaxe, semântica, correferência). Os resultados são concatenados e projetados, permitindo atenção conjunta em diferentes subespaços de representação.' },
        { title: 'Positional Encoding', path: 'wiki/concepts/positional-encoding.md', tags: ['AI', 'NLP'], summary: 'Como os Transformers processam todos os tokens em paralelo, eles não têm noção inerente da ordem das palavras. O positional encoding adiciona ondas seno/cosseno de frequências variadas aos embeddings de entrada, codificando a posição sem adicionar parâmetros treináveis.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 2, to: 4 },
        { from: 3, to: 4 }, { from: 1, to: 5 },
      ],
      chatQuestion: 'A atenção é a forma final, ou os State Space Models vão substituí-la?',
      chatAnswerLead: { text: '[[Atenção]] não é a forma final — [[State Space Models]] (Mamba, S4) já estão desafiando sua complexidade O(n²). SSMs alcançam [[escalonamento linear]] com o comprimento da sequência mantendo desempenho competitivo em tarefas de contexto longo.' },
      chatAnswerDetail: 'No entanto, a atenção tem uma enorme vantagem de ecossistema: todos os principais LLMs (GPT, Claude, Gemini) são construídos sobre ela, e o hardware de GPU é otimizado para multiplicação de matrizes. SSMs precisam provar não apenas eficiência teórica, mas superioridade prática em escala, antes de substituir a atenção por completo.',
      chatSource: 'attention-is-all-you-need.md',
    },

    {
      id: 'business',
      label: 'Negócios',
      icon: 'trending-up',
      filename: 'stripe-strategy.md',
      sourceNoteContext: 'Uma análise de estratégia competitiva — detalhando o modelo de negócios, alavancas de crescimento e posição de mercado. O tipo de nota de pesquisa que um PM, consultor ou fundador escreve antes de uma grande decisão estratégica.',
      sourceNote: `# A Evolução Estratégica da Stripe

## De Ferramenta de Desenvolvedor a Infraestrutura Econômica

A Stripe começou como "7 linhas de código para aceitar pagamentos". Mas esse
enquadramento obscurece a estratégia real: eles não venceram tornando os pagamentos
mais fáceis — venceram ao tornar o desenvolvedor o comprador.

## Movimentos Estratégicos-Chave
- **Distribuição API-first**: cada desenvolvedor que integra a Stripe se torna
  um defensor interno. Sem time de vendas necessário para o segmento SMB
- **Produto composto**: Pagamentos → Cobrança → Imposto → Tesouraria → Issuing. Cada
  produto aproveita dados do anterior. Os custos de troca crescem exponencialmente —
  dá para trocar um processador de pagamentos, mas não dá para trocar toda a sua
  stack financeira
- **Bypass das redes de cartões**: as integrações diretas da Stripe com Visa/Mastercard
  removem intermediários adquirentes. Estimativa de 15–25 bps de vantagem de margem
  sobre concorrentes que passam por adquirentes legados

## Modelo de Receita
- 2,9% + US$ 0,30 por transação (pagamentos principais)
- Cobrança/Imposto/Radar: 0,4–0,8% adicional por transação
- Participação crescente de receita de produtos não relacionados a pagamento (Link,
  Capital, Atlas)
- Estimativa de US$ 1T+ em volume total de pagamentos (2023), implicando ~US$ 14B+ de
  receita líquida

## Posição Competitiva
- vs Adyen: a Stripe ganha em experiência do desenvolvedor; a Adyen ganha em enterprise
- vs Square: Stripe é online-first; Square é POS-first. Estão convergindo
- Ameaça: builds internos de grandes comerciantes (Shopify, DoorDash)

## Questões em Aberto
- A Stripe consegue manter o crescimento sem expandir para crédito/crédito-adjacente?
- Expansão na China/SEA ainda é mínima — barreira regulatória ou escolha estratégica?`,
      extractedItems: [
        { name: 'Stripe', type: 'entity', lineIdx: 0 },
        { name: 'Visa', type: 'entity', lineIdx: 0 },
        { name: 'Mastercard', type: 'entity', lineIdx: 0 },
        { name: 'Distribuição API-First', type: 'concept', lineIdx: 0 },
        { name: 'Produto Composto', type: 'concept', lineIdx: 0 },
        { name: 'Economia das Redes de Cartões', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Stripe', path: 'wiki/entities/stripe.md', tags: ['Fintech', 'SaaS'], summary: 'Empresa de infraestrutura de pagamentos fundada em 2010. Estratégia central: distribuição API-first voltada para desenvolvedores como compradores, depois expandindo para produtos compostos (Cobrança, Imposto, Tesouraria, Issuing). Estimativa de US$ 1T+ em volume de pagamentos e US$ 14B+ de receita líquida.' },
        { title: 'Visa & Mastercard', path: 'wiki/entities/visa-mastercard.md', tags: ['Fintech', 'Networks'], summary: 'As redes de cartão globais dominantes que processam a maioria dos pagamentos de consumidores. Processadores de pagamento precisam interagir com sua infraestrutura — a integração direta contornando adquirentes pode gerar 15–25 bps de vantagem de margem.' },
        { title: 'Distribuição API-First', path: 'wiki/concepts/api-first-distribution.md', tags: ['Strategy', 'Go-to-Market'], summary: 'Uma estratégia de go-to-market em que o produto é distribuído por APIs voltadas para desenvolvedores. Cada integrador se torna um defensor interno, criando adoção bottom-up sem times de vendas tradicionais. A Stripe é o arquétipo.' },
        { title: 'Estratégia de Produto Composto', path: 'wiki/concepts/compound-product.md', tags: ['Strategy', 'Product'], summary: 'Construir produtos interconectados em que cada nova camada aproveita dados das anteriores. Os custos de troca crescem exponencialmente — substituir um produto é fácil, substituir a stack inteira é quase impossível.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 1, to: 4 }, { from: 3, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'A Stripe consegue manter o crescimento sem expandir para crédito?',
      chatAnswerLead: { text: '[[Stripe]] enfrenta um teto de crescimento clássico: as margens de processamento de pagamentos estão comprimindo (2,9% + US$ 0,30 já está sob pressão por builds internos de Shopify, DoorDash). A empresa precisa expandir para serviços adjacentes de maior margem (crédito, capital) ou aceitar taxas de crescimento menores.' },
      chatAnswerDetail: 'A estratégia de produto composto é a resposta da Stripe: cada camada se constrói sobre a anterior, tornando a stack inteira progressivamente mais difícil de substituir. Mas crédito é o serviço financeiro de maior margem — e o que a Stripe tem sido mais cautelosa em entrar.',
      chatSource: 'stripe-strategy.md',
    },
  ],
};
