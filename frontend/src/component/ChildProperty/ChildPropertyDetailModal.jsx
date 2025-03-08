import React, { useState } from 'react';
import axios from 'axios';

const formInputStyle = 'w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200';

export default function ChildPropertyDetailModal({ childProperty, onClose, refreshChildProperties, apiUrl, parentProperties }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localChild, setLocalChild] = useState(childProperty);
  const [floorError, setFloorError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'floor') {
      const selectedParent = parentProperties.find((p) => p.id === parseInt(localChild.property_id));
      const floorValue = parseInt(value);
      if (selectedParent && floorValue > selectedParent.numberOfFloors) {
        setFloorError(`Maximum floor for ${selectedParent.propertyName} is ${selectedParent.numberOfFloors}`);
      } else {
        setFloorError('');
      }
    }
    setLocalChild((prev) => ({ ...prev, [name]: value }));
  };

  const saveChildProperty = async () => {
    if (floorError) {
      alert('Please fix the errors before saving.');
      return;
    }
    try {
      const form = new FormData();
      form.append('formData', JSON.stringify(localChild));
      await axios.put(`${apiUrl}child_property/${localChild.id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Child property updated successfully!');
      refreshChildProperties();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating child property:', error);
      alert('Failed to update child property!');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
      <div className="bg-white w-[800px] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Child Property Details</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {isEditing ? (
              <select name="property_id" value={localChild.property_id} onChange={handleChange} className={formInputStyle}>
                {parentProperties.map((parent) => (
                  <option key={parent.id} value={parent.id}>
                    {parent.propertyName} - {parent.ownerName} (Max Floors: {parent.numberOfFloors})
                  </option>
                ))}
              </select>
            ) : (
              <p className={formInputStyle}>
                {parentProperties.find((p) => p.id === parseInt(localChild.property_id))?.propertyName || 'N/A'}
              </p>
            )}
            {isEditing ? (
              <>
                <input
                  type="number"
                  name="floor"
                  placeholder="Floor"
                  value={localChild.floor}
                  onChange={handleChange}
                  className={formInputStyle}
                />
                {floorError && <p className="text-red-600 text-sm mt-1">{floorError}</p>}
              </>
            ) : (
              <p className={formInputStyle}>{localChild.floor}</p>
            )}
          </div>

          {isEditing ? (
            <input
              type="text"
              name="title"
              placeholder="Child Property Title"
              value={localChild.title}
              onChange={handleChange}
              className={formInputStyle}
            />
          ) : (
            <p className={formInputStyle}>{localChild.title}</p>
          )}

          {isEditing ? (
            <textarea
              name="description"
              placeholder="Child Property Description"
              value={localChild.description}
              onChange={handleChange}
              className={`${formInputStyle} h-32`}
            />
          ) : (
            <p className={`${formInputStyle} h-32`}>{localChild.description}</p>
          )}

          <div className="grid grid-cols-2 gap-6">
            {isEditing ? (
              <input
                type="number"
                name="rooms"
                placeholder="Number of Rooms"
                value={localChild.rooms}
                onChange={handleChange}
                className={formInputStyle}
              />
            ) : (
              <p className={formInputStyle}>{localChild.rooms}</p>
            )}
            {isEditing ? (
              <input
                type="number"
                name="washroom"
                placeholder="Number of Washrooms"
                value={localChild.washroom}
                onChange={handleChange}
                className={formInputStyle}
              />
            ) : (
              <p className={formInputStyle}>{localChild.washroom}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {isEditing ? (
              <input
                type="text"
                name="gas"
                placeholder="Gas Availability"
                value={localChild.gas}
                onChange={handleChange}
                className={formInputStyle}
              />
            ) : (
              <p className={formInputStyle}>{localChild.gas}</p>
            )}
            {isEditing ? (
              <input
                type="text"
                name="electricity"
                placeholder="Electricity Availability"
                value={localChild.electricity}
                onChange={handleChange}
                className={formInputStyle}
              />
            ) : (
              <p className={formInputStyle}>{localChild.electricity}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {isEditing ? (
              <input
                type="number"
                name="deposit"
                placeholder="Deposit Amount"
                value={localChild.deposit}
                onChange={handleChange}
                className={formInputStyle}
              />
            ) : (
              <p className={formInputStyle}>{localChild.deposit}</p>
            )}
            {isEditing ? (
              <input
                type="number"
                name="rent"
                placeholder="Rent Amount"
                value={localChild.rent}
                onChange={handleChange}
                className={formInputStyle}
              />
            ) : (
              <p className={formInputStyle}>{localChild.rent}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            {isEditing ? (
              <button onClick={saveChildProperty} className="bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">
                Save
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">
                Edit
              </button>
            )}
            <button onClick={onClose} className="bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-700 transition">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
