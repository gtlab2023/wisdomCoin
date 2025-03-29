import Mock from 'mockjs';

const courses = Mock.mock({
  'list|5-10': [
    {
      id: '@guid',
      title: '课程@integer(1, 100)',
      author: '@name',
      description: '@paragraph(1, 3)',
      'duration|0-100': 0,
      createdAt: '@datetime',
      updatedAt: '@datetime',
      'tags|1-3': ['@word'],
      coverImage: '@image("200x200")',
    },
  ],
});

export default {
  'GET /api/courses': {
    status: 200,
    data: courses.list,
    message: 'success',
  },
};
