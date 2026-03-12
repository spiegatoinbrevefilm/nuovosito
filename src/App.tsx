import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { Menu, ArrowRight, X, ArrowUpRight, Plus, Instagram, Youtube, Facebook, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const ParallaxImage = ({ src, alt, className }: { src: string, alt?: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, height: '130%', top: '-15%', width: '100%', position: 'absolute' }}>
        <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            draggable="false"
          />
        </div>
      </motion.div>
    </div>
  );
};

import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 pt-6 pb-12 transition-all duration-500 ${scrolled ? 'bg-gradient-to-b from-redd-light/100 via-redd-light/80 to-transparent text-redd-dark' : 'text-white'}`}>
      <div className="flex flex-col">
        <div className="text-xl font-bold tracking-tight uppercase">LORENZO PACI</div>
        <div className="text-[10px] tracking-[0.2em] uppercase opacity-70">CREATIVE VISIONARY</div>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/admin" className="hidden md:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
          <Lock size={14} /> Admin Panel
        </Link>
        <button onClick={onMenuClick} className="flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
          Menu <Menu size={18} />
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 1500], [1, 1.3]);
  const overlayOpacity = useTransform(scrollY, [0, 800], [0, 0.8]);

  return (
    <section className="relative z-0 h-[100vh] w-full bg-redd-dark">
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden -z-10">
        <div className="sticky top-0 h-screen w-full">
          <motion.img 
            style={{ scale, transformOrigin: "bottom center" }}
            src="https://picsum.photos/seed/landscape/1920/1080" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black pointer-events-none" />
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-end p-6 md:p-16 lg:p-24 pb-24 md:pb-32 pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] max-w-5xl pointer-events-auto"
        >
          Buitenruimtes die leven, door een proces dat klopt
        </motion.h1>
      </div>
    </section>
  );
};

const processSteps = [
  { title: "We ground.", desc: "Onderzoek en analyse vormen de basis van elk succesvol project." },
  { title: "We shape.", desc: "Vormgeving van ruimte en structuur met oog voor detail." },
  { title: "We plant.", desc: "Plannen worden plekken. Materialen gaan leven." },
  { title: "We grow.", desc: "Onderhoud en ontwikkeling over tijd voor een blijvend resultaat." }
];

const Process = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const { scrollYProgress: entranceProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  const padding = useTransform(entranceProgress, [0, 1], ["24px", "0px"]);
  const borderRadius = useTransform(entranceProgress, [0, 1], ["48px", "0px"]);

  return (
    <section ref={ref} className="relative z-10 h-[80vh] md:h-screen w-full bg-redd-light border-t-[16px] md:border-t-[24px] border-white">
      <motion.div style={{ paddingTop: padding, paddingLeft: padding, paddingRight: padding, width: '100%', height: '100%' }}>
        <motion.div 
          style={{ borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius, overflow: 'hidden' }}
          className="relative h-full w-full bg-redd-dark text-white flex flex-col md:flex-row"
        >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.img 
            style={{ y, height: '130%', top: '-15%', width: '100%', position: 'absolute', objectFit: 'cover' }}
            src="https://picsum.photos/seed/process/1920/1080" 
            alt="Process background" 
            className="opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Large Absolute Text */}
        <div className="absolute inset-0 p-6 md:p-16 lg:p-24 pointer-events-none flex flex-col justify-center md:justify-start md:pt-32 z-10">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif max-w-5xl leading-[1.1]">
            Het succes van de buitenruimte schuilt in het proces.
          </h2>
        </div>

        {/* 4 Columns (Desktop) */}
        <div className="relative z-20 hidden md:flex w-full h-full">
          {processSteps.map((step, i) => (
            <div 
              key={i} 
              className="group relative flex-1 flex flex-col justify-end p-8 lg:p-12 overflow-hidden"
            >
              {i < processSteps.length - 1 && (
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-t from-white/30 via-white/5 to-transparent pointer-events-none" />
              )}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <a href="#" className="absolute inset-x-0 bottom-0 h-1/2 z-20" />

              <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-4 pointer-events-none">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 flex items-center gap-4">
                  {step.title}
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" size={24} />
                </h3>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                  <p className="overflow-hidden text-sm lg:text-base text-gray-300">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile List */}
        <div className="relative z-20 flex md:hidden flex-col justify-end h-full w-full p-6 pb-12 gap-6">
          {processSteps.map((step, i) => (
            <div key={i} className="border-b border-white/20 pb-4 last:border-0">
              <h3 className="text-2xl font-bold mb-2 flex items-center justify-between">
                {step.title}
                <ArrowRight size={20} className="opacity-50" />
              </h3>
              <p className="text-gray-300 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const baseProjects = [
  {
    title: "Landgoed Kennemerland",
    image: "https://picsum.photos/seed/kennemerland/1200/1000",
    link: "#kennemerland",
    description: "Non vedete l'ora di scoprire le novità Netflix di marzo 2026 tra film, serie TV e originals?\n\nIl servizio di streaming accoglie ogni mese tanti nuovi contenuti, e anche questo non fa eccezione. Andiamo quindi a scoprire insieme cosa guardare su Netflix durante questo mese tra inverno e primavera, ricco di film e serie TV da non perdere.\n\nSe state cercando consigli su cosa vedere su Netflix a marzo 2026 siete capitati nel posto giusto, perché stiamo per proporvi una selezione delle migliori novità tra film, serie TV e contenuti originali in uscita sul catalogo del popolare servizio di streaming, ordinate in base alla data di uscita. Partiamo come sempre con i film.\n\nIndice:\n\nCosa guardare su Netflix a marzo 2026\nCosa guardare su Netflix, le altre serie TV e i film consigliati per marzo",
    gallery: [
      { url: "https://picsum.photos/seed/kennemerland1/1200/800", title: "Vista frontale", description: "Una splendida vista frontale della villa.", link: "#" },
      { url: "https://picsum.photos/seed/kennemerland2/1200/800", title: "Dettaglio giardino", description: "Particolare delle piante scelte per il giardino.", link: "#" },
      { url: "https://picsum.photos/seed/kennemerland3/1200/800", title: "Area relax", description: "Zona relax con divani e tavolino all'aperto.", link: "#" },
      { url: "https://picsum.photos/seed/kennemerland4/1200/800", title: "Piscina", description: "La piscina a sfioro immersa nel verde.", link: "#" },
    ]
  },
  {
    title: "Mediterraanse Villatuin",
    image: "https://picsum.photos/seed/zeist2/1200/1000",
    link: "#zeist",
    description: "Non vedete l'ora di scoprire le novità Netflix di marzo 2026 tra film, serie TV e originals?\n\nIl servizio di streaming accoglie ogni mese tanti nuovi contenuti, e anche questo non fa eccezione. Andiamo quindi a scoprire insieme cosa guardare su Netflix durante questo mese tra inverno e primavera, ricco di film e serie TV da non perdere.\n\nSe state cercando consigli su cosa vedere su Netflix a marzo 2026 siete capitati nel posto giusto, perché stiamo per proporvi una selezione delle migliori novità tra film, serie TV e contenuti originali in uscita sul catalogo del popolare servizio di streaming, ordinate in base alla data di uscita. Partiamo come sempre con i film.\n\nIndice:\n\nCosa guardare su Netflix a marzo 2026\nCosa guardare su Netflix, le altre serie TV e i film consigliati per marzo",
    gallery: [
      { url: "https://picsum.photos/seed/zeist21/1200/800", title: "Ingresso principale", description: "L'ingresso accogliente con piante mediterranee.", link: "#" },
      { url: "https://picsum.photos/seed/zeist22/1200/800", title: "Patio interno", description: "Un patio ombreggiato perfetto per le giornate calde.", link: "#" },
      { url: "https://picsum.photos/seed/zeist23/1200/800", title: "Dettaglio fontana", description: "La fontana centrale che crea un'atmosfera rilassante.", link: "#" },
      { url: "https://picsum.photos/seed/zeist24/1200/800", title: "Vista serale", description: "Il giardino illuminato durante le ore serali.", link: "#" },
    ]
  },
  {
    title: "Stadstuin Zuid-Holland",
    image: "https://picsum.photos/seed/stadstuin/1200/1000",
    link: "#stadstuin",
    description: "Non vedete l'ora di scoprire le novità Netflix di marzo 2026 tra film, serie TV e originals?\n\nIl servizio di streaming accoglie ogni mese tanti nuovi contenuti, e anche questo non fa eccezione. Andiamo quindi a scoprire insieme cosa guardare su Netflix durante questo mese tra inverno e primavera, ricco di film e serie TV da non perdere.\n\nSe state cercando consigli su cosa vedere su Netflix a marzo 2026 siete capitati nel posto giusto, perché stiamo per proporvi una selezione delle migliori novità tra film, serie TV e contenuti originali in uscita sul catalogo del popolare servizio di streaming, ordinate in base alla data di uscita. Partiamo come sempre con i film.\n\nIndice:\n\nCosa guardare su Netflix a marzo 2026\nCosa guardare su Netflix, le altre serie TV e i film consigliati per marzo",
    gallery: [
      { url: "https://picsum.photos/seed/stadstuin1/1200/800", title: "Prospettiva urbana", description: "Come il giardino si integra nel contesto cittadino.", link: "#" },
      { url: "https://picsum.photos/seed/stadstuin2/1200/800", title: "Zona pranzo", description: "Area dedicata ai pasti all'aperto.", link: "#" },
      { url: "https://picsum.photos/seed/stadstuin3/1200/800", title: "Verde verticale", description: "Soluzioni salvaspazio con piante rampicanti.", link: "#" },
      { url: "https://picsum.photos/seed/stadstuin4/1200/800", title: "Illuminazione", description: "Studio dell'illuminazione per valorizzare gli spazi.", link: "#" },
    ]
  },
  {
    title: "Dakterras Amsterdam",
    image: "https://picsum.photos/seed/dakterras/1200/1000",
    link: "#dakterras",
    description: "Non vedete l'ora di scoprire le novità Netflix di marzo 2026 tra film, serie TV e originals?\n\nIl servizio di streaming accoglie ogni mese tanti nuovi contenuti, e anche questo non fa eccezione. Andiamo quindi a scoprire insieme cosa guardare su Netflix durante questo mese tra inverno e primavera, ricco di film e serie TV da non perdere.\n\nSe state cercando consigli su cosa vedere su Netflix a marzo 2026 siete capitati nel posto giusto, perché stiamo per proporvi una selezione delle migliori novità tra film, serie TV e contenuti originali in uscita sul catalogo del popolare servizio di streaming, ordinate in base alla data di uscita. Partiamo come sempre con i film.\n\nIndice:\n\nCosa guardare su Netflix a marzo 2026\nCosa guardare su Netflix, le altre serie TV e i film consigliati per marzo",
    gallery: [
      { url: "https://picsum.photos/seed/dakterras1/1200/800", title: "Vista panoramica", description: "La vista mozzafiato dalla terrazza.", link: "#" },
      { url: "https://picsum.photos/seed/dakterras2/1200/800", title: "Lounge area", description: "Spazio lounge con arredi di design.", link: "#" },
      { url: "https://picsum.photos/seed/dakterras3/1200/800", title: "Dettaglio pavimentazione", description: "Scelta dei materiali per la pavimentazione esterna.", link: "#" },
      { url: "https://picsum.photos/seed/dakterras4/1200/800", title: "Piante in vaso", description: "Selezione di piante adatte al clima della terrazza.", link: "#" },
    ]
  },
  {
    title: "Moderne Stadstuin",
    image: "https://picsum.photos/seed/moderne/1200/1000",
    link: "#moderne",
    description: "Non vedete l'ora di scoprire le novità Netflix di marzo 2026 tra film, serie TV e originals?\n\nIl servizio di streaming accoglie ogni mese tanti nuovi contenuti, e anche questo non fa eccezione. Andiamo quindi a scoprire insieme cosa guardare su Netflix durante questo mese tra inverno e primavera, ricco di film e serie TV da non perdere.\n\nSe state cercando consigli su cosa vedere su Netflix a marzo 2026 siete capitati nel posto giusto, perché stiamo per proporvi una selezione delle migliori novità tra film, serie TV e contenuti originali in uscita sul catalogo del popolare servizio di streaming, ordinate in base alla data di uscita. Partiamo come sempre con i film.\n\nIndice:\n\nCosa guardare su Netflix a marzo 2026\nCosa guardare su Netflix, le altre serie TV e i film consigliati per marzo",
    gallery: [
      { url: "https://picsum.photos/seed/moderne1/1200/800", title: "Linee pulite", description: "Design minimalista e linee geometriche.", link: "#" },
      { url: "https://picsum.photos/seed/moderne2/1200/800", title: "Materiali moderni", description: "Uso di cemento, acciaio e legno.", link: "#" },
      { url: "https://picsum.photos/seed/moderne3/1200/800", title: "Specchio d'acqua", description: "Elemento d'acqua centrale dal design contemporaneo.", link: "#" },
      { url: "https://picsum.photos/seed/moderne4/1200/800", title: "Contrasti", description: "Gioco di contrasti tra vegetazione e materiali duri.", link: "#" },
    ]
  }
];

const featuredProjects = Array(10).fill(baseProjects).flat();

const Lightbox = ({ isOpen, onClose, project }: { isOpen: boolean, onClose: () => void, project: any }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSelectedImageIndex(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null && project?.gallery) {
      setSelectedImageIndex(selectedImageIndex === 0 ? project.gallery.length - 1 : selectedImageIndex - 1);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null && project?.gallery) {
      setSelectedImageIndex(selectedImageIndex === project.gallery.length - 1 ? 0 : selectedImageIndex + 1);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && project && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto text-redd-dark"
          >
            <button 
              onClick={onClose}
              className="fixed top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors z-[110]"
            >
              <X size={24} />
            </button>
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-32">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24">
                {/* Left side: Text */}
                <div className="w-full lg:w-1/2 flex flex-col">
                  <div className="text-sm tracking-[0.2em] uppercase text-gray-400 mb-4 font-bold">PROJECTS</div>
                  <h2 className="text-5xl md:text-7xl font-sans tracking-tight mb-12 uppercase">{project.title}</h2>
                  
                  <div className="text-lg text-gray-600 space-y-6 leading-relaxed">
                    {project.description?.split('\n').map((paragraph: string, i: number) => (
                      <p key={i} className="min-h-[1rem]">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                {/* Right side: Cover Image (Sticky) */}
                <div className="w-full lg:w-1/2">
                  <div className="sticky top-24 overflow-hidden rounded-3xl shadow-2xl group">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
              
              {/* Gallery Section */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="border-t border-gray-200 pt-16">
                  <div className="text-sm tracking-[0.2em] uppercase text-gray-400 mb-12 font-bold">PROJECT GALLERY</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.gallery.map((img: any, idx: number) => (
                      <div 
                        key={idx}
                        className="overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
                        onClick={() => setSelectedImageIndex(idx)}
                      >
                        <img 
                          src={img.url}
                          alt={img.title || `${project.title} gallery ${idx + 1}`}
                          className="w-full object-cover aspect-video transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Second Lightbox for Gallery Images */}
      <AnimatePresence>
        {selectedImageIndex !== null && project?.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/85 overflow-y-auto"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button 
              onClick={() => setSelectedImageIndex(null)}
              className="fixed top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-[210]"
            >
              <X size={24} />
            </button>

            {/* Navigation Arrows */}
            <button 
              onClick={handlePrevImage}
              className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-[210]"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNextImage}
              className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-[210]"
            >
              <ChevronRight size={24} />
            </button>
            
            <div className="min-h-screen flex flex-col items-center p-4 py-24 md:p-12 md:py-24">
              <div className="relative w-full max-w-6xl flex flex-col items-center my-auto" onClick={(e) => e.stopPropagation()}>
                <motion.img 
                  key={selectedImageIndex} // Force re-render on index change for animation
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  src={project.gallery[selectedImageIndex].url} 
                  alt={project.gallery[selectedImageIndex].title || "Gallery fullscreen"} 
                  className="w-full h-auto object-contain rounded-lg shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                
                {/* Image Info */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="mt-8 text-center text-white max-w-3xl"
                >
                  {project.gallery[selectedImageIndex].title && (
                    <h3 className="text-3xl font-bold mb-4">{project.gallery[selectedImageIndex].title}</h3>
                  )}
                  {project.gallery[selectedImageIndex].description && (
                    <p className="text-gray-300 text-base mb-6 leading-relaxed">{project.gallery[selectedImageIndex].description}</p>
                  )}
                  {project.gallery[selectedImageIndex].link && project.gallery[selectedImageIndex].link !== "#" && (
                    <a 
                      href={project.gallery[selectedImageIndex].link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-1"
                    >
                      View Details <ArrowUpRight size={16} />
                    </a>
                  )}
                  
                  {/* Image Counter */}
                  <div className="mt-12 text-sm tracking-[0.2em] text-white/50 font-mono">
                    {selectedImageIndex + 1} / {project.gallery.length}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HorizontalGallery = ({ offset = 0, isLast = false, onMenuClick, onOpenLightbox }: { offset?: number, isLast?: boolean, onMenuClick?: () => void, onOpenLightbox?: (project: any) => void }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.8]);
  const [activeIndex, setActiveIndex] = useState(baseProjects.length * 5 + offset);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    const swipeVelocity = velocity.x;
    
    if (swipe < -10 || swipeVelocity < -100) {
      setActiveIndex((prev) => Math.min(prev + 1, featuredProjects.length - 1));
    } else if (swipe > 10 || swipeVelocity > 100) {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const getStyles = (rel: number) => {
    if (rel === 0) {
      return {
        width: '65vw',
        height: 'calc(100vh - 4rem)',
        left: '0vw',
        top: '2rem',
        zIndex: 10,
        opacity: 1,
        borderTopRightRadius: '3rem',
        borderBottomLeftRadius: isLast ? '3rem' : '0rem',
      };
    } else if (rel === 1) {
      return {
        width: '26vw',
        height: 'calc(100vh - 16rem)',
        left: 'calc(65vw + 2rem)',
        top: '8rem',
        zIndex: 20,
        opacity: 1,
        borderTopRightRadius: '0rem',
      };
    } else if (rel === 2) {
      return {
        width: '26vw',
        height: 'calc(100vh - 16rem)',
        left: 'calc(91vw + 4rem)',
        top: '8rem',
        zIndex: 20,
        opacity: 1,
        borderTopRightRadius: '0rem',
      };
    } else if (rel === 3) {
      return {
        width: '26vw',
        height: 'calc(100vh - 16rem)',
        left: 'calc(117vw + 6rem)',
        top: '8rem',
        zIndex: 20,
        opacity: 1,
        borderTopRightRadius: '0rem',
      };
    } else if (rel < 0) {
      return {
        width: '65vw',
        height: 'calc(100vh - 4rem)',
        left: '-30vw',
        top: '2rem',
        zIndex: 5,
        opacity: 0,
        borderTopRightRadius: '3rem',
      };
    } else {
      return {
        width: '26vw',
        height: 'calc(100vh - 16rem)',
        left: 'calc(143vw + 8rem)',
        top: '8rem',
        zIndex: 20,
        opacity: 0,
        borderTopRightRadius: '0rem',
      };
    }
  };

  return (
    <>
      <div className="relative w-full h-0 z-0">
        <div ref={ref} className="absolute top-0 left-0 w-full h-screen pointer-events-none invisible" />
      </div>
      <section className={`h-screen w-full relative z-0 overflow-hidden bg-white sticky top-0 ${isLast ? 'rounded-b-[2rem] md:rounded-b-[3rem]' : ''}`}>
        {/* Background Layers */}
      <div className="absolute inset-x-0 top-0 bottom-4 md:bottom-6 flex pointer-events-none">
        <div className="w-[65vw] h-full bg-white" />
        <div className="w-[35vw] h-full bg-white flex flex-col justify-between p-8 md:p-12">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl md:text-4xl font-sans uppercase tracking-tight text-redd-dark">NOME GALLERIA</h3>
          </div>
        </div>
      </div>

      {/* Images Layer */}
      <div className="absolute inset-x-0 top-0 bottom-4 md:bottom-6">
        {featuredProjects.map((proj, i) => {
          const rel = i - activeIndex;
          if (rel < -2 || rel > 4) return null;
          const styles = getStyles(rel);

          return (
            <motion.div
              key={i}
              initial={false}
              animate={styles}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing group"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              onClick={() => {
                if (rel === 0 && onOpenLightbox) onOpenLightbox(proj);
              }}
            >
              <ParallaxImage 
                src={proj.image} 
                alt={proj.title} 
                className="w-full h-full pointer-events-none"
              />
              
              <motion.div 
                animate={{ opacity: rel === 0 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-black/20 pointer-events-none" 
              />
              
              <motion.div 
                animate={{ opacity: rel > 0 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-transparent pointer-events-none" 
              />

              <motion.div 
                animate={{ 
                  opacity: rel === 0 ? 1 : 0,
                  x: rel === 0 ? 0 : (rel < 0 ? -50 : 50)
                }}
                transition={{ duration: 0.6, delay: rel === 0 ? 0.2 : 0 }}
                className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between text-white pointer-events-none"
              >
                <div className="text-xl font-bold tracking-widest uppercase opacity-0">REDD</div>
                
                <div className="my-auto">
                  <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-serif leading-tight drop-shadow-lg max-w-4xl">
                    {proj.title}
                  </h2>
                  <p className="mt-4 text-lg md:text-xl max-w-2xl line-clamp-2 drop-shadow-md text-gray-200">
                    {proj.description}
                  </p>
                </div>

                <div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenLightbox) onOpenLightbox(proj);
                    }} 
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity pointer-events-auto cursor-pointer"
                  >
                    Visit project <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Hint Arrow */}
      <div className="absolute top-1/2 left-[calc(78vw+2rem)] -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer z-50" onClick={() => setActiveIndex(prev => Math.min(prev + 1, featuredProjects.length - 1))}>
        <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg text-redd-dark">
          <ArrowRight size={20} />
        </div>
        <span className="text-xs uppercase tracking-widest font-bold text-redd-dark bg-white/80 px-2 py-1 rounded">Drag or Click</span>
      </div>

      {/* UI Overlay (Buttons) */}
      <div className="absolute inset-x-0 bottom-0 h-[8rem] pointer-events-none z-50 flex items-start pt-8">
        <div className="w-[calc(65vw+2rem)]" />
        <div className="flex-1 flex justify-between items-center pr-8 md:pr-12 pointer-events-auto">
          <div className="flex-1 flex justify-center">
            <button 
              onClick={() => onOpenLightbox && onOpenLightbox(featuredProjects[activeIndex])}
              className="border border-redd-dark px-6 py-3 text-sm uppercase tracking-widest hover:bg-redd-dark hover:text-white transition-colors flex items-center gap-2 bg-white"
            >
              Apri galleria completa <ArrowRight size={16} />
            </button>
          </div>
          <div className="text-2xl font-sans tracking-tight text-redd-dark">
            {activeIndex + 1}/{featuredProjects.length}
          </div>
        </div>
      </div>
      {!isLast && <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-x-0 top-0 bottom-4 md:bottom-6 bg-black z-50 pointer-events-none" />}
    </section>
    </>
  );
};

const Team = () => {
  return (
    <section className="py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-redd-dark text-redd-light">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative aspect-square md:aspect-[3/4] w-full overflow-hidden"
        >
          <img 
            src="https://picsum.photos/seed/team/800/1000" 
            alt="Team" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="flex flex-col gap-8 md:pl-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif"
          >
            Multidisciplinaire <span className="italic text-redd-accent">team</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            Onze ontwerpen komen tot stand door de nauwe samenwerking van landschapsarchitecten, ontwerpers en technische specialisten. Samen vertalen we uw wensen naar een kloppend en leefbaar ontwerp.
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="self-start mt-4 flex items-center gap-2 text-sm uppercase tracking-widest border-b border-redd-light pb-1 hover:text-redd-accent hover:border-redd-accent transition-colors"
          >
            Leer ons kennen <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const LetsTalk = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.8]);

  return (
    <>
      <div className="relative w-full h-0 z-0">
        <div ref={ref} className="absolute top-0 left-0 w-full h-screen pointer-events-none invisible" />
      </div>
      <section className="relative z-0 h-screen bg-redd-light px-6 md:px-16 lg:px-24 flex flex-col justify-center items-center text-center sticky top-0 border-t-[16px] md:border-t-[24px] border-white">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">Klaar voor een nieuw project?</p>
      <motion.h2 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-none hover:text-redd-accent transition-colors cursor-pointer"
      >
        Let's <span className="italic">talk</span>
      </motion.h2>
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black z-50 pointer-events-none" />
    </section>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-[#161a1d] text-[#8e9299] pt-24 md:pt-32 pb-4 px-6 md:px-16 lg:px-24 flex flex-col justify-center relative z-50">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto mb-8 md:mb-10 gap-12 md:gap-0">
        
        {/* Left Column */}
        <div className="flex flex-col gap-6 text-center md:text-left text-sm tracking-[0.2em] uppercase mt-12 md:mt-16">
          <a href="#" className="hover:text-white transition-colors">Graphic</a>
          <a href="#" className="hover:text-white transition-colors">Photo</a>
          <a href="#" className="hover:text-white transition-colors">Project</a>
        </div>

        {/* Center Column */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            LORENZO PACI
          </h2>
          <p className="text-xs tracking-[0.3em] uppercase mb-6">
            Creative Visionary
          </p>
          
          <div className="flex items-center gap-6 mb-12 md:mb-20">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
              <Youtube size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 text-center md:text-right text-sm tracking-[0.2em] uppercase mt-12 md:mt-16">
          <a href="#" className="hover:text-white transition-colors">Client Area</a>
          <a href="#" className="hover:text-white transition-colors">Bio</a>
          <a href="#" className="hover:text-white transition-colors">Privacy & Policy</a>
        </div>

      </div>

      <div className="w-full max-w-7xl mx-auto border-t border-white/10 pt-4 text-center">
        <p className="text-[10px] tracking-widest uppercase opacity-50">
          © 2025 MADE WITH LOVE IN MARCHE - LORENZ.PACI@GMAIL.COM - ANCONA|MARCHE|ITALIA - 3208130419
        </p>
      </div>
    </footer>
  );
};

const MenuOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [expandedSubItem, setExpandedSubItem] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setExpandedItem(null);
        setExpandedSubItem(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const menuItems = [
    { name: "Home", icon: <ArrowUpRight size={24} />, type: "link" },
    { 
      name: "Works", 
      icon: <Plus size={24} />, 
      type: "expandable",
      subItems: [
        { 
          name: "Graphic", 
          projects: ["Brand Identity", "Editorial", "Web Design"]
        },
        { 
          name: "Photo", 
          projects: ["Campaign", "Lookbook", "Editorial"]
        },
        { 
          name: "Project", 
          projects: ["Project Alpha", "Project Beta", "Project Gamma"]
        }
      ]
    },
    { name: "About", icon: <ArrowUpRight size={24} />, type: "link" },
    { name: "Contact", icon: <ArrowUpRight size={24} />, type: "link" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex bg-redd-light text-redd-dark"
        >
          {/* Left Side: Navigation & Info */}
          <div className="w-full md:w-1/2 h-full flex flex-col justify-between p-6 md:p-12 lg:p-24 overflow-y-auto">
            <div className="flex justify-between items-center shrink-0">
              <div className="text-xl font-medium tracking-tight uppercase">LORENZO PACI</div>
              <button onClick={onClose} className="md:hidden flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity bg-white px-4 py-2 rounded-full shadow-sm">
                <X size={16} /> Sluiten
              </button>
            </div>

            <nav className="flex flex-col gap-4 md:gap-6 my-8">
              {menuItems.map((item, i) => (
                <div key={item.name} className="flex flex-col">
                  {item.type === "expandable" ? (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                      onClick={() => setExpandedItem(expandedItem === item.name ? null : item.name)}
                      className="text-3xl md:text-5xl lg:text-6xl font-serif flex items-center justify-between group hover:text-redd-accent transition-colors text-left w-full"
                    >
                      <span>{item.name}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.div animate={{ rotate: expandedItem === item.name ? 45 : 0 }}>
                          <Plus size={24} />
                        </motion.div>
                      </span>
                    </motion.button>
                  ) : (
                    <motion.a
                      href="#"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                      className="text-3xl md:text-5xl lg:text-6xl font-serif flex items-center justify-between group hover:text-redd-accent transition-colors w-full"
                    >
                      <span>{item.name}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight size={24} />
                      </span>
                    </motion.a>
                  )}

                  <AnimatePresence>
                    {item.type === "expandable" && expandedItem === item.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col gap-3 mt-4"
                      >
                        {item.subItems?.map((subItem) => (
                          <div key={subItem.name} className="flex flex-col ml-8 md:ml-12">
                            <div className="flex items-center justify-between w-full group">
                              <button
                                onClick={() => setExpandedSubItem(expandedSubItem === subItem.name ? null : subItem.name)}
                                className="text-2xl md:text-4xl lg:text-5xl font-serif flex items-center hover:text-redd-accent transition-colors text-left flex-grow"
                              >
                                <span>{subItem.name}</span>
                              </button>
                              
                              <div className="flex items-center gap-4">
                                <AnimatePresence>
                                  {expandedSubItem === subItem.name && (
                                    <motion.a 
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: 20 }}
                                      href="#" 
                                      className="hidden md:flex items-center gap-4 text-xs uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors bg-white"
                                    >
                                      ALLE PROJECTEN <ArrowRight size={14} />
                                    </motion.a>
                                  )}
                                </AnimatePresence>
                                <button 
                                  onClick={() => setExpandedSubItem(expandedSubItem === subItem.name ? null : subItem.name)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <motion.div animate={{ rotate: expandedSubItem === subItem.name ? 45 : 0 }}>
                                    <Plus size={20} />
                                  </motion.div>
                                </button>
                              </div>
                            </div>
                            
                            <AnimatePresence>
                              {expandedSubItem === subItem.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden flex flex-col gap-2 mt-3"
                                >
                                  {subItem.projects.map((project) => (
                                    <a
                                      key={project}
                                      href="#"
                                      className="text-lg md:text-xl lg:text-2xl font-serif ml-8 md:ml-12 hover:text-redd-accent transition-colors flex items-center justify-between group py-1"
                                    >
                                      <span>{project}</span>
                                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowUpRight size={16} />
                                      </span>
                                    </a>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm shrink-0 mt-8"
            >
              <div>
                <p className="font-semibold text-lg mb-2">info@lorenzopaci.com</p>
                <p className="font-semibold text-lg">+39 123 456 7890</p>
              </div>
              <div className="flex gap-12">
                <div>
                  <p className="text-gray-500 mb-1">Studio Roma</p>
                  <p>Via Roma 123</p>
                  <p>00100 Roma</p>
                  <a href="#" className="flex items-center gap-1 mt-2 font-medium hover:text-redd-accent transition-colors">
                    Routebeschrijving <ArrowUpRight size={14} />
                  </a>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Studio Milano</p>
                  <p>Via Milano 45</p>
                  <p>20100 Milano</p>
                  <a href="#" className="flex items-center gap-1 mt-2 font-medium hover:text-redd-accent transition-colors">
                    Routebeschrijving <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Image */}
          <div className="hidden md:block w-1/2 h-full relative">
            <img 
              src="https://picsum.photos/seed/menu/1000/1500" 
              alt="Menu background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-12 right-12">
              <button onClick={onClose} className="flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity bg-white px-6 py-3 shadow-lg hover:bg-gray-100">
                <X size={16} /> Sluiten
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleOpenLightbox = (project: any) => {
    setSelectedProject(project);
    setIsLightboxOpen(true);
  };

  return (
    <div className="min-h-screen text-redd-dark selection:bg-redd-accent selection:text-white bg-[#161a1d]">
      <Lightbox isOpen={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} project={selectedProject} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Navbar onMenuClick={() => setIsMenuOpen(true)} />
      <main className="relative z-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-b-[2rem] md:rounded-b-[3rem]">
        <Hero />
        <HorizontalGallery offset={0} onMenuClick={() => setIsMenuOpen(true)} onOpenLightbox={handleOpenLightbox} />
        <Process />
        <HorizontalGallery offset={1} onMenuClick={() => setIsMenuOpen(true)} onOpenLightbox={handleOpenLightbox} />
        <LetsTalk />
        <HorizontalGallery offset={2} isLast={true} onMenuClick={() => setIsMenuOpen(true)} onOpenLightbox={handleOpenLightbox} />
      </main>
      <div className="relative z-0">
        <div className="fixed bottom-0 left-0 w-full -z-10 bg-[#161a1d]">
          <Footer />
        </div>
        <div className="invisible pointer-events-none">
          <Footer />
        </div>
      </div>
    </div>
  );
}
