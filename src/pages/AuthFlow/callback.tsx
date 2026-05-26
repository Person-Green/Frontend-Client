import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../../entities';
import { consumeReturnTo } from '../../app/RequireAuth';


const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get('code');
    const state = params.get('state');
    const redirectUri = `${window.location.origin}/auth/google/callback`;

    if (!authorizationCode || !state) {
      navigate('/auth', { replace: true });
      return;
    }

    loginWithGoogle({ authorizationCode, state, redirectUri })
      .then((res) => {
        const hasSetUsername =
          localStorage.getItem(`hasSetUsername:${res.user.id}`) === 'true';
        if (!hasSetUsername) {
          navigate('/auth/enter-name', { replace: true });
        } else {
          navigate(consumeReturnTo(), { replace: true });
        }
      })
      .catch(() => {
        navigate('/auth', { replace: true });
      });
  }, [navigate]);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <span className="body-s text-text-20">로그인 중...</span>
    </main>
  );
};

export default AuthCallback;
