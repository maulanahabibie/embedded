import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, clearStore } from '../features/user/userSlice';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn btn text-danger' onClick={toggle}>
          <div><h3 className='logo-text fw-bold'>CMS Portal</h3></div>
          <FaAlignLeft />
        </button>
        <div>
          {/* <Logo /> */}
          {/* <h3 className='logo-text fw-bold'>CMS Portal</h3> */}
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle  className=''/>
              <div className='m-0 p-0'>{user?.username}</div>
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type='button'
              className='dropdown-btn btn-danger'
              onClick={() => dispatch(clearStore('Logging out...'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
