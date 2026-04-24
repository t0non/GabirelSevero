import { FC, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, CreditCard, ArrowLeft, Package, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

export const CheckoutPage: FC = () => {
  const { items, getTotal } = useCartStore();
  const total = getTotal();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <Package size={64} className="text-gray-200 mb-6" />
        <h2 className="text-2xl font-bold text-text-dark mb-4">Seu carrinho está vazio!</h2>
        <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold">Voltar para a Loja</Link>
      </div>
    );
  }

  return (
    <div className="bg-site-bg min-h-screen pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
            <Link to="/" className="flex items-center gap-2 text-text-light hover:text-primary transition-colors font-bold text-sm">
                <ArrowLeft size={16} /> Continuar Comprando
            </Link>
            <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-light">Checkout Seguro SSL</span>
            </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Main Checkout Form */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step Indicators */}
            <div className="flex items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
               {[
                 { n: 1, l: 'Identificação' },
                 { n: 2, l: 'Recebimento' },
                 { n: 3, l: 'Pagamento' }
               ].map((s) => (
                 <div key={s.n} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s.n ? 'bg-primary text-white' : 'bg-gray-100 text-text-light'}`}>
                        {s.n}
                    </div>
                    <span className={`text-xs uppercase font-bold tracking-widest hidden sm:block ${step >= s.n ? 'text-text-dark' : 'text-text-light opacity-50'}`}>{s.l}</span>
                    {s.n < 3 && <div className="w-12 h-[2px] bg-gray-100 hidden md:block" />}
                 </div>
               ))}
            </div>

            {/* Content per Step */}
            <motion.div 
               key={step}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-text-dark mb-8 flex items-center gap-3">
                    <Package className="text-primary" /> Informações de Contato
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-light uppercase tracking-widest">E-mail</label>
                      <input type="email" placeholder="nome@exemplo.com" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-light uppercase tracking-widest">Telefone (WhatsApp)</label>
                      <input type="tel" placeholder="(11) 99999-9999" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-xs font-bold text-text-light uppercase tracking-widest">Nome Completo</label>
                       <input type="text" placeholder="Como devemos te chamar?" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.01] active:scale-95 transition-all">
                    Ir para Entrega
                  </button>
                </div>
              )}

              {step === 2 && (
                 <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-text-dark mb-8 flex items-center gap-3">
                      <Truck className="text-primary" /> Onde você receberá os arquivos?
                    </h3>
                    <div className="p-6 bg-white rounded-2xl border border-secondary/30 space-y-4 shadow-sm">
                       <p className="text-sm text-text-dark leading-relaxed">
                         Nossos arquivos são **digitais**. Você os receberá instantaneamente no e-mail e no WhatsApp informados após a confirmação do pagamento.
                       </p>
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-text-light uppercase tracking-widest">Confirme seu E-mail de Recebimento</label>
                          <input type="email" placeholder="seu-email@exemplo.com" className="w-full bg-white border border-gray-100 p-4 rounded-xl outline-none" />
                       </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                       <button onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-text-dark py-5 rounded-2xl font-bold uppercase tracking-widest">Voltar</button>
                       <button onClick={() => setStep(3)} className="flex-[2] bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest">Ir para Pagamento</button>
                    </div>
                 </div>
              )}

              {step === 3 && (
                 <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-text-dark mb-8 flex items-center gap-3">
                      <CreditCard className="text-primary" /> Escolha o Pagamento
                    </h3>
                    <div className="space-y-4">
                       {[
                         { id: 'pix', n: 'Pix (5% OFF)', desc: 'Liberação imediata no estoque' },
                         { id: 'cc', n: 'Cartão de Crédito', desc: 'Até 3x sem juros' },
                         { id: 'boleto', n: 'Boleto Bancário', desc: 'Vencimento em 1 dia útil' }
                       ].map(p => (
                         <div key={p.id} className="p-6 border-2 border-gray-100 rounded-2xl hover:border-primary cursor-pointer transition-all flex items-center gap-4 group">
                            <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-primary group-hover:border-8 transition-all" />
                            <div>
                               <p className="font-bold text-text-dark">{p.n}</p>
                               <p className="text-xs text-text-light">{p.desc}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="flex gap-4 pt-8">
                       <button onClick={() => setStep(2)} className="flex-1 bg-gray-100 text-text-dark py-5 rounded-2xl font-bold uppercase tracking-widest">Voltar</button>
                       <button 
                        onClick={() => navigate('/sucesso')}
                        className="flex-[2] bg-secondary text-white py-5 rounded-2xl font-black uppercase tracking-widest"
                       >
                         Finalizar Compra
                       </button>
                    </div>
                 </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary (Sticky) */}
          <div className="lg:col-span-4 sticky top-10 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 divide-y divide-gray-100">
               <h4 className="font-bold text-text-dark mb-6 text-lg">Resumo do Pedido</h4>
               <div className="py-6 space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3">
                       <img src={item.image} className="w-16 h-16 rounded-xl object-cover"  referrerPolicy="no-referrer" />
                       <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-text-dark truncate">{item.name}</p>
                          <p className="text-[10px] text-text-light">{item.quantity}x R$ {item.price.toFixed(2)}</p>
                       </div>
                       <span className="text-xs font-bold text-text-dark">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
               </div>
               <div className="py-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-light font-medium">Subtotal</span>
                    <span className="text-text-dark font-bold">R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-light font-medium">Frete</span>
                    <span className="text-secondary font-bold uppercase tracking-tighter">{total >= 160 ? 'Grátis' : 'Calcular'}</span>
                  </div>
                  <div className="flex justify-between text-xl pt-4 border-t border-gray-100 mt-4">
                    <span className="text-text-dark font-black">Total</span>
                    <span className="text-primary font-black">R$ {total.toFixed(2)}</span>
                  </div>
               </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-secondary/30 space-y-4 text-center shadow-sm">
               <div className="flex items-center justify-center gap-2 text-secondary">
                  <ShieldCheck size={20} />
                  <p className="text-xs font-black uppercase tracking-widest">Checkout Seguro</p>
               </div>
               <p className="text-[10px] text-text-light">Sua segurança é nossa prioridade. Todos os dados são criptografados de ponta a ponta.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
