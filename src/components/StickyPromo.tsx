import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, ArrowRight, X } from 'lucide-react';

export const StickyPromo: FC = () => {
    const [isBubble, setIsBubble] = useState(true); // Default to bubble
    const [showBanner, setShowBanner] = useState(true); // Control initial full banner

    useEffect(() => {
        // Show banner for 6 seconds then turn into bubble
        const timer = setTimeout(() => {
            setShowBanner(false);
        }, 6000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed bottom-24 left-2 right-2 z-50 md:hidden pointer-events-none flex flex-col items-end gap-3">
            <AnimatePresence mode="wait">
                {showBanner ? (
                    <motion.div 
                        key="banner"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="bg-[#4ebecd] text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 pointer-events-auto w-full border border-white/20 mb-2 text-center self-center"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <Tag size={16} strokeWidth={3} className="text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Presente para você</p>
                                <p className="text-sm font-bold">PRIMEIRACOMPRA - 10% OFF</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setShowBanner(false)}
                                className="bg-white/10 hover:bg-white/20 text-white p-1 rounded-full transition-colors"
                            >
                                <X size={14} strokeWidth={3} />
                            </button>
                            <button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors">
                                <ArrowRight size={20} strokeWidth={3} />
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button 
                        key="bubble"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowBanner(true)}
                        className="bg-[#4ebecd] text-white p-4 rounded-full shadow-2xl pointer-events-auto border-4 border-white flex items-center justify-center relative mb-2 self-end"
                    >
                        <Tag size={24} className="text-white" />
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white"
                        />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};
