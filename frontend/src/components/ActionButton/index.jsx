import React, { useEffect } from "react";

export default function ActionButton({ onClick, disabled, text, color, keyTrigger }) {
  const baseStyle =
    "w-40 py-3 px-4 rounded-md text-white font-semibold transition duration-150 ease-in-out";

  const colorClasses = {
    green: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
    red: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
  };

  const activeStyle = colorClasses[color] || "bg-gray-600";

  const fullClassName = `${baseStyle} ${
    disabled ? "bg-gray-400 cursor-not-allowed" : activeStyle
  }`;

  useEffect(() => {
    const handleKeyDown = (e) => {
      const keys = Array.isArray(keyTrigger) ? keyTrigger : [keyTrigger];

      if (keys.includes(e.key) && !disabled) {
        e.preventDefault();
        onClick?.();
      }
    };

    if (keyTrigger) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [keyTrigger, disabled, onClick]);

  return (
    <button onClick={onClick} disabled={disabled} className={fullClassName}>
      {text}
    </button>
  );
}
