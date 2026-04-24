import { FC, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Filter, SortAsc, LayoutGrid, List } from 'lucide-react';
import { ALL_PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const CategoryPage: FC = () => {
  const { type, slug } = useParams<{ type: string; slug: string }>();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const categoryInfo = useMemo(() => {
    if (type === 'tema') {
      return CATEGORIES.find(c => c.id === slug);
    }
    return { name: slug?.replace(/-/g, ' ') };
  }, [type, slug]);

  const availableColors = useMemo(() => {
    const colors = new Set<string>();
    ALL_PRODUCTS.forEach(p => {
      p.colorCodes?.forEach(c => colors.add(c));
    });
    return Array.from(colors);
  }, []);

  const filteredProducts = useMemo(() => {
    let products = ALL_PRODUCTS;

    if (type === 'tema') {
      products = products.filter(p => p.theme === slug);
    } else if (type === 'categoria') {
      products = products.filter(p => p.category.toLowerCase().replace(/ /g, '-') === slug);
    }

    if (selectedColors.length > 0) {
      products = products.filter(p => 
        p.colorCodes?.some(c => selectedColors.includes(c))
      );
    }

    return products;
  }, [type, slug, selectedColors]);

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };

  return (
    <div className="bg-site-bg min-h-screen pb-20">
      {/* Breadcrumbs & Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-xs text-text-light mb-6 uppercase tracking-widest font-bold">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-text-dark">{type === 'tema' ? 'Temas' : 'Categorias'}</span>
            <ChevronRight size={12} />
            <span className="text-primary">{categoryInfo?.name}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-text-dark font-heading mb-2 capitalize">
                {categoryInfo?.name}
              </h1>
              <p className="text-text-light max-w-2xl">
                Explore nossa seleção exclusiva para o tema <span className="text-primary font-bold">{categoryInfo?.name}</span>. 
                Tudo o que você precisa para uma festa inesquecível está aqui.
              </p>
            </div>
            <div className="bg-white px-4 py-2 rounded-full border border-primary/20 shadow-sm">
               <span className="text-primary font-bold text-sm">{filteredProducts.length} Produtos encontrados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Color Filter */}
      <div className="lg:hidden bg-white border-b border-gray-100 overflow-x-auto no-scrollbar py-4 px-4 sticky top-0 z-20">
        <div className="flex items-center gap-3 min-w-max">
          <span className="text-[10px] font-black uppercase tracking-widest text-text-light/50 mr-2">Cores:</span>
          {availableColors.map(color => (
            <button 
              key={color}
              onClick={() => toggleColor(color)}
              className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center shrink-0 ${selectedColors.includes(color) ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-gray-100 shadow-sm'}`}
              style={{ backgroundColor: color }}
            >
              {selectedColors.includes(color) && (
                <div className={`w-2.5 h-2.5 rounded-full ${color === '#ffffff' ? 'bg-black' : 'bg-white'}`} />
              )}
            </button>
          ))}
          {selectedColors.length > 0 && (
            <button 
              onClick={() => setSelectedColors([])}
              className="ml-4 text-[10px] uppercase font-black text-primary whitespace-nowrap bg-primary/10 px-4 py-2 rounded-full"
            >
              Limpar ( {selectedColors.length} )
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 space-y-8 shrink-0">
            <div>
              <h3 className="font-bold text-text-dark uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <Filter size={14} className="text-primary" /> Filtrar por Tema
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <Link 
                    key={cat.id} 
                    to={`/tema/${cat.id}`}
                    className={`block text-sm py-1 transition-colors ${slug === cat.id ? 'text-primary font-bold' : 'text-text-light hover:text-primary'}`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
               <h3 className="font-bold text-text-dark uppercase tracking-widest text-xs mb-4">Filtrar por Cores</h3>
               <div className="flex flex-wrap gap-2">
                 {availableColors.map(color => (
                   <button 
                     key={color}
                     onClick={() => toggleColor(color)}
                     className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${selectedColors.includes(color) ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-transparent shadow-sm'}`}
                     style={{ backgroundColor: color }}
                     title={color}
                   >
                     {selectedColors.includes(color) && (
                       <div className={`w-2 h-2 rounded-full ${color === '#ffffff' ? 'bg-black' : 'bg-white'}`} />
                     )}
                   </button>
                 ))}
               </div>
               {selectedColors.length > 0 && (
                 <button 
                   onClick={() => setSelectedColors([])}
                   className="mt-4 text-[10px] uppercase font-bold text-primary hover:underline hover:text-primary/80"
                 >
                   Limpar Filtros
                 </button>
               )}
            </div>

            <div className="pt-8 border-t border-gray-100">
               <h3 className="font-bold text-text-dark uppercase tracking-widest text-xs mb-4">Faixa de Preço</h3>
               <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary" id="p1" />
                    <label htmlFor="p1" className="text-sm text-text-light">Até R$ 50</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary" id="p2" />
                    <label htmlFor="p2" className="text-sm text-text-light">R$ 50 - R$ 150</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary" id="p3" />
                    <label htmlFor="p3" className="text-sm text-text-light">Acima de R$ 150</label>
                  </div>
               </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <button className="p-2 bg-primary text-white rounded-lg shadow-md shadow-primary/20">
                        <LayoutGrid size={18} />
                    </button>
                    <button className="p-2 text-text-light hover:bg-gray-50 rounded-lg transition-colors">
                        <List size={18} />
                    </button>
                </div>
                <div className="flex items-center gap-3">
                   <SortAsc size={16} className="text-text-light" />
                   <select className="bg-transparent text-sm font-bold text-text-dark focus:outline-none cursor-pointer">
                      <option>Mais Recentes</option>
                      <option>Menor Preço</option>
                      <option>Maior Preço</option>
                      <option>Destaques</option>
                   </select>
                </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-text-light font-medium text-lg mb-4">Ainda não temos produtos cadastrados para este filtro.</p>
                    <Link to="/" className="text-primary font-bold hover:underline">Ver todos os produtos</Link>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
