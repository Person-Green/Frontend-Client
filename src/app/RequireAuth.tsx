import { useLocation, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

const RETURN_TO_KEY = 'auth:returnTo';

export const consumeReturnTo = (): string => {
  const value = sessionStorage.getItem(RETURN_TO_KEY);
  if (value) sessionStorage.removeItem(RETURN_TO_KEY);
  return value || '/';
};

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const hasToken = !!localStorage.getItem('accessToken');

  if (!hasToken) {
    sessionStorage.setItem(
      RETURN_TO_KEY,
      `${location.pathname}${location.search}${location.hash}`,
    );
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
