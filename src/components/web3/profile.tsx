'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TokenExchange } from './TokenExchange';
// 显示钱包状态和个人资料，下拉菜单
export function Profile() {
  return (
    <div className="flex">
      <div className="mr-2">
        <ConnectButton />
      </div>
      <TokenExchange />
    </div>
  );
}
