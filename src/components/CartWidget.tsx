import { FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export const CartWidget: FC = () => {
  const { items, toggleCart, isOpen } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Don't show the widget if the cart is open or if it's empty
  if (isOpen || itemCount === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-0 z-[60] group md:bottom-20 md:right-8"
    >
      <button
        onClick={toggleCart}
        className="bg-primary text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative hover:bg-primary/95 transition-colors border-4 border-white"
      >
        <ShoppingCart size={24} />
        <AnimatePresence>
          <motion.span
            key={itemCount}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-white text-primary text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-primary shadow-sm"
          >
            {itemCount}
          </motion.span>
        </AnimatePresence>
        
        {/* Pulsing effect */}
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping -z-10" />
      </button>
      
      {/* Tooltip-like label */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        <p className="text-sm font-bold text-text-dark">Ver meu carrinho</p>
      </div>
    </motion.div>
  );
};
