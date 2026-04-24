import { FC, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, Star, 
  Flame, CheckCircle2, Sparkles, Plus, ArrowDownToLine, Package, 
  Users, Gift, Award, Clock
} from 'lucide-react';
import { BEST_SELLERS } from '../constants';
import { useCartStore } from '../store/useCartStore';

export const ProductPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCartStore();
  const product = BEST_SELLERS.find((p) => p.id === id) || BEST_SELLERS[0];
  const [quantity, setQuantity] = useState(1);
  const [personalization, setPersonalization] = useState('');
  
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 3000);
    const hideTimer = setTimeout(() => setShowNotification(false), 8000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  const deliveryInfo = "Recebimento Instantâneo via E-mail e WhatsApp";

  const bundleProduct = BEST_SELLERS.find(p => p.id !== product.id) || BEST_SELLERS[0];
  const bundleTotal = (product.price + bundleProduct.price) * 0.9;

  return (
    <div className="bg-site-bg min-h-screen pb-20 relative">
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="fixed bottom-24 left-4 z-[100] bg-white p-4 rounded-2xl shadow-2xl border border-primary/20 flex items-center gap-3 max-w-xs"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
               <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Comprou agora</p>
              <p className="text-xs text-text-dark font-medium leading-tight">
                <strong>Mariana S.</strong> de São Paulo acabou de garantir o {product.name}!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ol className="flex items-center space-x-2 text-xs md:text-sm text-text-light">
          <li><Link to="/" className="hover:text-primary">Home</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><a href="#" className="hover:text-primary">{product.category}</a></li>
          <li><span className="mx-2">/</span></li>
          <li className="font-bold text-text-dark truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="space-y-4 relative w-full overflow-hidden">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-white shadow-sm border border-gray-100 relative group"
             >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  referrerPolicy="no-referrer"
                  fetchPriority="high"
                  loading="eager"
                  decoding="sync"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                   <Clock size={14} className="text-primary" />
                   <span className="text-[10px] font-bold text-text-dark uppercase">Edição Limitada</span>
                </div>
             </motion.div>
             <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-white border border-gray-200 cursor-pointer hover:border-primary transition-all hover:shadow-md">
                      <img 
                        src={`https://picsum.photos/seed/${product.id}-${i}/400/400`} 
                        alt="Thumbnail" 
                        className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" 
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                      />
                   </div>
                ))}
             </div>

             <div className="bg-white border border-secondary/30 p-6 rounded-3xl flex items-center gap-4 mt-8 shadow-sm">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white shrink-0">
                   <Award size={24} />
                </div>
                <div>
                   <h4 className="text-sm font-bold text-text-dark">Selo de Qualidade Afetiva</h4>
                   <p className="text-xs text-text-light">Se você não se encantar com cada detalhe, nós devolvemos seu dinheiro sem burocracia.</p>
                </div>
             </div>
          </div>

          <div className="space-y-8 lg:sticky lg:top-24">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-accent text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-lg shadow-accent/20">
                    Mais Desejado da Semana
                  </span>
                </div>
                <div className="flex items-center text-amber-400 gap-0.5">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <span className="text-text-dark text-[11px] font-bold ml-2 underline">4.9/5 (108 Opiniões)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4 leading-tight font-heading">
                {product.name}
              </h1>
              <p className="text-text-light text-lg leading-relaxed">
                "Não é apenas decoração, é o cenário das lembranças que ficarão para sempre."
              </p>
            </div>

            <div className="space-y-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="flex flex-col items-center mb-2">
                 {product.originalPrice && (
                   <span className="text-sm text-gray-400 line-through font-light">
                     R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                   </span>
                 )}
                 <span className={`text-4xl md:text-5xl font-black font-heading tracking-tighter ${product.originalPrice ? 'text-[#22C55E]' : 'text-primary'}`}>
                   R$ {product.price.toFixed(2).replace('.', ',')}
                 </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-secondary uppercase tracking-widest">
                 <Package size={14} /> Em 3x de R$ {(product.price / 3).toFixed(2).replace('.', ',')} sem juros
              </div>
            </div>

            <div className="bg-white border border-primary/30 p-4 rounded-2xl flex items-start gap-3 shadow-sm border-l-4">
              <Clock size={20} className="text-primary mt-1" />
              <div>
                 <p className="text-sm font-bold text-text-dark">Acesso Imediato:</p>
                 <p className="text-xs text-text-light">
                   {deliveryInfo} logo após a confirmação do pagamento!
                 </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-text-dark flex items-center gap-2">
                  <Sparkles size={16} className="text-primary" /> Deixe do seu jeitinho:
                </label>
                <span className="text-[10px] text-text-light uppercase tracking-tighter">Opcional</span>
              </div>
              <input 
                type="text" 
                placeholder="Nome e idade para personalização exclusiva"
                value={personalization}
                onChange={(e) => setPersonalization(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-text-light/40 font-medium"
              />
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addItem(product)}
                className="w-full bg-primary hover:bg-primary/95 text-white h-16 rounded-3xl font-black text-lg uppercase tracking-widest transition-all flex items-center justify-center shadow-xl shadow-primary/20 relative overflow-hidden"
              >
                <span className="relative z-10">Adicionar ao Carrinho</span>
                <ShoppingBag size={24} className="absolute left-8 opacity-40" />
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open(`https://wa.me/5500000000000?text=Olá, tenho interesse no produto: ${product.name}`, '_blank')}
                className="w-full h-16 border-2 border-[#25D366] text-[#25D366] rounded-3xl font-black text-base uppercase tracking-widest hover:bg-[#25D366] hover:bg-opacity-10 transition-all flex items-center justify-center relative overflow-hidden group"
              >
                <svg className="w-6 h-6 fill-current absolute left-8 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-2.135 0-4.141.832-5.65 2.341-1.503 1.508-2.333 3.513-2.338 5.65-.005 2.003.731 3.914 2.073 5.37l-1.354 4.954 5.074-1.332c1.393.759 2.96 1.159 4.542 1.161h.003c2.14 0 4.148-.838 5.658-2.349 1.51-1.512 2.342-3.52 2.343-5.66 0-4.32-3.516-7.835-7.831-7.835zm4.646 11.025c-.19.539-1.124 1.031-1.554 1.106-.431.075-.85.127-1.32-.054-.471-.182-1.071-.433-1.849-.785-3.322-1.515-5.461-4.887-5.631-5.111-.17-.224-1.392-1.815-1.392-3.463 0-1.648.868-2.457 1.169-2.781.301-.324.648-.405.861-.405s.43.003.621.011c.21.008.49-.071.761.6.291.731.99 2.451 1.072 2.624.081.173.131.37.01.58-.111.21-.181.331-.38.56-.201.23-.42.511-.6.731-.2.22-.41.46-.18.84.23.38.99 1.63 2.12 2.64 1.45 1.29 2.66 1.68 3.05 1.88.38.2.6.17.821-.08.221-.25.961-1.121 1.211-1.501.251-.38.5-.32.841-.2s2.152 1.01 2.52 1.2c.371.19.62.281.71.441.11.161.11.93-.08 1.47z"/>
                </svg>
                <span className="relative z-10">Comprar no WhatsApp</span>
              </motion.button>
            </div>
            <p className="text-[10px] text-center text-text-light/70 flex items-center justify-center gap-2">
              <ShieldCheck size={12} /> Pagamento 100% processado de forma segura e criptografada
            </p>
          </div>

          <div className="relative group overflow-hidden">
              <div className="absolute inset-0 bg-white -skew-y-3 origin-left translate-y-12 group-hover:translate-y-8 transition-transform duration-500" />
              <div className="relative bg-white border-2 border-secondary/20 p-6 md:p-8 rounded-[24px] md:rounded-[32px] space-y-4 md:space-y-6 shadow-xl">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-secondary">
                          <Sparkles size={18} fill="currentColor" />
                          <h4 className="font-bold uppercase tracking-widest text-[10px]">Oferta Imperdível</h4>
                      </div>
                      <span className="bg-secondary text-white text-[9px] font-black px-3 py-1 rounded-full">-10% OFF</span>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-text-dark leading-tight">Combine e transforme sua mesa!</h3>

                  <div className="flex items-center justify-between gap-4 md:gap-6 py-2 md:py-4">
                      <div className="flex items-center -space-x-3 md:-space-x-4">
                          <div className="relative z-20">
                            <img src={product.image} className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl object-cover border-4 border-white shadow-xl rotate-[-6deg]" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                          </div>
                          <div className="relative z-10">
                            <Plus className="absolute -top-3 left-1/2 -translate-x-1/2 text-secondary bg-white rounded-full shadow-md z-30" size={20} />
                            <img src={bundleProduct.image} className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl object-cover border-4 border-white shadow-xl rotate-[6deg]" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                          </div>
                      </div>
                      <div className="text-right">
                          <p className="text-[10px] md:text-xs text-text-light line-through font-bold">De R$ {(product.price + bundleProduct.price).toFixed(2)}</p>
                          <p className="text-2xl md:text-3xl font-black text-secondary tracking-tighter">R$ {bundleTotal.toFixed(2)}</p>
                          <p className="text-[9px] md:text-[10px] font-bold text-text-light">ou 3x de R$ {(bundleTotal / 3).toFixed(2)}</p>
                      </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { addItem(product); addItem(bundleProduct); }}
                    className="w-full bg-secondary hover:bg-secondary/90 text-white py-5 md:py-7 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                      <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform" />
                      Comprar Combo
                  </motion.button>
                  <p className="text-center text-[10px] font-bold text-secondary uppercase tracking-tighter animate-pulse">
                      Sua festa 100% pronta com economia real!
                  </p>
              </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8">
             {[
               { icon: ArrowDownToLine, label: 'Download Imediato', sub: 'Sem espera, receba já' },
               { icon: ShieldCheck, label: 'Qualidade HD', sub: 'Arquivos vetorizados' },
               { icon: Gift, label: 'Fácil de Montar', sub: 'Guia de montagem incluso' }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center text-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <item.icon size={24} className="text-secondary mb-2" />
                  <p className="text-[11px] font-bold text-text-dark uppercase">{item.label}</p>
                  <p className="text-[9px] text-text-light">{item.sub}</p>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="mt-20 md:mt-32 space-y-16">
         <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200 gap-x-8 md:gap-x-12 justify-start md:justify-center px-4">
            {[
              { label: 'O que vem no Kit?', icon: Package, active: true },
              { label: 'Como Montar', icon: Clock },
              { label: 'Avaliações Verificadas', icon: Star }
            ].map((tab, i) => (
              <button key={i} className={`pb-4 flex items-center gap-2 font-bold text-xs md:text-sm transition-all relative whitespace-nowrap shrink-0 ${tab.active ? 'text-primary' : 'text-text-light/60 hover:text-text-dark'}`}>
                <tab.icon size={18} /> {tab.label}
                {tab.active && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
              </button>
            ))}
         </div>
         
         <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-text-dark">Feito à mão, com <span className="text-primary">papelaria premium</span></h2>
                  <p className="text-text-light leading-relaxed text-lg">
                    Nós sabemos que os detalhes fazem a diferença. Por isso, utilizamos papel offset 240g (mais grosso que o padrão) e camadas em scrap para dar profundidade e luxo à sua mesa.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Papelaria fotográfica de alta definição',
                      'Recortes precisos a laser',
                      'Montagem fácil (Ready to Party)',
                      'Embalagem que protege os ornamentos'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-text-dark font-medium">
                        <CheckCircle2 size={20} className="text-secondary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="bg-site-bg rounded-[3rem] p-8 border-2 border-dashed border-gray-200">
                  <h3 className="font-bold text-text-dark mb-6 flex items-center gap-2">
                     <Package size={20} className="text-primary" /> Itens inclusos neste Kit:
                  </h3>
                  <div className="space-y-4">
                     {[
                       { q: 1, n: 'Topo de Bolo Personalizado (3D)' },
                       { q: 2, n: 'Bandeirolas Personalizadas' },
                       { q: 20, n: 'Forminhas de Luxo para Doces' },
                       { q: 5, n: 'Totens de Mesa Decorativos' },
                       { q: 1, n: 'Manual de Montagem Rápida' }
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                          <span className="text-text-dark font-medium">{item.n}</span>
                          <span className="bg-primary/10 text-primary font-black px-3 py-1 rounded-lg text-xs">{item.q}x</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
