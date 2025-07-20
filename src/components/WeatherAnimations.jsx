import React from 'react';
import { motion } from 'framer-motion';

const WeatherAnimations = ({ weatherCondition }) => {
  const condition = weatherCondition?.toLowerCase() || '';

  // Rain Animation
  const RainDrops = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-400/70 rounded-full"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 20 + 10,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
          }}
          animate={{
            y: window.innerHeight + 50,
          }}
          transition={{
            duration: Math.random() * 1.5 + 0.8,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
        />
      ))}
      {/* Heavy rain drops */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`heavy-${i}`}
          className="absolute bg-blue-500/80 rounded-full"
          style={{
            width: Math.random() * 3 + 2,
            height: Math.random() * 25 + 15,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
          }}
          animate={{
            y: window.innerHeight + 50,
          }}
          transition={{
            duration: Math.random() * 1 + 0.6,
            repeat: Infinity,
            delay: Math.random() * 1.5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );

  // Snow Animation
  const Snowflakes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large snowflakes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/90"
          style={{
            fontSize: Math.random() * 15 + 15,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -30,
            rotate: 0,
          }}
          animate={{
            y: window.innerHeight + 30,
            rotate: 360,
            x: Math.random() * window.innerWidth * 0.1 - window.innerWidth * 0.05,
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "linear",
          }}
        >
          ❄
        </motion.div>
      ))}
      {/* Small snowflakes */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`small-${i}`}
          className="absolute text-white/70"
          style={{
            fontSize: Math.random() * 8 + 6,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            rotate: 0,
          }}
          animate={{
            y: window.innerHeight + 20,
            rotate: 360,
            x: Math.random() * window.innerWidth * 0.15 - window.innerWidth * 0.075,
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "linear",
          }}
        >
          •
        </motion.div>
      ))}
    </div>
  );

  // Storm Animation
  const Lightning = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Lightning flashes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-yellow-400/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 0.15,
            repeat: Infinity,
            delay: Math.random() * 8 + i * 3,
          }}
        />
      ))}
      {/* Thunder effects */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`thunder-${i}`}
          className="absolute inset-0 bg-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            delay: Math.random() * 10 + i * 4,
          }}
        />
      ))}
    </div>
  );

  // Cloud Animation
  const Clouds = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/40 text-6xl"
          initial={{
            x: -100,
            y: Math.random() * window.innerHeight * 0.5,
          }}
          animate={{
            x: window.innerWidth + 100,
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            delay: Math.random() * 10,
          }}
        >
          ☁
        </motion.div>
      ))}
    </div>
  );

  // Sun Animation
  const Sun = () => (
    <motion.div
      className="absolute top-10 right-10 text-yellow-400 text-6xl"
      animate={{
        rotate: 360,
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotate: {
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        },
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      ☀
    </motion.div>
  );

  // Fog Animation
  const Fog = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base fog layer */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-40 bg-white/15 rounded-full blur-2xl"
          style={{
            width: Math.random() * 300 + 150,
          }}
          initial={{
            x: -300,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: window.innerWidth + 300,
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            delay: Math.random() * 8,
          }}
        />
      ))}
      {/* Dense fog patches */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`dense-${i}`}
          className="absolute h-60 bg-white/25 rounded-full blur-3xl"
          style={{
            width: Math.random() * 400 + 200,
          }}
          initial={{
            x: -400,
            y: Math.random() * window.innerHeight * 0.7,
          }}
          animate={{
            x: window.innerWidth + 400,
          }}
          transition={{
            duration: Math.random() * 25 + 20,
            repeat: Infinity,
            delay: Math.random() * 12,
          }}
        />
      ))}
    </div>
  );

  // Determine which animation to show
  const getAnimation = () => {
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return <RainDrops />;
    }
    if (condition.includes('snow') || condition.includes('sleet')) {
      return <Snowflakes />;
    }
    if (condition.includes('storm') || condition.includes('thunder')) {
      return (
        <>
          <RainDrops />
          <Lightning />
        </>
      );
    }
    if (condition.includes('cloud') || condition.includes('overcast')) {
      return <Clouds />;
    }
    if (condition.includes('clear') || condition.includes('sunny')) {
      return <Sun />;
    }
    if (condition.includes('fog') || condition.includes('mist')) {
      return <Fog />;
    }
    return null;
  };

  return getAnimation();
};

export default WeatherAnimations; 