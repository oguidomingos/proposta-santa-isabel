import { useEffect, useRef, useState } from 'react'

/* ─── scroll-reveal hook ─── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal')
    if (!els) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ─── diamond divider ─── */
function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 py-12">
      <div className="h-px w-16 bg-sage/20" />
      <div className="w-2.5 h-2.5 rotate-45 bg-sage/30" />
      <div className="h-px w-16 bg-sage/20" />
    </div>
  )
}

/* ─── section label ─── */
function SectionLabel({ number, text }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-body text-[11px] font-semibold tracking-[0.15em] uppercase text-sage">{number}</span>
      <div className="h-px flex-1 bg-sage/15" />
      <span className="font-body text-[11px] font-semibold tracking-[0.15em] uppercase text-cinza">{text}</span>
    </div>
  )
}

/* ─── delivery card ─── */
function DeliveryCard({ icon, title, description, items, link, linkLabel, delay = 0 }) {
  return (
    <div className="reveal bg-white rounded-2xl p-8 border border-cinza-light/40 hover:-translate-y-1.5 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(42,125,107,0.08)]" style={{ transitionDelay: `${delay}ms` }}>
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-display text-xl text-midnight mb-3">{title}</h3>
      <p className="font-body text-[15px] text-cinza leading-relaxed mb-4">{description}</p>
      <ul className="space-y-1.5 mb-5">
        {items.map((d, i) => (
          <li key={i} className="flex items-start gap-2 text-[13px] text-preto/70">
            <span className="text-sage mt-0.5">{'\u2713'}</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-body text-[13px] font-semibold text-sage hover:text-sage-dark transition-colors">
          {linkLabel || 'Ver entrega'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      )}
    </div>
  )
}

/* ─── stat block ─── */
function Stat({ value, label, delay = 0 }) {
  return (
    <div className="reveal text-center" style={{ transitionDelay: `${delay}ms` }}>
      <div className="font-display text-4xl md:text-5xl text-sage mb-2">{value}</div>
      <div className="font-body text-[13px] text-cinza tracking-wide uppercase">{label}</div>
    </div>
  )
}

/* ─── image gallery ─── */
function ImageGallery({ title, images, folder }) {
  const scrollRef = useRef(null)
  const [modal, setModal] = useState(null)
  return (
    <>
      <div className="reveal mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-display text-lg text-midnight">{title}</h4>
          {folder && (
            <a href={folder} target="_blank" rel="noopener noreferrer" className="font-body text-[12px] font-semibold text-sage hover:text-sage-dark transition-colors flex items-center gap-1">
              Ver tudo no Drive
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </a>
          )}
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-3 gallery-scroll">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt || title}
              className="w-56 h-56 object-cover rounded-xl border border-cinza-light/30 flex-shrink-0 cursor-pointer hover:scale-[1.03] transition-transform"
              onClick={() => setModal(img.src)}
            />
          ))}
        </div>
      </div>
      {modal && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6" onClick={() => setModal(null)}>
          <img src={modal} alt="" className="max-w-full max-h-[90vh] rounded-xl" />
          <button className="absolute top-6 right-6 text-white text-3xl hover:text-dourado transition-colors" onClick={() => setModal(null)}>{'\u00D7'}</button>
        </div>
      )}
    </>
  )
}

/* ─── iframe embed preview ─── */
function SitePreview({ title, url, description }) {
  return (
    <div className="reveal">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-display text-lg text-midnight">{title}</h4>
        <a href={url} target="_blank" rel="noopener noreferrer" className="font-body text-[12px] font-semibold text-sage hover:text-sage-dark transition-colors flex items-center gap-1">
          Abrir em nova aba
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>
      {description && <p className="font-body text-[14px] text-cinza mb-4">{description}</p>}
      <div className="rounded-2xl overflow-hidden border border-sage/15 shadow-[0_8px_40px_rgba(26,46,53,0.08)]">
        <iframe src={url} title={title} className="w-full h-[500px] md:h-[600px]" loading="lazy" />
      </div>
    </div>
  )
}

/* ─── DRIVE IMAGE URLS ─── */
const DRIVE_IMG = (id) => `https://lh3.googleusercontent.com/d/${id}=w400`

/* ─── main app ─── */
export default function App() {
  const pageRef = useReveal()

  const clinicInfo = {
    name: 'Clínica de Fisioterapia Santa Isabel',
    since: '1980',
    years: '46',
    address: 'Rua 15, Lote 26, Guará II, Brasília/DF',
    phone: '(61) 3301-7187',
    email: 'fisiosig2@gmail.com',
    instagram: '@fisiosantaisabel',
    specialties: [
      'Fisioterapia Ortopédica e Traumatológica',
      'Fisioterapia Neurológica',
      'Hidroterapia / Fisioterapia Aquática',
      'Pilates Clínico',
      'Acupuntura',
      'RPG / Reeducação Postural',
      'Fisioterapia Respiratória',
      'Reabilitação Cardiopulmonar',
    ],
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-cream">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/92 backdrop-blur-xl border-b border-sage/8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3C6.48 3 2 7.48 2 13c0 3.08 1.4 5.83 3.6 7.65l1.4-1.65C5.77 17.93 5 15.57 5 13c0-3.87 3.13-7 7-7s7 3.13 7 7c0 2.57-.77 4.93-2 6l1.4 1.65C20.6 18.83 22 16.08 22 13c0-5.52-4.48-10-10-10z"/><circle cx="12" cy="13" r="3"/></svg>
            </div>
            <span className="font-display text-lg text-midnight">Pulso</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#diagnostico" className="font-body text-[13px] text-cinza hover:text-sage transition-colors tracking-wide">Diagnóstico</a>
            <a href="#entregas" className="font-body text-[13px] text-cinza hover:text-sage transition-colors tracking-wide">Entregas</a>
            <a href="#sites" className="font-body text-[13px] text-cinza hover:text-sage transition-colors tracking-wide">Sites</a>
            <a href="#social" className="font-body text-[13px] text-cinza hover:text-sage transition-colors tracking-wide">Social Media</a>
            <a href="#ads" className="font-body text-[13px] text-cinza hover:text-sage transition-colors tracking-wide">Criativos</a>
            <a href="#projecao" className="font-body text-[13px] text-cinza hover:text-sage transition-colors tracking-wide">Projeção</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-12 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle at 30% 50%, #2A7D6B 0%, transparent 50%), radial-gradient(circle at 70% 30%, #C4A04A 0%, transparent 50%)'}} />
        <div className="relative max-w-[900px] mx-auto text-center">
          <div className="overflow-hidden mb-2">
            <p className="hero-line hero-line-1 font-body text-[12px] tracking-[0.2em] uppercase text-sage font-semibold">Proposta de Assessoria de Marketing Digital</p>
          </div>
          <div className="overflow-hidden mb-6">
            <h1 className="hero-line hero-line-2 font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.08] text-midnight">
              {clinicInfo.name}
            </h1>
          </div>
          <div className="overflow-hidden mb-4">
            <p className="hero-line hero-line-3 font-body text-lg md:text-xl text-cinza leading-relaxed max-w-[700px] mx-auto">
              {clinicInfo.years} anos de excelência em reabilitação. O maior centro de fisioterapia privado do DF merece uma presença digital à altura.
            </p>
          </div>
          <div className="overflow-hidden mb-10">
            <p className="hero-line hero-line-3 font-body text-[14px] text-cinza/60">
              Desde {clinicInfo.since} — Guará II, Brasília/DF
            </p>
          </div>
          <div className="overflow-hidden">
            <div className="hero-line hero-line-3 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#entregas" className="font-body text-[14px] bg-sage text-white px-8 py-3.5 rounded-full hover:bg-sage-dark transition-all hover:shadow-lg tracking-wide">Ver Entregas Prontas</a>
              <a href="#diagnostico" className="font-body text-[14px] border-2 border-sage/20 text-midnight px-8 py-3.5 rounded-full hover:border-sage/40 transition-all tracking-wide">Diagnóstico da Clínica</a>
            </div>
          </div>
        </div>
        <a href="#diagnostico" className="absolute bottom-8 float">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2A7D6B" strokeWidth="2"><path d="M12 5v14m-7-7l7 7 7-7"/></svg>
        </a>
      </section>

      <Divider />

      {/* DIAGNÓSTICO */}
      <section id="diagnostico" className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="01" text="Diagnóstico" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-6 max-w-[700px]">
          A clínica mais tradicional do DF com presença digital mínima
        </h2>
        <p className="reveal font-body text-lg text-cinza leading-relaxed max-w-[700px] mb-12">
          46 anos de história, milhares de pacientes reabilitados, equipe multidisciplinar completa — mas quem procura fisioterapia no Google não encontra a Santa Isabel. A demanda está lá. O que falta é visibilidade.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Stat value="46" label="anos de operação" delay={0} />
          <Stat value="8+" label="especialidades" delay={100} />
          <Stat value="12/100" label="score digital atual" delay={200} />
          <Stat value="R$ 120k" label="receita perdida estimada/ano" delay={300} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="reveal bg-white rounded-2xl p-8 border border-cinza-light/40">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="font-body text-[12px] tracking-wider uppercase text-cinza font-semibold">Situação Atual</span>
            </div>
            <ul className="space-y-3">
              {['Sem site institucional próprio', 'Instagram com pouca frequência', 'Google Meu Negócio desotimizado', 'Sem landing pages para procedimentos', 'Zero campanhas de tráfego pago', 'Sem identidade visual digital padronizada', 'Pacientes captados apenas por indicação e localização', 'Sem estratégia de conteúdo definida'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-preto/70 text-[14px]">
                  <span className="text-red-400 mt-0.5">{'\u2717'}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal bg-sage rounded-2xl p-8 text-white" style={{ transitionDelay: '150ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-dourado" />
              <span className="font-body text-[12px] tracking-wider uppercase text-white/60 font-semibold">O Que Entregamos</span>
            </div>
            <ul className="space-y-3">
              {['Identidade visual completa (55 logos + mockups)', 'Site premium institucional (9 seções)', 'Landing page alta conversão (PAS framework)', '16 posts Instagram com copy estratégica', '10 criativos Meta Ads (awareness + conversão)', 'Paleta de cores e tipografia padronizadas', 'Estratégia de conteúdo por 1 mês', 'SEO e Schema.org configurados'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-white/90 text-[14px]">
                  <span className="text-dourado mt-0.5">{'\u2713'}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Divider />

      {/* ENTREGAS */}
      <section id="entregas" className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="02" text="Entregas Realizadas" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-4 max-w-[700px]">
          6 frentes entregues em 24 horas
        </h2>
        <p className="reveal font-body text-lg text-cinza leading-relaxed max-w-[700px] mb-12">
          Cada entrega foi personalizada para a Santa Isabel — com a história, especialidades e identidade da clínica.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DeliveryCard
            icon={'\uD83C\uDFA8'}
            title="Identidade Visual"
            description="Paleta de cores inspirada na natureza e saúde. 55 logos em 6 layouts e 5 variações de cor."
            items={['6 layouts: lockup, stacked, wordmark, horizontal, badge, icon', '5 cores: sage, dourado, verde-água, escuro, cream', '6 mockups profissionais (cartão, uniforme, fachada, receituário)', 'SVGs vetoriais para impressão']}
            link="https://drive.google.com/drive/folders/1nS32_cBQU6Lf17hfnCck97n3g_aeaF-k"
            linkLabel="Ver no Drive"
            delay={0}
          />
          <DeliveryCard
            icon={'\uD83C\uDF10'}
            title="Site Institucional"
            description="Site premium com 9 seções, SEO completo, Schema MedicalBusiness e scroll animations."
            items={['Hero + Sobre + Especialidades + Equipe', 'Estrutura + Convênios + Depoimentos', 'SEO on-page + JSON-LD structured data', 'Mobile-first, PageSpeed otimizado']}
            link="https://oguidomingos.github.io/trion-intelligence/site-santa-isabel.html"
            linkLabel="Acessar site"
            delay={100}
          />
          <DeliveryCard
            icon={'\u26A1'}
            title="Landing Page"
            description="Página de alta conversão usando framework PAS — Problema, Agitação, Solução. CTA direto para WhatsApp."
            items={['8 seções persuasivas', 'Formulário / botão WhatsApp', 'Otimizada para Google Ads', 'Bundle ultra-leve (32KB JS)']}
            link="https://oguidomingos.github.io/trion-intelligence/lp-santa-isabel.html"
            linkLabel="Acessar LP"
            delay={200}
          />
          <DeliveryCard
            icon={'\uD83D\uDCF7'}
            title="Social Media"
            description="16 posts para Instagram — carrosséis educativos + singles institucionais, organizados por pilar."
            items={['7 carrosséis (4-6 slides cada)', '9 posts singles', '5 pilares: educação, especialidades, bastidores, prova social, dicas', 'Copy completa com CTAs']}
            link="https://drive.google.com/drive/folders/1rVwwrNX3uL24wo2EqpqmegE_48sw19dM"
            linkLabel="Ver posts no Drive"
            delay={0}
          />
          <DeliveryCard
            icon={'\uD83D\uDE80'}
            title="Criativos Meta Ads"
            description="10 peças visuais para campanhas de awareness, conversão e remarketing no Facebook e Instagram."
            items={['4 criativos de awareness (marca + serviços)', '3 criativos de conversão (agende agora)', '3 criativos de remarketing (números + depoimento)', 'Formatos: feed 1080x1080, stories 1080x1920']}
            link="https://drive.google.com/drive/folders/12SHKm4G0Pq9MLnaJTsrmWbWsWnVUhbQ7"
            linkLabel="Ver criativos no Drive"
            delay={100}
          />
          <DeliveryCard
            icon={'\uD83D\uDCCB'}
            title="Estratégia de Conteúdo"
            description="Planejamento editorial para 1 mês com calendário, pilares e cronograma de publicação."
            items={['Calendário semanal (4x/semana)', 'Mix de formatos: carrossel, single, Reels', 'Pilares de conteúdo definidos', 'Hashtags e horários otimizados']}
            delay={200}
          />
        </div>
      </section>

      <Divider />

      {/* SITES — PREVIEWS */}
      <section id="sites" className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="03" text="Sites Produzidos" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-4 max-w-[700px]">
          Presença digital premium, pronta para ir ao ar
        </h2>
        <p className="reveal font-body text-lg text-cinza leading-relaxed max-w-[700px] mb-12">
          Site institucional e landing page de conversão — ambos personalizados para a Santa Isabel, com SEO, Schema.org e performance otimizada.
        </p>

        <div className="space-y-16">
          <SitePreview
            title="Site Institucional"
            url="https://oguidomingos.github.io/trion-intelligence/site-santa-isabel.html"
            description="9 seções: Hero, Sobre, Especialidades, Equipe, Estrutura, Convênios, Depoimentos, Localização, Contato. SEO completo com Schema MedicalBusiness."
          />
          <SitePreview
            title="Landing Page — Alta Conversão"
            url="https://oguidomingos.github.io/trion-intelligence/lp-santa-isabel.html"
            description="Framework PAS (Problema → Agitação → Solução). Projetada para campanhas de Google Ads com foco em agendamento via WhatsApp."
          />
        </div>
      </section>

      <Divider />

      {/* IDENTIDADE VISUAL */}
      <section id="brand" className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="04" text="Identidade Visual" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-4 max-w-[700px]">
          Marca profissional para 46 anos de história
        </h2>
        <p className="reveal font-body text-lg text-cinza leading-relaxed max-w-[700px] mb-12">
          Paleta verde sage + dourado quente — remetendo a saúde, confiança e tradição. Logos em 6 layouts para aplicação em qualquer contexto.
        </p>

        {/* Palette */}
        <div className="reveal flex flex-wrap gap-4 mb-12">
          {[
            { color: '#2A7D6B', name: 'Verde Sage' },
            { color: '#C4A04A', name: 'Dourado' },
            { color: '#5AAFA0', name: 'Verde-Água' },
            { color: '#1A2E35', name: 'Verde Escuro' },
            { color: '#F5F1EB', name: 'Cream' },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-cinza-light/30">
              <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: c.color }} />
              <div>
                <div className="font-body text-[13px] font-semibold text-midnight">{c.name}</div>
                <div className="font-body text-[11px] text-cinza">{c.color}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Drive links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Logos', icon: '\uD83C\uDFA8', folder: 'https://drive.google.com/drive/folders/1FYcmCFiaSoeK22J5urslfTb-xHcv4jze', count: '55 variações' },
            { name: 'Mockups', icon: '\uD83D\uDCF1', folder: 'https://drive.google.com/drive/folders/1MjkUUciayR4enUYzR3Gjds_kdo5JGxvE', count: '6 aplicações' },
            { name: 'SVGs Vetoriais', icon: '\uD83D\uDCC0', folder: 'https://drive.google.com/drive/folders/13tV_1bQGIeCRVnTJCchTP25vjHC0YXp5', count: 'Editáveis' },
            { name: 'Brand Guidelines', icon: '\uD83D\uDCD6', folder: 'https://drive.google.com/drive/folders/1z4wxhTf7xZepWZrCQEo2aUMjQE3S-j7E', count: 'Manual completo' },
          ].map((item, i) => (
            <a key={i} href={item.folder} target="_blank" rel="noopener noreferrer" className="reveal bg-white rounded-xl p-5 border border-cinza-light/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(42,125,107,0.06)] transition-all group" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-body text-[14px] font-semibold text-midnight group-hover:text-sage transition-colors">{item.name}</div>
              <div className="font-body text-[12px] text-cinza">{item.count}</div>
            </a>
          ))}
        </div>
      </section>

      <Divider />

      {/* SOCIAL MEDIA */}
      <section id="social" className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="05" text="Social Media" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-4 max-w-[700px]">
          16 posts prontos para o primeiro mês
        </h2>
        <p className="reveal font-body text-lg text-cinza leading-relaxed max-w-[700px] mb-12">
          Carrosséis educativos e posts institucionais, todos com copy estratégica e visual alinhado à nova identidade.
        </p>

        <div className="reveal bg-white rounded-2xl p-6 md:p-8 border border-cinza-light/40 mb-8">
          <h4 className="font-display text-lg text-midnight mb-4">Pilares de Conteúdo</h4>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { emoji: '\uD83D\uDCDA', name: 'Educação', desc: 'Conteúdo informativo sobre procedimentos' },
              { emoji: '\uD83C\uDFE5', name: 'Especialidades', desc: 'Destaque dos serviços oferecidos' },
              { emoji: '\uD83C\uDFAC', name: 'Bastidores', desc: 'Equipe e estrutura da clínica' },
              { emoji: '\u2B50', name: 'Prova Social', desc: 'Depoimentos e resultados' },
              { emoji: '\uD83D\uDCA1', name: 'Dicas de Saúde', desc: 'Conteúdo de valor para o paciente' },
            ].map((p, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-cream/60">
                <div className="text-2xl mb-2">{p.emoji}</div>
                <div className="font-body text-[13px] font-semibold text-midnight">{p.name}</div>
                <div className="font-body text-[11px] text-cinza mt-1">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <a href="https://drive.google.com/drive/folders/1rVwwrNX3uL24wo2EqpqmegE_48sw19dM" target="_blank" rel="noopener noreferrer" className="reveal inline-flex items-center gap-2 font-body text-[14px] font-semibold text-sage hover:text-sage-dark transition-colors">
          Ver todos os posts no Google Drive
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </section>

      <Divider />

      {/* CRIATIVOS ADS */}
      <section id="ads" className="py-20 bg-midnight">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <SectionLabel number="06" text="Criativos para Anúncios" />
          <h2 className="reveal font-display text-3xl md:text-4xl text-white mb-4 max-w-[700px]">
            10 peças prontas para Meta Ads
          </h2>
          <p className="reveal font-body text-lg text-white/60 leading-relaxed max-w-[700px] mb-12">
            Criativos divididos por objetivo de campanha: awareness (marca), conversão (agendamento) e remarketing (retorno).
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {[
              { phase: 'Awareness', count: '4 peças', desc: 'Apresentar a marca e serviços para público frio', color: 'bg-sage' },
              { phase: 'Conversão', count: '3 peças', desc: 'Agendar consulta / procedimento com CTA direto', color: 'bg-dourado' },
              { phase: 'Remarketing', count: '3 peças', desc: 'Reconquistar quem já visitou o site/IG', color: 'bg-sage-light' },
            ].map((p, i) => (
              <div key={i} className="reveal bg-midnight-deep rounded-xl p-6 border border-white/10" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={`inline-block ${p.color} text-white text-[11px] font-body font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-3`}>{p.phase}</div>
                <div className="font-display text-xl text-white mb-1">{p.count}</div>
                <p className="font-body text-[13px] text-white/50">{p.desc}</p>
              </div>
            ))}
          </div>

          <a href="https://drive.google.com/drive/folders/12SHKm4G0Pq9MLnaJTsrmWbWsWnVUhbQ7" target="_blank" rel="noopener noreferrer" className="reveal inline-flex items-center gap-2 font-body text-[14px] font-semibold text-dourado hover:text-dourado-light transition-colors">
            Ver todos os criativos no Google Drive
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </a>
        </div>
      </section>

      {/* PROJEÇÃO */}
      <section id="projecao" className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="07" text="Projeção de Resultados" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-4 max-w-[700px]">
          O que muda nos próximos 6 meses
        </h2>
        <p className="reveal font-body text-lg text-cinza leading-relaxed max-w-[700px] mb-12">
          Projeção conservadora baseada em benchmarks reais de clínicas de fisioterapia com assessoria de marketing digital ativa.
        </p>
        <div className="reveal overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-sage/20">
                <th className="font-body text-[12px] font-semibold tracking-wider uppercase text-cinza py-3 pr-4">Indicador</th>
                <th className="font-body text-[12px] font-semibold tracking-wider uppercase text-cinza py-3 px-4 text-center">Hoje</th>
                <th className="font-body text-[12px] font-semibold tracking-wider uppercase text-cinza py-3 px-4 text-center">3 meses</th>
                <th className="font-body text-[12px] font-semibold tracking-wider uppercase text-cinza py-3 px-4 text-center">6 meses</th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Score Digital', m0: '12 / 100', m3: '60 / 100', m6: '82 / 100', c0: 'text-red-500', c3: 'text-yellow-600', c6: 'text-sage' },
                { metric: 'Pacientes do digital/mês', m0: '0', m3: '20 \u2013 30', m6: '40 \u2013 60', c0: 'text-red-500', c3: 'text-yellow-600', c6: 'text-sage' },
                { metric: 'Receita adicional/mês', m0: 'R$ 0', m3: 'R$ 8 \u2013 12 mil', m6: 'R$ 18 \u2013 30 mil', c0: 'text-red-500', c3: 'text-yellow-600', c6: 'text-sage' },
                { metric: 'Posição Google Maps', m0: 'Invisível', m3: 'Top 5', m6: 'Top 3', c0: 'text-red-500', c3: 'text-yellow-600', c6: 'text-sage' },
                { metric: 'Instagram seguidores', m0: '~200', m3: '800+', m6: '2.000+', c0: 'text-cinza', c3: 'text-yellow-600', c6: 'text-sage' },
              ].map((r, i) => (
                <tr key={i} className="border-b border-cinza-light/30">
                  <td className="font-body text-[14px] text-preto py-3.5 pr-4">{r.metric}</td>
                  <td className={`font-body text-[14px] font-semibold py-3.5 px-4 text-center ${r.c0}`}>{r.m0}</td>
                  <td className={`font-body text-[14px] font-semibold py-3.5 px-4 text-center ${r.c3}`}>{r.m3}</td>
                  <td className={`font-body text-[14px] font-semibold py-3.5 px-4 text-center ${r.c6}`}>{r.m6}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Divider />

      {/* ESPECIALIDADES */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="08" text="Perfil da Clínica" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-8 max-w-[700px]">
          Informações da Santa Isabel
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="reveal bg-white rounded-2xl p-8 border border-cinza-light/40">
            <h4 className="font-display text-lg text-midnight mb-4">Especialidades</h4>
            <ul className="space-y-2">
              {clinicInfo.specialties.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] text-preto/70">
                  <span className="text-sage mt-0.5">{'\u2713'}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal bg-white rounded-2xl p-8 border border-cinza-light/40" style={{ transitionDelay: '100ms' }}>
            <h4 className="font-display text-lg text-midnight mb-4">Contato e Localização</h4>
            <div className="space-y-4">
              {[
                { label: 'Endereço', value: clinicInfo.address },
                { label: 'Telefone', value: clinicInfo.phone },
                { label: 'E-mail', value: clinicInfo.email },
                { label: 'Instagram', value: clinicInfo.instagram },
                { label: 'Fundação', value: clinicInfo.since },
                { label: 'CNPJ', value: '09.366.963/0001-88' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-baseline border-b border-cinza-light/20 pb-2">
                  <span className="font-body text-[12px] tracking-wider uppercase text-cinza font-semibold">{item.label}</span>
                  <span className="font-body text-[14px] text-midnight">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* LINKS CENTRALIZADOS */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <SectionLabel number="09" text="Todos os Links" />
        <h2 className="reveal font-display text-3xl md:text-4xl text-midnight mb-8 max-w-[700px]">
          Central de entregas
        </h2>
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Site Institucional', url: 'https://oguidomingos.github.io/trion-intelligence/site-santa-isabel.html', icon: '\uD83C\uDF10' },
            { title: 'Landing Page', url: 'https://oguidomingos.github.io/trion-intelligence/lp-santa-isabel.html', icon: '\u26A1' },
            { title: 'Logos e Brand', url: 'https://drive.google.com/drive/folders/1nS32_cBQU6Lf17hfnCck97n3g_aeaF-k', icon: '\uD83C\uDFA8' },
            { title: 'Posts Instagram', url: 'https://drive.google.com/drive/folders/1rVwwrNX3uL24wo2EqpqmegE_48sw19dM', icon: '\uD83D\uDCF7' },
            { title: 'Criativos Meta Ads', url: 'https://drive.google.com/drive/folders/12SHKm4G0Pq9MLnaJTsrmWbWsWnVUhbQ7', icon: '\uD83D\uDE80' },
            { title: 'Mockups', url: 'https://drive.google.com/drive/folders/1MjkUUciayR4enUYzR3Gjds_kdo5JGxvE', icon: '\uD83D\uDCF1' },
          ].map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white rounded-xl p-5 border border-cinza-light/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(42,125,107,0.06)] transition-all group">
              <div className="text-2xl">{link.icon}</div>
              <div className="flex-1">
                <div className="font-body text-[14px] font-semibold text-midnight group-hover:text-sage transition-colors">{link.title}</div>
                <div className="font-body text-[11px] text-cinza truncate">{link.url.replace('https://', '').substring(0, 50)}...</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cinza group-hover:text-sage transition-colors"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-midnight py-12">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-sage flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3C6.48 3 2 7.48 2 13c0 3.08 1.4 5.83 3.6 7.65l1.4-1.65C5.77 17.93 5 15.57 5 13c0-3.87 3.13-7 7-7s7 3.13 7 7c0 2.57-.77 4.93-2 6l1.4 1.65C20.6 18.83 22 16.08 22 13c0-5.52-4.48-10-10-10z"/><circle cx="12" cy="13" r="3"/></svg>
            </div>
            <span className="font-display text-lg text-white">Pulso</span>
          </div>
          <p className="font-body text-[13px] text-white/40">
            Assessoria de Marketing para Clínicas Médicas
          </p>
          <p className="font-body text-[11px] text-white/20 mt-4">
            Documento confidencial — uso restrito
          </p>
        </div>
      </footer>

    </div>
  )
}
