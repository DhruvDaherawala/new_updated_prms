import React, { useState } from 'react';
import PaginatedList from '../Pagination/Pagination';
import { Tooltip, Chip, IconButton, Box, Typography, Card, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const itemsPerPage = 5;

export default function PropertyList({ properties, onEdit, handleDeleteClick, onDetails, apiUrl, onAddClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = properties.filter((property) =>
    Object.values(property).some(
      (val) => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
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
        <Typography variant="h6" fontWeight="bold" color="primary">
          Properties Management
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              padding: '4px 8px',
              width: { xs: '100%', sm: '250px' }
            }}
          >
            <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search properties..."
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '14px'
              }}
            />
          </Box>
          
          {onAddClick && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={onAddClick}
              sx={{ 
                whiteSpace: 'nowrap', 
                minWidth: { xs: '100%', sm: 'auto' } 
              }}
            >
              Add Property
            </Button>
          )}
        </Box>
      </Box>

      <div className="overflow-x-auto">
        {paginatedProperties.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="textSecondary">
              {searchTerm ? "No properties match your search." : "No properties found."}
            </Typography>
          </Box>
        ) : (
          <table className="min-w-full divide-gray-200 border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProperties.map((prop) => (
                <tr key={prop.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.ownerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{prop.propertyName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <Tooltip title={prop.address} arrow>
                      <span className="truncate inline-block max-w-[150px]">{prop.address}</span>
                    </Tooltip>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Chip 
                      label={prop.status || 'Active'} 
                      color={getStatusColor(prop.status)} 
                      size="small"
                      variant="outlined"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {prop.documents ? (
                      <Button
                        href={`${apiUrl}uploads/${prop.documents}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        size="small"
                        color="primary"
                        sx={{ fontSize: '12px' }}
                      >
                        View Document
                      </Button>
                    ) : (
                      <Typography variant="caption" color="text.secondary">No documents</Typography>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="Edit Property">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => onEdit(prop)}
                          sx={{ 
                            backgroundColor: 'primary.light',
                            '&:hover': { backgroundColor: 'primary.main', color: 'white' }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      
                      {onDetails && (
                        <Tooltip title="View Details">
                          <IconButton
                            color="info"
                            size="small"
                            onClick={() => onDetails(prop)}
                            sx={{ 
                              backgroundColor: 'info.light',
                              '&:hover': { backgroundColor: 'info.main', color: 'white' }
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      
                      <Tooltip title="Delete Property">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDeleteClick(prop)}
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
          properties={filteredProperties} 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </Box>
    </Card>
  );
}
