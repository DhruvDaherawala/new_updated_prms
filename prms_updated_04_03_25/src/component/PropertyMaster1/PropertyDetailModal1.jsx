'use client';

import { useState } from 'react';
import axios from 'axios';
import PropertyDetailsView from './PropertyDetailView';
import ChildPropertiesView from './ChildPropertiesView';

export default function PropertyDetailModal({ property, onClose, refreshProperties, apiUrl }) {
  const [activeView, setActiveView] = useState('property');
  const [isPropertyEditing, setIsPropertyEditing] = useState(property.isEditing || false);
  const [isChildEditing, setIsChildEditing] = useState(property.isChildEditing || false);
  const [localProperty, setLocalProperty] = useState(property);
  const [documents, setDocuments] = useState(null);

  // Handle changes for property details
  const handlePropertyChange = (field, value) => {
    setLocalProperty((prev) => ({ ...prev, [field]: value }));
  };

  // Handle document file change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(e.target.files[0]);
    }
  };

  // Handle changes for child properties
  const handleChildChange = (index, field, value) => {
    const updatedChildren = localProperty.childProperties.map((child, idx) => (idx === index ? { ...child, [field]: value } : child));
    setLocalProperty((prev) => ({ ...prev, childProperties: updatedChildren }));
  };

  // Handle child property document change
  const handleChildFileChange = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const updatedChildren = [...localProperty.childProperties];
      updatedChildren[index] = {
        ...updatedChildren[index],
        newDocument: e.target.files[0]
      };
      setLocalProperty((prev) => ({ ...prev, childProperties: updatedChildren }));
    }
  };

  // Save the property details
  const saveProperty = async () => {
    try {
      const form = new FormData();
      const dataToSend = {
        propertyName: localProperty.propertyName,
        ownerName: localProperty.ownerName,
        address: localProperty.address,
        status: localProperty.status || 'Active',
        childProperties: localProperty.childProperties
      };

      form.append('formData', JSON.stringify(dataToSend));

      // Add document if a new one was selected
      if (documents) {
        form.append('documents', documents);
      }

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

  // Save child properties
  const saveChildProperties = async () => {
    try {
      // Create a FormData object to handle file uploads
      const form = new FormData();

      // Handle potential file uploads for each child property
      const updatedChildProps = localProperty.childProperties.map((child) => {
        // Remove the newDocument property as we'll handle it separately
        const { newDocument, ...childData } = child;
        return childData;
      });

      // Add child properties data
      form.append('childProperties', JSON.stringify(updatedChildProps));

      // Add any new document files
      localProperty.childProperties.forEach((child, index) => {
        if (child.newDocument) {
          form.append(`childDocument_${index}`, child.newDocument);
        }
      });

      await axios.put(`${apiUrl}property/${localProperty.id}/child_properties`, form, {
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white w-[800px] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Property Details</h2>

        {activeView === 'property' ? (
          <PropertyDetailsView
            property={localProperty}
            isEditing={isPropertyEditing}
            onPropertyChange={handlePropertyChange}
            onFileChange={handleFileChange}
            onSave={saveProperty}
            onEdit={() => setIsPropertyEditing(true)}
            onViewChildProperties={() => {
              setActiveView('child');
              setIsChildEditing(isChildEditing);
            }}
            apiUrl={apiUrl}
          />
        ) : (
          <ChildPropertiesView
            childProperties={localProperty.childProperties}
            isEditing={isChildEditing}
            onChildChange={handleChildChange}
            onChildFileChange={handleChildFileChange}
            onSave={saveChildProperties}
            onEdit={() => setIsChildEditing(true)}
            onBack={() => setActiveView('property')}
            apiUrl={apiUrl}
          />
        )}
      </div>
    </div>
  );
}
