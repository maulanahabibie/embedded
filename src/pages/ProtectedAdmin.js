import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedAdmin = ({ children }) => {
  const { token, role } = useSelector((store) => store.user);
  if (!token || role !== 'ADMIN') {
    return <Navigate to='/*' />;
  }
  return children;
};
export default ProtectedAdmin;
