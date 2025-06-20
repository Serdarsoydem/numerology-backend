import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - her istekte token ekle
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - hata yönetimi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Token süresi dolmuşsa veya geçersizse
      if (error.response.status === 401) {
        localStorage.removeItem('jwt');
        // Kullanıcıyı login sayfasına yönlendir
        window.location.href = '/login';
      }
      
      // Özel hata mesajı
      const message = error.response.data?.message || error.response.data?.error?.message || 'Bir hata oluştu';
      return Promise.reject(new Error(message));
    }
    
    return Promise.reject(error);
  }
);

export default api; 