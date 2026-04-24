import { FC } from 'react';
import { motion } from 'motion/react';
import { Rocket, Truck, Gift, Sparkles } from 'lucide-react';

const MESSAGES = [
  { text: "FRETE GRÁTIS ACIMA DE R$ 160", icon: <Truck size={14} strokeWidth={3} className="text-white" />, prefix: "" },
  { text: "PARCELAMENTO EM ATÉ 3X SEM JUROS", icon: <Gift size={14} strokeWidth={3} className="text-white" />, prefix: "" },
  { text: "PRIMEIRACOMPRA - 5% OFF", icon: <Rocket size={14} strokeWidth={3} className="text-white" />, prefix: "ÚLTIMOS DIAS:" },
  { text: "FRETE GRÁTIS ACIMA DE R$ 160", icon: <Sparkles size={14} strokeWidth={3} className="text-white" />, prefix: "" },
  { text: "PARCELAMENTO EM ATÉ 3X SEM JUROS", icon: <Gift size={14} strokeWidth={3} className="text-white" />, prefix: "" },
  { text: "PRIMEIRACOMPRA - 5% OFF", icon: <Sparkles size={14} strokeWidth={3} className="text-white" />, prefix: "ÚLTIMOS DIAS:" },
];

export const AnnouncementBar: FC = () => {
  return (
    <div className="bg-[#4ebecd] text-white py-2 overflow-hidden whitespace-nowrap border-b border-white/5">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex items-center gap-12 sm:gap-24 px-4 w-max"
      >
        {[...MESSAGES, ...MESSAGES, ...MESSAGES, ...MESSAGES].map((msg, i) => (
          <div key={i} className="flex items-center gap-3 font-sans text-[10px] md:text-xs tracking-wider font-light shrink-0">
            {msg.prefix && (
              <span className="text-white font-bold">{msg.prefix}</span>
            )}
            <span className="uppercase">{msg.text}</span>
            {msg.icon}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
