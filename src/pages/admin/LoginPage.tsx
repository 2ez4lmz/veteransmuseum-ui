import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/admin/LoginForm';
import { loginUser } from '../../api/api';
import { authUtils } from '../../utils/auth';

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Проверяем, есть ли уже токен, и если да, перенаправляем на страницу админ-панели
  useEffect(() => {
    if (authUtils.isAuthenticated()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await loginUser({ email, password });
      
      if (response && response.accessToken) {
        authUtils.setToken(response.accessToken);
        navigate('/admin/dashboard');
      } else {
        setError('Ошибка авторизации: отсутствует токен доступа');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неверный email или пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
              />
            </svg>
          </span>
          Музей Ветеранов
        </h1>
        <p className="text-center text-gray-600 mt-2">Административная панель</p>
      </div>

      <LoginForm onSubmit={handleLogin} error={error} isLoading={isLoading} />
    </div>
  );
}