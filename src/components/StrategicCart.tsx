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
  const suggestions = BEST_SELLERS.filter(p => !items.find(item => item.id === p.id)).slice(0, 2);

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
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-xl">
                    <ShoppingBag className="text-primary" size={20} />
                </div>
                <h2 className="text-xl font-bold text-text-dark">Carrinho Digital</h2>
              </div>
              <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-text-light">
                <X size={24} />
              </button>
            </div>

            {/* Bonus Progress */}
            <div className="px-6 py-4 bg-white border-b border-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-text-dark flex items-center gap-2 uppercase tracking-wider">
                  <Sparkles size={14} className="text-primary" /> 
                  {remainingForBonus > 0 ? 'Dica: Ganhe um Bônus Exclusivo!' : 'Bônus Grátis Liberado!'}
                </span>
                <span className="text-xs font-bold text-primary">
                  {remainingForBonus > 0 ? `R$ ${remainingForBonus.toFixed(2)}` : '🎁'}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-primary"
                />
              </div>
              <p className="text-[10px] text-text-light mt-2">
                {remainingForBonus > 0 
                  ? "Adicione mais itens para desbloquear o 'Guia de Impressão de Luxo'." 
                  : "Parabéns! O 'Guia de Impressão de Luxo' é seu de presente."}
              </p>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
                  <div key={item.id} className="flex gap-4 group">
                    <div className="h-24 w-24 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-text-dark text-sm leading-snug line-clamp-2">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-text-light/50 hover:text-red-400 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-white rounded-lg p-0.5 border border-gray-100 font-bold shadow-sm">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center hover:text-primary"><Minus size={12} /></button>
                          <span className="w-8 text-center text-xs">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center hover:text-primary"><Plus size={12} /></button>
                        </div>
                        <span className="font-bold text-primary text-sm">R$ {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Upsell Section */}
              {items.length > 0 && suggestions.length > 0 && (
                <div className="pt-8 border-t border-gray-100">
                  <p className="text-xs font-bold text-text-dark uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Sparkles size={14} className="text-primary" /> Clientes também compraram:
                  </p>
                  <div className="space-y-4">
                    {suggestions.map((product) => (
                      <div key={product.id} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 group shadow-sm">
                        <img src={product.image} alt={product.name} className="h-14 w-14 rounded-lg object-cover" referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-text-dark truncate">{product.name}</p>
                          <p className="text-xs font-bold text-primary">R$ {product.price.toFixed(2)}</p>
                        </div>
                        <button 
                          onClick={() => addItem(product)}
                          className="bg-white hover:bg-primary hover:text-white text-primary text-[10px] font-bold px-3 py-1.5 rounded-full border border-primary transition-all active:scale-95"
                        >
                          Adicionar
                        </button>
                      </div>
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

              <div className="flex items-center justify-between text-text-dark">
                <span className="font-medium text-sm">Subtotal:</span>
                <span className="font-bold text-lg">R$ {total.toFixed(2)}</span>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={items.length === 0} 
                onClick={() => {
                  closeCart();
                  navigate('/checkout');
                }}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white py-6 rounded-full font-black transition-all flex items-center justify-center gap-3 text-lg uppercase tracking-widest relative overflow-hidden group"
              >
                <span>Finalizar Pedido</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

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
