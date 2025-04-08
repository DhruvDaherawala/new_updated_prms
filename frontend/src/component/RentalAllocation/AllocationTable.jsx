// 02-04-25
import { Utils } from './Utils';
import PaginatedList from '../Pagination/Pagination';
import { useState } from 'react';
import { Button, Chip } from '@mui/material';
import { green } from '@mui/material/colors';

const itemsPerPage = 5;

export default function AllocationTable({
  allocations,
  renters,
  properties,
  childProperties,
  onEdit,
  onDetails,
  apiUrl,
  handleDeleteClick
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allocations.length / itemsPerPage);
  const paginatedAllocations = allocations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // const formatDate = (isoString) => {
  //   const date = new Date(isoString);

  //   const day = String(date.getUTCDate()).padStart(2, '0');
  //   const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  //   const year = String(date.getUTCFullYear()).slice(-2); // Get last 2 digits of the year

  //   return `${day}-${month}-${year}`;
  // };

  const formatDate = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);

    // Use local date methods instead of UTC to match the input from <input type="date">
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
    const year = String(date.getFullYear()).slice(-2); // Last 2 digits of the year

    return `${day}-${month}-${year}`;
  };

  const getStatusColor = (status) => {
    if (!status) return 'primary';

    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'primary';
    }
  };
  console.log(allocations);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renter</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit/Floor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocation Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Documents</th>
              <th className="px-6 py-3 w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedAllocations.map((allocation) => (
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
                  {/* {allocation.allocation_date || allocation.startDate || '-'} */}
                  {formatDate(allocation.allocation_date)}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{allocation.status || 'Active'}</td> */}
                <td>
                  <Chip label={allocation.status || 'Active'} color={getStatusColor(allocation.status)} size="small" variant="outlined" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 gap-2">
                  <div className="flex items-center gap-2">
                    {allocation.rent_agreement ? (
                      <Button
                        href={allocation.rent_agreement} // Use the Cloudinary URL directly
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        size="small"
                        color="primary"
                        sx={{ fontSize: '12px' }}
                      >
                        Rent Agreement{' '}
                      </Button>
                    ) : (
                      <div>-</div>
                    )}
                    {allocation.other_document ? (
                      <Button
                        href={allocation.other_document} // Use the Cloudinary URL directly
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        size="small"
                        color="primary"
                        sx={{ fontSize: '12px' }}
                      >
                        Other Documents{' '}
                      </Button>
                    ) : (
                      <div>-</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 px-3 py-1 bg-blue-100 rounded" onClick={() => onEdit(allocation)}>
                      Edit
                    </button>
                    <button className="bg-red-100 text-red-600 px-2 py-1 rounded" onClick={() => handleDeleteClick(allocation)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <PaginatedList renters={renters} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}
