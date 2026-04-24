import { FC } from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 border-b border-gray-100 pb-20">
          {/* Logo & Brand */}
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center">
              <img 
                src="https://files.catbox.moe/4rz9jq.png" 
                alt="Festa na Caixa" 
                className="h-16 w-auto object-contain" 
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-text-light text-lg max-w-sm leading-relaxed">
              Transformamos sonhos em papel. Papelaria afetiva e criativa para tornar seus momentos ainda mais mágicos e inesquecíveis.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-2xl text-text-light hover:text-primary hover:bg-primary/10 transition-all shadow-sm">
                <Instagram size={24} />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-2xl text-text-light hover:text-secondary hover:bg-secondary/10 transition-all shadow-sm">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="font-black text-text-dark uppercase tracking-widest text-xs">Arquivos</h4>
            <ul className="space-y-4 text-sm font-bold text-text-light">
              <li><Link to="/categoria/kits-digitais" className="hover:text-primary transition-colors">Kits para Imprimir</Link></li>
              <li><Link to="/categoria/topos-e-tags" className="hover:text-primary transition-colors">Topos e Tags</Link></li>
              <li><Link to="/categoria/moldes-e-caixas" className="hover:text-primary transition-colors">Moldes e Caixas</Link></li>
              <li><Link to="/categoria/editaveis" className="hover:text-primary transition-colors">Convites Editáveis</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-8">
            <h4 className="font-black text-text-dark uppercase tracking-widest text-xs">Atendimento</h4>
            <ul className="space-y-4 text-sm font-bold text-text-light">
              <li><Link to="#" className="hover:text-primary transition-colors">Dúvidas Frequentes</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Política de Frete</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Trocas e Devoluções</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Prazos de Produção</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="font-black text-text-dark uppercase tracking-widest text-xs">Contato</h4>
            <ul className="space-y-5 text-sm font-bold text-text-light">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-secondary shrink-0" />
                <span>São Paulo - SP, Brasil</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-secondary shrink-0" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-secondary shrink-0" />
                <span className="truncate">ola@festanacaixa.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-text-light font-bold text-xs">
              © 2026 Festa na Caixa Papelaria Afetiva.
            </p>
            <p className="text-[10px] text-text-light opacity-60">CNPJ: 00.000.000/0001-00</p>
          </div>
          
          <div className="flex items-center gap-8 bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-sm">
            <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-6 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" loading="lazy" decoding="async" />
            <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="Mastercard" className="h-6 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" loading="lazy" decoding="async" />
            <img src="https://cdn-icons-png.flaticon.com/128/196/196024.png" alt="Pix" className="h-6 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </footer>
  );
};
