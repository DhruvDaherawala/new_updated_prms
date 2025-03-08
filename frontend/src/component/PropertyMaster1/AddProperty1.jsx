import { useState } from 'react';
import axios from 'axios';

const formInputStyle = 'w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200';

export default function AddPropertyModal({ apiUrl, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    propertyName: '',
    ownerName: '',
    address: '',
    documents: null,
    floors: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, documents: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      const textData = {
        propertyName: formData.propertyName,
        ownerName: formData.ownerName,
        address: formData.address,
        status: 'Active', // Default status set to Active
        floors: formData.floors
      };
      form.append('formData', JSON.stringify(textData));
      if (formData.documents) {
        form.append('documents', formData.documents);
      }
      await axios.post(`${apiUrl}property`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Property data saved successfully!');
      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving property data:', error);
      alert('Failed to save property data!');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50">
      <div className="bg-white w-[800px] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✕
        </button>
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
              required
            />
            <input
              type="text"
              name="ownerName"
              placeholder="Property Owner"
              value={formData.ownerName}
              onChange={handleInputChange}
              className={formInputStyle}
              required
            />
          </div>

          <textarea
            name="address"
            placeholder="Property Description"
            value={formData.address}
            onChange={handleInputChange}
            className={`${formInputStyle} h-32`}
            required
          />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Documents</label>
              <input type="file" onChange={handleFileChange} className={formInputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Floors</label>
              <input
                type="number"
                min="0"
                name="floors"
                placeholder="Number of Floors"
                value={formData.floors}
                onChange={handleInputChange}
                className={formInputStyle}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
