import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Starry background component
const StarryBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    {[...Array(60)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-white rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${1 + Math.random() * 2}px`,
          height: `${1 + Math.random() * 2}px`,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0.5, 1, 0],
          scale: [1, 1.2, 1, 1.1, 1],
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 3,
        }}
      />
    ))}
  </div>
);

const NotFound = () => {
  const navigate = useNavigate();

  // For the 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    animate(x, 0, { duration: 0.5 });
    animate(y, 0, { duration: 0.5 });
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center  bg-foreground-strong text-primary-foreground">
      <StarryBackground />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 z-10" />

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-20 flex flex-col items-center justify-center text-center p-8 bg-black/30 rounded-2xl shadow-2xl shadow-purple-500/20 border border-purple-500/30 backdrop-blur-md"
      >
        <motion.div
          className="absolute inset-0 border-4 border-purple-600 rounded-2xl opacity-0"
          animate={{
            opacity: [0, 0.4, 0],
            scale: [1, 1.1, 1.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformStyle: "preserve-3d" }}
        />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 relative group">
            Under Construction
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-pink-500/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
          </h1>
        </motion.div>

        <motion.p
          className="text-lg text-foreground-subtle mb-8 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Something amazing is being built here. We are working hard to bring
          this page to life. Please check back soon!
        </motion.p>

        <motion.button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600/80 text-white font-semibold rounded-lg hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/30 cursor-pointer z-20"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 30px rgba(138, 43, 226, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <ArrowLeft size={20} />
          Go Back
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;
