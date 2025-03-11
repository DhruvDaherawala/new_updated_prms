import React, { useState } from 'react';
import PaginatedList from '../Pagination/Pagination';
const itemsPerPage = 5;
export default function PropertyList({ properties, onEdit, handleDeleteClick, onDetails, apiUrl }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const paginatedProperties = properties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <>
      {properties.length === 0 ? (
        <p className="text-gray-600">No properties found.</p>
      ) : (
        <table className="min-w-full  divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
              <th className="px-6 py-3 w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedProperties.map((prop) => (
              <tr key={prop.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.ownerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.propertyName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.status || 'Active'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {prop.documents ? (
                    <a
                      href={`${apiUrl}uploads/${prop.documents}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 px-3 py-1 bg-blue-100 rounded" onClick={() => onEdit(prop)}>
                      Edit
                    </button>
                    {/* <button
                      className="text-indigo-600 hover:text-indigo-900 px-3 py-1 bg-indigo-100 rounded"
                      onClick={() => onDetails(prop)}
                    >
                      Details
                    </button> */}
                    <button className="bg-red-100 text-red-600 px-2 py-1 rounded" onClick={() => handleDeleteClick(prop)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* pagination */}
      <PaginatedList properties={properties} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
}
