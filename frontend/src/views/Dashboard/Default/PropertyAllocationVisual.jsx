import React from 'react';
import { Box, Typography, Grid, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';

const PropertyAllocationVisual = ({ totalProperties, allocatedProperties }) => {
  const theme = useTheme();
  const availableProperties = totalProperties - allocatedProperties;

  // Calculate percentages
  const allocatedPercentage = totalProperties > 0 ? Math.round((allocatedProperties / totalProperties) * 100) : 0;
  const availablePercentage = 100 - allocatedPercentage;

  // Create arrays for rendering properties
  const properties = Array(totalProperties)
    .fill()
    .map((_, index) => {
      return index < allocatedProperties ? 'allocated' : 'available';
    });

  // Determine how many items per row (adjust based on expected total)
  const itemsPerRow = Math.min(10, Math.ceil(Math.sqrt(totalProperties)));

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1">Properties Visualization</Typography>
            <Typography variant="subtitle1">{allocatedPercentage}% Allocated</Typography>
          </Box>

          {/* Property grid visualization */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              justifyContent: 'center'
            }}
          >
            {properties.map((status, index) => (
              <Tooltip key={index} title={`Property ${index + 1}: ${status === 'allocated' ? 'Allocated' : 'Available'}`} arrow>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: status === 'allocated' ? theme.palette.warning.main : theme.palette.success.main,
                    color: '#fff',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: '0 0 5px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  <HomeTwoTone sx={{ fontSize: 16 }} />
                </Box>
              </Tooltip>
            ))}
          </Box>
        </Grid>

        {/* Legend */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
              gap: 4
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: 1,
                  backgroundColor: theme.palette.warning.main,
                  mr: 1
                }}
              />
              <Typography variant="body2">Allocated ({allocatedProperties})</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: 1,
                  backgroundColor: theme.palette.success.main,
                  mr: 1
                }}
              />
              <Typography variant="body2">Available ({availableProperties})</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyAllocationVisual;
