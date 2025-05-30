import React from "react";

const Input = ({ type = "text", placeholder = "", value }) => {
  return (
    <div className={`flex items-center border border-gray-300 rounded-md p-2`}>
      <input
        className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;