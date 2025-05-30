import React from 'react';

const Input = ({ id,label, type="text", placeholder, value, onChange }) => {
    return(
        <div className="m-4">
            <label className="block text-gray-700 tex-sm font-bold mb-2" htmlFor={id}>{label}</label>
            <input
                type={type}
                id={label}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </input>
        </div>
    )
}

export default Input;