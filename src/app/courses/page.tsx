'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { LessonCourse, SeriesCourse } from '@/interfaces/courses';
import SeriesCourseCard from '@/components/common/SeriesCourseCard';
import LessonCourseCard from '@/components/common/LessonCourseCard';
export default function Courses() {
  const oneSerieCourse = new SeriesCourse({
    title: '系列课1',
    author: 'yideng',
    description: '描述',
    duration: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
    coverImage: '',
    seriesId: '1',
  });
  const carouselCourses = [
    oneSerieCourse,
    Object.assign({}, oneSerieCourse, { seriesId: '2' }),
    Object.assign({}, oneSerieCourse, { seriesId: '3' }),
    Object.assign({}, oneSerieCourse, { seriesId: '4' }),
  ];
  const lesson = new LessonCourse({
    title: '课程1',
    author: 'yideng',
    description: '描述',
    duration: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
    coverImage: '',
    id: '1',
  });
  return (
    <div className="min-h-screen ">
      {/* Banner Section */}
      <section className="px-12">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            {carouselCourses.map((serieCourse) => (
              <CarouselItem key={serieCourse.seriesId}>
                <SeriesCourseCard serieCourse={serieCourse} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="  bg-white hover:bg-gray-100" />
          <CarouselNext className="  bg-white hover:bg-gray-100" />
        </Carousel>
      </section>

      {/* Latest Courses Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">最新推荐</h2>
            <button className="text-blue-600">更多分类</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <LessonCourseCard lesson={lesson} />
          </div>
        </div>
      </section>
    </div>
  );
}
