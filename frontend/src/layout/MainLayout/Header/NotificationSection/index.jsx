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
  IconButton,
  Divider,
  Tooltip
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
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  p: 4,
  '&:focus': {
    outline: 'none'
  }
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
      <Tooltip title="Notifications">
        <Button
          sx={{
            minWidth: { sm: 50, xs: 35 },
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              transform: 'scale(1.05)'
            }
          }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          aria-label="Notification"
          onClick={handleToggle}
          color="inherit"
        >
          <Badge
            badgeContent={renterDueData?.length}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                right: -3,
                top: 13,
                border: `2px solid ${theme.palette.background.paper}`,
                padding: '0 4px',
                minWidth: '20px',
                height: '20px',
                borderRadius: '10px',
                backgroundColor: theme.palette.error.main,
                boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
              }
            }}
          >
            <NotificationsNoneTwoToneIcon sx={{ fontSize: '1.5rem' }} />
          </Badge>
        </Button>
      </Tooltip>

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
            <Paper
              elevation={8}
              sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                width: '400px'
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 400,
                    minWidth: 350,
                    backgroundColor: theme.palette.background.paper,
                    pb: 0,
                    borderRadius: '12px'
                  }}
                >
                  <PerfectScrollbar style={{ height: 480, overflowX: 'hidden' }}>
                    <ListSubheader
                      disableSticky
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        py: 2,
                        px: 3
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Renter Due Notifications
                        </Typography>
                        <Chip
                          size="medium"
                          label={renterDueData?.length || 0}
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            '& .MuiChip-label': { px: 2, fontSize: '0.9rem' }
                          }}
                        />
                      </Box>
                    </ListSubheader>
                    {renterDueData?.length === 0 ? (
                      <Box sx={{ p: 4, textAlign: 'center' }}>
                        <NotificationsNoneTwoToneIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="body1" color="text.secondary">
                          No notifications at the moment
                        </Typography>
                      </Box>
                    ) : (
                      renterDueData?.map((d) => (
                        <ListItemButton
                          key={d.id}
                          alignItems="flex-start"
                          sx={{
                            pt: 2,
                            pb: 2,
                            px: 3,
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              backgroundColor: theme.palette.action.hover
                            }
                          }}
                          onClick={() => handleRenterClick(d)}
                        >
                          <ListItemAvatar>
                            <Avatar
                              alt={d.renterName}
                              src={d?.rent_agreement}
                              sx={{
                                width: 56,
                                height: 56,
                                border: `2px solid ${theme.palette[getStatusColor(d.rent_status)].main}`
                              }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  color: theme.palette.text.primary,
                                  mb: 0.5
                                }}
                              >
                                {d?.renterName || 'No Name'}
                              </Typography>
                            }
                            secondary={
                              <Box sx={{ mt: 1 }}>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    color: theme.palette.text.secondary,
                                    mb: 1
                                  }}
                                >
                                  {formatDate(d?.allocation_date)}
                                </Typography>
                                <Chip
                                  size="medium"
                                  label={getStatusLabel(d.rent_status)}
                                  color={getStatusColor(d.rent_status)}
                                  sx={{
                                    height: 28,
                                    '& .MuiChip-label': { px: 2, fontSize: '0.9rem' }
                                  }}
                                />
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction sx={{ top: 24 }}>
                            <Grid container justifyContent="flex-end" alignItems="center">
                              <Grid item>
                                <QueryBuilderTwoToneIcon
                                  sx={{
                                    fontSize: '1rem',
                                    mr: 1,
                                    color: theme.palette.grey[400]
                                  }}
                                />
                              </Grid>
                              <Grid item>
                                <Typography
                                  variant="body2"
                                  display="block"
                                  sx={{
                                    color: theme.palette.grey[400],
                                    fontWeight: 500,
                                    fontSize: '0.9rem'
                                  }}
                                >
                                  {d.days_since_allocation >= 0
                                    ? `${d.days_since_allocation} days ago`
                                    : `${Math.abs(d.days_since_allocation)} days ahead`}
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItemSecondaryAction>
                        </ListItemButton>
                      ))
                    )}
                  </PerfectScrollbar>
                </List>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="renter-due-modal"
        aria-describedby="renter-due-description"
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleModalClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
              '&:hover': {
                backgroundColor: theme.palette.action.hover
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedRenter && (
            <>
              <Typography
                id="renter-due-modal"
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 2
                }}
              >
                Rent Notification
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  alt={selectedRenter.renterName}
                  src={selectedRenter?.rent_agreement}
                  sx={{
                    width: 64,
                    height: 64,
                    mr: 2,
                    border: `2px solid ${theme.palette[getStatusColor(selectedRenter.rent_status)].main}`
                  }}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}
                  >
                    {selectedRenter.renterName}
                  </Typography>
                  <Chip
                    size="small"
                    label={getStatusLabel(selectedRenter.rent_status)}
                    color={getStatusColor(selectedRenter.rent_status)}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </Box>
              <Box sx={{ pl: 2 }}>
                <Typography
                  id="renter-due-description"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 2
                  }}
                >
                  Rent is {getStatusLabel(selectedRenter.rent_status).toLowerCase()} for {selectedRenter.renterName}.
                </Typography>
                <Typography sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                  Allocation Date: {formatDate(selectedRenter.allocation_date)}
                </Typography>
                <Typography sx={{ color: theme.palette.text.secondary }}>
                  Days:{' '}
                  {selectedRenter.days_since_allocation >= 0
                    ? `${selectedRenter.days_since_allocation} days ago`
                    : `${Math.abs(selectedRenter.days_since_allocation)} days ahead`}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default NotificationSection;
