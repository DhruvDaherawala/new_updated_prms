import React from 'react';

export default function RenterList({ renters, onAddClick, showForm, apiUrl, onEditClick, onDetailsClick, editForm, setEditForm }) {
  return (
    <div className="bg-white shadow rounded-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Registered Renters</h2>
        <button onClick={onAddClick} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          {showForm ? 'Close Form' : 'Add Renter'}
        </button>
      </div>
      {renters.length === 0 ? (
        <p className="text-gray-600">No renters found.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renter Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
              <th className="px-6 py-3 w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {renters.map((renter) => (
              <tr key={renter.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{renter.renterName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{renter.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{renter.fullAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{renter.status || 'Active'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <DocumentLink document={renter.aadhaarCard} apiUrl={apiUrl} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 px-3 py-1 bg-blue-100 rounded" onClick={() => onEditClick(renter)}>
                      Edit
                    </button>
                    <button
                      className="text-indigo-600 hover:text-indigo-900 px-3 py-1 bg-indigo-100 rounded"
                      onClick={() => onDetailsClick(renter)}
                    >
                      Details
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

// Helper component for document links
function DocumentLink({ document, apiUrl }) {
  if (!document) return <span>-</span>;

  return (
    <a href={`${apiUrl}uploads/${document}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
      View
    </a>
  );
}
