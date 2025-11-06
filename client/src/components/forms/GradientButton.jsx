import { motion } from "framer-motion";

export default function GradientButton({
  type = "button",
  onClick,
  children,
  loading = false,
  className = "",
  disabled = false,
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      className={`w-full bg-gradient-to-r from-pink-500 to-purple-500 border-none rounded-md px-8 py-6 text-[#0a0a0f] text-base font-semibold cursor-pointer transition-all duration-300 relative overflow-hidden uppercase tracking-wide ${
        loading ? "pointer-events-none" : ""
      } ${className} ${
        !loading && !disabled
          ? "hover:shadow-[0_10px_30px_rgba(236,72,153,0.3),0_0_40px_rgba(236,72,153,0.2)] hover:-translate-y-0.5"
          : ""
      }`}
    >
      <span className={`btn-text transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}>
        {children}
      </span>
      {loading && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 border-2 border-transparent border-t-[#0a0a0f] rounded-full animate-spin" />
      )}
      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full transition-transform duration-500 hover:translate-x-full" />
    </motion.button>
  );
}

