import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { motion } from 'motion/react';

// Brand SVGs
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-full h-full"}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const BehanceIcon = () => (
  // Using Text-based icon for Behance that renders perfectly in any size without viewBox bugs
  <div className="text-[#7241E3] group-hover:text-white transition-colors font-satoshi font-extrabold text-2xl sm:text-4xl flex items-center justify-center leading-none tracking-tighter w-full h-full pb-0.5 sm:pb-1">
    Bē
  </div>
);


interface LinkCardProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  actionText: string;
  href: string;
  delay?: number;
}

function LinkCard({ icon, title, actionText, href, delay = 0 }: LinkCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group flex flex-row items-center gap-4 sm:gap-6 w-full min-h-[110px] sm:min-h-[140px] p-4 sm:p-6 card-gradient rounded-3xl transition-all duration-300 hover:border-[#7241E3]/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#7241E3]/0 to-[#7241E3]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon Section */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 flex items-center justify-center rounded-2xl bg-[#3B0CA9]/20 group-hover:bg-[#7241E3]/20 transition-colors duration-300 [&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-8 sm:[&>svg]:h-8 [&>svg]:text-[#7241E3] group-hover:[&>svg]:text-white relative z-10">
        {icon}
      </div>
      
      {/* Content Section */}
      <div className="flex flex-col flex-grow items-start justify-center gap-1.5 sm:gap-2 relative z-10 overflow-visible min-w-0">
        <h3 className="font-satoshi font-medium text-[20px] sm:text-[24px] leading-tight text-[#f9f9f9] text-left group-hover:text-white transition-colors w-full break-words">
          {title}
        </h3>
        
        <div className="btn-uiverse mt-1.5 sm:mt-2 w-auto pointer-events-none">
          <div className="container-stars">
            <div className="stars"></div>
          </div>
          <div className="glow">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          <div className="text-wrapper text-[9.5px] sm:text-[13px] font-manrope font-bold text-[#f9f9f9] tracking-[0.1em] sm:tracking-widest uppercase whitespace-nowrap px-1">
            <span>{actionText}</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 ml-1.5 sm:ml-2 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function App() {
  // Guardamos o tamanho da tela para travar o vídeo
  // Isso previne o bug do iOS/Android onde o 100vh muda ao rolar a página
  const [videoSize, setVideoSize] = useState({ width: '100vw', height: '100vh' });

  useEffect(() => {
    let lastWidth = window.innerWidth;
    
    const updateSize = () => {
      setVideoSize({ 
        width: `${window.innerWidth}px`, 
        height: `${window.innerHeight}px` 
      });
    };
    
    // Atualiza imediatamente na montagem
    updateSize();

    // Atualiza apenas se a LARGURA mudar (ex: rotacionar o celular)
    // Assim ignoramos a mudança de altura ao rolar a página
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        updateSize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#080111] text-[#f9f9f9] selection:bg-[#7241E3]/30 font-satoshi overflow-x-hidden relative flex flex-col items-center">
      {/* Background glow effects */}
      <div className="fixed -top-48 -left-48 bg-glow pointer-events-none" />
      <div className="fixed -bottom-48 -right-48 bg-glow pointer-events-none" />

      {/* Background Video */}
      <div 
        className="fixed top-0 left-0 pointer-events-none z-0 overflow-hidden mix-blend-screen"
        style={{ width: videoSize.width, height: videoSize.height }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover scale-[1.35] opacity-60"
          src="/videobg.mp4" 
        />
        {/* Divs para escurecer o vídeo e melhorar a leitura dos textos */}
        <div className="absolute inset-0 bg-[#080111]/30 z-10" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#080111] via-transparent to-[#080111]/50" />
      </div>

      <main className="max-w-[480px] w-full px-6 py-12 relative z-10 mt-8 sm:mt-12">
        
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-10 text-center relative z-20"
        >
          {/* Profile Picture Placeholder - Círculo Voltou */}
          <div className="relative mb-6 group w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 accent-ring shadow-[0_0_40px_rgba(114,65,227,0.3)]">
            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden relative z-10">
              <img src="/profile.png" alt="Saulo Lima" className="w-full h-full object-cover" />
            </div>
          </div>

          <h1 className="text-4xl font-satoshi font-medium tracking-tight mb-2 text-[#F9F9F9]">
            Saulo Lima
          </h1>
          <p className="font-manrope font-light text-base text-zinc-300 leading-relaxed max-w-sm">
            Design de alto padrão aliado à inteligência estratégica. Crio páginas e interfaces que destacam sua marca e aceleram seus resultados.
            <br className="hidden sm:inline" />
            <span className="sm:hidden"> </span>Solicite um orçamento.
          </p>
        </motion.header>

        {/* Links Divider */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-xs font-manrope font-normal text-white/40 uppercase tracking-widest">Links úteis</span>
          <div className="h-px bg-white/10 flex-grow" />
        </motion.div>

        {/* Links Container */}
        <div className="flex flex-col gap-4 sm:gap-5 w-full">
          <LinkCard
            icon={<WhatsAppIcon />}
            title={<>Solicitar orçamento<br/>Para Sites</>}
            actionText="Fazer Orçamento"
            href="https://wa.me/5582993254247?text=Ol%C3%A1%20Saulo%2C%20gostaria%20de%20um%20or%C3%A7amento%20para%20sites"
            delay={0.3}
          />
          
          <LinkCard
            icon={<WhatsAppIcon />}
            title="Solicitar orçamento para Social Media"
            actionText="Fazer Orçamento"
            href="https://wa.me/5582993254247?text=Ol%C3%A1%20Saulo%2C%20gostaria%20de%20um%20or%C3%A7amento%20para%20social%20media"
            delay={0.4}
          />

          <LinkCard
            icon={<BehanceIcon />}
            title="Confira meu Portfólio"
            actionText="Ver Behance"
            href="https://www.behance.net/saulodsigner"
            delay={0.5}
          />
        </div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 pt-8 border-t border-white/5 w-full flex flex-col items-center gap-6"
        >
          {/* Social Mini-Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/saulodsigner/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 hover:bg-[#3B0CA9]/20 hover:border-[#7241E3]/50 transition-all text-zinc-400 hover:text-white group"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://wa.me/5582993254247"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 hover:bg-[#3B0CA9]/20 hover:border-[#7241E3]/50 transition-all text-zinc-400 hover:text-white group"
            >
              <div className="w-5 h-5 group-hover:scale-110 transition-transform flex items-center justify-center">
                <WhatsAppIcon />
              </div>
            </a>
          </div>
          
          <p className="font-manrope text-[10px] uppercase tracking-[0.2em] font-normal text-zinc-500 text-center">
            © {new Date().getFullYear()} Saulo Lima. Todos os direitos reservados.
          </p>
        </motion.footer>
      </main>
    </div>
  );
}
