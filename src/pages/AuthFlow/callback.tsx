import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../../shared/api';


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
        // 이름이 없으면 이름 입력 페이지로, 있으면 홈으로
        if (!res.user.name) {
          navigate('/auth/enter-name', { replace: true });
        } else {
          navigate('/', { replace: true });
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
