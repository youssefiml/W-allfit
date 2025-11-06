import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import {
  SuccessIcon,
  ErrorIcon,
  InfoIcon,
  WarningIcon,
  CloseIcon,
} from "./icons/Icons";

export default function Message({ message, type = "info", onClose, duration = 5000 }) {
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!message) return null;

  const bgColor = {
    success: "bg-green-500 dark:bg-green-600",
    error: "bg-red-500 dark:bg-red-600",
    info: "bg-gradient-to-r from-pink-500 to-purple-500",
    warning: "bg-yellow-500 dark:bg-yellow-600"
  }[type];

  const IconComponent = {
    success: SuccessIcon,
    error: ErrorIcon,
    info: InfoIcon,
    warning: WarningIcon
  }[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}
      >
        {IconComponent && <IconComponent className="w-5 h-5 flex-shrink-0" />}
        <p className="flex-1">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition flex-shrink-0"
            aria-label="Close message"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export function MessageContainer({ messages, removeMessage }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ delay: index * 0.1 }}
            className={`${
              msg.type === "success"
                ? "bg-green-500 dark:bg-green-600"
                : msg.type === "error"
                ? "bg-red-500 dark:bg-red-600"
                : msg.type === "warning"
                ? "bg-yellow-500 dark:bg-yellow-600"
                : "bg-blue-500 dark:bg-blue-600"
            } text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}
          >
            {msg.type === "success" && <SuccessIcon className="w-5 h-5 flex-shrink-0" />}
            {msg.type === "error" && <ErrorIcon className="w-5 h-5 flex-shrink-0" />}
            {msg.type === "warning" && <WarningIcon className="w-5 h-5 flex-shrink-0" />}
            {msg.type === "info" && <InfoIcon className="w-5 h-5 flex-shrink-0" />}
            <p className="flex-1">{msg.message}</p>
            <button
              onClick={() => removeMessage(msg.id)}
              className="text-white hover:text-gray-200 transition flex-shrink-0"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}