import React from 'react';

const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '',
  isTextarea = false
}) => {
  const formInputStyle = "w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200";
  
  return (
    <div className={className}>
      {label && (
        <label className="block mb-1 text-sm font-medium">
          {label}
        </label>
      )}
      
      {isTextarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${formInputStyle} h-32`}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={formInputStyle}
        />
      )}
    </div>
  );
};

export default FormField;