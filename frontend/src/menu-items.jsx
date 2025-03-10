// assets
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const icons = {
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
  BlockOutlinedIcon: BlockOutlinedIcon,
  AppsOutlinedIcon: AppsOutlinedIcon,
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon
};

// ==============================|| MENU ITEMS ||============================== //

// eslint-disable-next-line
export default {
  items: [
    {
      id: 'navigation',
      title: 'PRMS',
      caption: 'Dashboard',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: icons['HomeOutlinedIcon'],
          url: '/dashboard/default'
        }
      ]
    },
    {
      id: 'pages',
      title: 'Pages',
      // caption: 'Prebuild Pages',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'property-page',
          title: 'Property',
          type: 'item',
          url: '/property-page',
          icon: icons['ChromeReaderModeOutlinedIcon']
        },
        {
          id: 'childproperty-page',
          title: 'Child Property',
          type: 'item',
          url: '/childproperty-page',
          icon: icons['SecurityOutlinedIcon']
          // children: [
          //   {
          //     id: 'login-1',
          //     title: 'Login',
          //     type: 'item',
          //     url: '/application/login',
          //     target: true
          //   }
          //   // {
          //   //   id: 'register',
          //   //   title: 'Register',
          //   //   type: 'item',
          //   //   url: '/application/register',
          //   //   target: true
          //   // }
          // ]
        },
        {
          id: 'renter-page',
          title: 'Renter',
          type: 'item',
          url: '/renter-page',
          icon: icons['SecurityOutlinedIcon']
          // children: [
          //   {
          //     id: 'login-1',
          //     title: 'Login',
          //     type: 'item',
          //     url: '/application/login',
          //     target: true
          //   }
          //   // {
          //   //   id: 'register',
          //   //   title: 'Register',
          //   //   type: 'item',
          //   //   url: '/application/register',
          //   //   target: true
          //   // }
          // ]
        },
        {
          id: 'rental-allocation-page',
          title: 'Rental Allocation',
          type: 'item',
          url: '/rental-allocation-page',
          icon: icons['ChromeReaderModeOutlinedIcon']
        }
      ]
    }
    // {
    //   id: 'utils',
    //   title: 'Utils',
    //   type: 'group',
    //   icon: icons['AccountTreeOutlinedIcon'],
    //   children: [
    //     {
    //       id: 'util-icons',
    //       title: 'Icons',
    //       type: 'item',
    //       url: 'https://mui.com/material-ui/material-icons/',
    //       icon: icons['AppsOutlinedIcon'],
    //       external: true,
    //       target: true
    //     },
    //     {
    //       id: 'util-typography',
    //       title: 'Typography',
    //       type: 'item',
    //       url: '/utils/util-typography',
    //       icon: icons['FormatColorTextOutlinedIcon']
    //     }
    //   ]
    // },
    // {
    //   id: 'support',
    //   title: 'Support',
    //   type: 'group',
    //   icon: icons['ContactSupportOutlinedIcon'],
    //   children: [
    //     {
    //       id: 'disabled-menu',
    //       title: 'Disabled Menu',
    //       type: 'item',
    //       url: '#',
    //       icon: icons['BlockOutlinedIcon'],
    //       disabled: true
    //     },
    //     {
    //       id: 'documentation',
    //       title: 'Documentation',
    //       type: 'item',
    //       url: 'https://codedthemes.gitbook.io/materially-react-material-documentation/',
    //       icon: icons['HelpOutlineOutlinedIcon'],
    //       chip: {
    //         label: 'Help?',
    //         color: 'primary'
    //       },
    //       external: true,
    //       target: true
    //     }
    //   ]
    // }
  ]
};
