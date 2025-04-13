import { useSignLogin } from '@/hooks/contracts/useSignLogin';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
export const LoginButton = () => {
  const { signLogin, isPending, isSuccess, isError, error } = useSignLogin();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = async () => {
    try {
      await signLogin();
      checkLoginStatus();
    } catch (error) {
      console.error('登录失败:', error);
    }
  };
  const checkLoginStatus = () => {
    // 检查用户是否已登录
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    if (isSuccess) {
      toast.success('登录成功！', {
        duration: 2000,
        position: 'top-center',
      });
    }
    if (isError) {
      toast.error(error?.message || '登录失败', {
        duration: 2000,
        position: 'top-center',
      });
    }
  }, [isError, isSuccess, error]);
  return (
    <div>
      {isLoggedIn ? (
        <div className="w-8 h-8 bg-amber-300 rounded-full" />
      ) : (
        <Button onClick={handleClick} disabled={isPending}>
          {isPending ? '处理中...' : '签名登录'}
        </Button>
      )}
    </div>
  );
};
