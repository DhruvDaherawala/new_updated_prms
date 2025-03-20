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
import HouseIcon from '@mui/icons-material/House';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PeopleIcon from '@mui/icons-material/People';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const icons = {
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
  BlockOutlinedIcon: BlockOutlinedIcon,
  AppsOutlinedIcon: AppsOutlinedIcon,
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon,
  HouseIcon: HouseIcon,
  LocationCityIcon: LocationCityIcon,
  PeopleIcon: PeopleIcon,
  AssuredWorkloadIcon: AssuredWorkloadIcon,
  PaymentsIcon: PaymentsIcon,
  AccountBalanceWalletIcon: AccountBalanceWalletIcon
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
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'property-page',
          title: 'Property',
          type: 'item',
          url: '/property-page',
          icon: icons['HouseIcon']
        },
        {
          id: 'childproperty-page',
          title: 'Child Property',
          type: 'item',
          url: '/childproperty-page',
          icon: icons['LocationCityIcon']
        },
        {
          id: 'renter-page',
          title: 'Renter',
          type: 'item',
          url: '/renter-page',
          icon: icons['PeopleIcon']
        },
        {
          id: 'rental-allocation-page',
          title: 'Rental Allocation',
          type: 'item',
          url: '/rental-allocation-page',
          icon: icons['AssuredWorkloadIcon']
        },
        {
          id: 'rent-master',
          title: 'Rent Master',
          type: 'item',
          url: '/rent-master',
          icon: icons['PaymentsIcon']
        },
        {
          id: 'deposit-master',
          title: 'Deposit Master',
          type: 'item',
          url: '/deposit-master',
          icon: icons['AccountBalanceWalletIcon']
        },
        {
          id: 'login',
          title: 'Login',
          type: 'item',
          url: '/auth/login',
          icon: icons['SecurityOutlinedIcon']
        }
      ]
    }
  ]
};
