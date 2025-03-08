import React, { useState } from 'react';
import axios from 'axios';

const RenterDetailModal = ({ renter, onClose, refreshRenters, apiUrl }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localRenter, setLocalRenter] = useState(renter);

  const cardStyle = 'p-2 border rounded-lg bg-gray-100';
  const formInputStyle = 'w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200';

  // Handle changes for renter details
  const handleRenterChange = (field, value) => {
    setLocalRenter((prev) => ({ ...prev, [field]: value }));
  };

  // Handle file changes for renter
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setLocalRenter((prev) => ({ ...prev, [name]: files[0] }));
  };

  // Save the renter details
  const saveRenter = async () => {
    try {
      // Prepare form data
      const form = new FormData();

      // Create a data object with all the text fields
      const dataToSend = {
        id: localRenter.id,
        renterName: localRenter.renterName,
        fullAddress: localRenter.fullAddress,
        age: localRenter.age,
        numberOfStayers: localRenter.numberOfStayers,
        contact1: localRenter.contact1,
        contact2: localRenter.contact2,
        remarks: localRenter.remarks
      };

      // Append the JSON data
      form.append('formData', JSON.stringify(dataToSend));

      // Append files if they exist
      if (localRenter.aadhaarCard && typeof localRenter.aadhaarCard !== 'string') {
        form.append('aadhaarCard', localRenter.aadhaarCard);
      }

      if (localRenter.panCard && typeof localRenter.panCard !== 'string') {
        form.append('panCard', localRenter.panCard);
      }

      if (localRenter.passportPhoto && typeof localRenter.passportPhoto !== 'string') {
        form.append('passportPhoto', localRenter.passportPhoto);
      }

      if (localRenter.otherDocument && typeof localRenter.otherDocument !== 'string') {
        form.append('otherDocument', localRenter.otherDocument);
      }

      // Make PUT request with FormData and proper API URL
      await axios.put(`${apiUrl}renter/${localRenter.id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Renter updated successfully!');
      refreshRenters();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating renter:', error);
      let errorMessage = 'Failed to update renter! ';
      if (error.response) {
        errorMessage += `Server error: ${error.response.data?.message || error.response.statusText}`;
      } else if (error.request) {
        errorMessage += 'No response received from server.';
      } else {
        errorMessage += error.message;
      }
      alert(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50">
      <div className="bg-white w-[600px] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Renter Details</h2>

        <div className="space-y-4">
          <div>
            <label className="font-semibold">Renter ID:</label>
            <p className={cardStyle}>{localRenter.id}</p>
          </div>
          <div>
            <label className="font-semibold">Renter Name:</label>
            {isEditing ? (
              <input
                type="text"
                value={localRenter.renterName || ''}
                onChange={(e) => handleRenterChange('renterName', e.target.value)}
                className={formInputStyle}
              />
            ) : (
              <p className={cardStyle}>{localRenter.renterName}</p>
            )}
          </div>
          <div>
            <label className="font-semibold">Age:</label>
            {isEditing ? (
              <input
                type="text"
                value={localRenter.age || ''}
                onChange={(e) => handleRenterChange('age', e.target.value)}
                className={formInputStyle}
              />
            ) : (
              <p className={cardStyle}>{localRenter.age}</p>
            )}
          </div>
          <div>
            <label className="font-semibold">Full Address:</label>
            {isEditing ? (
              <textarea
                value={localRenter.fullAddress || ''}
                onChange={(e) => handleRenterChange('fullAddress', e.target.value)}
                className={`${formInputStyle} h-24`}
              />
            ) : (
              <p className={cardStyle}>{localRenter.fullAddress}</p>
            )}
          </div>
          <div>
            <label className="font-semibold">Number of Stayers:</label>
            {isEditing ? (
              <input
                type="text"
                value={localRenter.numberOfStayers || ''}
                onChange={(e) => handleRenterChange('numberOfStayers', e.target.value)}
                className={formInputStyle}
              />
            ) : (
              <p className={cardStyle}>{localRenter.numberOfStayers}</p>
            )}
          </div>
          <div>
            <label className="font-semibold">Contact 1:</label>
            {isEditing ? (
              <input
                type="text"
                value={localRenter.contact1 || ''}
                onChange={(e) => handleRenterChange('contact1', e.target.value)}
                className={formInputStyle}
              />
            ) : (
              <p className={cardStyle}>{localRenter.contact1}</p>
            )}
          </div>
          <div>
            <label className="font-semibold">Contact 2:</label>
            {isEditing ? (
              <input
                type="text"
                value={localRenter.contact2 || ''}
                onChange={(e) => handleRenterChange('contact2', e.target.value)}
                className={formInputStyle}
              />
            ) : (
              <p className={cardStyle}>{localRenter.contact2}</p>
            )}
          </div>
          <div>
            <label className="font-semibold">Remarks:</label>
            {isEditing ? (
              <textarea
                value={localRenter.remarks || ''}
                onChange={(e) => handleRenterChange('remarks', e.target.value)}
                className={`${formInputStyle} h-24`}
              />
            ) : (
              <p className={cardStyle}>{localRenter.remarks}</p>
            )}
          </div>
          <div>
            <label className="font-semibold">Documents:</label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm font-medium">Aadhaar Card:</p>
                {isEditing ? (
                  <input type="file" name="aadhaarCard" onChange={handleFileChange} className={formInputStyle} />
                ) : (
                  <p className={cardStyle}>
                    {localRenter.aadhaarCard ? (
                      <a
                        href={`${apiUrl}uploads/${localRenter.aadhaarCard}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Document
                      </a>
                    ) : (
                      'Not uploaded'
                    )}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">PAN Card:</p>
                {isEditing ? (
                  <input type="file" name="panCard" onChange={handleFileChange} className={formInputStyle} />
                ) : (
                  <p className={cardStyle}>
                    {localRenter.panCard ? (
                      <a
                        href={`${apiUrl}uploads/${localRenter.panCard}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Document
                      </a>
                    ) : (
                      'Not uploaded'
                    )}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">Passport Photo:</p>
                {isEditing ? (
                  <input type="file" name="passportPhoto" onChange={handleFileChange} className={formInputStyle} />
                ) : (
                  <p className={cardStyle}>
                    {localRenter.passportPhoto ? (
                      <a
                        href={`${apiUrl}uploads/${localRenter.passportPhoto}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Document
                      </a>
                    ) : (
                      'Not uploaded'
                    )}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">Other Document:</p>
                {isEditing ? (
                  <input type="file" name="otherDocument" onChange={handleFileChange} className={formInputStyle} />
                ) : (
                  <p className={cardStyle}>
                    {localRenter.otherDocument ? (
                      <a
                        href={`${apiUrl}uploads/${localRenter.otherDocument}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Document
                      </a>
                    ) : (
                      'Not uploaded'
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
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
  );
};

export default RenterDetailModal;
