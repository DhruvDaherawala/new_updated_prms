// import React from 'react';

// export default function PropertyList({ properties, showForm, toggleForm, onDetailsClick }) {
//   return (
//     <div className="bg-white shadow rounded-md p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold text-gray-800">Registered Properties</h2>
//         <button onClick={toggleForm} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
//           {showForm ? 'Close Form' : 'Add Property'}
//         </button>
//       </div>
//       {properties.length === 0 ? (
//         <p className="text-gray-600">No properties found.</p>
//       ) : (
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Title</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
//               <th className="px-6 py-3 w-24"></th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {properties.map((prop) => (
//               <tr key={prop.id}>
//                 console.log(properties)
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.ownerName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.propertyName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.address}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <button className="text-indigo-600 hover:text-indigo-900" onClick={() => onDetailsClick(prop)}>
//                     Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// import React from 'react';

// export default function PropertyList({ properties, showForm, toggleForm, onDetailsClick }) {
//   // Check if properties is an array, if not, use an empty array as fallback
//   const propertiesList = Array.isArray(properties) ? properties : [];

//   return (
//     <div className="bg-white shadow rounded-md p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold text-gray-800">Registered Properties</h2>
//         <button onClick={toggleForm} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
//           {showForm ? 'Close Form' : 'Add Property'}
//         </button>
//       </div>
//       {propertiesList.length === 0 ? (
//         <p className="text-gray-600">No properties found.</p>
//       ) : (
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Title</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
//               <th className="px-6 py-3 w-24"></th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {propertiesList.map((prop) => (
//               <tr key={prop.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.ownerName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.propertyName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.address}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <button className="text-indigo-600 hover:text-indigo-900" onClick={() => onDetailsClick(prop)}>
//                     Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

import React from 'react';

export default function PropertyList({ properties, showForm, toggleForm, onDetailsClick }) {
  // For debugging - helps identify what type of data you're receiving
  console.log('Properties type:', typeof properties, properties);

  // Properly handle properties based on what's being passed
  const propertiesList = Array.isArray(properties) ? properties : [];

  return (
    <div className="bg-white shadow rounded-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Registered Properties</h2>
        <button onClick={toggleForm} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          {showForm ? 'Close Form' : 'Add Property'}
        </button>
      </div>
      {propertiesList.length === 0 ? (
        <p className="text-gray-600">No properties found.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 w-24"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {propertiesList.map((prop) => (
              <tr key={prop.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.ownerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.propertyName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900" onClick={() => onDetailsClick(prop)}>
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
