import React, { useState } from 'react';
import axios from 'axios';
import { formInputStyle, cardStyle } from './styles';

export default function PropertyDetailModal({ property, onClose, refreshProperties, apiUrl }) {
  const [activeView, setActiveView] = useState('property'); // "property" or "child"
  const [isPropertyEditing, setIsPropertyEditing] = useState(false);
  const [isChildEditing, setIsChildEditing] = useState(false);
  const [localProperty, setLocalProperty] = useState(property);

  const handlePropertyChange = (field, value) => {
    setLocalProperty((prev) => ({ ...prev, [field]: value }));
  };

  const handleChildChange = (index, field, value) => {
    const updatedChildren = localProperty.childProperties.map((child, idx) => (idx === index ? { ...child, [field]: value } : child));
    setLocalProperty((prev) => ({ ...prev, childProperties: updatedChildren }));
  };

  // Updates both property and child properties
  const saveProperty = async () => {
    try {
      const form = new FormData();
      const dataToSend = {
        propertyName: localProperty.propertyName,
        ownerName: localProperty.ownerName,
        address: localProperty.address,
        documents: localProperty.documents,
        childProperties: localProperty.childProperties
      };
      form.append('formData', JSON.stringify(dataToSend));
      await axios.put(`${apiUrl}property/${localProperty.id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Property updated successfully!');
      refreshProperties();
      setIsPropertyEditing(false);
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property!');
    }
  };

  // This function now uses the same endpoint to update child properties along with property data
  const saveChildProperties = async () => {
    try {
      const dataToUpdate = {
        propertyName: localProperty.propertyName,
        ownerName: localProperty.ownerName,
        address: localProperty.address,
        documents: localProperty.documents,
        childProperties: localProperty.childProperties
      };

      const form = new FormData();
      form.append('formData', JSON.stringify(dataToUpdate));

      await axios.put(`${apiUrl}property/${localProperty.id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Child properties updated successfully!');
      refreshProperties();
      setIsChildEditing(false);
    } catch (error) {
      console.error('Error updating child properties:', error);
      alert('Failed to update child properties!');
    }
  };

  const renderPropertyView = () => (
    <div>
      <div className="space-y-4">
        <div>
          <label className="font-semibold">Property ID:</label>
          <p className={cardStyle}>{localProperty.id}</p>
        </div>
        <div>
          <label className="font-semibold">Owner Name:</label>
          {isPropertyEditing ? (
            <input
              type="text"
              value={localProperty.ownerName || ''}
              onChange={(e) => handlePropertyChange('ownerName', e.target.value)}
              className={formInputStyle}
            />
          ) : (
            <p className={cardStyle}>{localProperty.ownerName}</p>
          )}
        </div>
        <div>
          <label className="font-semibold">Property Title:</label>
          {isPropertyEditing ? (
            <input
              type="text"
              value={localProperty.propertyName || ''}
              onChange={(e) => handlePropertyChange('propertyName', e.target.value)}
              className={formInputStyle}
            />
          ) : (
            <p className={cardStyle}>{localProperty.propertyName}</p>
          )}
        </div>
        <div>
          <label className="font-semibold">Address:</label>
          {isPropertyEditing ? (
            <textarea
              value={localProperty.address || ''}
              onChange={(e) => handlePropertyChange('address', e.target.value)}
              className={`${formInputStyle} h-24`}
            />
          ) : (
            <p className={cardStyle}>{localProperty.address}</p>
          )}
        </div>
        <div>
          <label className="font-semibold">Documents:</label>
          {isPropertyEditing ? (
            <input
              type="text"
              value={localProperty.documents || ''}
              onChange={(e) => handlePropertyChange('documents', e.target.value)}
              className={formInputStyle}
            />
          ) : (
            <p className={cardStyle}>{localProperty.documents || 'No document'}</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        {isPropertyEditing ? (
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={saveProperty}>
            Save
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsPropertyEditing(true)}>
            Edit
          </button>
        )}
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setActiveView('child');
            setIsChildEditing(false);
          }}
        >
          Child Properties
        </button>
      </div>
    </div>
  );

  const renderChildPropertiesView = () => (
    <div>
      <div className="space-y-6">
        {localProperty.childProperties && localProperty.childProperties.length > 0 ? (
          localProperty.childProperties.map((child, index) => (
            <div key={index} className="border p-4 rounded-lg bg-gray-50">
              <div>
                <label className="font-semibold">Floor:</label>
                {isChildEditing ? (
                  <input
                    type="text"
                    value={child.floor || ''}
                    onChange={(e) => handleChildChange(index, 'floor', e.target.value)}
                    className={formInputStyle}
                  />
                ) : (
                  <p className={cardStyle}>{child.floor}</p>
                )}
              </div>
              <div>
                <label className="font-semibold">Title:</label>
                {isChildEditing ? (
                  <input
                    type="text"
                    value={child.title || ''}
                    onChange={(e) => handleChildChange(index, 'title', e.target.value)}
                    className={formInputStyle}
                  />
                ) : (
                  <p className={cardStyle}>{child.title}</p>
                )}
              </div>
              <div>
                <label className="font-semibold">Description:</label>
                {isChildEditing ? (
                  <input
                    type="text"
                    value={child.description || ''}
                    onChange={(e) => handleChildChange(index, 'description', e.target.value)}
                    className={formInputStyle}
                  />
                ) : (
                  <p className={cardStyle}>{child.description}</p>
                )}
              </div>
              <div>
                <label className="font-semibold">Rooms:</label>
                {isChildEditing ? (
                  <input
                    type="text"
                    value={child.rooms || ''}
                    onChange={(e) => handleChildChange(index, 'rooms', e.target.value)}
                    className={formInputStyle}
                  />
                ) : (
                  <p className={cardStyle}>{child.rooms}</p>
                )}
              </div>
              <div>
                <label className="font-semibold">Washroom:</label>
                {isChildEditing ? (
                  <input
                    type="text"
                    value={child.washroom || ''}
                    onChange={(e) => handleChildChange(index, 'washroom', e.target.value)}
                    className={formInputStyle}
                  />
                ) : (
                  <p className={cardStyle}>{child.washroom}</p>
                )}
              </div>
              <div>
                <label className="font-semibold">Gas:</label>
                {isChildEditing ? (
                  <input
                    type="text"
                    value={child.gas || ''}
                    onChange={(e) => handleChildChange(index, 'gas', e.target.value)}
                    className={formInputStyle}
                  />
                ) : (
                  <p className={cardStyle}>{child.gas}</p>
                )}
              </div>
              <div>
                <label className="font-semibold">Electricity:</label>
                {isChildEditing ? (
                  <input
                    type="text"
                    value={child.electricity || ''}
                    onChange={(e) => handleChildChange(index, 'electricity', e.target.value)}
                    className={formInputStyle}
                  />
                ) : (
                  <p className={cardStyle}>{child.electricity}</p>
                )}
              </div>
              <div>
                <label className="font-semibold">Deposit:</label>
                {isChildEditing ? (
                  <input
                    type="text"
                    value={child.deposit || ''}
                    onChange={(e) => handleChildChange(index, 'deposit', e.target.value)}
                    className={formInputStyle}
                  />
                ) : (
                  <p className={cardStyle}>{child.deposit}</p>
                )}
              </div>
              <div>
                <label className="font-semibold">Rent:</label>
                {isChildEditing ? (
                  <input
                    type="text"
                    value={child.rent || ''}
                    onChange={(e) => handleChildChange(index, 'rent', e.target.value)}
                    className={formInputStyle}
                  />
                ) : (
                  <p className={cardStyle}>{child.rent}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No child properties available.</p>
        )}
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        <button className="bg-indigo-500 text-white px-4 py-2 rounded" onClick={() => setActiveView('property')}>
          Back
        </button>
        {isChildEditing ? (
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={saveChildProperties}>
            Save Child Properties
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsChildEditing(true)}>
            Edit Child Properties
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50">
      <div className="bg-white w-[600px] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Property Details</h2>
        {activeView === 'property' ? renderPropertyView() : renderChildPropertiesView()}
      </div>
    </div>
  );
}
