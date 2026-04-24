import { FC } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';

export const CategoryList: FC = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-dark mb-2">Compre por Tema</h2>
          <p className="text-text-light">Tudo que você precisa para uma comemoração temática perfeita</p>
        </div>

        {/* Grid on mobile, flex on desktop */}
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap sm:justify-center gap-x-4 gap-y-8 sm:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <Link 
              key={cat.id} 
              to={`/tema/${cat.id}`}
              className="flex-shrink-0 flex flex-col items-center group cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-primary/20 p-1 transition-all duration-300 group-hover:border-primary group-hover:scale-105 shadow-md">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="mt-3 font-heading font-semibold text-text-dark group-hover:text-primary transition-colors text-[10px] sm:text-base text-center">
                  {cat.name}
                </span>
              </motion.div>
            </Link>
          ))}
          {/* Custom Kit Link */}
          <Link to="/#personalizados" className="flex-shrink-0 flex flex-col items-center group cursor-pointer">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: CATEGORIES.length * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-dashed border-accent/40 bg-accent/5 flex items-center justify-center p-1 transition-all duration-300 group-hover:bg-accent/10 group-hover:scale-105">
                 <span className="text-accent font-bold text-center text-[8px] sm:text-xs px-2 leading-tight">Escolha seu Tema</span>
              </div>
              <span className="mt-3 font-heading font-semibold text-accent transition-colors text-[10px] sm:text-base text-center">
                Personalizados
              </span>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};
