/*
 * App.tsx — site portfólio de Débora Hanna Storch (eventos corporativos)
 * README rápido:
 * - Dois caminhos: empregador (trajetória, escala) e cliente freelance (serviços, contato).
 * - Conteúdo em src/data.ts (PT/EN). Fotos em img/ publicadas ao lado da página.
 * - Vídeos abrem na plataforma de origem (o artefato não permite players embutidos).
 * - Idioma salvo no navegador com try/catch: a página funciona sem storage.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CASES, CATS, PROCESS, SERVICES, TESTIMONIALS, TIMELINE, type Case, type Cat, type Lang, type T } from './data'

const UI = {
  nav: { cases: { pt: 'Cases', en: 'Work' }, services: { pt: 'Serviços', en: 'Services' }, career: { pt: 'Trajetória', en: 'Career' }, contact: { pt: 'Contato', en: 'Contact' } },
  eyebrow: { pt: 'Eventos corporativos, de incentivo e internacionais', en: 'Corporate, incentive and international events' },
  lede: {
    pt: 'Há mais de 15 anos eu crio e conduzo eventos para lideranças: feiras, premiações, summits, imersões no exterior e encontros C-level. Do conceito ao último convidado na porta.',
    en: 'For over 15 years I have created and run events for business leaders: trade shows, awards nights, summits, international immersions and C-level gatherings. From concept to the last guest out the door.',
  },
  ctaHire: { pt: 'Contratar para um projeto', en: 'Hire me for a project' },
  ctaCareer: { pt: 'Ver trajetória', en: 'See my career' },
  stats: [
    { n: '15+', l: { pt: 'anos em eventos', en: 'years in events' } },
    { n: '+100', l: { pt: 'eventos realizados', en: 'events delivered' } },
    { n: '7', l: { pt: 'países com eventos realizados', en: 'countries with events delivered' } },
  ],
  clientsLabel: { pt: 'Clientes e empresas', en: 'Clients and companies' },
  stageEyebrow: { pt: 'Cases em destaque', en: 'Featured work' },
  stageTitle: { pt: 'Três eventos, três escalas', en: 'Three events, three scales' },
  f: { client: { pt: 'Cliente', en: 'Client' }, place: { pt: 'Local', en: 'Venue' }, date: { pt: 'Data', en: 'Date' }, pax: { pt: 'Público', en: 'Audience' }, role: { pt: 'Meu papel', en: 'My role' } },
  more: { pt: 'Ver o case completo', en: 'See the full case' },
  watch: { pt: 'Assistir aos melhores momentos', en: 'Watch the highlights' },
  video: { pt: 'Vídeo', en: 'Video' },
  indexEyebrow: { pt: 'Todos os cases', en: 'All work' },
  indexTitle: { pt: 'Por formato de evento', en: 'By event format' },
  count: { pt: 'cases', en: 'cases' },
  servicesEyebrow: { pt: 'Para clientes', en: 'For clients' },
  servicesTitle: { pt: 'O que eu faço no seu evento', en: 'What I do for your event' },
  processTitle: { pt: 'Como o trabalho anda', en: 'How the work runs' },
  careerEyebrow: { pt: 'Para empregadores', en: 'For employers' },
  careerTitle: { pt: 'Trajetória', en: 'Career' },
  edu: { pt: 'Formação', en: 'Education' },
  langs: { pt: 'Idiomas', en: 'Languages' },
  awardEyebrow: { pt: 'Reconhecimento', en: 'Recognition' },
  awardTitle: { pt: 'Prêmio Caio 2019', en: '2019 Prêmio Caio' },
  awardBody: {
    pt: 'Medalha de prata na categoria Evento Corporativo, pelo Prêmio Automação 2018 da GS1 Brasil. O Prêmio Caio é a principal premiação do setor de eventos no Brasil.',
    en: 'Silver medal in the Corporate Event category, for GS1 Brasil’s 2018 Automation Awards. Prêmio Caio is Brazil’s leading events industry award.',
  },
  council: { pt: 'Membro do CEO Council (Chief Events Officer), rede de gestores de eventos do Brasil.', en: 'Member of CEO Council (Chief Events Officer), a network of Brazil’s event leaders.' },
  quotesEyebrow: { pt: 'Quem trabalhou comigo', en: 'People I have worked with' },
  contactEyebrow: { pt: 'Contato', en: 'Contact' },
  contactTitle: { pt: 'Vamos falar do seu próximo evento', en: 'Let’s talk about your next event' },
  contactBody: { pt: 'Conte o que você precisa: tipo de evento, data e público. Eu respondo no e-mail que você deixar.', en: 'Tell me what you need: event type, date and audience. I will reply at the email you leave.' },
  form: {
    name: { pt: 'Seu nome', en: 'Your name' },
    company: { pt: 'Empresa', en: 'Company' },
    email: { pt: 'Seu e-mail', en: 'Your email' },
    msg: { pt: 'Mensagem', en: 'Message' },
    msgPh: { pt: 'Tipo de evento, data, público estimado…', en: 'Event type, date, expected audience…' },
    send: { pt: 'Enviar mensagem', en: 'Send message' },
    done: { pt: 'Se o seu programa de e-mail não abriu, use o botão abaixo ou copie o texto.', en: 'If your email app did not open, use the button below or copy the text.' },
    open: { pt: 'Abrir no meu e-mail', en: 'Open in my email' },
    copy: { pt: 'Copiar texto', en: 'Copy text' },
    copied: { pt: 'Copiado', en: 'Copied' },
    need: { pt: 'Preencha nome e mensagem.', en: 'Fill in your name and message.' },
  },
  linkedin: { pt: 'Abrir LinkedIn', en: 'Open LinkedIn' },
  close: { pt: 'Fechar', en: 'Close' },
}

const CLIENTS = ['Rabobank', 'Amicci', 'GS1 Brasil', 'APAS', 'Kenvue', 'Gilead', 'Theramax', 'Schneider Electric', 'SAP', 'Betano', 'Grupo Padrão', 'Gouvêa Ecosystem', 'MCI Brasil', 'Board Academy', 'OneTrust', 'RD Station', 'ABRAS']
const STRIP = ['pa-salao', 'rabo-noite', 'plc-arena', 'nrf24-salao', 'bec19-palco', 'toscana-cena', 'board-salao', 'nrf24-javits', 'pa-anjo', 'cm20-festa']
const LINKEDIN = 'https://www.linkedin.com/in/deborahannastorch/'

function readLang(): Lang {
  try {
    const v = localStorage.getItem('dhs-lang')
    if (v === 'pt' || v === 'en') return v
  } catch { /* storage indisponível */ }
  return 'pt'
}

export default function App() {
  const [lang, setLang] = useState<Lang>(readLang)
  const [filter, setFilter] = useState<Cat | 'todos'>('todos')
  const [open, setOpen] = useState<Case | null>(null)
  const t = (x: T) => x[lang]
  const closeCase = useCallback(() => setOpen(null), [])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    try { localStorage.setItem('dhs-lang', lang) } catch { /* ignora */ }
  }, [lang])

  const flagships = CASES.filter((c) => c.flagship)
  const list = useMemo(
    () => CASES.filter((c) => filter === 'todos' || c.cats.includes(filter))
      .sort((a, b) => Number(!!b.flagship) - Number(!!a.flagship) || b.sortYear - a.sortYear),
    [filter],
  )

  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-in">
          <a href="#inicio" className="mark">Débora Hanna Storch</a>
          <nav aria-label="Principal" className="nav">
            <a href="#cases">{t(UI.nav.cases)}</a>
            <a href="#servicos">{t(UI.nav.services)}</a>
            <a href="#trajetoria">{t(UI.nav.career)}</a>
            <a href="#contato">{t(UI.nav.contact)}</a>
          </nav>
          <div className="lang" role="group" aria-label="Idioma / Language">
            <button type="button" aria-pressed={lang === 'pt'} onClick={() => setLang('pt')}>PT</button>
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO: texto à esquerda, retrato sangrando até a borda direita */}
        <section id="inicio" className="hero">
          <div className="hero-text">
            <p className="eyebrow">{t(UI.eyebrow)}</p>
            <h1 className="name">Débora <em>Hanna</em> Storch</h1>
            <p className="lede">{t(UI.lede)}</p>
            <div className="ctas">
              <a className="btn btn-solid" href="#contato">{t(UI.ctaHire)}</a>
              <a className="btn btn-line" href="#trajetoria">{t(UI.ctaCareer)}</a>
            </div>
            <dl className="stats">
              {UI.stats.map((s) => (
                <div key={s.n} className="stat">
                  <dt className="stat-n">{s.n}</dt>
                  <dd className="stat-l">{t(s.l)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="hero-photo">
            <img src="img/portrait-noite.jpg" alt="Débora Hanna Storch" width={912} height={1140} />
          </figure>
        </section>

        {/* FAIXA DE FOTOS: rola devagar; pausa no hover e com movimento reduzido */}
        <section className="strip" aria-label="Eventos">
          <div className="strip-track">
            {[...STRIP, ...STRIP].map((n, i) => (
              <img key={n + i} src={`img/${n}.jpg`} alt="" aria-hidden={i >= STRIP.length} />
            ))}
          </div>
        </section>

        <section className="wrap clients" aria-label={t(UI.clientsLabel)}>
          <p className="eyebrow">{t(UI.clientsLabel)}</p>
          <ul>
            {CLIENTS.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </section>

        {/* CASES EM DESTAQUE: matérias de revista sobre fundo escuro */}
        <section id="cases" className="stage">
          <div className="wrap">
            <p className="eyebrow on-stage">{t(UI.stageEyebrow)}</p>
            <h2 className="h2">{t(UI.stageTitle)}</h2>
          </div>
          {flagships.map((c) => (
            <article key={c.id} className="story">
              <div className="wrap">
                <div className="story-cover">
                  <img src={c.images[0]} alt={t(c.title)} loading="lazy" />
                  <div className="story-cap">
                    <p className="kicker">{t(c.kicker)} · {t(c.date)}</p>
                    <h3 className="story-title">{t(c.title)}</h3>
                    <p className="story-client">{c.client}</p>
                  </div>
                </div>
                <div className="story-body">
                  <div>
                    <p className="story-sum">{t(c.summary)}</p>
                    <button type="button" className="textlink" onClick={() => setOpen(c)}>
                      {t(UI.more)} <span aria-hidden="true">→</span>
                    </button>
                  </div>
                  <Ficha c={c} t={t} />
                </div>
                {c.video && <VideoBlock c={c} t={t} />}
                <div className={`story-gallery n${Math.min(c.images.slice(1).filter((x) => x !== c.video?.cover).length, 3)}`}>
                  {c.images.slice(1).filter((x) => x !== c.video?.cover).slice(0, 3).map((src) => (
                    <img key={src} src={src} alt="" loading="lazy" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ÍNDICE: mosaico com tamanhos variados */}
        <section className="wrap index">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t(UI.indexEyebrow)}</p>
              <h2 className="h2">{t(UI.indexTitle)}</h2>
            </div>
            <p className="count">{list.length} {t(UI.count)}</p>
          </div>
          <div className="chips" role="group" aria-label={t(UI.indexTitle)}>
            {CATS.map((k) => (
              <button key={k.id} type="button" className="chip" aria-pressed={filter === k.id} onClick={() => setFilter(k.id)}>
                {t(k.label)}
              </button>
            ))}
          </div>
          <div className="mosaic">
            {list.map((c, i) => (
              <button key={c.id} type="button" className={`tile t${i % 6}`} onClick={() => setOpen(c)}>
                <span className="tile-img">
                  <img src={c.images[0]} alt="" loading="lazy" />
                  {c.video && <span className="badge"><PlayIcon size={12} /> {t(UI.video)}</span>}
                </span>
                <span className="kicker">{t(c.kicker)} · {t(c.date)}</span>
                <span className="tile-title">{t(c.title)}</span>
                <span className="tile-meta">{c.client} · {t(c.pax)}</span>
              </button>
            ))}
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="band">
          <div className="wrap services-wrap">
            <div className="services-head">
              <p className="eyebrow">{t(UI.servicesEyebrow)}</p>
              <h2 className="h2">{t(UI.servicesTitle)}</h2>
              <img className="services-img" src="img/toscana-cena.jpg" alt="" loading="lazy" />
            </div>
            <div className="services">
              {SERVICES.map((s) => (
                <div key={s.title.pt} className="service">
                  <h3>{t(s.title)}</h3>
                  <p>{t(s.body)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="wrap">
            <h3 className="h3 process-title">{t(UI.processTitle)}</h3>
            <ol className="process">
              {PROCESS.map((p, i) => (
                <li key={p.title.pt}>
                  <span className="step">{String(i + 1).padStart(2, '0')}</span>
                  <strong>{t(p.title)}</strong>
                  <span>{t(p.body)}</span>
                </li>
              ))}
            </ol>
            <a className="btn btn-solid" href="#contato">{t(UI.ctaHire)}</a>
          </div>
        </section>

        {/* TRAJETÓRIA */}
        <section id="trajetoria" className="wrap career">
          <p className="eyebrow">{t(UI.careerEyebrow)}</p>
          <h2 className="h2">{t(UI.careerTitle)}</h2>
          <ol className="timeline">
            {TIMELINE.map((r) => (
              <li key={r.years + r.org}>
                <span className="tl-years">{r.years}</span>
                <span className="tl-org">{r.org}</span>
                <span className="tl-body">
                  <strong>{t(r.scope)}</strong>
                  {t(r.highlights)}
                </span>
              </li>
            ))}
          </ol>
          <div className="facts">
            <div>
              <p className="eyebrow">{t(UI.edu)}</p>
              <p>{lang === 'pt'
                ? 'Comunicação, Reichman University (Israel) · Gestão Hoteleira, Faculdade Renascença · Gestão de Projetos, FIA · IMEX Frankfurt'
                : 'Communications, Reichman University (Israel) · Hotel Management, Faculdade Renascença · Project Management, FIA · IMEX Frankfurt'}</p>
            </div>
            <div>
              <p className="eyebrow">{t(UI.langs)}</p>
              <p>{lang === 'pt' ? 'Português nativo · Inglês fluente · Espanhol e italiano para conversação' : 'Native Portuguese · Fluent English · Conversational Spanish and Italian'}</p>
            </div>
          </div>
          <a className="btn btn-line" href={LINKEDIN} target="_blank" rel="noreferrer">{t(UI.linkedin)} ↗</a>
        </section>

        {/* PRÊMIO: foto grande do palco + troféu */}
        <section className="award">
          <img className="award-bg" src="img/caio-palco.jpg" alt="" loading="lazy" />
          <div className="wrap award-in">
            <img className="award-photo" src="img/caio-dupla.jpg" alt={t(UI.awardTitle)} loading="lazy" />
            <div>
              <p className="eyebrow on-stage">{t(UI.awardEyebrow)}</p>
              <h2 className="h2">{t(UI.awardTitle)}</h2>
              <p className="award-body">{t(UI.awardBody)}</p>
              <p className="award-body soft">{t(UI.council)}</p>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="wrap quotes-sec">
          <p className="eyebrow">{t(UI.quotesEyebrow)}</p>
          <div className="quotes">
            {TESTIMONIALS.map((q, i) => (
              <figure key={i} className={`quote ${i === 0 ? 'quote-lead' : ''}`}>
                <blockquote>“{t(q.quote)}”</blockquote>
                <figcaption>{t(q.who)}{lang === 'en' ? ' · translated' : ''}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="band">
          <div className="wrap contact">
            <div>
              <p className="eyebrow">{t(UI.contactEyebrow)}</p>
              <h2 className="h2">{t(UI.contactTitle)}</h2>
              <p className="lede small">{t(UI.contactBody)}</p>
              <p className="contact-link">
                <span className="eyebrow">LinkedIn</span>
                <a href={LINKEDIN} target="_blank" rel="noreferrer">linkedin.com/in/deborahannastorch</a>
              </p>
            </div>
            <ContactForm lang={lang} t={t} />
          </div>
        </section>
      </main>

      <footer className="wrap footer">
        <span>Débora Hanna Storch</span>
        <span>{lang === 'pt' ? 'São Paulo · eventos no Brasil e no exterior' : 'São Paulo · events in Brazil and abroad'}</span>
      </footer>

      <CaseDialog c={open} onClose={closeCase} t={t} lang={lang} />
    </>
  )
}

function PlayIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5z" fill="currentColor" />
    </svg>
  )
}

// Bloco de vídeo grande: capa + play. Abre na plataforma (YouTube/Instagram) em nova aba.
function VideoBlock({ c, t }: { c: Case; t: (x: T) => string }) {
  if (!c.video) return null
  return (
    <a className="video" href={c.video.href} target="_blank" rel="noreferrer">
      <img src={c.video.cover} alt="" loading="lazy" />
      <span className="video-shade" />
      <span className="video-play"><PlayIcon size={34} /></span>
      <span className="video-label">
        <span className="video-title">{t(UI.watch)}</span>
        <span className="video-sub">{t(c.title)} · {c.video.platform} ↗</span>
      </span>
    </a>
  )
}

function Ficha({ c, t }: { c: Case; t: (x: T) => string }) {
  const rows: [T, string][] = [
    [UI.f.client, c.client],
    [UI.f.place, t(c.place)],
    [UI.f.date, t(c.date)],
    [UI.f.pax, t(c.pax)],
    [UI.f.role, t(c.role)],
  ]
  return (
    <dl className="ficha">
      {rows.map(([k, v]) => (
        <div key={k.pt}>
          <dt>{t(k)}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

// Modal próprio: Esc fecha, foco vai para o botão fechar, rolagem da página travada.
function CaseDialog({ c, onClose, t, lang }: { c: Case | null; onClose: () => void; t: (x: T) => string; lang: Lang }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!c) return
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const o = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = o; prev?.focus() }
  }, [c, onClose])
  if (!c) return null
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <div className="sheet-head">
          <div>
            <p className="kicker">{t(c.kicker)} · {t(c.date)}</p>
            <h2 id="sheet-title" className="h3">{t(c.title)}</h2>
          </div>
          <button ref={closeRef} type="button" className="close" aria-label={t(UI.close)} onClick={onClose}>×</button>
        </div>
        {c.video && <VideoBlock c={c} t={t} />}
        <div className="sheet-gallery">
          {c.images.map((src) => (
            <img key={src} src={src} alt="" loading="lazy" />
          ))}
        </div>
        <div className="sheet-body">
          <div>
            <p className="story-sum">{t(c.summary)}</p>
            <ul className="bullets">
              {c.bullets[lang].map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {c.link && (
              <a className="textlink" href={c.link.href} target="_blank" rel="noreferrer">
                {t(c.link.label)} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
          <Ficha c={c} t={t} />
        </div>
      </div>
    </>
  )
}

// E-mail de destino montado em partes: não aparece na página nem em texto puro no código.
const TO = atob('ZGVieWhhbm5hQGdtYWlsLmNvbQ==')

function ContactForm({ lang, t }: { lang: Lang; t: (x: T) => string }) {
  const F = UI.form
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [draft, setDraft] = useState('')
  const [mailto, setMailto] = useState('')
  const [err, setErr] = useState('')
  const [copied, setCopied] = useState(false)

  // Monta a mensagem e abre o programa de e-mail do visitante já endereçado à Débora.
  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !msg.trim()) { setErr(t(F.need)); return }
    setErr('')
    const hello = lang === 'pt' ? 'Olá, Débora.' : 'Hi Débora,'
    const body = `${hello}\n\n${msg.trim()}\n\n${name.trim()}${company.trim() ? ' · ' + company.trim() : ''}${email.trim() ? '\n' + email.trim() : ''}`
    const subject = (lang === 'pt' ? 'Contato pelo site · ' : 'Website contact · ') + name.trim()
    const href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setDraft(body); setMailto(href); setCopied(false)
    try { window.location.href = href } catch { /* o botão abaixo cobre */ }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(draft); setCopied(true) } catch {
      const el = document.getElementById('draft') as HTMLTextAreaElement | null
      el?.select()
    }
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="row2">
        <label className="field"><span className="eyebrow">{t(F.name)}</span><input id="f-name" value={name} onChange={(e) => setName(e.target.value)} /></label>
        <label className="field"><span className="eyebrow">{t(F.company)}</span><input id="f-company" value={company} onChange={(e) => setCompany(e.target.value)} /></label>
      </div>
      <label className="field"><span className="eyebrow">{t(F.email)}</span><input id="f-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label className="field"><span className="eyebrow">{t(F.msg)}</span><textarea id="f-msg" rows={4} placeholder={t(F.msgPh)} value={msg} onChange={(e) => setMsg(e.target.value)} /></label>
      {err && <p className="err" role="alert">{err}</p>}
      <button className="btn btn-solid" type="submit">{t(F.send)}</button>
      {draft && (
        <div className="draft">
          <p>{t(F.done)}</p>
          <textarea id="draft" readOnly rows={7} value={draft} />
          <div className="ctas">
            <a className="btn btn-solid" href={mailto}>{t(F.open)}</a>
            <button type="button" className="btn btn-line" onClick={copy}>{copied ? t(F.copied) : t(F.copy)}</button>
          </div>
        </div>
      )}
    </form>
  )
}
