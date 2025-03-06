import React from 'react';

const RenterTable = ({ renters, showForm, setShowForm, onDetailsClick }) => {
  return (
    <div className="bg-white shadow rounded-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Registered Renters</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact1</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact2</th>
              <th className="px-6 py-3 w-24"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {renters.map((renter) => (
              <tr key={renter.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{renter.renterName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{renter.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{renter.fullAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{renter.contact1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{renter.contact2}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900" onClick={() => onDetailsClick(renter)}>
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
};

export default RenterTable;
