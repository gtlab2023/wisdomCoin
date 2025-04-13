import { useSignMessage, useAccount } from 'wagmi';
// import { useState } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export const useSignLogin = () => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { signMessageAsync, status, error } = useSignMessage();

  const handleVerification = async (message: string, signature: string) => {
    try {
      if (!address) return;

      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          message,
          signature,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || '验证失败');
      }

      // 保存 token
      if (data.token) {
        sessionStorage.setItem('auth_token', data.token);
      }

      return data;
    } catch (error) {
      console.error('验证失败:', error);
      throw error;
    } finally {
    }
  };

  const signLogin = async () => {
    if (!isConnected || !address) {
      openConnectModal?.();
      return;
    }
    try {
      const nonce = Math.floor(Math.random() * 1000000);
      const message = `登录验证\n\n地址: ${address}\n随机数: ${nonce}\n时间戳: ${Date.now()}`;

      // 调用签名方法
      const data = await signMessageAsync({ message });
      if (data) {
        // 验证签名
        const signature = data;
        const verificationResult = await handleVerification(message, signature);
        console.log('验证结果:', verificationResult);
      }
    } catch (error) {
      console.error('签名过程出错:', error);
      throw error;
    }
  };

  return {
    signLogin,
    error,
    isPending: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
};
