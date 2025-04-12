import { useSignMessage, useAccount } from 'wagmi';
import { useState } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export const useSignLogin = () => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [loading, setLoading] = useState(false);

  const { signMessage, isSuccess, isError, error } = useSignMessage({
    onSuccess(signature, variables) {
      // 签名成功后的处理
      console.log('签名成功:', signature);
      console.log('签名消息:', variables.message);
      handleVerification(variables.message, signature);
    },
    onError(error) {
      console.error('签名失败:', error);
      setLoading(false);
    },
  });

  const handleVerification = async (message: string, signature: string) => {
    try {
      console.log('111ppp');
      if (!address) return;
      console.log('ppp');

      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          message,
          signature,
        }),
      });

      console.log('ppp111');
      const data = await response.json();
      console.log('ppp222');

      if (!data.success) {
        throw new Error(data.message || '验证失败');
      }

      // 保存 token
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }

      return data;
    } catch (error) {
      console.error('验证失败:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signLogin = async () => {
    if (!isConnected || !address) {
      openConnectModal?.();
      return;
    }
    try {
      setLoading(true);
      const nonce = Math.floor(Math.random() * 1000000);
      const message = `登录验证\n\n地址: ${address}\n随机数: ${nonce}\n时间戳: ${Date.now()}`;

      // 调用签名方法
      await signMessage({ message });
    } catch (error) {
      console.error('签名过程出错:', error);
      setLoading(false);
      throw error;
    }
  };

  return {
    signLogin,
    loading,
    isSuccess,
    isError,
    error,
  };
};
