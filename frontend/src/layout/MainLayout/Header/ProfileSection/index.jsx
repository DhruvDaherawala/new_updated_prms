import React from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Fade,
  Button,
  ClickAwayListener,
  Paper,
  Popper,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton
} from '@mui/material';

// icons
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';

// ==============================|| PROFILE SECTION ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // For navigation after logout

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index === 4) {
      // Logout item
      handleLogout();
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('No token found, proceeding with client-side logout');
        completeLogout();
        return;
      }

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Logout successful');
        completeLogout();
      } else {
        console.error('Logout failed:', response.statusText);
        completeLogout(); // Clear token anyway
      }
    } catch (error) {
      console.error('Logout error:', error);
      completeLogout(); // Fallback on network error
    }
  };

  const completeLogout = () => {
    localStorage.removeItem('token');
    setOpen(false);
    navigate('/login'); // Redirect to login
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
        aria-label="Profile"
        onClick={handleToggle}
        color="inherit"
      >
        <AccountCircleTwoToneIcon sx={{ fontSize: '1.5rem' }} />
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
            options: {
              offset: [0, 10]
            }
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: true
            }
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
                  <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
                    <ListItemIcon>
                      <MeetingRoomTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </List>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
