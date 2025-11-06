// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="text-center p-6 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img 
            src="/wallfit-logo.png" 
            alt="W.ALLfit Logo" 
            className="h-8 w-8 object-contain opacity-80"
          />
          <span className="text-lg font-bold text-pink-600 dark:text-pink-400">
            W.ALLfit
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          © 2025 W.ALLfit - Empowering Women Through Personalized Wellness
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Science-based fitness and nutrition designed for women's unique needs
        </p>
      </div>
    </footer>
  );
}