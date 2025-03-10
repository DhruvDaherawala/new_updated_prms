// import React from 'react'

// export default function RenterForm({ formData, onInputChange, onFileChange, onSubmit }) {
//   const formInputStyle = "w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200"

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-xl">
//       <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Add New Renter</h2>
//       <form onSubmit={onSubmit} className="space-y-6">
//         <div className="grid grid-cols-2 gap-6">
//           <input
//             type="text"
//             name="renterName"
//             placeholder="Renter Name"
//             value={formData.renterName}
//             onChange={onInputChange}
//             className={formInputStyle}
//             required
//           />
//           <input
//             type="text"
//             name="age"
//             placeholder="Age"
//             value={formData.age}
//             onChange={onInputChange}
//             className={formInputStyle}
//             required
//           />
//         </div>
//         <textarea
//           name="fullAddress"
//           placeholder="Full Address"
//           value={formData.fullAddress}
//           onChange={onInputChange}
//           className={`${formInputStyle} h-32`}
//           required
//         />
//         <div className="grid grid-cols-3 gap-6">
//           <input
//             type="text"
//             name="numberOfStayers"
//             placeholder="Number of Stayers"
//             value={formData.numberOfStayers}
//             onChange={onInputChange}
//             className={formInputStyle}
//           />
//           <input
//             type="text"
//             name="contact1"
//             placeholder="Contact Number 1"
//             value={formData.contact1}
//             onChange={onInputChange}
//             className={formInputStyle}
//             required
//           />
//           <select
//             name="status"
//             value={formData.status}
//             onChange={onInputChange}
//             className={formInputStyle}
//             required
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//             <option value="Blacklisted">Blacklisted</option>
//             <option value="Former">Former</option>
//           </select>
//         </div>
//         <div className="grid grid-cols-2 gap-6">
//           <input
//             type="text"
//             name="contact2"
//             placeholder="Contact Number 2"
//             value={formData.contact2}
//             onChange={onInputChange}
//             className={formInputStyle}
//           />
//           <textarea
//             name="remarks"
//             placeholder="Remarks"
//             value={formData.remarks}
//             onChange={onInputChange}
//             className={`${formInputStyle} h-24`}
//           />
//         </div>
//         <DocumentUploadFields onFileChange={onFileChange} formInputStyle={formInputStyle} />
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   )
// }

// // Helper component for document upload fields
// function DocumentUploadFields({ onFileChange, formInputStyle }) {
//   return (
//     <>
//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <label className="block mb-1 text-sm font-medium">Aadhaar Card</label>
//           <input type="file" name="aadhaarCard" onChange={onFileChange} className={formInputStyle} />
//         </div>
//         <div>
//           <label className="block mb-1 text-sm font-medium">PAN Card</label>
//           <input type="file" name="panCard" onChange={onFileChange} className={formInputStyle} />
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <label className="block mb-1 text-sm font-medium">Passport Photo</label>
//           <input type="file" name="passportPhoto" onChange={onFileChange} className={formInputStyle} />
//         </div>
//         <div>
//           <label className="block mb-1 text-sm font-medium">Other Document</label>
//           <input type="file" name="otherDocument" onChange={onFileChange} className={formInputStyle} />
//         </div>
//       </div>
//     </>
//   )
// }

// 06-03-25

import { useState } from 'react';

const formInputStyle = 'w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200';

export default function AddRenterModal({ onClose, onSubmitSuccess, editFlag, editformData }) {
  const [formData, setFormData] = useState(
    editformData
      ? editformData
      : {
          renterName: '',
          age: '',
          fullAddress: '',
          numberOfStayers: '',
          contact1: '',
          contact2: '',
          remarks: '',
          aadhaarCard: null,
          panCard: null,
          passportPhoto: null,
          otherDocument: null
        }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Renter data submitted successfully!');
    onSubmitSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50 p-6 mt-8">
      <div className="bg-white w-[800px] max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">{Object.keys(editformData)?.length > 0 ? 'Edit' : 'Add New'} Renter</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="">Renter Name</label>
              <input
                type="text"
                name="renterName"
                placeholder="Renter Name"
                value={formData.renterName}
                onChange={handleInputChange}
                className={formInputStyle}
                required
              />
            </div>
            <div>
              <label htmlFor="">Age</label>
              <input
                type="text"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleInputChange}
                className={formInputStyle}
                required
              />
            </div>
          </div>
          <label htmlFor="">Full Address</label>
          <textarea
            name="fullAddress"
            placeholder="Full Address"
            value={formData.fullAddress}
            onChange={handleInputChange}
            className={`${formInputStyle} h-32`}
            required
          />

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label htmlFor="">Number Of Stayers</label>
              <input
                type="text"
                name="numberOfStayers"
                placeholder="Number of Stayers"
                value={formData.numberOfStayers}
                onChange={handleInputChange}
                className={formInputStyle}
              />
            </div>
            <div>
              <label htmlFor="">Contact 1</label>
              <input
                type="text"
                name="contact1"
                placeholder="Contact Number 1"
                value={formData.contact1}
                onChange={handleInputChange}
                className={formInputStyle}
                required
              />
            </div>
            <div>
              <label htmlFor="">Contact 2</label>
              <input
                type="text"
                name="contact2"
                placeholder="Contact Number 2"
                value={formData.contact2}
                onChange={handleInputChange}
                className={formInputStyle}
              />
            </div>
          </div>
          <label htmlFor="">Remarks</label>
          <textarea
            name="remarks"
            placeholder="Remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            className={`${formInputStyle} h-24`}
          />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium">Aadhaar Card</label>
              <input type="file" name="aadhaarCard" onChange={handleFileChange} className={formInputStyle} />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">PAN Card</label>
              <input type="file" name="panCard" onChange={handleFileChange} className={formInputStyle} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium">Passport Photo</label>
              <input type="file" name="passportPhoto" onChange={handleFileChange} className={formInputStyle} />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Other Document</label>
              <input type="file" name="otherDocument" onChange={handleFileChange} className={formInputStyle} />
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
