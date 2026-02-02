
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ShieldCheck, 
  Search, 
  AlertTriangle, 
  Map, 
  Zap, 
  Lock, 
  CheckCircle2, 
  BrainCircuit,
  LayoutGrid,
  ArrowRight,
  ShieldAlert,
  BadgeCheck,
  Mail,
  ShieldQuestion,
  Terminal,
  Cpu,
  Fingerprint
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Sub-components (Core Logic) ---
const CHECKOUT_URL = "https://pay.cakto.com.br/hqkp9td_751652";
const BackgroundGrid: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (window.matchMedia('(hover: hover)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0D0D0D]" />
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: `translate(${(mousePos.x - window.innerWidth / 2) * 0.01}px, ${(mousePos.y - window.innerHeight / 2) * 0.01}px)`
        }}
      />
      <div 
        className="absolute inset-0 bg-radial-gradient from-[#39FF14]/5 to-transparent blur-[120px] opacity-40 hidden md:block"
        style={{
          left: mousePos.x - 350,
          top: mousePos.y - 350,
          width: '700px',
          height: '700px',
          transition: 'left 0.2s ease-out, top 0.2s ease-out'
        }}
      />
    </div>
  );
};

const TypewriterText: React.FC<{ text: string; delay?: number; className?: string }> = ({ text, delay = 0, className = "" }) => {
  const words = useMemo(() => text.split(" "), [text]);
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: delay } }
  };
  const item = { hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.p className={className} variants={container} initial="hidden" animate="visible">
      {words.map((word, i) => (
        <motion.span key={i} variants={item} className="inline-block mr-[0.3em]">{word}</motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-[#39FF14] ml-1 align-middle"
      />
    </motion.p>
  );
};

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={`relative z-10 py-24 md:py-48 px-6 sm:px-10 max-w-7xl mx-auto w-full ${className}`}>
    {children}
  </section>
);

const PriceBadge: React.FC = () => (
  <motion.div 
    initial={{ scale: 0, rotate: 0 }}
    animate={{ scale: 1, rotate: 12 }}
    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8 }}
    className="absolute -top-24 left-1/2 -translate-x-1/2 sm:-top-20 sm:-right-10 sm:left-auto sm:translate-x-0 md:-right-24 bg-[#39FF14] text-black font-mono font-bold px-4 py-3 sm:px-8 sm:py-5 rounded-xl sm:rounded-2xl shadow-[0_0_50px_rgba(57,255,20,0.4)] z-30 flex flex-col items-center justify-center min-w-[130px] sm:min-w-[180px] border-2 sm:border-4 border-black/10 pointer-events-none sm:pointer-events-auto scale-[0.7] sm:scale-100"
  >
    <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-black opacity-80 mb-0.5 sm:mb-1">Acesso Vitalício</p>
    <p className="text-lg sm:text-2xl md:text-3xl font-black tracking-tighter italic">R$ 27,90</p>
  </motion.div>
);

const ModuleCard: React.FC<{ title: string; description: React.ReactNode; result: string; icon: React.ReactNode; index: number }> = ({ title, description, result, icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
    className="group relative p-8 md:p-10 bg-[#1A1A1A]/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#39FF14]/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col h-full"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-4xl font-black select-none group-hover:opacity-20 transition-opacity">0{index + 1}</div>
    <div className="w-12 h-12 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center text-[#39FF14] mb-8 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all">{icon}</div>
    <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-6 leading-tight italic">{title}</h3>
    <div className="text-white/60 leading-relaxed text-base mb-10 font-light flex-grow">{description}</div>
    <div className="mt-auto pt-6 border-t border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
        <p className="text-[#39FF14] font-mono text-xs uppercase tracking-widest font-bold">Resultado: {result}</p>
      </div>
    </div>
  </motion.div>
);

const BonusCard: React.FC<{ number: string; title: string; subtitle: string; description: string; icon: React.ReactNode; delay: number }> = ({ number, title, subtitle, description, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -10 }}
    className="relative p-8 bg-[#1A1A1A]/80 border border-white/5 rounded-2xl overflow-hidden group shadow-2xl flex flex-col h-full"
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#39FF14] to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />
    <div className="mb-6 flex justify-between items-start">
      <div className="text-[#39FF14] group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <div className="font-mono text-[10px] text-white/20 tracking-widest font-black uppercase bg-white/5 px-3 py-1 rounded-full">{number}</div>
    </div>
    <h4 className="text-xl font-black uppercase text-white mb-2 leading-tight tracking-tight">
      <span className="text-[#39FF14]">{title}</span> <br/>
      <span className="text-white/80 text-sm mt-1 inline-block">{subtitle}</span>
    </h4>
    <p className="text-white/40 text-base leading-relaxed font-light italic mt-4 group-hover:text-white/60 transition-colors">{description}</p>
    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#39FF14]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

const CTAButton: React.FC<{ text: string; className?: string; onClick?: () => void }> = ({ text, className = "", onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={{ boxShadow: ['0 0 10px rgba(57,255,20,0.2)', '0 0 25px rgba(57,255,20,0.5)', '0 0 10px rgba(57,255,20,0.2)'] }}
    transition={{ repeat: Infinity, duration: 2 }}
    onClick={onClick}
    className={`bg-[#39FF14] text-black font-black py-5 px-10 rounded-xl tracking-tighter flex items-center justify-center gap-4 transition-all duration-300 relative overflow-hidden group w-full sm:w-auto ${className}`}
  >
    <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
    <span className="uppercase text-lg sm:text-xl font-black relative z-10 italic leading-none">{text}</span>
    <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
  </motion.button>
);

// --- Main App Component ---

export default function App() {

  const goToCheckout = useCallback(() => {
  window.location.href = CHECKOUT_URL;
}, []);

  const scrollToBuy = useCallback(() => {
    document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] text-white selection:bg-[#39FF14] selection:text-black overflow-x-hidden w-full">
      <div className="bg-grain" />
      <BackgroundGrid />

      {/* Top Status Bar */}
      <div className="absolute top-6 sm:top-14 left-0 w-full z-50 flex justify-center px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full border border-[#39FF14]/30 bg-black/60 backdrop-blur-xl flex items-center gap-4 shadow-[0_0_20px_rgba(57,255,20,0.1)] max-w-[90vw] sm:max-w-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14] shadow-[0_0_100px_#39FF14] animate-pulse flex-shrink-0" />
          <span className="text-[10px] sm:text-[12px] font-mono tracking-wide text-[#39FF14] font-bold">Status: Filtro Anti-Manada Ativo</span>
        </motion.div>
      </div>

      {/* Hero Section */}
      <Section className="pt-[18rem] sm:pt-[24rem] pb-24 sm:pb-56 flex flex-col items-center text-center">
        <div className="relative w-full max-w-5xl px-4 sm:px-0">
          <PriceBadge />
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center mb-16 sm:mb-24 select-none">
            <span className="text-8xl sm:text-9xl md:text-[10rem] font-black italic tracking-tighter uppercase leading-[0.7] text-white">Guia</span>
            <span className="text-6xl sm:text-8xl md:text-[9rem] font-black italic tracking-tighter uppercase leading-[0.8] bg-gradient-to-r from-[#39FF14] via-[#39FF14] to-[#2ba9ff] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(57,255,20,0.3)]">Anti-Manada</span>
          </motion.h1>
          <div className="max-w-4xl mx-auto">
            <TypewriterText 
              delay={1}
              className="text-lg sm:text-2xl md:text-3xl text-white/90 leading-relaxed font-medium tracking-tight px-4"
              text="Entenda o que realmente existe no mercado digital, quais modelos fazem sentido para o seu perfil e como entrar de forma estratégica e lucrativa sem cair em ilusão de gurus, promessas de enriquecimento rápido ou armadilhas disfarçadas de oportunidade."
            />
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3, duration: 0.8 }} className="mt-8 text-sm sm:text-base md:text-lg text-white/40 italic font-light tracking-wide leading-relaxed max-w-2xl mx-auto px-6">
              Se você já percebeu que todo mundo promete demais e explica de menos, este guia foi criado antes de você perder mais tempo, dinheiro e energy.
            </motion.p>
          </div>
          <div className="flex flex-col items-center gap-16 mt-20 sm:mt-28">
            <CTAButton text="DESBLOQUEAR ACESSO IMEDIATO" onClick={scrollToBuy} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="flex flex-wrap items-center justify-center gap-10 sm:gap-20 opacity-30">
              {['CLAREZA', 'LÓGICA', 'LUCRO'].map((pillar) => (
                <span key={pillar} className="text-xs sm:text-sm font-mono tracking-[0.6em] uppercase font-black">{pillar}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Pain Section */}
      <Section className="border-t border-white/5 bg-white/[0.01]">
        <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-5xl sm:text-7xl font-black mb-14 uppercase tracking-tighter italic leading-tight">A Ilusão do <br/><span className="text-[#39FF14]">Mercado Fácil</span></h2>
            <p className="text-white/60 mb-14 text-xl sm:text-2xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">O mercado digital não é impossível. Ele só é mal explicado de propósito para que você continue comprando cursos de quem vive de vender cursos.</p>
            <div className="space-y-8 text-left max-w-xl mx-auto lg:mx-0">
              {[
                "Ciclos constantes de promessas milagrosas.",
                "Estratégias que expiram em semanas.",
                "Complexidade desnecessária para vender mentoria.",
                "Sensação constante de estar fazendo algo errado, sem saber por onde começar e completamente perdido no mercado digital."
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0 mt-1"><AlertTriangle size={14} /></div>
                  <span className="text-white/80 font-medium text-lg leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
            <div className="absolute -inset-10 bg-[#39FF14]/5 blur-[100px]" />
            <div className="relative border border-white/10 p-10 sm:p-16 bg-[#1A1A1A]/90 backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="flex items-center gap-3 mb-12"><Terminal className="text-[#39FF14] w-5 h-5" /><div className="text-[10px] font-mono text-white/40 tracking-[0.5em] uppercase font-bold">Diagnóstico de Terminal</div></div>
              <div className="space-y-12">
                {[ { l: "Ruído de Hype", p: "92%", c: "bg-red-500", tc: "text-red-500" }, { l: "Estratégia Real", p: "8%", c: "bg-[#39FF14]", tc: "text-[#39FF14]" } ].map((diag, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex justify-between text-[11px] font-mono uppercase text-white/50 font-bold tracking-widest"><span>{diag.l}</span><span className={diag.tc}>{diag.p} {idx === 0 ? 'CRÍTICO' : 'MÍNIMO'}</span></div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: diag.p }} viewport={{ once: true }} transition={{ duration: 1.5 }} className={`h-full ${diag.c}`} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-16 p-8 border border-[#39FF14]/20 bg-[#39FF14]/5 text-lg font-mono text-[#39FF14] italic rounded-xl leading-relaxed">
                "Você não falhou por falta de capacidade. Você falhou porque o mapa que te deram estava desenhado para te levar ao precipício do consumo infinito."
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Modules Grid */}
      <Section id="modules">
        <div className="mb-24 sm:mb-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-full mb-8"><Cpu className="w-4 h-4 text-[#39FF14]" /><span className="text-[10px] font-mono text-[#39FF14] uppercase tracking-[0.3em] font-black">Core Intelligence</span></div>
          <h2 className="text-6xl sm:text-8xl md:text-9xl font-black mb-10 uppercase tracking-tighter italic leading-none text-white">CONTEÚDO <br/><span className="text-[#39FF14]">ESTRATÉGICO</span></h2>
          <p className="text-white/40 text-sm sm:text-lg font-mono tracking-[0.4em] uppercase font-bold max-w-3xl mx-auto">Acesso Imediato ao Mapa Racional do Mercado Digital.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <ModuleCard index={0} icon={<Search />} title="A Anatomia da Ilusão" description={<p>Entenda como o mercado cria confusão para te manter comprando cursos e como identificar promessas falsas antes de perder seu capital.</p>} result="Você entende que o problema nunca foi sua capacidade — e sim o jogo" />
          <ModuleCard index={1} icon={<Map />} title="O Mapa do Mercado Real" description={<p>Veja um raio-x honesto dos principais modelos: PLR, Infoprodutos, Afiliados, Dropshipping, TikTok Shop e Prestação de Serviços Digitais, detalhando o investimento, esforço e riscos reais de cada um.</p>} result="Você para de pular de galho em galho e passa a enxergar o mercado como um tabuleiro de negócios racional." />
          <ModuleCard index={2} icon={<BrainCircuit />} title="O Filtro de Perfil" description={<p>A metodologia para cruzar seu tempo, capital e habilidades com o modelo ideal. <span className="text-[#39FF14] font-bold italic">Pare de forçar caminhos</span> que não foram feitos para o seu estilo de jogo.</p>} result="Direcionamento Estratégico" />
          <ModuleCard index={3} icon={<Zap />} title="Execução Enxuta" description={<p>Como construir sua primeira operação sem ferramentas de R$ 500/mês. Foco total em <span className="text-[#39FF14] font-bold">Fluxo de Caixa</span> imediato e escalabilidade orgânica.</p>} result="Ready for Operation" />
        </div>
      </Section>

      {/* Bonus Section */}
      <Section className="bg-[#0A0A0A]">
        <div className="flex flex-col items-center mb-24">
          <div className="w-16 h-16 rounded-full border border-[#39FF14]/30 flex items-center justify-center text-[#39FF14] mb-8 bg-[#39FF14]/5"><Lock size={32} /></div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter italic text-center leading-none">ARQUIVOS DESBLOQUEADOS <br/><span className="text-[#39FF14] text-xl sm:text-2xl md:text-3xl block mt-4 font-mono font-bold tracking-widest">(O QUE VOCÊ RECEBE ALÉM DO GUIA)</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          <BonusCard number="BÔNUS 01" title="O Filtro de Viabilidade" subtitle="Pare de dar tiros no escuro" description="Um protocolo para identificar nichos que realmente dão lucro e descartar os 'buracos negros' de capital antes de investir seu tempo neles." icon={<Fingerprint size={32} />} delay={0.1} />
          <BonusCard number="BÔNUS 02" title="Checklist da Operação" subtitle="Fature sem pagar 'pedágio'" description="A lista das únicas ferramentas gratuitas necessárias para iniciar no digital de forma enxuta, evitando assinaturas caras e focando no ROI." icon={<Zap size={32} />} delay={0.2} />
          <BonusCard number="BÔNUS 03" title="Mapa de Decisão" subtitle="Blindagem cognitiva instantânea" description="Um material simples para revisar seu caminho sempre que surgir uma nova 'oportunidade milagrosa'. Mantenha o foco absoluto na meta." icon={<LayoutGrid size={32} />} delay={0.3} />
        </div>
        <div className="mt-32 flex flex-col items-center text-center">
            <div className="max-w-2xl p-8 rounded-2xl bg-[#1A1A1A]/40 border border-white/5 relative mb-16"><div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#39FF14] text-black font-mono font-bold text-[10px] rounded-full">RELATÓRIO PDF</div><p className="text-white/40 font-mono text-sm uppercase tracking-widest font-bold">"Material técnico, denso e sem enrolação. Criado para quem cansou de ser audiência e quer ser proprietário."</p></div>
            <CTAButton text="EU QUERO MEU ACESSO AGORA" onClick={scrollToBuy} />
        </div>
      </Section>

      {/* Pricing / Final CTA */}
      <Section id="buy" className="pt-24 pb-48">
        <div className="mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl sm:text-8xl font-black mb-10 uppercase tracking-tighter italic leading-none text-white"
          >
            Acerto de Contas <br/>
            <span className="text-[#39FF14]">com a Realidade</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg sm:text-2xl italic font-light max-w-3xl mx-auto leading-relaxed px-4"
          >
            "Aqui você não vai aprender a ficar rico rápido. Vai aprender a não escolher errado para que o sucesso seja inevitável."
          </motion.p>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] bg-[#111] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] relative group">
            <div className="p-10 md:p-20 border-b lg:border-b-0 lg:border-r border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
              <div className="flex items-center gap-4 mb-16"><ShieldAlert className="w-10 h-10 text-[#39FF14]" /><span className="text-sm font-mono uppercase tracking-[0.6em] text-white/40 font-bold">Protocolo de Entrega</span></div>
              <div className="space-y-12 mb-20">
                {[ { t: "Guia Anti-Manada Completo", d: "A lógica estruturada do mercado digital." }, { t: "Filtro de Viabilidade de Nicho", d: "Protocolo de seleção de lucro real." }, { t: "Checklist da Operação Enxuta", d: "Ferramentas zero custo para início." }, { t: "Mapa de Decisão Estratégica", d: "Blindagem definitiva contra hype." } ].map((item, i) => (
                  <div key={i} className="flex gap-8 group/item">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center group-hover/item:bg-[#39FF14]/20 transition-all"><CheckCircle2 className="w-6 h-6 text-[#39FF14]" /></div>
                    <div><h4 className="text-white font-bold text-2xl mb-2 italic tracking-tight">{item.t}</h4><p className="text-white/40 text-lg leading-relaxed">{item.d}</p></div>
                  </div>
                ))}
              </div>
              <div className="p-10 border border-[#39FF14]/20 bg-[#39FF14]/5 rounded-[2rem] flex flex-col sm:flex-row items-center gap-8">
                <BadgeCheck className="w-16 h-16 text-[#39FF14]" /><div className="text-center sm:text-left"><h4 className="text-[#39FF14] font-black text-3xl uppercase italic tracking-tighter">Garantia Total: 30 Dias</h4><p className="text-white/60 text-lg leading-relaxed italic font-light">Se este material não trouxer clareza absoluta sobre seu próximo passo, devolvemos seu dinheiro. Risco é zero.</p></div>
              </div>
            </div>
            <div className="p-10 md:p-20 bg-[#0D0D0D] flex flex-col justify-center items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#39FF14]/5 blur-[120px] rounded-full" />
              <div className="text-center relative z-10 w-full mb-16">
                <p className="text-[12px] font-mono text-white/40 uppercase tracking-[0.7em] mb-10 font-black italic">Investimento Estratégico</p>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative inline-block opacity-20"><span className="text-3xl font-mono text-white line-through">R$ 97,00</span><div className="absolute top-1/2 left-0 h-[2px] w-full bg-[#39FF14] -rotate-3" /></div>
                  <div className="flex flex-col items-center"><span className="text-7xl sm:text-9xl font-black text-[#39FF14] italic tracking-tighter leading-none drop-shadow-[0_0_40px_rgba(57,255,20,0.4)]">R$ 27,90</span><p className="text-[10px] font-mono text-[#39FF14]/60 uppercase tracking-widest mt-6">Pagamento Único • Acesso Vitalício</p></div>
                </div>
              </div>
              <div className="relative z-10 w-full space-y-8"><CTAButton text="GARANTIR MEU ACESSO AGORA" className="w-full py-7 text-xl" onClick={goToCheckout} /><p className="text-sm text-white/30 font-light italic text-center max-w-sm mx-auto leading-relaxed">Pelo preço de um café e um lanche, você economiza meses de tentativa e erro e milhares de reais em cursos inúteis.</p></div>
              <div className="mt-16 pt-16 border-t border-white/5 w-full flex flex-col items-center gap-8"><div className="flex items-center gap-10 grayscale opacity-30"><span className="font-black italic text-xl">VISA</span><span className="font-black italic text-xl">MASTER</span><span className="font-black italic text-xl">PIX</span></div><div className="flex items-center gap-3 text-[10px] font-mono text-white/20 uppercase tracking-widest bg-white/5 px-8 py-4 rounded-full border border-white/5"><ShieldCheck size={16} className="text-[#39FF14]/50" />Conexão Criptografada SSL</div></div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#050505] pt-32 pb-16 px-6 sm:px-10 overflow-hidden w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 mb-24">
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-6"><div className="w-16 h-16 border border-[#39FF14]/20 flex items-center justify-center rounded-2xl bg-[#39FF14]/5"><ShieldCheck className="w-10 h-10 text-[#39FF14]" /></div><div className="text-left"><p className="font-black text-2xl tracking-tighter italic uppercase">GUIA ANTI-MANADA</p><p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">Protocolo v2.6</p></div></div>
            <p className="text-lg text-white/30 leading-relaxed font-light italic">Filtrando o ruído, entregando o sinal. A inteligência estratégica que o mercado digital tentou esconder de você.</p>
          </div>
          <div className="flex flex-col gap-8"><h4 className="font-mono text-xs uppercase tracking-[0.6em] text-white/60 font-black mb-2 flex items-center gap-3"><Mail className="w-5 h-5 text-[#39FF14]" /> Suporte Direto</h4><a href="mailto:contato@guiaantimanada.com" className="text-xl text-white/40 hover:text-[#39FF14] transition-colors font-mono">contato@guiaantimanada.com</a><p className="text-[11px] text-white/20 uppercase tracking-widest italic font-bold">Atendimento Humano em 24h</p></div>
          <div className="flex flex-col gap-8"><h4 className="font-mono text-xs uppercase tracking-[0.6em] text-white/60 font-black mb-2 flex items-center gap-3"><ShieldQuestion className="w-5 h-5 text-[#39FF14]" /> FAQ Rápido</h4><p className="text-base text-white/30 italic leading-relaxed">O material é 100% digital e o acesso é enviado automaticamente para o seu e-mail após a compra.</p></div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left"><p className="text-[11px] font-mono text-white/20 uppercase tracking-[0.4em] font-black">© 2026 • GUIA ANTI-MANADA • TODOS OS DIREITOS RESERVADOS</p><div className="px-10 py-4 bg-white/[0.02] border border-white/5 rounded-full"><p className="text-[10px] font-mono text-white/10 tracking-[0.4em] uppercase">ESTE SITE NÃO É DO GOOGLE OU META</p></div></div>
      </footer>
    </div>
  );
}
