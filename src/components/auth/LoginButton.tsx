import { useSignLogin } from '@/hooks/contracts/useSignLogin';
import { Button } from '@/components/ui/button';

export const LoginButton = () => {
  const { signLogin, loading, isSuccess, isError, error } = useSignLogin();

  const handleClick = async () => {
    try {
      await signLogin();
    } catch (error) {
      console.error('登录失败:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleClick} disabled={loading}>
        {loading ? '处理中...' : '签名登录'}
      </Button>

      {isSuccess && <p className="text-green-500 mt-2">登录成功！</p>}
      {isError && (
        <p className="text-red-500 mt-2">{error?.message || '登录失败'}</p>
      )}
    </div>
  );
};
