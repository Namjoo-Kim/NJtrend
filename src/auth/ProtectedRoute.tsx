import { Spin } from 'antd';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { loggedIn, loading } = useAuth();
  if (loading) return <Spin style={{ display: 'block', marginTop: 80 }} />;
  return loggedIn ? children : <Navigate to="/main/example" replace />;
};

export default ProtectedRoute;
