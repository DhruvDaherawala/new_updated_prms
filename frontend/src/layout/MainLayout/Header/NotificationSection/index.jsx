import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Chip,
  ClickAwayListener,
  Fade,
  Grid,
  Paper,
  Popper,
  Avatar,
  List,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  Typography,
  ListItemButton,
  Badge,
  Modal,
  Box,
  IconButton
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import QueryBuilderTwoToneIcon from '@mui/icons-material/QueryBuilderTwoTone';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4
};

const NotificationSection = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRenter, setSelectedRenter] = useState(null);
  const [renterDueData, setRenterDueData] = useState([]);
  const anchorRef = React.useRef(null);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue':
        return 'error';
      case 'due_soon':
        return 'warning';
      case 'upcoming':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'overdue':
        return 'Overdue';
      case 'due_soon':
        return 'Due Soon';
      case 'upcoming':
        return 'Upcoming';
      default:
        return 'Normal';
    }
  };

  const handleRenterDueData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/due-renters`);
      setRenterDueData(response?.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleRenterDueData();
    const interval = setInterval(handleRenterDueData, 300000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleRenterClick = (renter) => {
    setSelectedRenter(renter);
    setModalOpen(true);
    setOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRenter(null);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        sx={{ minWidth: { sm: 50, xs: 35 } }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        aria-label="Notification"
        onClick={handleToggle}
        color="inherit"
      >
        <Badge badgeContent={renterDueData?.length} color="error">
          <NotificationsNoneTwoToneIcon sx={{ fontSize: '1.5rem' }} />
        </Badge>
      </Button>

      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: { offset: [0, 10] }
          },
          {
            name: 'preventOverflow',
            options: { altAxis: true }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 350,
                    minWidth: 250,
                    backgroundColor: theme.palette.background.paper,
                    pb: 0,
                    borderRadius: '10px'
                  }}
                >
                  <PerfectScrollbar style={{ height: 320, overflowX: 'hidden' }}>
                    <ListSubheader disableSticky>
                      <Chip size="small" color="primary" label="Renter Due Notifications" />
                    </ListSubheader>
                    {renterDueData?.map((d) => (
                      <ListItemButton key={d.id} alignItems="flex-start" sx={{ pt: 0 }} onClick={() => handleRenterClick(d)}>
                        <ListItemAvatar>
                          <Avatar alt={d.renterName} src={d?.rent_agreement} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography variant="subtitle1">{d?.renterName || 'No Name'}</Typography>}
                          secondary={
                            <>
                              <Typography variant="subtitle2">{formatDate(d?.allocation_date)}</Typography>
                              <Chip
                                size="small"
                                label={getStatusLabel(d.rent_status)}
                                color={getStatusColor(d.rent_status)}
                                sx={{ mt: 1 }}
                              />
                            </>
                          }
                        />
                        <ListItemSecondaryAction sx={{ top: 20 }}>
                          <Grid container justifyContent="flex-end">
                            <Grid item>
                              <QueryBuilderTwoToneIcon
                                sx={{
                                  fontSize: '0.75rem',
                                  mr: 0.5,
                                  color: theme.palette.grey[400]
                                }}
                              />
                            </Grid>
                            <Grid item>
                              <Typography variant="caption" display="block" gutterBottom sx={{ color: theme.palette.grey[400] }}>
                                {d.days_since_allocation >= 0
                                  ? `${d.days_since_allocation} days ago`
                                  : `${Math.abs(d.days_since_allocation)} days ahead`}
                              </Typography>
                            </Grid>
                          </Grid>
                        </ListItemSecondaryAction>
                      </ListItemButton>
                    ))}
                  </PerfectScrollbar>
                </List>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>

      <Modal open={modalOpen} onClose={handleModalClose} aria-labelledby="renter-due-modal" aria-describedby="renter-due-description">
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleModalClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedRenter && (
            <>
              <Typography id="renter-due-modal" variant="h6" component="h2">
                Rent Notification
              </Typography>
              <Typography id="renter-due-description" sx={{ mt: 2 }}>
                Rent is {getStatusLabel(selectedRenter.rent_status).toLowerCase()} for {selectedRenter.renterName}.
              </Typography>
              <Typography sx={{ mt: 1 }}>Allocation Date: {formatDate(selectedRenter.allocation_date)}</Typography>
              <Typography sx={{ mt: 1 }}>
                Days:{' '}
                {selectedRenter.days_since_allocation >= 0
                  ? `${selectedRenter.days_since_allocation} days ago`
                  : `${Math.abs(selectedRenter.days_since_allocation)} days ahead`}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default NotificationSection;
