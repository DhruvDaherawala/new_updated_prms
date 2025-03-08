// // ChildPropertyList.jsx
// import React from 'react';

// export default function ChildPropertyList({
//   childProperties,
//   parentProperties,
//   onAddClick,
//   showForm,
//   onEditClick,
//   onDetailsClick,
//   onDeleteClick
// }) {
//   // Helper to get parent's propertyName using property_id
//   const getParentName = (property_id) => {
//     const parent = parentProperties.find(p => p.id === parseInt(property_id));
//     return parent ? parent.propertyName : 'N/A';
//   };

//   return (
//     <div className="bg-white shadow rounded-md p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold text-gray-800">Child Properties</h2>
//         <button onClick={onAddClick} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
//           {showForm ? 'Close Form' : 'Add Child Property'}
//         </button>
//       </div>
//       {childProperties.length === 0 ? (
//         <p className="text-gray-600">No child properties found.</p>
//       ) : (
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Parent</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Floor</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rooms</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Washroom</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Gas</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Electricity</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Deposit</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rent</th>
//               <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {childProperties.map(child => (
//               <tr key={child.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 whitespace-nowrap text-sm">{getParentName(child.property_id)}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm">{child.floor}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm">{child.title}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm">{child.rooms}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm">{child.washroom}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm">{child.gas}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm">{child.electricity}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm">{child.deposit}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm">{child.rent}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-center text-sm">
//                   <div className="flex justify-center space-x-2">
//                     <button className="bg-blue-100 text-blue-600 px-2 py-1 rounded" onClick={() => onEditClick(child)}>
//                       Edit
//                     </button>
//                     <button className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded" onClick={() => onDetailsClick(child)}>
//                       Details
//                     </button>
//                     <button className="bg-red-100 text-red-600 px-2 py-1 rounded" onClick={() => onDeleteClick(child)}>
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// ChildPropertyList.jsx
import React from 'react';

export default function ChildPropertyList({
  childProperties,
  parentProperties,
  onAddClick,
  showForm,
  onEditClick,
  onDetailsClick,
  onDeleteClick
}) {
  // Helper to get parent's propertyName using property_id
  const getParentName = (property_id) => {
    const parent = parentProperties.find((p) => p.id === parseInt(property_id));
    return parent ? parent.propertyName : 'N/A';
  };

  return (
    <div className="bg-white shadow rounded-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Child Properties</h2>
        <button onClick={onAddClick} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          {showForm ? 'Close Form' : 'Add Child Property'}
        </button>
      </div>
      {childProperties.length === 0 ? (
        <p className="text-gray-600">No child properties found.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Parent</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Floor</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rooms</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Washroom</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Gas</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Electricity</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Deposit</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rent</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {childProperties.map((child) => (
              <tr key={child.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm">{getParentName(child.property_id)}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{child.floor}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{child.title}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{child.rooms}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{child.washroom}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{child.gas}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{child.electricity}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{child.deposit}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{child.rent}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center text-sm">
                  <div className="flex justify-center space-x-2">
                    <button className="bg-blue-100 text-blue-600 px-2 py-1 rounded" onClick={() => onEditClick(child)}>
                      Edit
                    </button>
                    {/* <button className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded" onClick={() => onDetailsClick(child)}>
                      Details
                    </button> */}
                    <button className="bg-red-100 text-red-600 px-2 py-1 rounded" onClick={() => onDeleteClick(child)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
