import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import BlurText from './components/reactbits/BlurText';
import CountUp from './components/reactbits/CountUp';
import GridMotion from './components/reactbits/GridMotion';
import RotatingText from './components/reactbits/RotatingText';
import ScrollExpand from './components/reactbits/ScrollExpand';
import ScrollFloat from './components/reactbits/ScrollFloat';
import ScrollVelocity from './components/reactbits/ScrollVelocity';
import ShinyText from './components/reactbits/ShinyText';
import TiltedCard from './components/reactbits/TiltedCard';
import {
  IconArrow, IconClock, IconInstagram, IconPin, IconPlus, IconStar, IconWhatsApp,
} from './components/Icons';
import {
  FAQ, GOOGLE_RATING, INSTAGRAM_URL, MEDIA, OPENING_DATE, PHONE_DISPLAY, TESTIMONIALS, UNITS, whatsappLink,
} from './config';
import { useInauguration } from './inauguration';

const CTA_MSG = 'Olá! Vim pelo site e quero agendar minha aula experimental grátis na Bem Estar Fitness 💪';
const ease = [0.22, 1, 0.36, 1];

const Reveal = ({ children, delay = 0, y = 40, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.8, delay, ease }}
  >
    {children}
  </motion.div>
);

// ScrollFloat que termina de montar logo que o título entra na tela (sem buraco vazio)
const FloatTitle = ({ children, className = '' }) => (
  <ScrollFloat
    containerClassName={`float-title ${className}`}
    animationDuration={1}
    stagger={0.02}
    scrollStart="top bottom-=5%"
    scrollEnd="top 65%"
  >
    {children}
  </ScrollFloat>
);

const CtaButton =({ children = 'Agendar aula grátis', msg = CTA_MSG, variant = 'primary', className = '', icon = true }) => (
  <motion.a
    href={whatsappLink(msg)}
    target="_blank"
    rel="noopener noreferrer"
    className={`btn btn--${variant} ${className}`}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.97 }}
  >
    {icon && <IconWhatsApp width={20} height={20} />}
    {children}
  </motion.a>
);

const SocialLinks = ({ className = '' }) => (
  <div className={`social ${className}`}>
    <motion.a
      href={whatsappLink(CTA_MSG)}
      target="_blank"
      rel="noopener noreferrer"
      className="social__btn social__btn--wa"
      aria-label="WhatsApp da Bem Estar"
      whileHover={{ y: -3, scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <IconWhatsApp width={20} height={20} />
    </motion.a>
    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="social__btn social__btn--ig"
      aria-label="Instagram @bemestarfit_"
      whileHover={{ y: -3, scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <IconInstagram width={19} height={19} />
    </motion.a>
  </div>
);

const Logo = () => (
  <a href="#topo" className="logo" aria-label="Bem Estar Fitness — início">
    <img src="/brand/logo-480.png" alt="Bem Estar Fitness" width="480" height="115" />
  </a>
);

// Vídeo de fundo com autoplay nativo. O navegador já pausa vídeos mudos fora da tela e retoma
// quando eles aparecem; chamar pause()/play() na mão quebra isso (o play() é recusado e o vídeo congela).
function AutoVideo({ src, poster, className = '' }) {
  return (
    <video className={className} src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" />
  );
}

/* ---------- Countdown ---------- */
function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    done: diff === 0,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const TimeBox = ({ value, label }) => (
  <div className="timebox">
    <div className="timebox__value">
      <motion.span key={value} initial={{ y: '-60%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, ease }}>
        {String(value).padStart(2, '0')}
      </motion.span>
    </div>
    <span className="timebox__label">{label}</span>
  </div>
);

/* ---------- Navbar ---------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
    >
      <AnnounceBar />
      <div className="container nav__inner">
        <Logo />
        <nav className="nav__links">
          <a href="#servicos">A academia</a>
          <a href="#estrutura">Nova estrutura</a>
          <a href="#unidades">Unidades</a>
          <a href="#faq">Dúvidas</a>
        </nav>
        <div className="nav__right">
          <SocialLinks />
          <CtaButton className="nav__cta" icon={false}>Matricule-se</CtaButton>
        </div>
      </div>
    </motion.header>
  );
}

/* ---------- Barra de aviso: atualização diária da inauguração ---------- */
function AnnounceBar() {
  const update = useInauguration();
  return (
    <a href="#estrutura" className={`announce announce--${update.phase}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={update.dateLabel + update.title + update.message}
          className="announce__inner"
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.35, ease }}
        >
          <strong className="announce__badge">{update.badge}</strong>
          <span className="announce__text">{update.message}</span>
          <span className="announce__date">Atualizado {update.dateLabel}</span>
        </motion.span>
      </AnimatePresence>
    </a>
  );
}

/* ---------- Hero: vídeo em tela cheia com parallax ---------- */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Só desloca o vídeo (sem zoom): escalar um vídeo tocando a cada quadro é o que mais trava
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const update = useInauguration();

  return (
    <section className="hero" id="topo" ref={ref}>
      <motion.div className="hero__media" style={{ y: videoY }}>
        <video src={MEDIA.heroVideo} poster={MEDIA.heroPoster} autoPlay muted loop playsInline />
      </motion.div>
      <div className="hero__shade" />

      <motion.div className="container hero__content" style={{ y: textY, opacity }}>
        <motion.a
          href="#estrutura"
          className="pill"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <span className="pill__dot" />
          <ShinyText text={`Nova estrutura · ${update.badge.toLowerCase()}`} speed={3} />
        </motion.a>

        <BlurText as="h1" text="Seu treino mais forte" className="hero__title" delay={110} />
        <motion.div
          className="hero__title hero__title--accent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease }}
        >
          começa aqui
        </motion.div>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease }}
        >
          Treino pensado pra você{' '}
          <RotatingText texts={['emagrecer', 'ganhar massa', 'ter mais saúde', 'correr mais']} mainClassName="rotating-chip" />
        </motion.p>

        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease }}
        >
          <CtaButton className="btn--lg">Agendar aula grátis</CtaButton>
          <a href="#servicos" className="btn btn--glass btn--lg">
            Conhecer a academia <IconArrow width={18} height={18} />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__proof"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
      >
        <div className="stars">
          {Array.from({ length: 5 }).map((_, i) => <IconStar key={i} width={14} height={14} />)}
        </div>
        +7.000 pessoas acompanham a Bem Estar
      </motion.div>
    </section>
  );
}

/* ---------- Serviços com TiltedCard ---------- */
const SERVICES = [
  { img: '/media/musculacao.jpg', title: 'Musculação completa', text: 'Equipamentos novos, peso livre e cardio num salão amplo.' },
  { img: '/media/post-1017.jpg', title: 'Equipe pós-graduada', text: 'Instrutores especialistas em Personal Training montando seu treino.' },
  { img: '/media/reel-1019.jpg', title: '100% climatizado', text: 'Conforto o ano inteiro, das 5h às 22h.' },
  { img: '/media/reel-1003.jpg', title: 'Clima de família', text: 'Comunidade que te motiva, eventos e corridas de rua.' },
];

function Services() {
  return (
    <section className="section section--light" id="servicos">
      <div className="container">
        <div className="section__head section__head--left">
          <span className="eyebrow eyebrow--dark">A academia</span>
          <FloatTitle>
            O treino é só o começo.
          </FloatTitle>
          <p>Na Bem Estar você tem estrutura, gente que entende do assunto e um ambiente que faz você querer voltar.</p>
        </div>
        <div className="services">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="service">
              <TiltedCard
                imageSrc={s.img}
                altText={s.title}
                containerHeight="420px"
                imageWidth="100%"
                imageHeight="420px"
                rotateAmplitude={10}
                scaleOnHover={1.04}
                showTooltip={false}
                radius={24}
                displayOverlayContent
                overlayContent={
                  <div className="service__overlay">
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <span className="service__arrow"><IconArrow width={20} height={20} /></span>
                  </div>
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Nova estrutura: ScrollExpand com vídeo ---------- */
function Structure() {
  const t = useCountdown(OPENING_DATE);
  const update = useInauguration();
  return (
    <section id="estrutura" className="structure">
      <ScrollExpand
        useWindowScroll
        mediaType="video"
        src={MEDIA.structureVideo}
        poster={MEDIA.structurePoster}
        title="A NOVA BEM ESTAR"
        scrollHint="Role para entrar"
        startWidth={46}
        startHeight={62}
        scrollDistance={0.8}
        holdDistance={0.15}
        overlayScrim={0.8}
      >
        <div className="structure__overlay">
          <span className="eyebrow">Inauguração · 03 de novembro · {update.badge}</span>
          <h2>{update.title}</h2>
          {!t.done && (
            <div className="countdown">
              <TimeBox value={t.days} label="dias" />
              <TimeBox value={t.hours} label="horas" />
              <TimeBox value={t.minutes} label="min" />
              <TimeBox value={t.seconds} label="seg" />
            </div>
          )}
          <CtaButton msg="Olá! Quero garantir a condição especial de inauguração da nova Bem Estar Fitness 🚀">
            Garantir condição de lançamento
          </CtaButton>
        </div>
      </ScrollExpand>
    </section>
  );
}

/* ---------- Faixa neon com números ---------- */
function NumbersBand() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  return (
    <section className="band" ref={ref}>
      <div className="container">
        <motion.div className="band__big" style={{ x }}>
          +<CountUp to={7000} duration={2.5} />
        </motion.div>
        <p className="band__text">pessoas acompanham a rotina da Bem Estar — e cada vez mais delas treinam com a gente.</p>
        <div className="band__grid">
          {[
            { to: 17, suffix: 'h', label: 'abertos por dia' },
            { to: 7, label: 'dias por semana' },
            { to: 100, suffix: '%', label: 'climatizado' },
          ].map((s) => (
            <div key={s.label}>
              <strong><CountUp to={s.to} duration={2} />{s.suffix}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Reels com parallax por coluna ---------- */
function Reels() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ys = [
    useTransform(scrollYProgress, [0, 1], [80, -80]),
    useTransform(scrollYProgress, [0, 1], [-60, 120]),
    useTransform(scrollYProgress, [0, 1], [140, -40]),
  ];
  return (
    <section className="section reels" ref={ref}>
      <div className="container reels__inner">
        <div className="reels__text">
          <span className="eyebrow">Por dentro da Bem Estar</span>
          <FloatTitle>
            Bora treinar com a gente?
          </FloatTitle>
          <p>Treino pesado, risada no intervalo e muita gente se ajudando. É assim todo dia.</p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn--glass">
            <IconInstagram width={18} height={18} /> Ver mais no Instagram
          </a>
        </div>
        <div className="reels__grid">
          {MEDIA.reels.map((r, i) => (
            <motion.div key={r.src || r.img} className="reel" style={{ y: ys[i] }}>
              {r.img ? <img src={r.img} alt={r.label} loading="lazy" /> : <AutoVideo src={r.src} poster={r.poster} />}
              <span className="reel__label">{r.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Galeria GridMotion ---------- */
function Gallery() {
  return (
    <section className="gallery">
      <GridMotion
        items={MEDIA.gallery}
        rows={3}
        aspectRatio={0.8}
        gap={14}
        radius={18}
        angle={-8}
        speed={30}
        parallax={0.6}
        spotlight={0.5}
        dim={0.45}
        fade={0.4}
      />
      <div className="gallery__overlay">
        <FloatTitle className="gallery__title">
          Vida Bem Estar
        </FloatTitle>
        <CtaButton>Quero fazer parte</CtaButton>
      </div>
    </section>
  );
}

/* ---------- Depoimentos ---------- */
function Testimonials() {
  return (
    <section className="section section--light">
      <div className="container">
        <div className="testimonials__head">
          <div className="section__head section__head--left">
            <span className="eyebrow eyebrow--dark">Depoimentos</span>
            <FloatTitle>
              Quem treina, recomenda.
            </FloatTitle>
          </div>
          <Reveal className="rating">
            <strong>{GOOGLE_RATING.score}</strong>
            <div>
              <div className="stars">
                {Array.from({ length: 5 }).map((_, k) => <IconStar key={k} width={16} height={16} />)}
              </div>
              <span>{GOOGLE_RATING.count} avaliações no Google</span>
            </div>
          </Reveal>
        </div>
        <div className="testimonials">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div className="testimonial" whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}>
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, k) => <IconStar key={k} width={16} height={16} />)}
                </div>
                <p>“{t.text}”</p>
                <span className="testimonial__name">{t.name}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Unidades e horários ---------- */
const DAY_START = 4;
const DAY_END = 22;
const fmtHour = (h) => {
  const hh = String(Math.floor(h)).padStart(2, '0');
  const mm = Math.round((h % 1) * 60);
  return mm ? `${hh}h${String(mm).padStart(2, '0')}` : `${hh}h`;
};

// Hora atual no fuso da academia (UTC-3), independente do fuso de quem visita
function useGymNow() {
  const get = () => {
    const d = new Date(Date.now() - 3 * 3600000);
    return { day: d.getUTCDay(), hour: d.getUTCHours() + d.getUTCMinutes() / 60 };
  };
  const [now, setNow] = useState(get);
  useEffect(() => {
    const id = setInterval(() => setNow(get()), 60000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function Units() {
  const now = useGymNow();
  const [unitId, setUnitId] = useState(UNITS[0].id);
  const unit = UNITS.find((u) => u.id === unitId);
  const today = unit.hours.find((h) => h.days.includes(now.day));
  const openNow = today?.slots.some(([a, b]) => now.hour >= a && now.hour < b);
  const mapSrc = `https://maps.google.com/maps?q=${unit.lat},${unit.lng}&z=16&output=embed`;

  return (
    <section className="section units-section" id="unidades">
      <div className="container">
        <div className="section__head section__head--left">
          <span className="eyebrow">Unidades e horários</span>
          <FloatTitle>
            Tem uma Bem Estar perto de você.
          </FloatTitle>
        </div>

        <Reveal className="tabs" role="tablist">
          {UNITS.map((u) => (
            <button
              key={u.id}
              role="tab"
              aria-selected={u.id === unitId}
              className={`tab ${u.id === unitId ? 'tab--active' : ''}`}
              onClick={() => setUnitId(u.id)}
            >
              {u.id === unitId && (
                <motion.span layoutId="tab-pill" className="tab__pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
              <span className="tab__label">{u.name} <small>{u.uf}</small></span>
            </button>
          ))}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={unit.id}
            className="units__grid"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="units__hours">
              <div className={`status ${openNow ? 'status--open' : ''}`}>
                <span className="status__dot" />
                {openNow ? 'Aberto agora' : 'Fechado agora'}
              </div>
              {unit.hours.map((h, i) => {
                const isToday = h === today;
                return (
                  <motion.div
                    key={h.short}
                    className={`hours-row ${isToday ? 'hours-row--today' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease }}
                  >
                    <div className="hours-row__top">
                      <span className="hours-row__day">
                        {h.short} {isToday && <span className="hours-row__tag">Hoje</span>}
                      </span>
                      <span className="hours-row__times">
                        {h.slots.map(([a, b]) => `${fmtHour(a)} — ${fmtHour(b)}`).join('  ·  ')}
                      </span>
                    </div>
                    <div className="timeline" aria-hidden="true">
                      {h.slots.map(([a, b]) => (
                        <motion.span
                          key={a}
                          className="timeline__bar"
                          style={{
                            left: `${((a - DAY_START) / (DAY_END - DAY_START)) * 100}%`,
                            width: `${((b - a) / (DAY_END - DAY_START)) * 100}%`,
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.9, delay: 0.25 + i * 0.08, ease }}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
              <div className="timeline__scale">
                <span>{fmtHour(DAY_START)}</span>
                <span>{fmtHour(DAY_END)}</span>
              </div>
              <span className="hours__note">
                <IconClock width={18} height={18} /> Feriados podem ter horário especial — confirme pelo WhatsApp.
              </span>
            </div>

            <div className="map-card">
              <iframe
                title={`Mapa da unidade ${unit.name}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-card__info">
                <span className="address"><IconPin width={20} height={20} /> {unit.address}</span>
                <span className="address">
                  <IconWhatsApp width={20} height={20} /> {PHONE_DISPLAY}
                  <small className="map-card__hint">contato central das duas unidades</small>
                </span>
                <div className="map-card__actions">
                  <a href={unit.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                    Como chegar <IconArrow width={18} height={18} />
                  </a>
                  <CtaButton
                    variant="glass"
                    msg={`Olá! Quero agendar uma aula experimental grátis na unidade ${unit.name} da Bem Estar Fitness 💪`}
                  >
                    Agendar nesta unidade
                  </CtaButton>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section section--light" id="faq">
      <div className="container container--narrow">
        <div className="section__head">
          <span className="eyebrow eyebrow--dark">Dúvidas</span>
          <FloatTitle>
            Perguntas frequentes
          </FloatTitle>
        </div>
        <div className="faq">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <button className="faq__q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  {item.q}
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}>
                    <IconPlus />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="faq__a">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA final com vídeo em parallax ---------- */
function FinalCta() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  return (
    <section className="final" ref={ref}>
      <motion.div className="final__media" style={{ y }}>
        <AutoVideo src={MEDIA.finalVideo} poster={MEDIA.finalPoster} />
      </motion.div>
      <div className="final__shade" />
      <div className="container final__content">
        <motion.img
          src="/brand/logo-480.png"
          alt="Bem Estar Fitness"
          className="final__logo"
          initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        />
        <BlurText as="h2" text="A melhor hora de começar é agora." className="final__title" delay={80} highlight={[6]} />
        <p>Sua primeira aula é por nossa conta. Vem conhecer a nova Bem Estar Fitness.</p>
        <CtaButton className="btn--lg">Agendar aula experimental grátis</CtaButton>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo />
          <span>Saúde | Qualidade de Vida</span>
          <SocialLinks />
        </div>
        {UNITS.map((u) => (
          <a key={u.id} href={u.mapsUrl} target="_blank" rel="noopener noreferrer" className="footer__unit">
            <strong>{u.name} · {u.uf}</strong>
            <span>{u.address}</span>
          </a>
        ))}
        <div className="footer__contact">
          <a href={whatsappLink(CTA_MSG)} target="_blank" rel="noopener noreferrer" className="footer__ig">
            <IconWhatsApp width={18} height={18} /> {PHONE_DISPLAY}
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer__ig">
            <IconInstagram width={18} height={18} /> @bemestarfit_
          </a>
        </div>
      </div>
      <div className="container footer__copy">© {new Date().getFullYear()} Academia Bem Estar Fitness</div>
    </footer>
  );
}

function FloatingCta() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => scrollY.on('change', (v) => setShow(v > 600)), [scrollY]);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsappLink(CTA_MSG)}
          target="_blank"
          rel="noopener noreferrer"
          className="fab"
          aria-label="Falar no WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
        >
          <IconWhatsApp width={28} height={28} />
          <span className="fab__ping" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="progress" style={{ scaleX }} />;
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <ScrollVelocity
          texts={['MUSCULAÇÃO  SAÚDE  QUALIDADE DE VIDA  NOVA ESTRUTURA  ']}
          velocity={60}
          className="velocity-text"
        />
        <Services />
        <Structure />
        <NumbersBand />
        <Reels />
        <Gallery />
        <Testimonials />
        <Units />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
