'use client';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { LessonCourse } from '@/interfaces/courses';

interface LessonCourseCardProps {
  lesson: LessonCourse;
}

export default function LessonCourseCard({ lesson }: LessonCourseCardProps) {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="aspect-video mb-4 bg-gray-100 rounded-lg overflow-hidden relative">
          <Image
            src="/placeholder.jpg"
            alt="Course thumbnail"
            fill
            className="object-cover"
          />
        </div>
        <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors">
          {lesson.title}
        </CardTitle>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <span className="text-sm text-gray-600">{lesson.author}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mx-2">·</span>
          <span>4</span>
          <span className="mx-2">·</span>
        </div>
      </CardContent>
    </Card>
  );
}
