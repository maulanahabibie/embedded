import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = {
  admin: [
    { id: 1, text: 'stats', path: '/stats', icon: <IoBarChartSharp /> },
    { id: 2, text: 'alldata', path: 'alldata', icon: <IoBarChartSharp /> },
    { id: 3, text: 'departement', path: 'departement', icon: <MdQueryStats /> },
    { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
    { id: 5, text: 'admin', path: 'admin', icon: <FaWpforms /> },
  ],
  user: [
    { id: 1, text: 'stats', path: '/stats', icon: <IoBarChartSharp /> },
    { id: 2, text: 'alldata', path: 'alldata', icon: <IoBarChartSharp /> },
    { id: 3, text: 'departement', path: 'departement', icon: <MdQueryStats /> },
    { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
  ]
} 

export default links;
