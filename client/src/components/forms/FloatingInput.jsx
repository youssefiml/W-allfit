import { useState } from "react";
import { EyeIcon } from "../icons/Icons";

export default function FloatingInput({
  type = "text",
  id,
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  autoComplete,
  className = "",
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const hasValue = value && value.trim() !== "";
  const isFloating = isFocused || hasValue;

  return (
    <div className={`form-group ${error ? "error" : ""} ${className}`}>
      <div className="input-wrapper relative mb-6">
        <input
          type={inputType}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          autoComplete={autoComplete}
          className={`w-full bg-gray-100 dark:bg-[#1a1a25] border ${
            error
              ? "border-red-400 dark:border-[#ff0080] bg-red-50 dark:bg-[rgba(255,0,128,0.05)]"
              : isFocused
              ? "border-transparent bg-white dark:bg-[rgba(26,26,37,0.8)]"
              : "border-gray-300 dark:border-[#2a2a35]"
          } rounded-md px-4 pt-6 pb-2 text-gray-900 dark:text-white text-base font-normal transition-all duration-300 ease-out outline-none ${
            isFocused && !error
              ? "shadow-[0_0_0_3px_rgba(236,72,153,0.1),0_4px_20px_rgba(236,72,153,0.1)] dark:shadow-[0_0_0_3px_rgba(236,72,153,0.1),0_4px_20px_rgba(236,72,153,0.1)]"
              : ""
          } ${isPassword ? "pr-12" : ""}`}
        />
        <label
          htmlFor={id}
          className={`absolute left-4 pointer-events-none transition-all duration-300 ease-out origin-left ${
            isFloating
              ? "top-1 text-sm text-pink-400 dark:text-pink-400 font-medium translate-y-0"
              : "top-4 text-base text-gray-500 dark:text-[#a0a0b0] font-normal"
          }`}
        >
          {label}
        </label>
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-2 text-gray-500 dark:text-[#a0a0b0] transition-all duration-300 rounded-md hover:text-pink-400 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-[rgba(236,72,153,0.1)]"
            aria-label="Toggle password visibility"
          >
            <EyeIcon show={showPassword} className="w-5 h-5" />
          </button>
        )}
        <span
          className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 ease-out rounded-sm -translate-x-1/2 ${
            isFocused ? "w-full" : "w-0"
          }`}
        />
      </div>
      {error && (
        <span
          className={`error-message text-red-500 dark:text-[#ff0080] text-xs font-medium mt-2 ml-1 block opacity-0 transform -translate-y-2.5 transition-all duration-300 ${
            error ? "opacity-100 translate-y-0" : ""
          } bg-red-50 dark:bg-[rgba(255,0,128,0.1)] px-2 py-1 rounded-md border border-red-200 dark:border-[rgba(255,0,128,0.2)]`}
        >
          {error}
        </span>
      )}
    </div>
  );
}

