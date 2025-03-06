import React from 'react';
import ChildPropertiesTable from './ChildPropertiesTable';
import { formInputStyle } from './styles';

export default function AddPropertyForm({
  formData,
  childCount,
  handleInputChange,
  handleFileChange,
  handleChildCountChange,
  handleChildChange,
  handleSubmit
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <input
            type="text"
            name="propertyName"
            placeholder="Property Title"
            value={formData.propertyName}
            onChange={handleInputChange}
            className={formInputStyle}
          />
          <input
            type="text"
            name="ownerName"
            placeholder="Property Owner"
            value={formData.ownerName}
            onChange={handleInputChange}
            className={formInputStyle}
          />
        </div>
        <textarea
          name="address"
          placeholder="Property Description"
          value={formData.address}
          onChange={handleInputChange}
          className={`${formInputStyle} h-32`}
        />
        <div className="grid grid-cols-2 gap-6">
          <input type="file" onChange={handleFileChange} className={formInputStyle} />
          <input
            type="number"
            min="0"
            name="childCount"
            placeholder="Number of Floors"
            value={childCount}
            onChange={handleChildCountChange}
            className={formInputStyle}
          />
        </div>
        {childCount > 0 && <ChildPropertiesTable childCount={childCount} handleChildChange={handleChildChange} />}
        <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
}
