import axiosInstance from '../shared/api/axiosInstance';
import type {
  GoogleAuthorizationResponse,
  GoogleLoginRequest,
  AuthTokenResponse,
  UpdateUsernameRequest,
  UserResponse,
} from './types';

/**
 * Google OAuth 인증 URL 요청
 * GET /auth/google/authorize?redirectUri=...
 */
export const getGoogleAuthorizationUrl = async (
  redirectUri: string,
): Promise<GoogleAuthorizationResponse> => {
  const { data } = await axiosInstance.get<GoogleAuthorizationResponse>(
    '/auth/google/authorize',
    { params: { redirectUri } },
  );
  return data;
};

/**
 * Google 로그인 (authorizationCode로 accessToken 발급)
 * POST /auth/google/login
 */
export const loginWithGoogle = async (
  body: GoogleLoginRequest,
): Promise<AuthTokenResponse> => {
  const { data } = await axiosInstance.post<AuthTokenResponse>(
    '/auth/google/login',
    body,
  );
  localStorage.setItem('accessToken', data.accessToken);
  return data;
};

/**
 * 토큰 갱신 (refresh_token은 쿠키로 자동 전송)
 * POST /auth/token/refresh
 */
export const refreshToken = async (): Promise<AuthTokenResponse> => {
  const { data } =
    await axiosInstance.post<AuthTokenResponse>('/auth/token/refresh');
  localStorage.setItem('accessToken', data.accessToken);
  return data;
};

/**
 * 로그아웃 (refresh_token 쿠키 무효화)
 * POST /auth/logout
 */
export const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
  localStorage.removeItem('accessToken');
};

/**
 * 사용자 이름 변경
 * PATCH /users/me/username
 */
export const updateUsername = async (
  body: UpdateUsernameRequest,
): Promise<UserResponse> => {
  const { data } = await axiosInstance.patch<UserResponse>(
    '/users/me/username',
    body,
  );
  return data;
};
