import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY as string;
const REDIRECT_URI = `${window.location.origin}/kakao/callback`;

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const returnTo = sessionStorage.getItem('kakaoShareReturnTo') || '/';

    if (!code) {
      navigate(returnTo, { replace: true });
      return;
    }

    // 인가 코드로 액세스 토큰 교환
    fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          sessionStorage.setItem('kakaoAccessToken', data.access_token);
          // 공유 트리거 플래그 설정 후 원래 페이지로 복귀
          sessionStorage.setItem('kakaoSharePending', 'true');
        }
      })
      .catch((e) => console.error('카카오 토큰 교환 실패', e))
      .finally(() => {
        navigate(returnTo, { replace: true });
      });
  }, [navigate]);

  return (
    <main className="flex items-center justify-center min-h-dvh">
      <span className="body-s text-text-20">카카오 로그인 중...</span>
    </main>
  );
};

export default KakaoCallback;
