import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';

const NavLinks = ({ toggleSidebar }) => {
  const {isLoading, user} =useSelector(state=>state.user)
  return (
    <div className='nav-links'>
      {
        !isLoading && user?.code==='ADMIN'
          ?
            links.admin.map((link)=>{
              const { text, path, id, icon } = link;
              return (
                <NavLink
                  to={path}
                  className={({ isActive }) => {
                    return isActive ? 'nav-link active bg-white fw-bold' : 'nav-link text-white';
                  }}
                  key={id}
                  onClick={toggleSidebar}
                  end
                >
                  <span className='icon'>{icon}</span>
                  {text}
                </NavLink>
              );
            })
          :
            links.user.map((link)=>{
              const { text, path, id, icon } = link;
              return (
                <NavLink
                  to={path}
                  className={({ isActive }) => {
                    return isActive ? 'nav-link active bg-white fw-bold' : 'nav-link text-white';
                  }}
                  key={id}
                  onClick={toggleSidebar}
                  end
                >
                  <span className='icon'>{icon}</span>
                  {text}
                </NavLink>
              );
            })
      }
    </div>
  );
};
export default NavLinks;
