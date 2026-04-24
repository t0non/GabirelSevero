import { FC } from 'react';
import { motion } from 'motion/react';
import { Heart, Clock, Gift, Sparkles } from 'lucide-react';

export const AboutUs: FC = () => {
  const benefits = [
    { icon: <Sparkles className="text-primary" />, title: 'Beleza nos Detalhes', desc: 'Cada peça é cortada e montada com precisão e muito carinho.' },
    { icon: <Clock className="text-secondary" />, title: 'Rapidez e Praticidade', desc: 'Escolha seu tema e receba tudo pronto para decorar em minutos.' },
    { icon: <Gift className="text-accent" />, title: 'Embalagem de Presente', desc: 'Sua caixa chega tão linda que você vai querer guardar pra sempre.' },
    { icon: <Heart className="text-primary" />, title: 'Feito com Amor', desc: 'Nascemos da paixão por celebrar. Cada festa é única para nós.' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-text-dark mb-6 tracking-tight">
              Nascemos do amor por festas.
            </h2>
            <p className="text-lg text-text-light mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Nosso propósito é tornar a sua comemoração prática, linda e cheia de personalidade. Acreditamos que memórias inesquecíveis não precisam ser complicadas de criar.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center p-3">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark mb-1">{benefit.title}</h4>
                    <p className="text-sm text-text-light leading-snug">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-12 px-8 py-4 bg-secondary text-white rounded-full font-bold hover:scale-105 transition-transform">
              Conheça Nossa História
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 grid grid-cols-2 gap-4"
          >
             <div className="space-y-4 text-center">
                <img src="https://files.catbox.moe/cuvoj2.jpg" alt="Artesanato" className="rounded-2xl shadow-lg border-4 border-white w-full object-cover aspect-[4/5]" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                <img src="https://files.catbox.moe/4d6fpg.jpg" alt="Artesanato" className="rounded-2xl shadow-lg border-4 border-white w-full object-cover aspect-[4/3]" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
             </div>
             <div className="space-y-4 pt-12 text-center">
                <img src="https://files.catbox.moe/kf2bph.png" alt="Artesanato" className="rounded-2xl shadow-lg border-4 border-white w-full object-cover aspect-[4/3]" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                <img src="https://files.catbox.moe/u31as7.jpg" alt="Artesanato" className="rounded-2xl shadow-lg border-4 border-white w-full object-cover aspect-[4/5]" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
