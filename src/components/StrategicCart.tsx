import { FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Truck, ShieldCheck, ArrowRight, Trash2, Plus, Minus, Sparkles } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { BEST_SELLERS } from '../constants';

import { Link, useNavigate } from 'react-router-dom';

export const StrategicCart: FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal, getFreeShippingProgress, addItem } = useCartStore();
  const navigate = useNavigate();
  const total = getTotal();
  const remainingForBonus = Math.max(0, 80 - total);
  const progress = Math.min(100, (total / 80) * 100);

  // Suggestions for Upsell (products not in cart)
  const suggestions = BEST_SELLERS
    .filter(p => !items.find(item => item.id === p.id))
    .slice(0, 4);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header Centered */}
            <div className="p-6 border-b border-gray-100 flex flex-col items-center justify-center relative">
               <div className="bg-primary/10 p-2 rounded-xl mb-2">
                   <ShoppingBag className="text-primary" size={20} />
               </div>
               <h2 className="text-xl font-bold text-text-dark tracking-tight">Carrinho Digital</h2>
               <button onClick={closeCart} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors text-text-light">
                 <X size={24} />
               </button>
            </div>

            {/* Bonus Progress */}
            <div className="px-6 py-3 bg-white border-b border-gray-50 flex flex-col items-center">
              <div className="flex flex-col items-center gap-1 mb-2">
                <span className="text-[11px] font-black text-text-dark flex items-center gap-2 uppercase tracking-wide text-center">
                  <Sparkles size={14} className="text-primary animate-pulse" /> 
                  {remainingForBonus > 0 ? 'Dica: Ganhe um Bônus Exclusivo!' : 'Bônus Grátis Liberado!'}
                </span>
                <span className="text-xs font-black text-primary">
                  {remainingForBonus > 0 ? `Faltam apenas R$ ${remainingForBonus.toFixed(2).replace('.', ',')}` : 'BÔNUS DISPONÍVEL! 🎁'}
                </span>
              </div>
              <div className="h-2.5 w-full max-w-[280px] bg-gray-100 rounded-full overflow-hidden border border-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-primary shadow-[0_0_10px_rgba(255,107,107,0.3)]"
                />
              </div>
              <p className="text-[10px] text-text-light mt-2 text-center font-medium opacity-80">
                {remainingForBonus > 0 
                  ? "Adicione mais itens para desbloquear o 'Guia de Impressão de Luxo'." 
                  : "Parabéns! O 'Guia de Impressão de Luxo' é seu de presente."}
              </p>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto text-text-light/30 border border-gray-100 shadow-sm">
                    <ShoppingBag size={40} />
                  </div>
                  <p className="text-text-light font-medium">Seu carrinho está vazio.</p>
                  <button onClick={closeCart} className="text-primary font-bold hover:underline">
                    Continuar comprando
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3 group">
                    <div className="h-20 w-20 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-text-dark text-[13px] leading-tight line-clamp-2">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-text-light/50 hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center bg-white rounded-lg p-0.5 border border-gray-100 font-bold shadow-sm">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center hover:text-primary"><Minus size={10} /></button>
                          <span className="w-6 text-center text-[10px]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center hover:text-primary"><Plus size={10} /></button>
                        </div>
                        <span className="font-black text-primary text-xs">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Upsell Section */}
              {items.length > 0 && (
                <div className="pt-6 border-t border-gray-100 pb-4">
                  <p className="text-[11px] font-black text-text-dark uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                    <Sparkles size={14} className="text-primary" /> Clientes também compraram:
                  </p>
                  <div className="space-y-3">
                    {suggestions.map((product) => (
                      <motion.div 
                        key={product.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 group shadow-sm hover:border-primary/30 transition-colors"
                      >
                        <div className="h-14 w-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-text-dark leading-tight line-clamp-1">{product.name}</p>
                          <p className="text-xs font-bold text-primary mt-1">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                        </div>
                        <button 
                          onClick={() => addItem(product)}
                          className="bg-white hover:bg-primary hover:text-white text-primary text-[10px] font-black px-4 py-2 rounded-full border-2 border-primary transition-all active:scale-95 uppercase"
                        >
                          Mais
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-white space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
              {/* Coupon Field */}
              <div className="relative">
                 <input 
                  type="text" 
                  placeholder="Cupom de Desconto" 
                  className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                 />
                 <button className="absolute right-2 top-2 bottom-2 bg-text-dark text-white text-[10px] uppercase font-bold px-4 rounded-lg hover:bg-primary transition-colors">
                    Aplicar
                 </button>
              </div>

              <div className="flex flex-col items-center justify-center text-text-dark pt-1 pb-4">
                <span className="font-bold text-[10px] uppercase tracking-[3px] opacity-40 mb-1">Subtotal do Pedido</span>
                <span className="font-black text-3xl font-heading tracking-tighter text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={items.length === 0} 
                  onClick={() => {
                    closeCart();
                    navigate('/checkout');
                  }}
                  className="w-full bg-primary hover:bg-primary/95 disabled:bg-gray-200 text-white h-16 rounded-3xl font-black transition-all flex items-center justify-center text-base uppercase tracking-tighter shadow-xl shadow-primary/20 relative overflow-hidden"
                >
                  <span className="relative z-10">Finalizar Pedido</span>
                  <ArrowRight size={22} className="absolute right-6 opacity-40" />
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border-2 border-[#25D366] text-[#25D366] h-16 rounded-3xl font-black flex items-center justify-center text-base uppercase tracking-tighter relative overflow-hidden group hover:bg-[#25D366]/5 transition-colors"
                  onClick={() => window.open('https://wa.me/5500000000000', '_blank')}
                >
                  <svg className="w-6 h-6 fill-current absolute left-6 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-2.135 0-4.141.832-5.65 2.341-1.503 1.508-2.333 3.513-2.338 5.65-.005 2.003.731 3.914 2.073 5.37l-1.354 4.954 5.074-1.332c1.393.759 2.96 1.159 4.542 1.161h.003c2.14 0 4.148-.838 5.658-2.349 1.51-1.512 2.342-3.52 2.343-5.66 0-4.32-3.516-7.835-7.831-7.835zm4.646 11.025c-.19.539-1.124 1.031-1.554 1.106-.431.075-.85.127-1.32-.054-.471-.182-1.071-.433-1.849-.785-3.322-1.515-5.461-4.887-5.631-5.111-.17-.224-1.392-1.815-1.392-3.463 0-1.648.868-2.457 1.169-2.781.301-.324.648-.405.861-.405s.43.003.621.011c.21.008.49-.071.761.6.291.731.99 2.451 1.072 2.624.081.173.131.37.01.58-.111.21-.181.331-.38.56-.201.23-.42.511-.6.731-.2.22-.41.46-.18.84.23.38.99 1.63 2.12 2.64 1.45 1.29 2.66 1.68 3.05 1.88.38.2.6.17.821-.08.221-.25.961-1.121 1.211-1.501.251-.38.5-.32.841-.2s2.152 1.01 2.52 1.2c.371.19.62.281.71.441.11.161.11.93-.08 1.47z"/>
                  </svg>
                  <span className="relative z-10">Falar no WhatsApp</span>
                </motion.button>

                <button 
                  onClick={closeCart}
                  className="w-full text-[11px] font-black text-text-light hover:text-primary uppercase tracking-[2px] py-4 text-center"
                >
                  Ver mais produtos
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                 <div className="flex items-center gap-1.5 opacity-60">
                    <ShieldCheck size={14} className="text-secondary" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Compra 100% Segura</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
