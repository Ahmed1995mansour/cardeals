import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { currentUser } = useSelector(state => state.user);
  return !currentUser ? (
    <Navigate to="/sign-in" />
  ) : !currentUser.isAdmin ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default AdminRoute;
