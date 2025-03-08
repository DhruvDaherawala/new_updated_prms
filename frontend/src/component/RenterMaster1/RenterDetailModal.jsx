import React, { useState } from 'react';
import axios from 'axios';
import { DocumentDisplay, DocumentUpload } from './DocumentDisplay';

export default function RenterDetailModal({ renter, onClose, refreshRenters, apiUrl }) {
  const [isEditing, setIsEditing] = useState(renter.isEditing || false);
  const [localRenter, setLocalRenter] = useState(renter);
  const [documents, setDocuments] = useState({
    aadhaarCard: null,
    panCard: null,
    passportPhoto: null,
    otherDocument: null
  });

  const cardStyle = 'p-2 border rounded-lg bg-gray-100';
  const formInputStyle = 'w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200';

  // Handle changes for renter details
  const handleRenterChange = (field, value) => {
    setLocalRenter((prev) => ({ ...prev, [field]: value }));
  };

  // Handle document file change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocuments((prev) => ({ ...prev, [name]: files[0] }));
  };

  // Save the renter details
  const saveRenter = async () => {
    try {
      const form = new FormData();

      const dataToSend = {
        renterName: localRenter.renterName,
        fullAddress: localRenter.fullAddress,
        age: localRenter.age,
        numberOfStayers: localRenter.numberOfStayers,
        contact1: localRenter.contact1,
        contact2: localRenter.contact2,
        remarks: localRenter.remarks,
        status: localRenter.status || 'Active'
      };

      form.append('formData', JSON.stringify(dataToSend));

      // Add documents if new ones were selected
      if (documents.aadhaarCard) form.append('aadhaarCard', documents.aadhaarCard);
      if (documents.panCard) form.append('panCard', documents.panCard);
      if (documents.passportPhoto) form.append('passportPhoto', documents.passportPhoto);
      if (documents.otherDocument) form.append('otherDocument', documents.otherDocument);

      await axios.put(`${apiUrl}renter/${localRenter.id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Renter updated successfully!');
      refreshRenters();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating renter:', error);
      alert('Failed to update renter!');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50">
      <div className="bg-white w-[800px] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Renter Details</h2>
        <div className="grid gap-1">
          <RenterDetailsContent
            localRenter={localRenter}
            isEditing={isEditing}
            handleRenterChange={handleRenterChange}
            cardStyle={cardStyle}
            formInputStyle={formInputStyle}
          />

          {/* Documents Section */}
          <div>
            <label className="font-semibold">Documents:</label>
            {isEditing ? (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <DocumentUpload
                  currentDoc={localRenter.aadhaarCard}
                  docName="aadhaarCard"
                  handleFileChange={handleFileChange}
                  apiUrl={apiUrl}
                  formInputStyle={formInputStyle}
                />
                <DocumentUpload
                  currentDoc={localRenter.panCard}
                  docName="panCard"
                  handleFileChange={handleFileChange}
                  apiUrl={apiUrl}
                  formInputStyle={formInputStyle}
                />
                <DocumentUpload
                  currentDoc={localRenter.passportPhoto}
                  docName="passportPhoto"
                  handleFileChange={handleFileChange}
                  apiUrl={apiUrl}
                  formInputStyle={formInputStyle}
                />
                <DocumentUpload
                  currentDoc={localRenter.otherDocument}
                  docName="otherDocument"
                  handleFileChange={handleFileChange}
                  apiUrl={apiUrl}
                  formInputStyle={formInputStyle}
                />
              </div>
            ) : (
              <DocumentDisplay
                documents={{
                  aadhaarCard: localRenter.aadhaarCard,
                  panCard: localRenter.panCard,
                  passportPhoto: localRenter.passportPhoto,
                  otherDocument: localRenter.otherDocument
                }}
                apiUrl={apiUrl}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-end space-x-3">
            {isEditing ? (
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={saveRenter}>
                Save
              </button>
            ) : (
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for renter details content
function RenterDetailsContent({ localRenter, isEditing, handleRenterChange, cardStyle, formInputStyle }) {
  // Field configurations to reduce repetition
  const fields = [
    { label: 'Renter ID', key: 'id', editable: false },
    { label: 'Renter Name', key: 'renterName', editable: true },
    { label: 'Age', key: 'age', editable: true },
    { label: 'Address', key: 'fullAddress', editable: true, isTextarea: true },
    { label: 'Number of Stayers', key: 'numberOfStayers', editable: true },
    { label: 'Status', key: 'status', editable: true, isSelect: true },
    { label: 'Contact 1', key: 'contact1', editable: true },
    { label: 'Contact 2', key: 'contact2', editable: true },
    { label: 'Remarks', key: 'remarks', editable: true, isTextarea: true }
  ];

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.key}>
          <label className="font-semibold">{field.label}:</label>
          {isEditing && field.editable ? (
            field.isSelect ? (
              <select
                value={localRenter[field.key] || 'Active'}
                onChange={(e) => handleRenterChange(field.key, e.target.value)}
                className={formInputStyle}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Blacklisted">Blacklisted</option>
                <option value="Former">Former</option>
              </select>
            ) : field.isTextarea ? (
              <textarea
                value={localRenter[field.key] || ''}
                onChange={(e) => handleRenterChange(field.key, e.target.value)}
                className={`${formInputStyle} h-24`}
              />
            ) : (
              <input
                type="text"
                value={localRenter[field.key] || ''}
                onChange={(e) => handleRenterChange(field.key, e.target.value)}
                className={formInputStyle}
              />
            )
          ) : (
            <p className={cardStyle}>{localRenter[field.key]}</p>
          )}
        </div>
      ))}
    </div>
  );
}
