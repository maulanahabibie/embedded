import logo from '../assets/images/logo.svg';
import {FaConfluence} from 'react-icons/fa'

const Logo = () => {
  // return <img src={logo} alt='jobster logo' className='logo' />;
  return(
    <div>
      <div className=' text-white row'>
        <FaConfluence className='' />
        <h3 className='text-label'>Embedded</h3>
      </div>
    </div>
  )
};
export default Logo;
