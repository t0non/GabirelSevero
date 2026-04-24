import { FC } from 'react';
import { ProductCard } from './ProductCard';
import { BEST_SELLERS } from '../constants';
import { PartyPopper, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const ProductGrid: FC = () => {
  return (
    <section className="py-20 bg-site-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-text-dark uppercase tracking-tighter mb-4">
            Temas que Encantam
          </h2>
          <p className="text-text-light max-w-2xl mx-auto flex items-center justify-center gap-2">
            Descubra os nossos temas favoritos e transforme sua comemoração em um evento mágico! <PartyPopper size={18} className="text-primary" />
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
          {BEST_SELLERS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* See All Button */}
        <div className="mt-16 flex justify-center">
          <Link to="/categoria/todos">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-white border-2 border-primary text-primary font-black uppercase tracking-[0.2em] text-sm rounded-xl hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/25"
            >
              Mostrar todos os produtos
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

