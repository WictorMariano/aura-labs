import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

export type ColorChangeCardItem = {
  heading: string;
  description: string;
  imgSrc: string;
};

type ColorChangeCardsProps = {
  items: ColorChangeCardItem[];
  className?: string;
};

export function ColorChangeCards({ items, className = "" }: ColorChangeCardsProps) {
  return (
    <div className={`grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 ${className}`}>
      {items.map((item) => (
        <Card key={item.heading} {...item} />
      ))}
    </div>
  );
}

function Card({ heading, description, imgSrc }: ColorChangeCardItem) {
  return (
    <motion.div
      transition={{ staggerChildren: 0.035 }}
      whileHover="hover"
      className="group relative h-64 w-full cursor-pointer overflow-hidden bg-navy sm:h-72"
    >
      <div
        className="absolute inset-0 saturate-100 transition-all duration-500 group-hover:scale-110 md:saturate-0 md:group-hover:saturate-100"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-void/55 transition-colors duration-500 group-hover:bg-void/35" />
      <div className="relative z-20 flex h-full flex-col justify-between p-5 text-white/70 transition-colors duration-500 group-hover:text-white sm:p-6">
        <ArrowRight className="ml-auto h-8 w-8 transition-transform duration-500 group-hover:-rotate-45" />
        <div>
          <h4 className="flex flex-wrap font-display text-2xl font-medium tracking-tight sm:text-3xl">
            {heading.split("").map((letter, index) => (
              <AnimatedLetter letter={letter} key={`${letter}-${index}`} />
            ))}
          </h4>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55 transition-colors duration-500 group-hover:text-white/85 sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const letterVariants: Variants = {
  hover: {
    y: "-50%",
  },
};

function AnimatedLetter({ letter }: { letter: string }) {
  if (letter === " ") {
    return <span className="inline-block w-[0.35em]" />;
  }

  return (
    <span className="inline-block h-[1.15em] overflow-hidden leading-none">
      <motion.span
        className="flex min-w-[0.05em] flex-col"
        style={{ y: "0%" }}
        variants={letterVariants}
        transition={{ duration: 0.5 }}
      >
        <span>{letter}</span>
        <span className="text-gold">{letter}</span>
      </motion.span>
    </span>
  );
}
