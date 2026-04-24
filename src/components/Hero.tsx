import { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, PartyPopper, Sparkles, ShoppingBag } from 'lucide-react';

export const Hero: FC = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <Link to="/categoria/todos" className="block w-full">
        <picture>
          <source 
            media="(min-width: 768px)" 
            srcSet="https://files.catbox.moe/6rrook.png" 
          />
          <img
            src="https://files.catbox.moe/y41dyg.png"
            alt="Banner Promocional"
            className="w-full min-h-[300px] md:min-h-0 h-auto object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </picture>
      </Link>
    </section>
  );
};

