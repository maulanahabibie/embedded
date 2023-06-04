import { useEffect, useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUserCheck, updateUser } from '../../features/user/userSlice';
import { roleCms } from '../../config/role';
import { updateUsersForm } from '../../utils/moxAxios';
import { MySwal } from '../../utils';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';

const Profile = () => {
  const { isLoading, user, role } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const[userData, setUserData] = useState({});
  const[roles, setRoles]=useState({});

  const sw = new MySwal() 
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { username, email, role, passCode} = userData;
    if (!username || !email || !role || !passCode) {
      toast.error('please fill out all fields');
      return;
    }
    sw.loading();
    const payload = {
      username : userData.username,
      password : userData.passCode,
      passCode : userData.passCode,
      id : userData.id,
    }
    const res = await updateUsersForm(payload)
    if(!res) return sw.warning('Something whne wrong');
    if(res.code !== '1') return sw.warning(res.msg || 'Failed');
    else{
      sw.success(res.msg || 'Failed')
      dispatch(loginUserCheck());
    }
    // dispatch(updateUser(userData));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(()=>{
    if(user && role){
      setUserData({
        username: user?.username || '',
        email: user?.email || '',
        role: user?.code || '',
        passCode: user?.passCode || '',
        id: user?.id || '',
      })
      setRoles(roleCms(role))
    }
  },[user, role])

  return (
    <Wrapper>
      {!isLoading || !role
        ? user
          ? 
            <form className='form' onSubmit={handleSubmit}>
              <div className="d-flex justify-content-right align-items-center flex-wrap mb-md-3">
                <button type='button' className='toggle-btn btn text-danger' >
                  <div className=''>
                    <h3 className='logo-text fw-bold'>Profile <FaUserCircle /></h3>
                    <span className="form-text text-muted">
                      Data Profile
                  </span>
                  </div>                  
                </button>
              </div>
              <hr style={{height: "10px"}}/>
              <div className='form-center'>
                <FormRow
                  type='text'
                  name='username'
                  value={userData.username || ""}
                  handleChange={handleChange}
                  disabled={!roles.show}
                />
                <FormRow
                  type='email'
                  name='email'
                  value={userData.email || ""}
                  handleChange={handleChange}
                  disabled={true}
                />
                <FormRow
                  type='text'
                  name='role'
                  value={userData.role || ""}
                  handleChange={handleChange}
                  disabled={true}
                />
                <FormRow
                  type='text'
                  name='Password'
                  value={userData.passCode || ""}
                  handleChange={handleChange}
                  disabled={!roles.show}
                />
                <button type='submit' className='btn btn-block' disabled={!isLoading && !roles.show}>
                  {isLoading ? 'Please Wait...' : 'save changes'}
                </button>
              </div>
            </form>
          : <div>Data User Not Found</div>
        : <div>Loading ...</div>
      }
    </Wrapper>
  );
};
export default Profile;
