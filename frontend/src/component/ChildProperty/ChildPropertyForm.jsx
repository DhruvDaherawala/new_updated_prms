// // ChildPropertyForm.jsx
// import React from 'react';

// const formInputStyle = 'w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500';

// export default function ChildPropertyForm({ formData, onInputChange, onSubmit, onClose, parentProperties, floorError }) {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 p-6">
//       <div className="bg-white w-[600px] max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg relative">
//         <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={onClose}>
//           ✕
//         </button>
//         <h2 className="text-2xl font-bold mb-4">
//           {formData.id ? 'Edit Child Property' : 'Add New Child Property'}
//         </h2>
//         <form onSubmit={onSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium">Parent Property</label>
//             <select
//               name="property_id"
//               value={formData.property_id}
//               onChange={onInputChange}
//               className={formInputStyle}
//               required
//             >
//               <option value="">Select Parent Property</option>
//               {parentProperties.map(parent => (
//                 <option key={parent.id} value={parent.id}>
//                   {parent.propertyName} - {parent.ownerName} (Max Floors: {parent.numberOfFloors})
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Floor</label>
//             <input
//               type="number"
//               name="floor"
//               value={formData.floor}
//               onChange={onInputChange}
//               className={formInputStyle}
//               required
//             />
//             {floorError && <p className="text-red-600 text-sm mt-1">{floorError}</p>}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={onInputChange}
//               className={formInputStyle}
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={onInputChange}
//               className={`${formInputStyle} h-24`}
//               required
//             ></textarea>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 font-medium">Rooms</label>
//               <input
//                 type="number"
//                 name="rooms"
//                 value={formData.rooms}
//                 onChange={onInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Washroom</label>
//               <input
//                 type="number"
//                 name="washroom"
//                 value={formData.washroom}
//                 onChange={onInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 font-medium">Gas</label>
//               <input
//                 type="text"
//                 name="gas"
//                 value={formData.gas}
//                 onChange={onInputChange}
//                 className={formInputStyle}
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Electricity</label>
//               <input
//                 type="text"
//                 name="electricity"
//                 value={formData.electricity}
//                 onChange={onInputChange}
//                 className={formInputStyle}
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 font-medium">Deposit</label>
//               <input
//                 type="number"
//                 name="deposit"
//                 value={formData.deposit}
//                 onChange={onInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Rent</label>
//               <input
//                 type="number"
//                 name="rent"
//                 value={formData.rent}
//                 onChange={onInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//           </div>
//           <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition">
//             {formData.id ? 'Update Child Property' : 'Create Child Property'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }






// ChildPropertyForm.jsx
import React from 'react';

const formInputStyle = 'w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500';

export default function ChildPropertyForm({ formData, onInputChange, onSubmit, onClose, parentProperties, floorError }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 p-6">
      <div className="bg-white w-[600px] max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {formData.id ? 'Edit Child Property' : 'Add New Child Property'}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Parent Property</label>
            <select
              name="property_id"
              value={formData.property_id}
              onChange={onInputChange}
              className={formInputStyle}
              required
            >
              <option value="">Select Parent Property</option>
              {parentProperties.map(parent => (
                <option key={parent.id} value={parent.id}>
                  {parent.propertyName} - {parent.ownerName} (Max Floors: {parent.numberOfFloors})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Floor</label>
            <input
              type="number"
              name="floor"
              value={formData.floor}
              onChange={onInputChange}
              className={formInputStyle}
              required
            />
            {floorError && <p className="text-red-600 text-sm mt-1">{floorError}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onInputChange}
              className={formInputStyle}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              className={`${formInputStyle} h-24`}
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Rooms</label>
              <input
                type="number"
                name="rooms"
                value={formData.rooms}
                onChange={onInputChange}
                className={formInputStyle}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Washroom</label>
              <input
                type="number"
                name="washroom"
                value={formData.washroom}
                onChange={onInputChange}
                className={formInputStyle}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Gas</label>
              <input
                type="text"
                name="gas"
                value={formData.gas}
                onChange={onInputChange}
                className={formInputStyle}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Electricity</label>
              <input
                type="text"
                name="electricity"
                value={formData.electricity}
                onChange={onInputChange}
                className={formInputStyle}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Deposit</label>
              <input
                type="number"
                name="deposit"
                value={formData.deposit}
                onChange={onInputChange}
                className={formInputStyle}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Rent</label>
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={onInputChange}
                className={formInputStyle}
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition">
            {formData.id ? 'Update Child Property' : 'Create Child Property'}
          </button>
        </form>
      </div>
    </div>
  );
}
