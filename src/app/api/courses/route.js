// app/api/courses/route.js
import mockCourses from '../../mock/courses.js';

export async function GET() {
  return new Response(JSON.stringify(mockCourses['GET /api/courses']), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
