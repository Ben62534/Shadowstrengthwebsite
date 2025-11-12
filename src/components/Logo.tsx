import { motion } from "motion/react";

interface LogoProps {
  size?: "small" | "medium" | "large";
  animated?: boolean;
}

export function Logo({ size = "medium", animated = false }: LogoProps) {
  const dimensions = {
    small: { width: 40, height: 40, fontSize: "text-xl" },
    medium: { width: 160, height: 160, fontSize: "text-7xl" },
    large: { width: 200, height: 200, fontSize: "text-8xl" },
  };

  const { width, height, fontSize } = dimensions[size];

  const LogoContent = () => (
    <div className="relative group">
      {/* Outer Glow Effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-red-600 via-red-500 to-red-700 rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
      
      {/* Logo Container */}
      <div 
        className="relative bg-gradient-to-br from-zinc-900 to-black border-2 border-red-600/40 rounded-xl overflow-hidden shadow-2xl group-hover:border-red-600/70 transition-all duration-300"
        style={{ width, height }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent"></div>
        </div>
        
        {/* SS Text with Shadow Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Shadow layers for depth */}
          <div className={`absolute ${fontSize} font-bold tracking-wider text-black/50 blur-sm`} style={{ transform: 'translate(2px, 2px)' }}>
            SS
          </div>
          <div className={`absolute ${fontSize} font-bold tracking-wider text-black/30 blur-md`} style={{ transform: 'translate(4px, 4px)' }}>
            SS
          </div>
          
          {/* Main Text with Gradient */}
          <div className={`relative ${fontSize} font-bold tracking-wider bg-gradient-to-br from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent drop-shadow-2xl`}>
            SS
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-600/60"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-600/60"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-600/60"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-600/60"></div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        whileHover={{ scale: 1.05 }}
      >
        <LogoContent />
      </motion.div>
    );
  }

  return <LogoContent />;
}
