import { FC } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const { addItem } = useCartStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group"
    >
      {/* Image Container */}
      <Link to={`/produto/${product.id}`} className="relative aspect-square overflow-hidden bg-gray-50 block">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.tag && (
            <span className="bg-[#22C55E] text-white text-[9px] font-bold uppercase px-2 py-1 rounded tracking-widest shadow-sm">
              {product.tag}
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute top-4 right-4 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 flex flex-col gap-2 z-10">
          <div className="p-2.5 bg-white text-text-dark rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors cursor-pointer">
            <Eye size={16} />
          </div>
          <div className="p-2.5 bg-white text-text-dark rounded-full shadow-lg hover:bg-secondary hover:text-white transition-colors cursor-pointer">
            <Heart size={16} />
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-2 md:p-6 pt-1 md:pt-2 flex flex-col flex-1 text-center">
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-heading font-bold text-text-dark text-[9px] md:text-sm uppercase tracking-wider mb-1 line-clamp-2 min-h-[1.5rem] md:min-h-[3.5rem] hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {product.colorCodes && product.colorCodes.length > 0 && (
          <div className="flex justify-center gap-1 mb-1.5 md:mb-4">
            {product.colorCodes.map((color, idx) => (
              <div 
                key={idx} 
                className="w-2 md:w-3 h-2 md:h-3 rounded-full border border-gray-100 shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
        
        <div className="mt-auto flex flex-col items-center gap-0.5">
          <span className="text-sm md:text-2xl font-medium text-text-dark font-sans tracking-tight">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <motion.button 
          whileHover={{ 
            scale: 1.05
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          className="mt-2 md:mt-6 w-full py-2 md:py-4 bg-primary hover:bg-primary/90 text-white rounded-md font-black transition-all duration-300 flex items-center justify-center gap-1 md:gap-2 text-[8px] md:text-sm uppercase tracking-[0.1em] md:tracking-[0.25em] group relative overflow-hidden"
        >
          <span>Comprar</span>
        </motion.button>
      </div>
    </motion.div>
  );
};


