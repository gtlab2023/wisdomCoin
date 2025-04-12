'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TokenExchange } from './TokenExchange';
import { useYiDengToken } from '@/hooks/contracts/useYiDengToken';
import { Coins } from 'lucide-react';
import { LoginButton } from '@/components/auth/LoginButton';
// 显示钱包状态和个人资料，下拉菜单
export function Profile() {
  const { balance } = useYiDengToken();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white shadow-lg border border-gray-100">
        <Coins className="w-4 h-4 text-gray-900" />
        <span className="font-medium text-gray-900">{balance}</span>
        <span className="text-sm text-gray-500">YD</span>
      </div>
      <div className="mr-2">
        <ConnectButton />
      </div>
      <LoginButton />
      <TokenExchange />
    </div>
  );
}
