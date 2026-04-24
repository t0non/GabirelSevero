import { FC, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, PartyPopper, ArrowRight, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

export const SuccessPage: FC = () => {
    // Clear cart on success (for demo purposes)
    const { items } = useCartStore();
    
    return (
        <div className="bg-site-bg min-h-screen flex items-center justify-center py-20 px-4">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-2xl w-full bg-white rounded-[3rem] p-10 md:p-20 text-center shadow-2xl relative overflow-hidden"
            >
                {/* Confetti decoration */}
                <div className="absolute top-0 right-0 text-primary/10 rotate-12 -translate-y-1/2 translate-x-1/2">
                    <PartyPopper size={200} />
                </div>
                
                <div className="relative z-10 space-y-8">
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-24 h-24 bg-white border border-secondary/30 rounded-full flex items-center justify-center mx-auto text-secondary shadow-sm"
                    >
                        <CheckCircle2 size={48} />
                    </motion.div>
                    
                    <div className="space-y-4">
                        <h1 className="text-4xl font-black text-text-dark font-heading">Pedido Realizado!</h1>
                        <p className="text-text-light text-lg">
                            Obrigado por nos deixar fazer parte do seu momento especial. <br />
                            Seus arquivos já foram enviados para o seu e-mail e estão disponíveis para download imediato.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 flex flex-col items-center gap-4 shadow-sm">
                        <p className="text-xs font-bold text-text-dark uppercase tracking-widest">Acompanhe seu pedido no WhatsApp</p>
                        <button className="bg-[#25D366] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-[#25D366]/20">
                            <MessageCircle size={20} /> Entrar em Contato
                        </button>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-text-light uppercase tracking-widest mb-6">Que tal se inspirar enquanto espera?</p>
                        <div className="flex justify-center gap-6">
                            <button className="flex items-center gap-2 text-text-dark font-bold hover:text-primary transition-colors">
                                <Instagram size={20} /> @festa_na_caixa
                            </button>
                        </div>
                    </div>

                    <Link to="/" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm pt-8 hover:underline">
                        Voltar para a Home <ArrowRight size={16} />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};
