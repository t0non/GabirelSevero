import { FC, useState } from 'react';
import { ShoppingCart, Menu, Search, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

export const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, toggleCart } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { name: 'Coleções', href: '/colecoes' },
    { name: 'Destaques', href: '/destaques' },
    { name: 'Lançamentos', href: '/lancamentos' },
    { name: 'Personalizados', href: '/#personalizados', highlight: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-1 flex items-center justify-start md:hidden">
            <button
              className="p-2 text-text-dark"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-initial">
            <Link to="/" className="flex items-center">
              <img 
                src="https://files.catbox.moe/4rz9jq.png" 
                alt="Festa na Caixa" 
                className="h-8 md:h-12 w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  item.highlight ? 'text-accent border-b-2 border-accent' : 'text-text-dark'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex-1 flex items-center justify-end space-x-4">
            <button className="p-2 text-text-light hover:text-primary transition-colors hidden sm:block">
              <Search size={22} />
            </button>
            <button className="p-2 text-text-light hover:text-primary transition-colors hidden sm:block">
              <Heart size={22} />
            </button>
            <div className="w-10 md:hidden"></div> {/* Spacer to maintain centering if menu was on left */}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-4 text-base font-medium text-text-dark hover:bg-primary/5 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 flex items-center space-x-4 px-3">
                <button className="flex-1 py-3 bg-primary text-white rounded-full font-medium">
                  Minha Conta
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
