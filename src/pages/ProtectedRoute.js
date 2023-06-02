import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserCheck } from '../features/user/userSlice';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch()
  const { token } = useSelector((store) => store.user);
  useEffect(()=>{
    if(token) dispatch(loginUserCheck());
},[token])
  if (!token) {
    return <Navigate to='/landing' />;
  }
  return children;
};
export default ProtectedRoute;
