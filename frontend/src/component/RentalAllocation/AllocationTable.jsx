import { Utils } from './Utils';

export default function AllocationTable({ allocations, renters, properties, childProperties, onEdit, onDetails, apiUrl }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renter</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit/Floor</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocation Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
          <th className="px-6 py-3 w-24">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {allocations.map((allocation) => (
          <tr key={allocation.id || allocation.allocation_id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              {Utils.getRenterName(allocation.renter_id || allocation.renterId, renters)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              {Utils.getPropertyName(allocation.property_id || allocation.propertyId, properties)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              {Utils.getChildPropertyName(allocation.childproperty_id, childProperties)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              {allocation.allocation_date || allocation.startDate || '-'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{allocation.status || 'Active'}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              {allocation.rent_agreement ? (
                <a
                  href={`${apiUrl}uploads/${allocation.rent_agreement}`}
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
                <button className="text-blue-600 hover:text-blue-900 px-3 py-1 bg-blue-100 rounded" onClick={() => onEdit(allocation)}>
                  Edit
                </button>
                <button
                  className="text-indigo-600 hover:text-indigo-900 px-3 py-1 bg-indigo-100 rounded"
                  onClick={() => onDetails(allocation)}
                >
                  Details
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
