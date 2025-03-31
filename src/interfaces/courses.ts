interface ICourse {
  title: string;
  description: string;
  coverImage: string;
  duration: number; // 课程时长（分钟）
  createdAt: Date;
  updatedAt: Date;
  author: string;
  tags: string[];
}
abstract class BaseCourse implements ICourse {
  title: string;
  description: string;
  coverImage: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  tags: string[];

  constructor(course: ICourse) {
    this.title = course.title;
    this.description = course.description;
    this.coverImage = course.coverImage;
    this.duration = course.duration;
    this.createdAt = course.createdAt;
    this.updatedAt = course.updatedAt;
    this.author = course.author;
    this.tags = course.tags;
  }
}

export class LessonCourse extends BaseCourse {
  belongSeriesId: string | undefined;
  type: string = 'lesson';
  id: string;
  constructor(course: ICourse & { seriesId?: string; id: string }) {
    super(course);
    this.belongSeriesId = course.seriesId;
    this.id = course.id;
  }
}

export class SeriesCourse extends BaseCourse {
  seriesId: string;
  type: string = 'series';
  lessons: LessonCourse[] = [];
  constructor(
    course: ICourse & { seriesId: string },
    lessons?: LessonCourse[]
  ) {
    super(course);
    this.seriesId = course.seriesId;
    this.lessons = lessons || [];
  }
}
