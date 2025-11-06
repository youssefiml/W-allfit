import { useEffect, useRef } from "react";

export default function BackgroundEffects() {
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      if (orb1Ref.current) {
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        orb1Ref.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }

      if (orb2Ref.current) {
        const moveX = (x - 0.5) * 30;
        const moveY = (y - 0.5) * 30;
        orb2Ref.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }

      if (orb3Ref.current) {
        const moveX = (x - 0.5) * 15;
        const moveY = (y - 0.5) * 15;
        orb3Ref.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      <div
        ref={orb1Ref}
        className="absolute w-[300px] h-[300px] top-[10%] -left-[10%] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.03),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(236,72,153,0.08),transparent_70%)] animate-[float_6s_ease-in-out_infinite] transition-opacity duration-300"
        style={{ animationDelay: "0s" }}
      />
      <div
        ref={orb2Ref}
        className="absolute w-[200px] h-[200px] top-[60%] -right-[5%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.02),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(168,85,247,0.06),transparent_70%)] animate-[float_6s_ease-in-out_infinite] transition-opacity duration-300"
        style={{ animationDelay: "-2s" }}
      />
      <div
        ref={orb3Ref}
        className="absolute w-[150px] h-[150px] bottom-[20%] left-[10%] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.02),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(236,72,153,0.04),transparent_70%)] animate-[float_6s_ease-in-out_infinite] transition-opacity duration-300"
        style={{ animationDelay: "-4s" }}
      />
    </div>
  );
}

