import { CheckIcon } from "../icons/Icons";

export default function CustomCheckbox({
  id,
  name,
  label,
  checked = false,
  onChange,
  className = "",
}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`remember-wrapper flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        className="hidden"
      />
      <label htmlFor={id} className="checkbox-label flex items-center gap-2 text-gray-700 dark:text-[#a0a0b0] text-sm cursor-pointer select-none transition-colors duration-300 hover:text-gray-900 dark:hover:text-white">
        <span
          className={`custom-checkbox w-4 h-4 border-2 rounded border-gray-300 dark:border-[#2a2a35] flex items-center justify-center transition-all duration-300 ${
            checked
              ? "border-pink-400 dark:border-pink-400 bg-pink-50 dark:bg-[rgba(236,72,153,0.1)] shadow-[0_0_10px_rgba(236,72,153,0.3)]"
              : ""
          }`}
        >
          {checked && (
            <CheckIcon className="w-2.5 h-2.5 text-pink-400" />
          )}
        </span>
        {label}
      </label>
    </div>
  );
}

