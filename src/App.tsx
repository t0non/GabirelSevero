/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AnimatedWavyBanner } from './components/AnimatedWavyBanner';
import { CategoryList } from './components/CategoryList';
import { ProductGrid } from './components/ProductGrid';
import { Testimonials } from './components/Testimonials';
import { AboutUs } from './components/AboutUs';
import { Footer } from './components/Footer';
import { ProductPage } from './pages/ProductPage';
import { 
  Sparkles, 
  Palette, 
  Heart, 
  ArrowRight, 
  Truck,
  Gift,
  ArrowDownToLine
} from 'lucide-react';

import { StrategicCart } from './components/StrategicCart';
import { StickyPromo } from './components/StickyPromo';
import { CartWidget } from './components/CartWidget';

import { CategoryPage } from './pages/CategoryPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { SuccessPage } from './pages/SuccessPage';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage: FC = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      
      {/* Marquee Trust Bar */}
      <div className="bg-[#4ebecd] text-white py-4 overflow-hidden border-y border-white/5 whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center gap-12 sm:gap-24 px-4 w-max"
        >
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 text-[10px] md:text-xs tracking-widest font-light font-sans uppercase shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">ÚLTIMOS DIAS:</span>
                <span>PRIMEIRACOMPRA - 5% OFF</span>
                <Sparkles size={14} strokeWidth={3} className="text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span>FRETE GRÁTIS ACIMA DE R$ 160</span>
                <Truck size={14} strokeWidth={3} className="text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span>PARCELAMENTO EM ATÉ 3X SEM JUROS</span>
                <Gift size={14} strokeWidth={3} className="text-white" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatedWavyBanner />

      <CategoryList />

      {/* Authority / Why Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-text-dark mb-6 font-heading">
              Por que somos a escolha de <span className="text-primary">milhares de pessoas?</span>
            </h2>
            <p className="text-text-light text-lg">
              Deixamos a parte chata com a gente para você focar no que importa: os sorrisos e as fotos inesquecíveis.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Palette size={32} />, 
                title: 'Design Vetorizado', 
                desc: 'Artes em alta definição que não pixelam. Imprima no tamanho que desejar com qualidade profissional.' 
              },
              { 
                icon: <ArrowDownToLine size={32} />, 
                title: 'Download Imediato', 
                desc: 'Comprou, baixou! Receba seus arquivos automaticamente por e-mail e WhatsApp segundos após o pagamento.' 
              },
              { 
                icon: <Heart size={32} />, 
                title: 'Economia Real', 
                desc: 'Reduza custos de frete e produção. Use sua impressora e tenha uma festa de luxo gastando pouco.' 
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-site-bg rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-4">{item.title}</h3>
                <p className="text-text-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductGrid />

      <Testimonials />

      {/* Newsletter - Connection Trigger */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white rounded-[3rem] p-10 md:p-20 border-2 border-primary/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-sm">
              <div className="relative z-10 max-w-xl text-center md:text-left">
                 <h2 className="text-4xl font-black text-text-dark font-heading mb-4">Mime-se com <span className="text-primary">Dicas e Ofertas</span></h2>
                 <p className="text-text-light text-lg">
                   Junte-se à nossa comunidade e receba em primeira mão novos temas, checklists de festa e cupons exclusivos.
                 </p>
              </div>
              <div className="relative z-10 w-full max-w-md">
                 <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="email" 
                      placeholder="Seu melhor e-mail" 
                      className="flex-1 px-8 py-5 rounded-full bg-white border-2 border-primary/20 focus:border-primary outline-none font-medium"
                    />
                    <button className="bg-primary text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                      Entrar
                    </button>
                 </div>
                 <p className="text-[10px] text-text-light mt-4 text-center md:text-left opacity-60">
                   Prometemos não enviar spam. Apenas amor e inspiração.
                 </p>
              </div>
              
              {/* Decorative background circle */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/40 rounded-full blur-3xl" />
           </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
          className="bg-accent rounded-[3rem] p-8 md:p-20 flex flex-col items-center text-center gap-8 border border-white/20 shadow-2xl relative overflow-hidden group"
        >
          {/* Decorative Sparks */}
          <div className="absolute top-10 left-10 text-white/10 rotate-12 group-hover:rotate-45 transition-transform duration-700">
             <Sparkles size={120} fill="currentColor" />
          </div>
          <div className="absolute bottom-10 right-10 text-white/10 -rotate-12 group-hover:-rotate-45 transition-transform duration-700">
             <Sparkles size={180} fill="currentColor" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-heading leading-tight">
              Não encontrou o tema dos sonhos?
            </h2>
            <p className="text-white/90 text-xl font-medium leading-relaxed mb-10">
              Nossa equipe de designers está pronta para desenhar do zero qualquer tema que você imaginar. Sua festa será ÚNICA.
            </p>
            <button className="bg-white text-accent px-12 py-5 rounded-full font-black text-lg uppercase tracking-widest hover:scale-110 active:scale-95 transition-all">
              Bater um papo no WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
      <AboutUs />
    </main>
  );
};


export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-site-bg">
        <AnnouncementBar />
        <Navbar />
        <StrategicCart />
        <CartWidget />
        <StickyPromo />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/:type/:slug" element={<CategoryPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/sucesso" element={<SuccessPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}



