import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FitnessIcon, FlowerIcon, SparkleIcon } from "./icons/Icons";

export default function Hero() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleGetStarted = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center text-center h-screen bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8"
      >
        <img 
          src="/wallfit-logo.png" 
          alt="W.ALLfit Logo" 
          className="h-24 w-24 md:h-32 md:w-32 object-contain mx-auto filter drop-shadow-lg"
        />
      </motion.div>
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-5xl font-bold text-pink-600 dark:text-pink-400 px-4"
      >
        Empowering Women Through Personalized Wellness
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="mt-6 text-lg text-gray-700 dark:text-gray-200 max-w-2xl px-4"
      >
        Science-based fitness and nutrition programs designed for women's unique needs. 
        Train smarter with cycle-aware programs, nourish better with personalized plans, 
        and thrive with our supportive community.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
        className="mt-4 flex gap-4 items-center text-gray-600 dark:text-gray-400 text-sm px-4"
      >
        <span className="flex items-center gap-1">
          <FitnessIcon className="w-4 h-4" />
          Personalized Programs
        </span>
        <span className="flex items-center gap-1">
          <FlowerIcon className="w-4 h-4" />
          Cycle-Aware Training
        </span>
        <span className="flex items-center gap-1">
          <SparkleIcon className="w-4 h-4" />
          Community Support
        </span>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGetStarted}
        className="mt-6 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition"
      >
        Get Started
      </motion.button>
    </motion.section>
  );
}
