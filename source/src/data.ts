/*
 * data.ts — conteúdo do site portfólio (PT-BR + EN)
 * Fonte: portfólio PDF, CV, LinkedIn e pesquisa pública (nov/2026).
 * Regra: nenhum número inventado. Onde o dado não existe, o campo fica vazio.
 */

export type Lang = 'pt' | 'en'
export type T = { pt: string; en: string }

export type Cat = 'feiras' | 'premiacoes' | 'internacional' | 'executivo' | 'digital' | 'cultura'

export const CATS: { id: Cat | 'todos'; label: T }[] = [
  { id: 'todos', label: { pt: 'Todos', en: 'All' } },
  { id: 'feiras', label: { pt: 'Feiras e congressos', en: 'Trade shows & congresses' } },
  { id: 'premiacoes', label: { pt: 'Premiações e galas', en: 'Awards & galas' } },
  { id: 'internacional', label: { pt: 'Programas internacionais', en: 'International programs' } },
  { id: 'executivo', label: { pt: 'Executivo e C-level', en: 'Executive & C-level' } },
  { id: 'digital', label: { pt: 'Digital e híbrido', en: 'Digital & hybrid' } },
  { id: 'cultura', label: { pt: 'Cultura e endomarketing', en: 'Culture & internal events' } },
]

export type Case = {
  id: string
  cats: Cat[]
  flagship?: boolean
  title: T
  kicker: T // formato do evento
  client: string
  place: T
  date: T
  pax: T // público
  role: T // papel da Débora
  summary: T
  bullets: { pt: string[]; en: string[] }
  images: string[]
  link?: { href: string; label: T }
  video?: { href: string; cover: string; platform: string }
  sortYear: number
}

const IMG = (n: string) => `img/${n}.jpg`

export const CASES: Case[] = [
  {
    id: 'rabobank-cop30',
    cats: ['executivo', 'internacional'],
    flagship: true,
    sortYear: 2025,
    title: { pt: 'Rabobank na COP30', en: 'Rabobank at COP30' },
    kicker: { pt: 'Side-event executivo', en: 'Executive side-event' },
    client: 'Rabobank · via MCI Brasil',
    place: { pt: 'EY House, Belém', en: 'EY House, Belém' },
    date: { pt: 'Novembro 2025', en: 'November 2025' },
    pax: { pt: '80 clientes do banco', en: '80 bank clients' },
    role: { pt: 'Gestão do encontro', en: 'Event management' },
    summary: {
      pt: 'Encontro estratégico durante a COP30 sobre resiliência da cadeia do agro e tecnologias de transição, com a liderança global do banco e os maiores players do agro nacional.',
      en: 'A strategic gathering during COP30 on agribusiness supply-chain resilience and transition technologies, with the bank’s global leadership and Brazil’s largest agribusiness players.',
    },
    bullets: {
      pt: [
        'Painéis de conteúdo sobre sustentabilidade e adaptação climática, com a presença do CEO global do Rabobank.',
        'Coquetel de relacionamento ao ar livre na sequência, com gastronomia servida à francesa.',
        'Operação em Belém durante a conferência, com toda a pressão logística da cidade-sede.',
      ],
      en: [
        'Content panels on sustainability and climate adaptation, attended by Rabobank’s global CEO.',
        'An outdoor networking reception followed, with French-style service.',
        'Delivered in Belém during the conference, under the host city’s full logistics pressure.',
      ],
    },
    images: [IMG('rabo-palco'), IMG('rabo-noite'), IMG('rabo-sala'), IMG('rabo-detalhe'), IMG('rabo-gastro')],
    video: { href: 'https://www.instagram.com/p/DRKBtQSkZ_U/', cover: IMG('rabo-noite'), platform: 'Instagram' },
  },
  {
    id: 'pl-connection',
    cats: ['feiras'],
    flagship: true,
    sortYear: 2024,
    title: { pt: 'PL Connection', en: 'PL Connection' },
    kicker: { pt: 'Feira e congresso de marcas próprias', en: 'Private label trade show & congress' },
    client: 'Amicci',
    place: { pt: 'Expo Center Norte, São Paulo', en: 'Expo Center Norte, São Paulo' },
    date: { pt: '2023 e 2024', en: '2023 and 2024' },
    pax: { pt: '4.000 visitantes · 100+ expositores', en: '4,000 visitors · 100+ exhibitors' },
    role: { pt: 'Concepção e gestão 360º', en: 'Concept and end-to-end management' },
    summary: {
      pt: 'Um evento criado do zero para o mercado de private label na América Latina. A estreia superou as metas e o evento segue no calendário do setor.',
      en: 'An event built from scratch for Latin America’s private label market. The first edition beat its targets, and the event remains on the industry calendar.',
    },
    bullets: {
      pt: [
        'Do conceito estratégico ao planejamento operacional e à gestão de stakeholders.',
        'Primeira edição com mais de 100 expositores e 4.000 visitantes qualificados.',
        'Em 2024, o evento integrou a Latam Retail Show, com Arena de conteúdo, Hub de Tendências e o Prêmio Excelência em Marca Própria.',
      ],
      en: [
        'From strategic concept to operational planning and stakeholder management.',
        'First edition with 100+ exhibitors and 4,000 qualified visitors.',
        'In 2024 it ran inside Latam Retail Show, with a content Arena, a Trends Hub and the Private Label Excellence Award.',
      ],
    },
    images: [IMG('plc-arena'), IMG('plc-publico'), IMG('plc-estande'), IMG('pemp-trofeus')],
    video: { href: 'https://www.youtube.com/watch?v=pbSo9V9UPwE', cover: IMG('plc-publico'), platform: 'YouTube' },
  },
  {
    id: 'premio-automacao',
    cats: ['premiacoes'],
    flagship: true,
    sortYear: 2018,
    title: { pt: 'Prêmio Automação', en: 'Automation Awards' },
    kicker: { pt: 'Premiação de gala', en: 'Gala awards night' },
    client: 'GS1 Brasil',
    place: { pt: 'Tom Brasil, São Paulo', en: 'Tom Brasil, São Paulo' },
    date: { pt: 'Novembro 2018', en: 'November 2018' },
    pax: { pt: '800 lideranças da indústria e do varejo', en: '800 industry and retail leaders' },
    role: { pt: 'Responsável geral pelo projeto', en: 'Overall project lead' },
    summary: {
      pt: 'A noite de premiação que reúne autoridades, indústria e varejo. O desafio era elevar o engajamento e a sofisticação da entrega. O case ganhou o Prêmio Caio 2019.',
      en: 'The awards night that brings together government, industry and retail. The brief was to raise engagement and polish. The case won a 2019 Prêmio Caio.',
    },
    bullets: {
      pt: [
        'Conceito “Você voando alto”, levado à cenografia, à abertura artística e à cerimônia.',
        'Jantar de gala para 800 convidados, com cenografia floral e iluminação de palco.',
        'Prêmio Caio 2019, medalha de prata na categoria Evento Corporativo.',
      ],
      en: [
        'The “You, flying high” concept carried through set design, the artistic opening and the ceremony.',
        'Gala dinner for 800 guests, with floral set design and stage lighting.',
        '2019 Prêmio Caio, silver medal in the Corporate Event category.',
      ],
    },
    images: [IMG('pa-salao'), IMG('pa-anjo'), IMG('pa-flores'), IMG('pa-palco'), IMG('pa-tunel'), IMG('pa-mesas')],
  },
  {
    id: 'plma',
    cats: ['internacional', 'executivo'],
    sortYear: 2024,
    title: { pt: 'PLMA Connection', en: 'PLMA Connection' },
    kicker: { pt: 'Imersão no varejo europeu', en: 'European retail immersion' },
    client: 'Amicci',
    place: { pt: 'Amsterdã e Madri', en: 'Amsterdam and Madrid' },
    date: { pt: 'Maio 2024', en: 'May 2024' },
    pax: { pt: '25 lideranças de private label', en: '25 private label leaders' },
    role: { pt: 'Idealização e execução', en: 'Concept and delivery' },
    summary: {
      pt: 'Programa que levou executivos brasileiros à PLMA Amsterdã, a maior feira de marcas próprias do mundo.',
      en: 'A program that took Brazilian executives to PLMA Amsterdam, the world’s largest private label show.',
    },
    bullets: {
      pt: ['Curadoria de visitas técnicas aos principais varejistas europeus.', 'Jantares de negócios e roteiros de relacionamento em Amsterdã e Madri.'],
      en: ['Curated store tours of Europe’s leading retailers.', 'Business dinners and networking itineraries in Amsterdam and Madrid.'],
    },
    images: [IMG('plma-feira'), IMG('plma-grupo')],
    link: { href: 'https://amicci.com.br/home/plma-connection/', label: { pt: 'Página do programa', en: 'Program page' } },
  },
  {
    id: 'nrf',
    cats: ['internacional', 'executivo'],
    sortYear: 2024,
    title: { pt: 'NRF Retail’s Big Show', en: 'NRF Retail’s Big Show' },
    kicker: { pt: 'Missão internacional', en: 'International mission' },
    client: 'Grupo Padrão (2015) · Amicci (2024)',
    place: { pt: 'Javits Center, Nova York', en: 'Javits Center, New York' },
    date: { pt: 'Janeiro 2015 e janeiro 2024', en: 'January 2015 and January 2024' },
    pax: { pt: '2015: 100 diretores e CEOs', en: '2015: 100 directors and CEOs' },
    role: { pt: '2015: gestão da delegação brasileira', en: '2015: Brazilian delegation management' },
    summary: {
      pt: 'Duas edições da maior feira de varejo do mundo, com nove anos de intervalo. Em 2015, a gestão da delegação brasileira do Grupo Padrão. Em 2024, com a Amicci.',
      en: 'Two editions of the world’s largest retail show, nine years apart. In 2015, managing Grupo Padrão’s Brazilian delegation. In 2024, with Amicci.',
    },
    bullets: {
      pt: ['Visitas técnicas guiadas a operações de referência em Nova York.', 'Jantares exclusivos e evento de encerramento para a comitiva.'],
      en: ['Guided visits to benchmark retail operations in New York.', 'Private dinners and a closing event for the group.'],
    },
    images: [IMG('nrf24-salao'), IMG('nrf24-javits'), IMG('nrf24-delegacao'), IMG('nrf24-debora'), IMG('nrf-jantar')],
  },
  {
    id: 'barcelona',
    cats: ['internacional', 'executivo'],
    sortYear: 2015,
    title: { pt: 'Semana de relacionamento em Barcelona', en: 'Relationship week in Barcelona' },
    kicker: { pt: 'Imersão C-level', en: 'C-level immersion' },
    client: 'Grupo Padrão',
    place: { pt: 'Hotel Arts, Barcelona', en: 'Hotel Arts, Barcelona' },
    date: { pt: 'Outubro 2015', en: 'October 2015' },
    pax: { pt: '150 diretores e CEOs de telecom', en: '150 telecom directors and CEOs' },
    role: { pt: 'Planejamento e execução', en: 'Planning and delivery' },
    summary: {
      pt: 'Uma semana de imersão para convidados C-level, equilibrando conteúdo técnico e relacionamento.',
      en: 'A week-long immersion for C-level guests, balancing technical content and relationship-building.',
    },
    bullets: {
      pt: ['Agenda com conteúdo e networking ao longo de toda a semana.', 'Ativações customizadas para dar visibilidade aos patrocinadores.'],
      en: ['An agenda mixing content and networking all week.', 'Custom activations giving sponsors visibility throughout.'],
    },
    images: [IMG('bcn-plenaria'), IMG('bcn-hotel')],
  },
  {
    id: 'brasil-em-codigo',
    cats: ['feiras'],
    sortYear: 2022,
    title: { pt: 'Brasil em Código', en: 'Brasil em Código' },
    kicker: { pt: 'Festival de inovação', en: 'Innovation festival' },
    client: 'GS1 Brasil',
    place: { pt: 'Arca (2022) · Hotel Unique (2019), São Paulo', en: 'Arca (2022) · Hotel Unique (2019), São Paulo' },
    date: { pt: '2019 e 2022', en: '2019 and 2022' },
    pax: { pt: '1.200 (2022) · 400 lideranças (2019)', en: '1,200 (2022) · 400 leaders (2019)' },
    role: { pt: 'Gestão do evento', en: 'Event management' },
    summary: {
      pt: 'O encontro da GS1 Brasil sobre tecnologia, varejo e indústria. Em 2022, marcou a volta ao presencial num galpão industrial transformado.',
      en: 'GS1 Brasil’s gathering on technology, retail and industry. In 2022 it marked the return to in-person, in a converted industrial warehouse.',
    },
    bullets: {
      pt: ['2019: “It’s a match”, para lideranças da indústria, do varejo, do e-commerce e de tecnologia.', '2022: conceito “Conexões e experiências que renovam o mundo”, com palcos, feira e networking.'],
      en: ['2019: “It’s a match”, for industry, retail, e-commerce and tech leaders.', '2022: “Connections and experiences that renew the world”, with stages, an expo and networking.'],
    },
    images: [IMG('bec22-plateia'), IMG('bec19-palco'), IMG('bec22-galpao'), IMG('bec19-expo')],
  },
  {
    id: 'apas-2024',
    cats: ['feiras', 'executivo'],
    sortYear: 2024,
    title: { pt: 'Fórum de Marcas Próprias na APAS Show', en: 'Private Label Forum at APAS Show' },
    kicker: { pt: 'Trilha de conteúdo em feira', en: 'Trade show content track' },
    client: 'Amicci',
    place: { pt: 'Expo Center Norte, São Paulo', en: 'Expo Center Norte, São Paulo' },
    date: { pt: 'Maio 2024', en: 'May 2024' },
    pax: { pt: '1.000 supermercadistas', en: '1,000 supermarket operators' },
    role: { pt: 'Curadoria e gestão', en: 'Curation and management' },
    summary: {
      pt: 'Uma trilha de painéis com executivos C-level das maiores redes do país, posicionando a Amicci como referência em marcas próprias.',
      en: 'A panel track with C-level executives from Brazil’s largest chains, positioning Amicci as the private label authority.',
    },
    bullets: {
      pt: ['Temas de Marcas Próprias 4.0 à integração de redes de negócios.'],
      en: ['Topics from Private Label 4.0 to retail network integration.'],
    },
    images: [IMG('apas24-palco'), IMG('apas24-painel')],
  },
  {
    id: 'board-summit',
    cats: ['executivo'],
    sortYear: 2022,
    title: { pt: 'Board Summit, 1ª edição', en: 'Board Summit, first edition' },
    kicker: { pt: 'Summit para conselheiros', en: 'Summit for board members' },
    client: 'Board Academy',
    place: { pt: 'Hotel Pullman Ibirapuera, São Paulo', en: 'Hotel Pullman Ibirapuera, São Paulo' },
    date: { pt: 'Outubro 2022', en: 'October 2022' },
    pax: { pt: '200 conselheiros e lideranças', en: '200 board members and leaders' },
    role: { pt: 'Concepção e execução', en: 'Concept and delivery' },
    summary: {
      pt: 'O evento de estreia de uma edtech de formação de conselheiros, com um dia completo de conteúdo e hospitalidade.',
      en: 'The debut event of an edtech that trains board members, with a full day of content and hospitality.',
    },
    bullets: {
      pt: ['Trilhas de palestras e painéis, almoço e lounges de networking.', 'Área de exposição para parceiros, pensada para gerar novos alunos.'],
      en: ['Talk and panel tracks, lunch and networking lounges.', 'A partner expo area designed to bring in new students.'],
    },
    images: [IMG('board-palco'), IMG('board-salao')],
  },
  {
    id: 'apas-2019',
    cats: ['feiras'],
    sortYear: 2019,
    title: { pt: 'Hub tecnológico na APAS Show', en: 'Technology hub at APAS Show' },
    kicker: { pt: 'Estande imersivo', en: 'Immersive booth' },
    client: 'GS1 Brasil',
    place: { pt: 'Expo Center Norte, São Paulo', en: 'Expo Center Norte, São Paulo' },
    date: { pt: 'Maio 2019', en: 'May 2019' },
    pax: { pt: '3.000 visitantes no estande', en: '3,000 booth visitors' },
    role: { pt: 'Idealização e gestão', en: 'Concept and management' },
    summary: {
      pt: 'Um estande compartilhado com 7 parceiros de automação, onde o varejista testava tecnologias de gestão na prática.',
      en: 'A booth shared with 7 automation partners, where retailers tried management technology hands-on.',
    },
    bullets: { pt: ['Conceito “Hackeando o supermercado”.'], en: ['“Hacking the supermarket” concept.'] },
    images: [IMG('apas19-estande'), IMG('apas19-led')],
  },
  {
    id: 'abras',
    cats: ['feiras', 'executivo'],
    sortYear: 2019,
    title: { pt: '53ª Convenção ABRAS', en: '53rd ABRAS Convention' },
    kicker: { pt: 'Patrocínio máster', en: 'Lead sponsorship' },
    client: 'ABRAS · GS1 Brasil',
    place: { pt: 'Riocentro, Rio de Janeiro', en: 'Riocentro, Rio de Janeiro' },
    date: { pt: 'Março 2019', en: 'March 2019' },
    pax: { pt: '1.000 supermercadistas', en: '1,000 supermarket operators' },
    role: { pt: 'Gestão de presença e branding', en: 'Presence and branding management' },
    summary: {
      pt: 'A participação da GS1 Brasil como patrocinadora máster na convenção do setor supermercadista.',
      en: 'GS1 Brasil’s lead sponsorship at the supermarket industry convention.',
    },
    bullets: {
      pt: ['Agenda de networking da diretoria executiva.', 'Palestra técnica e ativação sobre qualidade de dados.'],
      en: ['Networking agenda for the executive board.', 'A technical talk and a data-quality activation.'],
    },
    images: [IMG('abras-plenaria')],
  },
  {
    id: 'feira-empreendedor',
    cats: ['feiras'],
    sortYear: 2019,
    title: { pt: 'Feira do Empreendedor', en: 'Entrepreneur Fair' },
    kicker: { pt: 'Live marketing e geração de leads', en: 'Live marketing and lead generation' },
    client: 'GS1 Brasil',
    place: { pt: 'Pavilhão Anhembi, São Paulo', en: 'Anhembi Pavilion, São Paulo' },
    date: { pt: 'Outubro 2019', en: 'October 2019' },
    pax: { pt: '3 mil pessoas no estande', en: '3,000 people through the booth' },
    role: { pt: 'Conceito e gestão do estande', en: 'Booth concept and management' },
    summary: {
      pt: 'Um circuito interativo que simulava uma compra real para mostrar o valor do código de barras ao pequeno empreendedor.',
      en: 'An interactive circuit simulating a real purchase to show small business owners the value of the barcode.',
    },
    bullets: { pt: ['Automação, estoque e checkout demonstrados na prática.'], en: ['Automation, stock control and checkout shown hands-on.'] },
    images: [IMG('feira-estande')],
  },
  {
    id: 'fabrica-negocios',
    cats: ['digital'],
    sortYear: 2021,
    title: { pt: 'Fábrica de Negócios', en: 'Fábrica de Negócios' },
    kicker: { pt: 'Evento online em estúdio', en: 'Studio-produced online event' },
    client: 'GS1 Brasil',
    place: { pt: 'Casa Petra, São Paulo (estúdio)', en: 'Casa Petra, São Paulo (studio)' },
    date: { pt: 'Novembro 2021', en: 'November 2021' },
    pax: { pt: '3.000 empreendedores', en: '3,000 entrepreneurs' },
    role: { pt: 'Concepção e execução', en: 'Concept and delivery' },
    summary: {
      pt: 'Evento online para empreendedores, com trilhas de conteúdo e cotas de patrocínio para o ambiente digital.',
      en: 'An online event for entrepreneurs, with content tracks and sponsorship packages built for digital.',
    },
    bullets: {
      pt: ['Captação de patrocinadores com o time comercial.', 'Supervisão técnica e criativa da transmissão em estúdio.'],
      en: ['Sponsor sales together with the commercial team.', 'Technical and creative supervision of the studio broadcast.'],
    },
    images: [IMG('fabrica-estudio')],
  },
  {
    id: 'gs1-digital',
    cats: ['digital'],
    sortYear: 2021,
    title: { pt: 'GS1 Talks e Conexão Tech', en: 'GS1 Talks and Conexão Tech' },
    kicker: { pt: 'Série de eventos online', en: 'Online event series' },
    client: 'GS1 Brasil',
    place: { pt: 'Estúdio GS1 Brasil', en: 'GS1 Brasil studio' },
    date: { pt: '2021', en: '2021' },
    pax: { pt: 'Até 5.000 participantes online', en: 'Up to 5,000 online attendees' },
    role: { pt: 'Gestão integral', en: 'End-to-end management' },
    summary: {
      pt: 'Um ciclo de 6 webinars e um talk de sustentabilidade durante a pandemia, com estúdio próprio de captação e transmissão.',
      en: 'A cycle of 6 webinars and a sustainability talk during the pandemic, with a dedicated recording and streaming studio.',
    },
    bullets: {
      pt: ['Curadoria de temas para manter a audiência recorrente.', 'Patrocínio por episódio.'],
      en: ['Topic curation to keep a returning audience.', 'Per-episode sponsorship.'],
    },
    images: [IMG('talks-estudio')],
  },
  {
    id: 'consumidor-moderno',
    cats: ['executivo', 'premiacoes'],
    sortYear: 2015,
    title: { pt: '20 anos da Consumidor Moderno', en: 'Consumidor Moderno at 20' },
    kicker: { pt: 'Evento de relacionamento', en: 'Relationship event' },
    client: 'Grupo Padrão',
    place: { pt: 'Casa Fasano, São Paulo', en: 'Casa Fasano, São Paulo' },
    date: { pt: 'Março 2015', en: 'March 2015' },
    pax: { pt: 'Convidados VIP e patrocinadores', en: 'VIP guests and sponsors' },
    role: { pt: 'Produção 360º', en: 'End-to-end production' },
    summary: {
      pt: 'A celebração dos 20 anos da revista, para convidados VIP e patrocinadores.',
      en: 'The magazine’s 20th anniversary celebration, for VIP guests and sponsors.',
    },
    bullets: {
      pt: ['Estações de chefs renomados.', 'Coordenação de talentos, show e flashmob.'],
      en: ['Stations by renowned chefs.', 'Talent, show and flashmob coordination.'],
    },
    images: [IMG('cm20-salao'), IMG('cm20-festa')],
  },
  {
    id: 'cultura-gs1',
    cats: ['cultura'],
    sortYear: 2017,
    title: { pt: 'Cultura e endomarketing GS1', en: 'GS1 culture and internal events' },
    kicker: { pt: 'Calendário interno', en: 'Internal calendar' },
    client: 'GS1 Brasil',
    place: { pt: 'São Paulo', en: 'São Paulo' },
    date: { pt: '2017 a 2021', en: '2017 to 2021' },
    pax: { pt: '60 a 150 pessoas por evento', en: '60 to 150 people per event' },
    role: { pt: 'Concepção e gestão', en: 'Concept and management' },
    summary: {
      pt: 'Os eventos que constroem cultura: confraternização anual, jantar temático para a diretoria, workshop para colaboradoras e family day.',
      en: 'The events that build culture: the year-end party, a themed board dinner, a workshop for women employees and a family day.',
    },
    bullets: {
      pt: [
        'Halloween Gala com banda ao vivo e a escola de samba Rosas de Ouro.',
        'Noite Toscana para 60 convidados da diretoria, com degustação de azeites e música italiana ao vivo.',
        'Brunch de educação financeira para colaboradoras e family day com cenografia lúdica.',
      ],
      en: [
        'A Halloween gala with a live band and the Rosas de Ouro samba school.',
        'A Tuscan night for 60 board guests, with olive oil tasting and live Italian music.',
        'A financial-literacy brunch for women employees and a family day with playful set design.',
      ],
    },
    images: [IMG('toscana-cena'), IMG('halloween'), IMG('toscana-prato')],
  },
]

export const TIMELINE: { years: string; org: string; scope: T; highlights: T }[] = [
  { years: '2026', org: 'Grupo MM Eventos', scope: { pt: 'Eventos de incentivo', en: 'Incentive events' }, highlights: { pt: 'Incentivo no setor farmacêutico, da concepção ao pós-evento, com gestão financeira e de fornecedores.', en: 'Pharma incentive programs from concept to post-event, including budget and supplier management.' } },
  { years: '2025', org: 'MCI Brasil', scope: { pt: 'Project manager · incentivo e hospitalidade internacional', en: 'Project manager · incentives and international hospitality' }, highlights: { pt: 'Rabobank na COP30 e hospitalidade internacional da APAS Show.', en: 'Rabobank at COP30 and international hospitality at APAS Show.' } },
  { years: '2023–2024', org: 'Amicci', scope: { pt: 'Head de Eventos', en: 'Head of Events' }, highlights: { pt: 'Criou a área de eventos e a PL Connection. Imersões na Europa, fórum na APAS e premiação de marcas próprias.', en: 'Built the events function and created PL Connection. European immersions, an APAS forum and a private label award.' } },
  { years: '2022', org: 'OneTrust · RD Station · Board Academy', scope: { pt: 'Eventos de marketing e parcerias', en: 'Marketing events and partnerships' }, highlights: { pt: 'Eventos próprios e patrocinados de uma multinacional de tecnologia, parcerias do RD Summit e a estreia do Board Summit.', en: 'Owned and sponsored events for a global tech company, RD Summit partnerships and the Board Summit debut.' } },
  { years: '2017–2021', org: 'GS1 Brasil', scope: { pt: 'Coordenação de eventos', en: 'Events coordination' }, highlights: { pt: 'Prêmio Automação, Brasil em Código, feiras e a virada para o digital na pandemia.', en: 'Automation Awards, Brasil em Código, trade shows and the shift to digital in the pandemic.' } },
  { years: '2014–2016', org: 'Grupo Padrão', scope: { pt: 'Gerente de eventos', en: 'Events manager' }, highlights: { pt: 'Conarec, Brazilian Retail Week, Prêmio Consumidor Moderno e a missão à NRF em Nova York.', en: 'Conarec, Brazilian Retail Week, the Consumidor Moderno Awards and the NRF mission to New York.' } },
  { years: '2011–2014', org: 'Gouvêa Ecosystem · TV1', scope: { pt: 'Coordenação de eventos', en: 'Events coordination' }, highlights: { pt: 'Fórum de Varejo da América Latina, NRA Show em Chicago e SAP Fórum.', en: 'Latin America Retail Forum, NRA Show in Chicago and SAP Forum.' } },
  { years: '2004–2011', org: 'Hilton · The Nation Traffic', scope: { pt: 'Hotelaria e marketing', en: 'Hospitality and marketing' }, highlights: { pt: 'Hilton em Londres, Roma e São Paulo. Marketing em Tel Aviv.', en: 'Hilton in London, Rome and São Paulo. Marketing in Tel Aviv.' } },
]

export const SERVICES: { title: T; body: T }[] = [
  { title: { pt: 'Concepção e estratégia', en: 'Concept and strategy' }, body: { pt: 'Formato, conceito e objetivos de negócio definidos antes da primeira cotação. O evento começa pelo que precisa gerar.', en: 'Format, concept and business goals set before the first quote. The event starts from what it has to deliver.' } },
  { title: { pt: 'Produção 360º', en: 'End-to-end production' }, body: { pt: 'Fornecedores, orçamento, cronograma e operação no dia, com um único ponto de contato.', en: 'Suppliers, budget, timeline and on-the-day operations, with one point of contact.' } },
  { title: { pt: 'Curadoria de conteúdo', en: 'Content curation' }, body: { pt: 'Trilhas, painéis e palestrantes escolhidos para o público que está na sala.', en: 'Tracks, panels and speakers chosen for the audience in the room.' } },
  { title: { pt: 'Programas internacionais', en: 'International programs' }, body: { pt: 'Delegações e imersões em feiras e varejistas no exterior, com visitas técnicas e jantares de negócio.', en: 'Delegations and immersions at trade shows and retailers abroad, with store tours and business dinners.' } },
  { title: { pt: 'Incentivo e hospitalidade', en: 'Incentives and hospitality' }, body: { pt: 'Viagens e experiências de incentivo, recepção de convidados internacionais e eventos de relacionamento.', en: 'Incentive trips and experiences, international guest hospitality and relationship events.' } },
  { title: { pt: 'Patrocínios e ROI', en: 'Sponsorship and ROI' }, body: { pt: 'Cotas, ativações de marca e análise de retorno para quem investe no evento.', en: 'Packages, brand activations and return analysis for those who invest in the event.' } },
]

export const PROCESS: { title: T; body: T }[] = [
  { title: { pt: 'Briefing', en: 'Briefing' }, body: { pt: 'Objetivo de negócio, público, orçamento e restrições.', en: 'Business goal, audience, budget and constraints.' } },
  { title: { pt: 'Conceito', en: 'Concept' }, body: { pt: 'Formato, narrativa, local e proposta criativa.', en: 'Format, narrative, venue and creative proposal.' } },
  { title: { pt: 'Produção', en: 'Production' }, body: { pt: 'Fornecedores, cronograma, conteúdo e convidados.', en: 'Suppliers, timeline, content and guests.' } },
  { title: { pt: 'Execução', en: 'Delivery' }, body: { pt: 'Operação no dia, do credenciamento ao encerramento.', en: 'On-the-day operations, from check-in to close.' } },
  { title: { pt: 'Pós-evento', en: 'Post-event' }, body: { pt: 'Fechamento financeiro, resultados e aprendizados.', en: 'Financial close, results and lessons learned.' } },
]

// Depoimentos públicos do LinkedIn. Nomes entram após autorização de cada autor.
export const TESTIMONIALS: { quote: T; who: T }[] = [
  {
    quote: {
      pt: 'Tive o prazer de trabalhar com Débora em pelo menos três grandes eventos e, em todos, sem exceção, a experiência foi 120% positiva. Inteligente, assertiva, atenciosa, minuciosa e sempre simpática, fez de grandes desafios momentos singulares para quem estava envolvido.',
      en: 'I had the pleasure of working with Débora on at least three major events, and every single time the experience was 120% positive. Smart, assertive, attentive, meticulous and always friendly, she turned big challenges into unique moments for everyone involved.',
    },
    who: { pt: 'Cliente · estrategista de comunicação e palestrante, LinkedIn Top Voice', en: 'Client · communication strategist and speaker, LinkedIn Top Voice' },
  },
  {
    quote: {
      pt: 'Uma profissional experiente na coordenação e organização de eventos, corporativos ou não, e que sabe conduzir as atividades sob sua responsabilidade de forma impecável e com maestria, até que se chegue ao objetivo almejado.',
      en: 'An experienced professional in coordinating and organizing events, corporate or otherwise, who runs everything under her responsibility flawlessly and masterfully until the goal is reached.',
    },
    who: { pt: 'Colega de equipe · field & partner marketing', en: 'Teammate · field & partner marketing' },
  },
  {
    quote: {
      pt: 'Ela pensava e executava de forma impecável. Seus trabalhos sempre foram únicos e inimagináveis, aos olhos dos outros.',
      en: 'She thought and executed flawlessly. Her work was always unique and unimaginable to everyone else.',
    },
    who: { pt: 'Colega de equipe · endomarketing e eventos corporativos', en: 'Teammate · internal communications and corporate events' },
  },
]
