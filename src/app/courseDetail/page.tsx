'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LessonCourse, SeriesCourse } from '@/interfaces/courses';
import VideoPlayer from '@/components/common/VideoPlayer';
// 模拟API获取课程数据
async function fetchCourse(id: string): Promise<LessonCourse | SeriesCourse> {
  // 这里应该是你的API调用
  return {
    id: id,
    title: 'React高级教程',
    description: '深入学习React的最佳实践',
    coverImage: '/images/course-cover.jpg',
    duration: 120,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: 'John Doe',
    tags: ['React', 'Frontend', 'JavaScript'],
    type: 'lesson',
  } as LessonCourse;
}
export default function CourseDetail() {
  const searchParams = useSearchParams(); // 获取 URL 查询参数对象
  const id = searchParams.get('id') || null;
  const [course, setCourse] = useState<LessonCourse | SeriesCourse | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const loadCourse = async () => {
        setLoading(true);
        const courseData = await fetchCourse(id as string);
        setCourse(courseData);
        setLoading(false);
      };
      loadCourse();
    }
  }, [id]);

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

          {/* 如果是系列课程，显示课时列表 */}
          {course.type === 'series' && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">课时列表</h2>
              <ul className="space-y-2">
                {(course as SeriesCourse).lessons.map((lesson) => (
                  <li
                    key={lesson.id}
                    className="p-3 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                    onClick={() => router.push(`/courses/${lesson.id}`)}
                  >
                    {lesson.title} - {lesson.duration}分钟
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 右侧信息栏 */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg sticky top-4">
            <img
              src={course.coverImage}
              alt={course.title}
              className="w-full rounded mb-4"
            />
            <div className="space-y-4">
              <div>
                <span className="font-semibold">时长：</span>
                {course.duration}分钟
              </div>
              <div>
                <span className="font-semibold">作者：</span>
                {course.author}
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
