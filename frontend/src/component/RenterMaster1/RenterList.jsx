import React, { useState } from 'react';
import PaginatedList from '../Pagination/Pagination';
import { 
  Box, 
  Typography, 
  Card, 
  Button, 
  Tooltip, 
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const itemsPerPage = 5;

export default function RenterList({
  renters,
  onAddClick,
  showForm,
  apiUrl,
  onEditClick,
  onDetailsClick,
  editForm,
  setEditForm,
  handleDeleteClick
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter renters based on search term
  const filteredRenters = renters.filter((renter) =>
    Object.values(renter).some(
      (val) => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredRenters.length / itemsPerPage);
  const paginatedRenters = filteredRenters.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const getStatusColor = (status) => {
    if (!status) return 'primary';
    
    switch(status.toLowerCase()) {
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

  return (
    <Card sx={{ 
      p: 3, 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: 2,
      '&:hover': {
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
      },
      transition: 'box-shadow 0.3s ease-in-out'
    }}>
      <div className="overflow-x-auto">
        {paginatedRenters.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="textSecondary">
              {searchTerm ? "No renters match your search." : "No renters found."}
            </Typography>
          </Box>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Renter Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedRenters.map((renter) => (
                <tr key={renter.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <Typography variant="body2" fontWeight="medium">
                      {renter.renterName}
                    </Typography>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{renter.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <Tooltip title={renter.fullAddress} arrow>
                      <span className="truncate inline-block max-w-[150px]">{renter.fullAddress}</span>
                    </Tooltip>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Chip 
                      label={renter.status || 'Active'} 
                      color={getStatusColor(renter.status)} 
                      size="small"
                      variant="outlined"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <DocumentLink document={renter.aadhaarCard} apiUrl={apiUrl} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2 justify-center">
                      <button 
                        className="text-blue-600 hover:text-blue-900 px-3 py-1 bg-blue-100 rounded" 
                        onClick={() => onEditClick(renter)}
                      >
                        Edit
                      </button>
                      <button 
                        className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200" 
                        onClick={() => handleDeleteClick(renter)}
                      >
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
      
      {/* Pagination */}
      <Box sx={{ mt: 3 }}>
        <PaginatedList 
          renters={filteredRenters} 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </Box>
    </Card>
  );
}

// Helper component for document links
function DocumentLink({ document, apiUrl }) {
  if (!document) return <Typography variant="caption" color="text.secondary">No document</Typography>;

  return (
    <Button
      href={`${apiUrl}uploads/${document}`}
      target="_blank"
      rel="noopener noreferrer"
      variant="outlined"
      size="small"
      color="primary"
      sx={{ fontSize: '12px' }}
    >
      View Document
    </Button>
  );
}
