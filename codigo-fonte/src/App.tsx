/*
 * App.tsx — site portfólio de Débora Hanna Storch (eventos corporativos, de incentivo e internacionais)
 * README rápido:
 * - Layout inspirado em agências de experiência B2B: faixas escuras e claras alternadas, títulos grandes,
 *   rótulos entre parênteses, cases em destaque com foto sangrando e cartão sobreposto, botões em pílula.
 * - Conteúdo em src/data.ts (PT/EN). Fotos em public/img.
 * - Vídeos do YouTube: capa estática; o player (youtube-nocookie) só carrega quando a pessoa clica.
 * - Contato: abre o e-mail do visitante já endereçado (o endereço não aparece em texto no código).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CASES, CATS, PROCESS, SERVICES, TESTIMONIALS, TIMELINE, type Case, type Cat, type Lang, type T, type Video } from './data'

const UI = {
  nav: { cases: { pt: 'Cases', en: 'Work' }, skills: { pt: 'Skills', en: 'Skills' }, career: { pt: 'Trajetória', en: 'Career' }, contact: { pt: 'Contato', en: 'Contact' } },
  tagline: { pt: 'Eventos corporativos | Eventos de incentivo | Eventos internacionais', en: 'Corporate events | Incentive events | International events' },
  introTitle: { pt: 'Do conceito ao resultado pós-evento', en: 'From concept to post-event results' },
  lede: {
    pt: 'Há mais de 15 anos eu crio, planejo e conduzo eventos para executivos: feiras, congressos, premiações, summits, imersões no exterior e encontros C-level. Do conceito ao resultado pós-evento.',
    en: 'For over 15 years I have created, planned and run events for executives: trade shows, congresses, awards nights, summits, international immersions and C-level gatherings. From concept to post-event results.',
  },
  ctaCases: { pt: 'Ver cases', en: 'See work' },
  ctaCareer: { pt: 'Ver trajetória', en: 'See career' },
  stats: [
    { n: '15+', l: { pt: 'anos de experiência em eventos', en: 'years of experience in events' } },
    { n: '+100', l: { pt: 'eventos realizados', en: 'events delivered' } },
    { n: '7', l: { pt: 'países com eventos liderados', en: 'countries with events led' } },
  ],
  clientsLabel: { pt: 'Clientes e empresas', en: 'Clients and companies' },
  featLabel: { pt: 'Cases em destaque', en: 'Featured work' },
  featTitle: { pt: 'Experiência na realização de diferentes perfis de eventos', en: 'Experience delivering different event profiles' },
  f: { empresa: { pt: 'Empresa', en: 'Company' }, cliente: { pt: 'Cliente', en: 'Client' }, place: { pt: 'Local', en: 'Venue' }, date: { pt: 'Data', en: 'Date' }, pax: { pt: 'Público', en: 'Audience' }, role: { pt: 'Meu papel', en: 'My role' } },
  more: { pt: 'Ver o case completo', en: 'See the full case' },
  watch: { pt: 'Assistir', en: 'Watch' },
  video: { pt: 'Vídeo', en: 'Video' },
  portLabel: { pt: 'Portfólio de eventos', en: 'Event portfolio' },
  portTitle: { pt: 'Por perfil de evento', en: 'By event profile' },
  portText: { pt: 'Feiras, premiações, programas internacionais, incentivo, encontros executivos, eventos digitais e cultura interna.', en: 'Trade shows, awards, international programs, incentives, executive gatherings, digital events and internal culture.' },
  count: { pt: 'cases', en: 'cases' },
  skillsLabel: { pt: 'Skills', en: 'Skills' },
  skillsTitle: { pt: 'Experiência em diferentes frentes do projeto', en: 'Experience across every front of a project' },
  processTitle: { pt: 'Fases do Projeto', en: 'Project phases' },
  careerLabel: { pt: 'Trajetória', en: 'Career' },
  careerTitle: { pt: 'Da hotelaria internacional à gestão de eventos', en: 'From international hospitality to event leadership' },
  edu: { pt: 'Formação', en: 'Education' },
  langs: { pt: 'Idiomas', en: 'Languages' },
  linkedin: { pt: 'LinkedIn', en: 'LinkedIn' },
  awardLabel: { pt: 'Reconhecimento', en: 'Recognition' },
  awardTitle: { pt: 'Prêmio Caio 2019', en: '2019 Prêmio Caio' },
  awardBody: {
    pt: 'Medalha de prata na categoria Evento Corporativo, pela gestão do Prêmio Automação 2018 da GS1 Brasil. O Prêmio Caio é a principal premiação do setor de eventos no Brasil.',
    en: 'Silver medal in the Corporate Event category, for managing GS1 Brasil’s 2018 Automation Awards. Prêmio Caio is Brazil’s leading events industry award.',
  },
  awardLink: { pt: 'Ver o case vencedor', en: 'See the winning case' },
  quotesLabel: { pt: 'Quem trabalhou comigo', en: 'People I have worked with' },
  contactLabel: { pt: 'Contato', en: 'Contact' },
  form: {
    msg: { pt: 'Mensagem', en: 'Message' },
    send: { pt: 'Enviar mensagem', en: 'Send message' },
    need: { pt: 'Escreva sua mensagem.', en: 'Write your message.' },
    done: { pt: 'Se o seu programa de e-mail não abriu, use o botão abaixo ou copie o texto.', en: 'If your email app did not open, use the button below or copy the text.' },
    open: { pt: 'Abrir no meu e-mail', en: 'Open in my email' },
    copy: { pt: 'Copiar texto', en: 'Copy text' },
    copied: { pt: 'Copiado', en: 'Copied' },
  },
  close: { pt: 'Fechar', en: 'Close' },
  top: { pt: 'Voltar ao topo', en: 'Back to top' },
}

const CLIENTS = ['Amicci', 'APAS', 'Betano', 'Board Academy', 'Gilead Sciences', 'Gouvêa Ecosystem', 'Grupo Padrão', 'GS1 Brasil', 'Hilton Hotels', 'Kenvue', 'MCI Brasil', 'McKinsey & Company', 'OneTrust', 'Rabobank', 'RD Station', 'Sanofi', 'SAP', 'Schneider Electric', 'Theramax']
const LINKEDIN = 'https://www.linkedin.com/in/deborahannastorch/'
const CAIO = 'https://www.premiocaio.com.br/cases/2019/evento-corporativo/4984/premio-automacao-2018'

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

  const flagships = CASES.filter((c) => c.flagship).sort((a, b) => (a.flagship ?? 0) - (b.flagship ?? 0))
  const list = useMemo(
    () => CASES.filter((c) => filter === 'todos' || c.cats.includes(filter))
      .sort((a, b) => Number(!!b.flagship) - Number(!!a.flagship) || (a.flagship ?? 0) - (b.flagship ?? 0) || b.sortYear - a.sortYear),
    [filter],
  )

  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-in">
          <a href="#inicio" className="mark">Débora Hanna Storch</a>
          <nav aria-label="Principal" className="nav">
            <a href="#cases">{t(UI.nav.cases)}</a>
            <a href="#skills">{t(UI.nav.skills)}</a>
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
        {/* HERO: nome gigante sobre fundo escuro + linha entre parênteses */}
        <section id="inicio" className="hero dark">
          <div className="wrap hero-in">
            <h1 className="wordmark">Débora Hanna Storch</h1>
            <p className="paren tagline"><span>{t(UI.tagline)}</span></p>
          </div>
        </section>

        {/* INTRO: título grande + texto à esquerda, retrato à direita */}
        <section className="intro dark">
          <div className="intro-grid">
            <div className="intro-text">
              <h2 className="display">{t(UI.introTitle)}</h2>
              <div className="intro-body">
                <p>{t(UI.lede)}</p>
                <dl className="stats">
                  {UI.stats.map((s) => (
                    <div key={s.n} className="stat">
                      <dt>{s.n}</dt>
                      <dd>{t(s.l)}</dd>
                    </div>
                  ))}
                </dl>
                <div className="ctas">
                  <a className="pill" href="#cases">{t(UI.ctaCases)} <Chevron /></a>
                  <a className="pill" href="#trajetoria">{t(UI.ctaCareer)} <Chevron /></a>
                </div>
              </div>
            </div>
            <figure className="intro-photo">
              <img src="img/portrait-noite.jpg" alt="Débora Hanna Storch" width={912} height={1140} />
            </figure>
          </div>
        </section>

        {/* CLIENTES */}
        <section className="clients light">
          <div className="wrap">
            <p className="label">{t(UI.clientsLabel)}</p>
            <ul className="client-list">
              {CLIENTS.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </section>

        {/* CASES EM DESTAQUE */}
        <section id="cases" className="light featured">
          <div className="wrap split-head">
            <div className="side">
              <Brackets />
              <p className="label">{t(UI.featLabel)}</p>
            </div>
            <div className="main">
              <h2 className="display ruled">{t(UI.featTitle)}</h2>
            </div>
          </div>
          {flagships.map((c) => (
            <article key={c.id} className="story">
              <div className="story-photo">
                <img src={c.images[0]} alt={t(c.title)} loading="lazy" />
              </div>
              <div className="wrap story-body">
                <div className="story-card">
                  <p className="kicker">{c.client ?? t(c.kicker)}</p>
                  <h3 className="story-title">{t(c.title)}</h3>
                  <p className="story-sub">{t(c.kicker)} · {t(c.date)}</p>
                </div>
                <div className="story-cols">
                  <div className="story-text">
                    <p>{t(c.summary)}</p>
                    <button type="button" className="pill" onClick={() => setOpen(c)}>{t(UI.more)} <Chevron /></button>
                  </div>
                  <Ficha c={c} t={t} />
                </div>
                {c.videos && c.videos.length > 0 && (
                  <div className={`videos n${c.videos.length}`}>
                    {c.videos.map((v) => <VideoBlock key={v.href} v={v} cover={c.images[1] ?? c.images[0]} title={t(c.title)} t={t} />)}
                  </div>
                )}
                {c.images.length > 1 && (
                  <div className="story-gallery">
                    {c.images.slice(1, 5).map((src) => (
                      <img key={src} src={src} alt="" loading="lazy" />
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>

        {/* PORTFÓLIO: coluna fixa à esquerda, cards em duas colunas à direita */}
        <section className="light portfolio">
          <div className="wrap split">
            <aside className="side sticky">
              <Brackets />
              <p className="label">{t(UI.portLabel)}</p>
              <h2 className="side-title">{t(UI.portTitle)}</h2>
              <p className="side-text">{t(UI.portText)}</p>
              <div className="filters" role="group" aria-label={t(UI.portTitle)}>
                {CATS.map((k) => (
                  <button key={k.id} type="button" className="filter" aria-pressed={filter === k.id} onClick={() => setFilter(k.id)}>
                    {t(k.label)}
                  </button>
                ))}
              </div>
              <p className="count">{list.length} {t(UI.count)}</p>
            </aside>
            <div className="main cards">
              {list.map((c) => (
                <button key={c.id} type="button" className="card" onClick={() => setOpen(c)}>
                  <span className="card-img">
                    <img src={c.images[0]} alt="" loading="lazy" />
                    {c.videos && c.videos.length > 0 && <span className="badge"><Play size={11} /> {t(UI.video)}</span>}
                  </span>
                  <span className="kicker">{t(c.kicker)}</span>
                  <span className="card-title">{t(c.title)}</span>
                  <span className="card-meta">{[c.client, t(c.date)].filter(Boolean).join(' · ')}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="dark skills">
          <div className="wrap split">
            <div className="side">
              <Brackets />
              <p className="label">{t(UI.skillsLabel)}</p>
              <img className="side-img" src="img/pa2-equipe.jpg" alt="" loading="lazy" />
            </div>
            <div className="main">
              <h2 className="display">{t(UI.skillsTitle)}</h2>
              <div className="skill-grid">
                {SERVICES.map((s) => (
                  <div key={s.title.pt} className="skill">
                    <h3>{t(s.title)}</h3>
                    <p>{t(s.body)}</p>
                  </div>
                ))}
              </div>
              <h3 className="sub">{t(UI.processTitle)}</h3>
              <ol className="process">
                {PROCESS.map((p, i) => (
                  <li key={p.title.pt}>
                    <span className="step">{String(i + 1).padStart(2, '0')}</span>
                    <strong>{t(p.title)}</strong>
                    <span>{t(p.body)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* TRAJETÓRIA */}
        <section id="trajetoria" className="light career">
          <div className="wrap split">
            <div className="side">
              <Brackets />
              <p className="label">{t(UI.careerLabel)}</p>
              <div className="facts">
                <div>
                  <p className="mini">{t(UI.edu)}</p>
                  <p>{lang === 'pt' ? 'Comunicação, Reichman University (Israel)' : 'Communications, Reichman University (Israel)'}</p>
                  <p>{lang === 'pt' ? 'Gestão Hoteleira, Faculdade Renascença' : 'Hotel Management, Faculdade Renascença'}</p>
                </div>
                <div>
                  <p className="mini">{t(UI.langs)}</p>
                  <p>{lang === 'pt' ? 'Português nativo · Inglês fluente · Espanhol e italiano para conversação' : 'Native Portuguese · Fluent English · Conversational Spanish and Italian'}</p>
                </div>
              </div>
              <a className="pill" href={LINKEDIN} target="_blank" rel="noreferrer">{t(UI.linkedin)} <Chevron /></a>
            </div>
            <div className="main">
              <h2 className="display ruled">{t(UI.careerTitle)}</h2>
              <ol className="timeline">
                {TIMELINE.map((r) => (
                  <li key={r.years + r.org}>
                    <span className="tl-years">{r.years}</span>
                    <div>
                      <p className="tl-org">{r.org}</p>
                      <p className="tl-scope">{t(r.scope)}</p>
                      <p className="tl-body">{t(r.highlights)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* RECONHECIMENTO */}
        <section className="award dark">
          <img className="award-bg" src="img/caio-cerimonia.jpg" alt="" loading="lazy" />
          <div className="wrap award-in">
            <img className="award-photo" src="img/caio-dupla.jpg" alt={t(UI.awardTitle)} loading="lazy" />
            <div>
              <p className="label">{t(UI.awardLabel)}</p>
              <h2 className="display">{t(UI.awardTitle)}</h2>
              <p className="award-body">{t(UI.awardBody)}</p>
              <a className="pill" href={CAIO} target="_blank" rel="noreferrer">{t(UI.awardLink)} <Chevron /></a>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="dark quotes">
          <div className="wrap">
            <p className="label">{t(UI.quotesLabel)}</p>
            {TESTIMONIALS.slice(0, 1).map((q, i) => (
              <figure key={i} className="quote-lead">
                <blockquote>“{t(q.quote)}”</blockquote>
                <figcaption>{t(q.who)}{lang === 'en' ? ' · translated' : ''}</figcaption>
              </figure>
            ))}
            <div className="quote-grid">
              {TESTIMONIALS.slice(1).map((q, i) => (
                <figure key={i} className="quote">
                  <blockquote>“{t(q.quote)}”</blockquote>
                  <figcaption>{t(q.who)}{lang === 'en' ? ' · translated' : ''}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="light contact">
          <div className="wrap split">
            <div className="side">
              <Brackets />
              <p className="label">{t(UI.contactLabel)}</p>
              <a className="contact-link" href={LINKEDIN} target="_blank" rel="noreferrer">linkedin.com/in/deborahannastorch ↗</a>
            </div>
            <div className="main">
              <ContactForm lang={lang} t={t} />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-in">
          <span>© Débora Hanna Storch</span>
          <a href="#inicio">{t(UI.top)} ↑</a>
        </div>
      </footer>

      <CaseDialog c={open} onClose={closeCase} t={t} lang={lang} />
    </>
  )
}

function Brackets() {
  return <span className="brackets" aria-hidden="true">(&nbsp;&nbsp;&nbsp;)</span>
}

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function Play({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5z" fill="currentColor" />
    </svg>
  )
}

// Vídeo: YouTube com capa e player só no clique (youtube-nocookie); Instagram abre em nova aba.
function VideoBlock({ v, cover, title, t }: { v: Video; cover: string; title: string; t: (x: T) => string }) {
  const [playing, setPlaying] = useState(false)
  if (v.yt && playing) {
    return (
      <div className="video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${v.yt}?autoplay=1&rel=0`}
          title={`${title} · ${t(v.label)}`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    )
  }
  const img = v.yt ? `https://i.ytimg.com/vi/${v.yt}/hqdefault.jpg` : cover
  const inner = (
    <>
      <img src={img} alt="" loading="lazy" />
      <span className="video-shade" />
      <span className="video-play"><Play size={30} /></span>
      <span className="video-label">
        <span className="video-title">{t(UI.watch)}: {t(v.label)}</span>
        <span className="video-sub">{v.platform}{v.yt ? '' : ' ↗'}</span>
      </span>
    </>
  )
  return v.yt
    ? <button type="button" className="video" onClick={() => setPlaying(true)} aria-label={`${t(UI.watch)}: ${title}, ${t(v.label)}`}>{inner}</button>
    : <a className="video" href={v.href} target="_blank" rel="noreferrer">{inner}</a>
}

function Ficha({ c, t }: { c: Case; t: (x: T) => string }) {
  const rows: [T, string | undefined][] = [
    [c.clientLabel === 'empresa' ? UI.f.empresa : UI.f.cliente, c.client],
    [UI.f.place, c.place && t(c.place)],
    [UI.f.date, t(c.date)],
    [UI.f.pax, c.pax && t(c.pax)],
    [UI.f.role, c.role && t(c.role)],
  ]
  return (
    <dl className="ficha">
      {rows.filter(([, v]) => v).map(([k, v]) => (
        <div key={k.pt}>
          <dt>{t(k)}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

// Modal do case: Esc fecha, foco no botão fechar, rolagem da página travada.
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
            <h2 id="sheet-title" className="sheet-title">{t(c.title)}</h2>
          </div>
          <button ref={closeRef} type="button" className="close" aria-label={t(UI.close)} onClick={onClose}>×</button>
        </div>
        {c.videos && c.videos.length > 0 && (
          <div className={`videos n${c.videos.length}`}>
            {c.videos.map((v) => <VideoBlock key={v.href} v={v} cover={c.images[1] ?? c.images[0]} title={t(c.title)} t={t} />)}
          </div>
        )}
        <div className="sheet-gallery">
          {c.images.map((src) => (
            <img key={src} src={src} alt="" loading="lazy" />
          ))}
        </div>
        <div className="sheet-body">
          <div>
            <p className="sheet-sum">{t(c.summary)}</p>
            {c.bullets[lang].length > 0 && (
              <ul className="bullets">
                {c.bullets[lang].map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            {c.link && (
              <a className="pill" href={c.link.href} target="_blank" rel="noreferrer">{t(c.link.label)} <Chevron /></a>
            )}
          </div>
          <Ficha c={c} t={t} />
        </div>
      </div>
    </>
  )
}

// E-mail de destino montado em tempo de execução: não aparece na página nem em texto puro no código.
const TO = atob('ZGVieWhhbm5hQGdtYWlsLmNvbQ==')

function ContactForm({ lang, t }: { lang: Lang; t: (x: T) => string }) {
  const F = UI.form
  const [msg, setMsg] = useState('')
  const [mailto, setMailto] = useState('')
  const [err, setErr] = useState('')
  const [copied, setCopied] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!msg.trim()) { setErr(t(F.need)); return }
    setErr('')
    const subject = lang === 'pt' ? 'Contato pelo site' : 'Website contact'
    const href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg.trim())}`
    setMailto(href); setCopied(false)
    try { window.location.href = href } catch { /* o botão abaixo cobre */ }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(msg.trim()); setCopied(true) } catch {
      (document.getElementById('f-msg') as HTMLTextAreaElement | null)?.select()
    }
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <label className="field">
        <span className="mini">{t(F.msg)}</span>
        <textarea id="f-msg" rows={6} value={msg} onChange={(e) => setMsg(e.target.value)} />
      </label>
      {err && <p className="err" role="alert">{err}</p>}
      <button className="pill solid" type="submit">{t(F.send)} <Chevron /></button>
      {mailto && (
        <div className="draft">
          <p>{t(F.done)}</p>
          <div className="ctas">
            <a className="pill" href={mailto}>{t(F.open)} <Chevron /></a>
            <button type="button" className="pill" onClick={copy}>{copied ? t(F.copied) : t(F.copy)}</button>
          </div>
        </div>
      )}
    </form>
  )
}
