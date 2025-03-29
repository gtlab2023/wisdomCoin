'use client';

import { useState } from 'react';
import { useYiDengToken } from '@/hooks/contracts/useYiDengToken';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function TokenExchange() {
  const [ethAmount, setEthAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const { buyTokens, sellTokens, remainingSupply, tokensPerEth, isPending } =
    useYiDengToken();

  const handleBuy = async () => {
    try {
      await buyTokens(ethAmount);
      setEthAmount('');
    } catch (error) {
      console.error('Buy failed:', error);
    }
  };

  const handleSell = async () => {
    try {
      await sellTokens(tokenAmount);
      setTokenAmount('');
    } catch (error) {
      console.error('Sell failed:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          代币交易
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>代币交易</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">购买代币</h2>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={ethAmount}
                  onChange={(e) => setEthAmount(e.target.value)}
                  placeholder="输入 ETH 数量"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  onClick={handleBuy}
                  disabled={isPending}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  {isPending ? '购买中...' : '购买'}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">卖出代币</h2>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  placeholder="输入代币数量"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  onClick={handleSell}
                  disabled={isPending}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  {isPending ? '卖出中...' : '卖出'}
                </button>
              </div>
            </div>

            <div className="space-y-1 text-sm text-muted-foreground">
              <p>剩余可铸造数量: {remainingSupply}</p>
              <p>兑换比率: 1 ETH = {tokensPerEth} YD</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
