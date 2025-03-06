// // ChildPropertyDetailModal.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// export default function ChildPropertyDetailModal({ childProperty, onClose, refreshChildProperties, apiUrl, parentProperties }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [localChild, setLocalChild] = useState(childProperty);
//   const [floorError, setFloorError] = useState('');

//   const formInputStyle = 'w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500';
//   const cardStyle = 'p-3 border rounded bg-gray-100';

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'floor') {
//       const selectedParent = parentProperties.find(p => p.id === parseInt(localChild.property_id));
//       const floorValue = parseInt(value);
//       if (selectedParent && floorValue > selectedParent.numberOfFloors) {
//         setFloorError(`Maximum floor for ${selectedParent.propertyName} is ${selectedParent.numberOfFloors}`);
//       } else {
//         setFloorError('');
//       }
//     }
//     setLocalChild(prev => ({ ...prev, [name]: value }));
//   };

//   const saveChildProperty = async () => {
//     if (floorError) {
//       alert('Please fix the errors before saving.');
//       return;
//     }
//     try {
//       const form = new FormData();
//       const dataToSend = { ...localChild };
//       form.append('formData', JSON.stringify(dataToSend));
//       await axios.put(`${apiUrl}child_property/${localChild.id}`, form, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       alert('Child property updated successfully!');
//       refreshChildProperties();
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating child property:', error);
//       alert('Failed to update child property!');
//     }
//   };

//   const getParentName = (property_id) => {
//     const parent = parentProperties.find(p => p.id === parseInt(property_id));
//     return parent ? parent.propertyName : 'N/A';
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
//       <div className="bg-white w-[600px] max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg relative">
//         <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={onClose}>
//           ✕
//         </button>
//         <h2 className="text-2xl font-bold mb-4">Child Property Details</h2>
//         <div className="space-y-4">
//           <div>
//             <label className="font-medium">Parent Property:</label>
//             {isEditing ? (
//               <select name="property_id" value={localChild.property_id} onChange={handleChange} className={formInputStyle}>
//                 {parentProperties.map(parent => (
//                   <option key={parent.id} value={parent.id}>
//                     {parent.propertyName} - {parent.ownerName} (Max Floors: {parent.numberOfFloors})
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <p className={cardStyle}>{getParentName(localChild.property_id)}</p>
//             )}
//           </div>
//           <div>
//             <label className="font-medium">Floor:</label>
//             {isEditing ? (
//               <>
//                 <input
//                   type="number"
//                   name="floor"
//                   value={localChild.floor}
//                   onChange={handleChange}
//                   className={formInputStyle}
//                 />
//                 {floorError && <p className="text-red-600 text-sm mt-1">{floorError}</p>}
//               </>
//             ) : (
//               <p className={cardStyle}>{localChild.floor}</p>
//             )}
//           </div>
//           <div>
//             <label className="font-medium">Title:</label>
//             {isEditing ? (
//               <input type="text" name="title" value={localChild.title} onChange={handleChange} className={formInputStyle} />
//             ) : (
//               <p className={cardStyle}>{localChild.title}</p>
//             )}
//           </div>
//           <div>
//             <label className="font-medium">Description:</label>
//             {isEditing ? (
//               <textarea name="description" value={localChild.description} onChange={handleChange} className={`${formInputStyle} h-24`} />
//             ) : (
//               <p className={cardStyle}>{localChild.description}</p>
//             )}
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="font-medium">Rooms:</label>
//               {isEditing ? (
//                 <input type="number" name="rooms" value={localChild.rooms} onChange={handleChange} className={formInputStyle} />
//               ) : (
//                 <p className={cardStyle}>{localChild.rooms}</p>
//               )}
//             </div>
//             <div>
//               <label className="font-medium">Washroom:</label>
//               {isEditing ? (
//                 <input type="number" name="washroom" value={localChild.washroom} onChange={handleChange} className={formInputStyle} />
//               ) : (
//                 <p className={cardStyle}>{localChild.washroom}</p>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="font-medium">Gas:</label>
//               {isEditing ? (
//                 <input type="text" name="gas" value={localChild.gas} onChange={handleChange} className={formInputStyle} />
//               ) : (
//                 <p className={cardStyle}>{localChild.gas}</p>
//               )}
//             </div>
//             <div>
//               <label className="font-medium">Electricity:</label>
//               {isEditing ? (
//                 <input type="text" name="electricity" value={localChild.electricity} onChange={handleChange} className={formInputStyle} />
//               ) : (
//                 <p className={cardStyle}>{localChild.electricity}</p>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="font-medium">Deposit:</label>
//               {isEditing ? (
//                 <input type="number" name="deposit" value={localChild.deposit} onChange={handleChange} className={formInputStyle} />
//               ) : (
//                 <p className={cardStyle}>{localChild.deposit}</p>
//               )}
//             </div>
//             <div>
//               <label className="font-medium">Rent:</label>
//               {isEditing ? (
//                 <input type="number" name="rent" value={localChild.rent} onChange={handleChange} className={formInputStyle} />
//               ) : (
//                 <p className={cardStyle}>{localChild.rent}</p>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="mt-6 flex justify-end space-x-3">
//           {isEditing ? (
//             <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={saveChildProperty}>
//               Save
//             </button>
//           ) : (
//             <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setIsEditing(true)}>
//               Edit
//             </button>
//           )}
//           <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




// ChildPropertyDetailModal.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function ChildPropertyDetailModal({ childProperty, onClose, refreshChildProperties, apiUrl, parentProperties }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localChild, setLocalChild] = useState(childProperty);
  const [floorError, setFloorError] = useState('');

  const formInputStyle = 'w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500';
  const cardStyle = 'p-3 border rounded bg-gray-100';

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'floor') {
      const selectedParent = parentProperties.find(p => p.id === parseInt(localChild.property_id));
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

  const getParentName = (property_id) => {
    const parent = parentProperties.find(p => p.id === parseInt(property_id));
    return parent ? parent.propertyName : 'N/A';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white w-[600px] max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Child Property Details</h2>
        <div className="space-y-4">
          <div>
            <label className="font-medium">Parent Property:</label>
            {isEditing ? (
              <select name="property_id" value={localChild.property_id} onChange={handleChange} className={formInputStyle}>
                {parentProperties.map(parent => (
                  <option key={parent.id} value={parent.id}>
                    {parent.propertyName} - {parent.ownerName} (Max Floors: {parent.numberOfFloors})
                  </option>
                ))}
              </select>
            ) : (
              <p className={cardStyle}>{getParentName(localChild.property_id)}</p>
            )}
          </div>
          <div>
            <label className="font-medium">Floor:</label>
            {isEditing ? (
              <>
                <input
                  type="number"
                  name="floor"
                  value={localChild.floor}
                  onChange={handleChange}
                  className={formInputStyle}
                />
                {floorError && <p className="text-red-600 text-sm mt-1">{floorError}</p>}
              </>
            ) : (
              <p className={cardStyle}>{localChild.floor}</p>
            )}
          </div>
          <div>
            <label className="font-medium">Title:</label>
            {isEditing ? (
              <input type="text" name="title" value={localChild.title} onChange={handleChange} className={formInputStyle} />
            ) : (
              <p className={cardStyle}>{localChild.title}</p>
            )}
          </div>
          <div>
            <label className="font-medium">Description:</label>
            {isEditing ? (
              <textarea name="description" value={localChild.description} onChange={handleChange} className={`${formInputStyle} h-24`} />
            ) : (
              <p className={cardStyle}>{localChild.description}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Rooms:</label>
              {isEditing ? (
                <input type="number" name="rooms" value={localChild.rooms} onChange={handleChange} className={formInputStyle} />
              ) : (
                <p className={cardStyle}>{localChild.rooms}</p>
              )}
            </div>
            <div>
              <label className="font-medium">Washroom:</label>
              {isEditing ? (
                <input type="number" name="washroom" value={localChild.washroom} onChange={handleChange} className={formInputStyle} />
              ) : (
                <p className={cardStyle}>{localChild.washroom}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Gas:</label>
              {isEditing ? (
                <input type="text" name="gas" value={localChild.gas} onChange={handleChange} className={formInputStyle} />
              ) : (
                <p className={cardStyle}>{localChild.gas}</p>
              )}
            </div>
            <div>
              <label className="font-medium">Electricity:</label>
              {isEditing ? (
                <input type="text" name="electricity" value={localChild.electricity} onChange={handleChange} className={formInputStyle} />
              ) : (
                <p className={cardStyle}>{localChild.electricity}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Deposit:</label>
              {isEditing ? (
                <input type="number" name="deposit" value={localChild.deposit} onChange={handleChange} className={formInputStyle} />
              ) : (
                <p className={cardStyle}>{localChild.deposit}</p>
              )}
            </div>
            <div>
              <label className="font-medium">Rent:</label>
              {isEditing ? (
                <input type="number" name="rent" value={localChild.rent} onChange={handleChange} className={formInputStyle} />
              ) : (
                <p className={cardStyle}>{localChild.rent}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          {isEditing ? (
            <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={saveChildProperty}>
              Save
            </button>
          ) : (
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
          <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
