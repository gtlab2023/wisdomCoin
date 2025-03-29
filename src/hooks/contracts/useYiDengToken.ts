import { useWriteContract, useReadContract } from 'wagmi';
import { YiDengTokenABI } from '@/abi/YiDengToken';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS } from '@/constants/contract';

export function useYiDengToken() {
  const { writeContract, status: writeStatus } = useWriteContract();

  // 查询剩余可铸造数量
  const { data: remainingSupply } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: YiDengTokenABI,
    functionName: 'remainingMintableSupply',
  });

  // 查询兑换比率
  const { data: tokensPerEth } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: YiDengTokenABI,
    functionName: 'TOKENS_PER_ETH',
  });

  // 购买方法
  const handleBuy = async (ethAmount: string) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
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
        address: CONTRACT_ADDRESS,
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
    isPending: writeStatus === 'pending',
    isSuccess: writeStatus === 'success',
    isError: writeStatus === 'error',
  };
}
