import { useWriteContract, useReadContract } from 'wagmi';
import { YiDengTokenABI } from '@/abi/YiDengToken';
import { parseEther } from 'viem';
import { YIDENG_TOKEN_ADDRESS } from '@/constants/contract';
import { useAccount } from 'wagmi';

export function useYiDengToken() {
  const { writeContract, status: writeStatus } = useWriteContract();
  const { address } = useAccount();

  // 查询用户余额
  const { data: balance } = useReadContract({
    address: YIDENG_TOKEN_ADDRESS,
    abi: YiDengTokenABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // 查询剩余可铸造数量
  const { data: remainingSupply } = useReadContract({
    address: YIDENG_TOKEN_ADDRESS,
    abi: YiDengTokenABI,
    functionName: 'remainingMintableSupply',
  });

  // 查询兑换比率
  const { data: tokensPerEth } = useReadContract({
    address: YIDENG_TOKEN_ADDRESS,
    abi: YiDengTokenABI,
    functionName: 'TOKENS_PER_ETH',
  });

  // 购买方法
  const handleBuy = async (ethAmount: string) => {
    try {
      await writeContract({
        address: YIDENG_TOKEN_ADDRESS,
        abi: YiDengTokenABI,
        functionName: 'buyWithETH',
        value: parseEther(ethAmount),
      });
    } catch (error) {
      console.error('Buy tokens failed:', error);
      throw error;
    }
  };

  // 卖出方法
  const handleSell = async (tokenAmount: string) => {
    try {
      await writeContract({
        address: YIDENG_TOKEN_ADDRESS,
        abi: YiDengTokenABI,
        functionName: 'sellTokens',
        args: [BigInt(tokenAmount)],
      });
    } catch (error) {
      console.error('Sell tokens failed:', error);
      throw error;
    }
  };

  return {
    buyTokens: handleBuy,
    sellTokens: handleSell,
    remainingSupply: remainingSupply ? Number(remainingSupply) : 0,
    tokensPerEth: tokensPerEth ? Number(tokensPerEth) : 0,
    balance: balance ? Number(balance) : 0,
    isPending: writeStatus === 'pending',
    isSuccess: writeStatus === 'success',
    isError: writeStatus === 'error',
  };
}
