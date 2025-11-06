import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Message from "../components/Message";
import FloatingInput from "../components/forms/FloatingInput";
import CustomCheckbox from "../components/forms/CustomCheckbox";
import GradientButton from "../components/forms/GradientButton";
import BackgroundEffects from "../components/BackgroundEffects";
import { CheckIcon } from "../components/icons/Icons";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const validateName = (name) => {
    if (!name.trim()) {
      return "Name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    return null;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email";
    }
    return null;
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError || emailError || passwordError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await api.post("/auth/register", { name, email, password });
      setShowSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Registration failed. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50  dark:bg-[#0a0a0f] flex items-center justify-center p-20 relative overflow-hidden transition-colors duration-300">
      <BackgroundEffects />
      
      {message && !showSuccess && (
        <Message
          message={message.text}
          type={message.type}
          onClose={() => setMessage(null)}
          duration={message.type === "success" ? 2000 : 5000}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white dark:bg-[#151520] border border-gray-200 dark:border-[#2a2a35] rounded-2xl p-10 shadow-lg dark:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.05)] relative backdrop-blur-[20px] transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(236,72,153,0.1),0_0_40px_rgba(236,72,153,0.1)] hover:-translate-y-0.5">
          {/* Top border glow on hover */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-0 dark:opacity-0 transition-opacity duration-300 hover:opacity-100 dark:hover:opacity-100" />

          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(236,72,153,0.5)]"
                >
                  <CheckIcon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-gray-900 dark:text-white text-2xl font-semibold mb-2 transition-colors duration-300">
                  Account Created!
                </h3>
                <p className="text-gray-600 dark:text-[#a0a0b0] text-base transition-colors duration-300">
                  Redirecting to login...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header */}
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    <img
                      src="/wallfit-logo.png"
                      alt="W.ALLfit Logo"
                      className="h-16 w-16 mx-auto object-contain filter drop-shadow-[0_0_20px_rgba(236,72,153,0.3)] animate-pulse"
                    />
                  </motion.div>
                  <h2 className="text-gray-900 dark:text-white text-3xl font-semibold mb-2 tracking-tight transition-colors duration-300">
                    Create Account
                  </h2>
                  <p className="text-gray-600 dark:text-[#a0a0b0] text-base font-normal transition-colors duration-300">
                    Start your wellness journey
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FloatingInput
                    type="text"
                    id="name"
                    name="name"
                    label="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) {
                        setErrors({ ...errors, name: null });
                      }
                    }}
                    error={errors.name}
                    required
                    autoComplete="name"
                  />

                  <FloatingInput
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors({ ...errors, email: null });
                      }
                    }}
                    error={errors.email}
                    required
                    autoComplete="email"
                  />

                  <FloatingInput
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors({ ...errors, password: null });
                      }
                    }}
                    error={errors.password}
                    required
                    autoComplete="new-password"
                  />

                  <div className="flex items-center gap-2 mb-8">
                    <CustomCheckbox
                      id="remember"
                      name="remember"
                      label="I agree to the terms and conditions"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                  </div>

                  <GradientButton type="submit" loading={loading}>
                    Create Account
                  </GradientButton>
                </form>

                {/* Sign In Link */}
                <div className="text-center pt-5">
                  <p className="text-gray-600 dark:text-[#a0a0b0] text-sm transition-colors duration-300">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="text-pink-400 no-underline font-medium transition-all duration-300 hover:text-purple-400 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
