'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LessonCourse } from '@/interfaces/courses';
import VideoPlayer from '@/components/common/VideoPlayer';
import Image from 'next/image';

interface CourseDetailClientProps {
  fetchCourse: (id: string) => Promise<LessonCourse>;
}

export default function CourseDetailClient({
  fetchCourse,
}: CourseDetailClientProps) {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || null;
  const [course, setCourse] = useState<LessonCourse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const loadCourse = async () => {
        setLoading(true);
        try {
          const courseData = await fetchCourse(id as string);
          setCourse(courseData);
        } catch (error) {
          console.error('Error loading course:', error);
        } finally {
          setLoading(false);
        }
      };
      loadCourse();
    }
  }, [id, fetchCourse]);

  if (loading) return <div>加载中...</div>;
  if (!course) return <div>课程不存在</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 左侧课程信息 */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

          {/* 视频播放器 */}
          {course.type === 'lesson' && <VideoPlayer videoId={course.id} />}

          {/* 课程描述 */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">课程描述</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>
        </div>

        {/* 右侧信息栏 */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg sticky top-4">
            <Image
              src={course.coverUrl}
              alt={course.title}
              className="w-full rounded mb-4"
              width={400}
              height={225}
            />
            <div className="space-y-4">
              <div>
                <span className="font-semibold">时长：</span>
                {course.duration}分钟
              </div>
              <div>
                <span className="font-semibold">作者：</span>
                {course.author.username}
              </div>
              <div>
                <span className="font-semibold">标签：</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-semibold">更新时间：</span>
                {course.updatedAt.toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
