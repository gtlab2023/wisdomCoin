import { Suspense } from 'react';
import { LessonCourse } from '@/interfaces/courses';
import CourseDetailClient from './CourseDetailClient';

// 模拟API获取课程数据
async function fetchCourse(id: string): Promise<LessonCourse> {
  'use server';
  // 这里应该是你的API调用
  return {
    id: id,
    title: 'React高级教程',
    description: '深入学习React的最佳实践',
    coverUrl: '/images/course-cover.jpg',
    duration: 120,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      username: 'John Doe',
    },
    tags: ['React', 'Frontend', 'JavaScript'],
    type: 'lesson',
  } as LessonCourse;
}

export default function CourseDetail() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <CourseDetailClient fetchCourse={fetchCourse} />
    </Suspense>
  );
}
