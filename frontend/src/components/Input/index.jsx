import React from "react";

const Input = ({ type, placeholder = "", value, onChange,required}) => {
  return (
    <div className={`flex items-center border border-gray-300 rounded-md p-2`}>
      <input
        className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;