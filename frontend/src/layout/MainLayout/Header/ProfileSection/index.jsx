// import React from 'react';

// material-ui
// import { useTheme } from '@mui/material/styles';
// import { Fade, Button, ClickAwayListener, Paper, Popper, List, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';

// assets
// import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
// import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
// import LockOpenTwoTone from '@mui/icons-material/LockOpenTwoTone';
// import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
// import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
// import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';

// ==============================|| PROFILE SECTION ||============================== //

// const ProfileSection = () => {
//   const theme = useTheme();

//   const [selectedIndex, setSelectedIndex] = React.useState(1);
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);

//   const handleListItemClick = (event, index) => {
//     setSelectedIndex(index);
//   };

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }

//     setOpen(false);
//   };

//   const prevOpen = React.useRef(open);
//   React.useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   return (
//     <>
//       <Button
//         sx={{ minWidth: { sm: 50, xs: 35 } }}
//         ref={anchorRef}
//         aria-controls={open ? 'menu-list-grow' : undefined}
//         aria-haspopup="true"
//         aria-label="Profile"
//         onClick={handleToggle}
//         color="inherit"
//       >
//         <AccountCircleTwoToneIcon sx={{ fontSize: '1.5rem' }} />
//       </Button>
//       <Popper
//         placement="bottom-end"
//         open={open}
//         anchorEl={anchorRef.current}
//         role={undefined}
//         transition
//         disablePortal
//         modifiers={[
//           {
//             name: 'offset',
//             options: {
//               offset: [0, 10]
//             }
//           },
//           {
//             name: 'preventOverflow',
//             options: {
//               altAxis: true
//             }
//           }
//         ]}
//       >
//         {({ TransitionProps }) => (
//           <Fade {...TransitionProps}>
//             <Paper>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <List
//                   sx={{
//                     width: '100%',
//                     maxWidth: 350,
//                     minWidth: 250,
//                     backgroundColor: theme.palette.background.paper,
//                     pb: 0,
//                     borderRadius: '10px'
//                   }}
//                 >
//                   <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
//                     <ListItemIcon>
//                       <SettingsTwoToneIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Settings" />
//                   </ListItemButton>
//                   <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
//                     <ListItemIcon>
//                       <PersonTwoToneIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Profile" />
//                   </ListItemButton>
//                   <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
//                     <ListItemIcon>
//                       <DraftsTwoToneIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="My Messages" />
//                   </ListItemButton>
//                   <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
//                     <ListItemIcon>
//                       <LockOpenTwoTone />
//                     </ListItemIcon>
//                     <ListItemText primary="Lock Screen" />
//                   </ListItemButton>
//                   <ListItemButton selected={selectedIndex === 4}>
//                     <ListItemIcon>
//                       <MeetingRoomTwoToneIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Logout" />
//                   </ListItemButton>
//                 </List>
//               </ClickAwayListener>
//             </Paper>
//           </Fade>
//         )}
//       </Popper>
//     </>
//   );
// };

// export default ProfileSection;

import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after logout

// material-ui
import { useTheme } from '@mui/material/styles';
import { Fade, Button, ClickAwayListener, Paper, Popper, List, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';

// assets
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import LockOpenTwoTone from '@mui/icons-material/LockOpenTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';

// ==============================|| PROFILE SECTION ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Hook for navigation

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index === 4) {
      // Logout is at index 4
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
        // Even if server fails, we can still clear client-side token
        completeLogout();
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Clear token even if network error occurs
      completeLogout();
    }
  };

  const completeLogout = () => {
    localStorage.removeItem('token'); // Remove token from storage
    setOpen(false); // Close the dropdown
    navigate('/login'); // Redirect to login page
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
                  <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                    <ListItemIcon>
                      <SettingsTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItemButton>
                  <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                    <ListItemIcon>
                      <PersonTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                  <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                    <ListItemIcon>
                      <DraftsTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Messages" />
                  </ListItemButton>
                  <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                    <ListItemIcon>
                      <LockOpenTwoTone />
                    </ListItemIcon>
                    <ListItemText primary="Lock Screen" />
                  </ListItemButton>
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
