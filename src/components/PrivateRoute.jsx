import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { clearAuthStorage, hasActiveSession } from '../utils/auth';

const SESSION_CHECK_INTERVAL_MS = 15000;

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(() => hasActiveSession());

  useEffect(() => {
    const enforceSession = () => {
      const active = hasActiveSession();

      if (!active) {
        clearAuthStorage();
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    };

    const handleExpiredEvent = () => {
      clearAuthStorage();
      setIsAuthorized(false);
      navigate('/login', { replace: true });
    };

    enforceSession();

    const intervalId = window.setInterval(enforceSession, SESSION_CHECK_INTERVAL_MS);
    window.addEventListener('focus', enforceSession);
    window.addEventListener('storage', enforceSession);
    window.addEventListener('auth:expired', handleExpiredEvent);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('focus', enforceSession);
      window.removeEventListener('storage', enforceSession);
      window.removeEventListener('auth:expired', handleExpiredEvent);
    };
  }, [navigate]);

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
