import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  SuccessIcon,
  ChartIcon,
  WeightLiftingIcon,
  YogaIcon,
  RunningIcon,
  MealIcon,
  BalanceIcon,
  RefreshIcon,
} from "../components/icons/Icons";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleGetStarted = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-800"
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
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetStarted}
          className="mt-6 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition shadow-lg"
        >
          Get Started
        </motion.button>
      </motion.section>

      {/* Main Title Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            variants={cardVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Reimagine Your Journey,{" "}
            <span className="text-pink-600 dark:text-pink-400">Transform Your Life</span>
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Discover a new way to wellness that adapts to you, empowering every step of your transformation.
          </motion.p>
        </div>
      </motion.section>

      {/* Real-Time Insights Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={cardVariants}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-500 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Stay on Track with Real-Time Insights
                </h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Effortlessly monitor your progress with W.ALLfit's intelligent dashboard. View your workouts, 
                nutrition, and performance metrics in one place, updated in real time. Get tailored insights 
                that keep you motivated, help you make smarter adjustments, and push you closer to your goals—every step of the way.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <SuccessIcon className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  <span>Comprehensive progress tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <SuccessIcon className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  <span>Personalized performance insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <SuccessIcon className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  <span>Real-time data synchronization</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            >
              <div className="space-y-4">
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Today's Workouts</span>
                    <span className="text-pink-600 dark:text-pink-400 font-bold">3/5</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Nutrition Goals</span>
                    <span className="text-pink-600 dark:text-pink-400 font-bold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white">
                  <p className="text-sm mb-1">Weekly Progress</p>
                  <p className="text-2xl font-bold">+12%</p>
                  <p className="text-xs opacity-90">Keep up the great work!</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Nutrition Simplified Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={cardVariants}
              className="order-2 md:order-1 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow">
                  <div className="mb-2 flex justify-center">
                    <MealIcon className="w-8 h-8 text-pink-500" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Meal Plans</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow">
                  <div className="mb-2 flex justify-center">
                    <ChartIcon className="w-8 h-8 text-pink-500" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Track Progress</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow">
                  <div className="mb-2 flex justify-center">
                    <BalanceIcon className="w-8 h-8 text-pink-500" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Balance</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow">
                  <div className="mb-2 flex justify-center">
                    <RefreshIcon className="w-8 h-8 text-pink-500" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Flexibility</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={cardVariants}
              className="order-1 md:order-2 space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-500 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  W.ALLfit. Nutrition, Simplified
                </h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Power your goals with customized meal plans designed to fit your lifestyle. Easily track your progress, 
                maintain balance, and enjoy the freedom to adjust as you evolve. Healthy eating has never been simpler.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <SuccessIcon className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  <span>Customized meal plans for your goals</span>
                </li>
                <li className="flex items-center gap-2">
                  <SuccessIcon className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  <span>Easy progress tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <SuccessIcon className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  <span>Flexible adjustments as you grow</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Your Workout, Your Way Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={cardVariants}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-500 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Your Workout, Your Way
                </h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Work out anytime, anywhere. With W.ALLfit, you're in control—your phone becomes your personal trainer. 
                Whether you're building new habits or making lasting changes, the flexibility you need is always at your fingertips.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <SuccessIcon className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  <span>Workout on your schedule</span>
                </li>
                <li className="flex items-center gap-2">
                  <SuccessIcon className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  <span>Personal trainer in your pocket</span>
                </li>
                <li className="flex items-center gap-2">
                  <SuccessIcon className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  <span>Build habits that last</span>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="mt-6 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition shadow-lg font-semibold"
              >
                Start Your Journey
              </motion.button>
            </motion.div>
            <motion.div
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white">
                      <WeightLiftingIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Strength Training</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">30 min • Home</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white">
                      <YogaIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Yoga Flow</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">20 min • Anywhere</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white">
                      <RunningIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Cardio Blast</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">25 min • Outdoors</p>
                    </div>
                  </div>
                </div>
                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-pink-600 dark:text-pink-400">100+</span> workouts available
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-gradient-to-r from-pink-500 to-purple-500 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            variants={cardVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Transform Your Life?
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-xl mb-8 opacity-90"
          >
            Join thousands of women who are already on their journey to better health and wellness.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="px-10 py-4 bg-white text-pink-600 rounded-full font-bold text-lg shadow-xl hover:bg-gray-100 transition"
          >
            Get Started Today
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}
