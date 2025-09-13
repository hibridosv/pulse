import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

// Define una interfaz que extiende la configuración de Axios para incluir nuestra propiedad personalizada
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// url de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL;
// url de autenticación
const URL = process.env.NEXT_PUBLIC_URL;

const httpService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpService.interceptors.request.use(
  (config) => {
    const token = getFromCookie("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (
      config.data instanceof FormData &&
      config.headers['Content-Type'] === 'application/json'
    ) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

httpService.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return httpService(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const currentRefreshToken = getFromCookie('refreshToken');
      if (!currentRefreshToken) {
        destroyCookie(null, 'authToken');
        destroyCookie(null, 'refreshToken');
        if (typeof window !== 'undefined') window.location.href = '/login';
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', currentRefreshToken);
        params.append('client_id', process.env.NEXT_PUBLIC_AUTH_CLIENT_ID || '');
        params.append('client_secret', process.env.NEXT_PUBLIC_AUTH_SECRET_ID || '');

        const refreshResponse = await axios.post(`${URL}oauth/token`, params, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const { access_token, refresh_token, expires_in } = refreshResponse.data;

        const cookieOptions = {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: '/',
        };

        setCookie(null, 'authToken', access_token, cookieOptions);
        setCookie(null, 'refreshToken', refresh_token, cookieOptions);
        setCookie(null, 'outTime', (expires_in + Date.now()).toString(), cookieOptions);
        
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        processQueue(null, access_token);
        return httpService(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        destroyCookie(null, 'authToken');
        destroyCookie(null, 'refreshToken');
        destroyCookie(null, 'outTime');
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response) {
      console.error(`Error en la petición: ${error.response.status} - ${(error.response.data as any)?.message || error.message}`);
    } else if (originalRequest) {
      console.error('Error en la petición:', error.message);
    }
    return Promise.reject(error);
  }
);

export const get = (url: string, config = {}) => httpService.get(url, config);

export const post = (url: string, data: any, config = {}) => httpService.post(url, data, config);

export const put = (url: string, data: any, config = {}) => httpService.put(url, data, config);

export const patch = (url: string, data: any, config = {}) => httpService.patch(url, data, config);

export const del = (url: string, config = {}) => httpService.delete(url, config);

export const getFromCookie = (cookie: string): string | null => {
  const cookies = parseCookies();
  return cookies[cookie] || null;
};

export default httpService;

