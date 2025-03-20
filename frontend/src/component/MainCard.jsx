import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MainCard = ({ title, children }) => {
  return (
    <Card>
      <CardContent>
        {title && (
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

export default MainCard; 