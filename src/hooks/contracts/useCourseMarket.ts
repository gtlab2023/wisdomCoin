import { useWriteContract, useReadContract } from 'wagmi';
import { CourseMarketABI } from '@/abi/CourseMarket';
import { COURSE_MARKET_ADDRESS } from '@/constants/contract';

export const useCourseCount = () => {
  const { data: courseCount } = useReadContract({
    address: COURSE_MARKET_ADDRESS,
    abi: CourseMarketABI,
    functionName: 'courseCount',
  });
  return courseCount ? Number(courseCount) : 0;
};

export const useCourseInfo = () => {
  const { data: courses } = useReadContract({
    address: COURSE_MARKET_ADDRESS,
    abi: CourseMarketABI,
    functionName: 'courses',
  });
  return courses;
};

export const useCheckCourse = (userAddress: string, web2CourseId: string) => {
  const { data: isHas } = useReadContract({
    address: COURSE_MARKET_ADDRESS,
    abi: CourseMarketABI,
    functionName: 'hasCourse',
    args: [userAddress, web2CourseId],
  });
  return isHas;
};
export function useCourseMarket() {
  const { writeContract, status: writeStatus } = useWriteContract();

  // 购买课程
  const handlePurchase = async (web2CourseId: string) => {
    try {
      await writeContract({
        address: COURSE_MARKET_ADDRESS,
        abi: CourseMarketABI,
        functionName: 'purchaseCourse',
        args: [web2CourseId],
      });
    } catch (error) {
      console.error('Purchase course failed:', error);
      throw error;
    }
  };

  // 添加课程（仅管理员）
  const handleAddCourse = async (
    web2CourseId: string,
    name: string,
    price: bigint
  ) => {
    try {
      await writeContract({
        address: COURSE_MARKET_ADDRESS,
        abi: CourseMarketABI,
        functionName: 'addCourse',
        args: [web2CourseId, name, price],
      });
    } catch (error) {
      console.error('Add course failed:', error);
      throw error;
    }
  };

  return {
    purchaseCourse: handlePurchase,
    addCourse: handleAddCourse,
    isPending: writeStatus === 'pending',
    isSuccess: writeStatus === 'success',
    isError: writeStatus === 'error',
  };
}
