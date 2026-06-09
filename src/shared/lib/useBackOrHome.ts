import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * 뒤로가기를 시도하되, SPA 히스토리에 이전 항목이 없으면(예: 외부 공유 링크로 진입)
 * 지정 경로(기본 '/')로 이동시키는 헬퍼.
 *
 * React Router v6는 SPA 내부 첫 진입 시 location.key === 'default'를 부여한다.
 * 이를 이용해 pop이 불가능한 상황을 감지한다.
 */
export const useBackOrHome = (fallback: string = '/') => {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(() => {
    if (location.key === 'default') {
      navigate(fallback, { replace: true });
    } else {
      navigate(-1);
    }
  }, [navigate, location.key, fallback]);
};
