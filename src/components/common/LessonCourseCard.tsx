'use client';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LessonCourse } from '@/interfaces/courses';

interface LessonCourseCardProps {
  lesson: LessonCourse;
}

export default function LessonCourseCard({ lesson }: LessonCourseCardProps) {
  const router = useRouter();
  console.log('lesson -=', lesson);
  function handleClick(lesson: LessonCourse) {
    router.push(`/courseDetail?id=${lesson.id ? lesson.id : 123}`);
  }
  return (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => handleClick(lesson)}
    >
      <CardContent className="p-4">
        <div className="aspect-video mb-4 bg-gray-100 rounded-lg overflow-hidden relative">
          <Image
            src={lesson.coverUrl}
            width={500}
            height={500}
            alt="Course thumbnail"
            className="object-cover"
          />
        </div>
        <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors">
          {lesson.title}
        </CardTitle>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <span className="text-sm text-gray-600">
            {lesson.author!.username}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>{lesson.description}</span>
        </div>
      </CardContent>
    </Card>
  );
}
