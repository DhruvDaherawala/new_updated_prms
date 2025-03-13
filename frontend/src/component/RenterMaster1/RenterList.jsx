import React, { useState } from 'react';
import PaginatedList from '../Pagination/Pagination';
import { 
  Box, 
  Typography, 
  Card, 
  Button, 
  Tooltip, 
  Chip, 
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';

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
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon color="primary" />
          <Typography variant="h6" fontWeight="bold" color="primary">
            Registered Renters
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            size="small"
            placeholder="Search renters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: '100%', sm: '250px' } }}
          />
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onAddClick}
            sx={{ whiteSpace: 'nowrap', minWidth: { xs: '100%', sm: 'auto' } }}
          >
            {showForm ? 'Close Form' : 'Add Renter'}
          </Button>
        </Box>
      </Box>

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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renter Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedRenters.map((renter) => (
                <tr key={renter.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ 
                        width: 36, 
                        height: 36, 
                        borderRadius: '50%', 
                        bgcolor: 'primary.light', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'primary.main',
                        fontWeight: 'bold'
                      }}>
                        {renter.renterName ? renter.renterName.charAt(0).toUpperCase() : 'R'}
                      </Box>
                      <Typography variant="body2" fontWeight="medium">
                        {renter.renterName}
                      </Typography>
                    </Box>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <DocumentLink document={renter.aadhaarCard} apiUrl={apiUrl} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="Edit Renter">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => onEditClick(renter)}
                          sx={{ 
                            backgroundColor: 'primary.light',
                            '&:hover': { backgroundColor: 'primary.main', color: 'white' }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      
                      {onDetailsClick && (
                        <Tooltip title="View Details">
                          <IconButton
                            color="info"
                            size="small"
                            onClick={() => onDetailsClick(renter)}
                            sx={{ 
                              backgroundColor: 'info.light',
                              '&:hover': { backgroundColor: 'info.main', color: 'white' }
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      
                      <Tooltip title="Delete Renter">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDeleteClick(renter)}
                          sx={{ 
                            backgroundColor: 'error.light',
                            '&:hover': { backgroundColor: 'error.main', color: 'white' }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
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
