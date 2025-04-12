'use client';

import { SeriesCourse } from '@/interfaces/courses';

interface SeriesCourseCardProps {
  serieCourse: SeriesCourse;
}

export default function SeriesCourseCard({
  serieCourse,
}: SeriesCourseCardProps) {
  return (
    <div className="relative h-[500px] bg-gradient-to-r from-orange-100 to-rose-100 p-12 max-w-screen-2xl mx-auto">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">{serieCourse.title}</h1>
        <div className="flex gap-2 mb-4">
          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
            {serieCourse.author.username}
          </span>
          {serieCourse.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
            已更新 {serieCourse.lessons.length} 集
          </span>
        </div>
        <p className="text-gray-600 mb-8 max-w-2xl">
          {serieCourse.description}
        </p>
        <div className="flex gap-4">
          <button className="bg-black text-white px-6 py-2 rounded-full">
            开始播放
          </button>
          <button className="border border-black px-6 py-2 rounded-full">
            {serieCourse.lessons[serieCourse.lessons.length - 1]?.title ||
              '暂无'}
          </button>
        </div>
      </div>
    </div>
  );
}
