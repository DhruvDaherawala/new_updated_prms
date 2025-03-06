import React from 'react';
import { formInputStyle } from './styles';

export default function ChildPropertiesTable({ childCount, handleChildChange }) {
  const fields = ['floor', 'title', 'description', 'rooms', 'washroom', 'gas', 'electricity', 'deposit', 'rent'];

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-gray-200 rounded-lg text-sm mt-4">
        <thead>
          <tr className="bg-indigo-500 text-white">
            {fields.map((field, idx) => (
              <th key={field} className={`p-3 ${idx === 0 ? 'rounded-tl-lg' : ''} ${idx === fields.length - 1 ? 'rounded-tr-lg' : ''}`}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: childCount }, (_, index) => (
            <tr key={index}>
              {fields.map((field) => (
                <td key={field} className="p-3">
                  <input
                    type="text"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    onChange={(e) => handleChildChange(index, e)}
                    className={formInputStyle}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
