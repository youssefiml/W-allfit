// src/pages/Program.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";
import Message from "../components/Message";
import {
  WeightLiftingIcon,
  MealIcon,
  FitnessIcon,
  SparkleIcon,
  CheckIcon,
} from "../components/icons/Icons";

export default function Program() {
  const [savedProgram, setSavedProgram] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState(false);
  const [samplePrograms, setSamplePrograms] = useState([]);
  const [selectedProgramIndex, setSelectedProgramIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch sample programs
        const samplesRes = await api.get("/program/samples");
        setSamplePrograms(samplesRes.data);

        // Fetch user's saved program
        try {
          const res = await api.get("/program");
          if (res.data) {
            setSavedProgram(res.data);
            // Find which sample program matches
            const matchIndex = samplesRes.data.findIndex(
              sample => sample.title === res.data.title
            );
            if (matchIndex !== -1) {
              setSelectedProgramIndex(matchIndex);
            }
          }
        } catch {
          console.log("No program selected yet");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setMessage({ type: "error", text: "Error loading programs" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectProgram = async (program, index) => {
    setSelecting(true);
    try {
      const res = await api.post("/program", program);
      setSavedProgram(res.data);
      setSelectedProgramIndex(index);
      setMessage({ 
        type: "success", 
        text: `"${program.title}" program selected successfully!` 
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Error selecting program",
      });
    } finally {
      setSelecting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading programs...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8"
    >
      {message && (
        <Message
          message={message.text}
          type={message.type}
          onClose={() => setMessage(null)}
          duration={message.type === "success" ? 3000 : 5000}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <FitnessIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Choose Your Wellness Program
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Select from 8 expertly designed programs tailored for women aged 20-45. Each program includes targeted exercises and nutrition guidance.
          </p>
        </motion.div>

        {/* Current Selection Banner */}
        {savedProgram && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckIcon className="w-8 h-8" />
                <div>
                  <p className="text-sm font-medium opacity-90">Your Current Program</p>
                  <h3 className="text-2xl font-bold">{savedProgram.title}</h3>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">{savedProgram.exercises.length} Exercises</p>
                <p className="text-sm opacity-90">{savedProgram.nutrition.length} Nutrition Tips</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {samplePrograms.map((program, index) => {
            const isSelected = selectedProgramIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer border-2 ${
                  isSelected
                    ? "border-green-500 dark:border-green-400"
                    : "border-transparent hover:border-pink-300 dark:hover:border-pink-700"
                }`}
                onClick={() => !selecting && handleSelectProgram(program, index)}
              >
                {/* Selected Badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
                      <CheckIcon className="w-5 h-5" />
                    </div>
                  </div>
                )}

                {/* Gradient Header */}
                <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                  <p className="text-sm text-pink-100 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Exercises Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <WeightLiftingIcon className="w-5 h-5 text-pink-500" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Exercises ({program.exercises.length})
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {program.exercises.slice(0, 3).map((exercise, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <span className="text-pink-500 mt-0.5">•</span>
                          <span>{exercise}</span>
                        </div>
                      ))}
                      {program.exercises.length > 3 && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 italic">
                          +{program.exercises.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Nutrition Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MealIcon className="w-5 h-5 text-purple-500" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Nutrition ({program.nutrition.length})
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {program.nutrition.slice(0, 2).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <span className="text-purple-500 mt-0.5">•</span>
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                      {program.nutrition.length > 2 && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 italic">
                          +{program.nutrition.length - 2} more
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Select Button */}
                  <button
                    disabled={selecting}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isSelected
                        ? "bg-green-500 text-white"
                        : "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
                    } ${selecting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isSelected ? "✓ Selected" : "Select Program"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed View of Selected Program */}
        {savedProgram && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <SparkleIcon className="w-8 h-8 text-pink-500" />
              Your Program Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Exercises */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <WeightLiftingIcon className="w-6 h-6 text-pink-500" />
                  Exercise Routine
                </h3>
                <div className="space-y-3">
                  {savedProgram.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl border border-pink-200 dark:border-pink-800"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">
                        {exercise}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrition */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <MealIcon className="w-6 h-6 text-purple-500" />
                  Nutrition Guide
                </h3>
                <div className="space-y-3">
                  {savedProgram.nutrition.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800"
                    >
                      <CheckIcon className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800 dark:text-gray-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}