import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 获取所有视频
export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      include: {
        author: {
          select: {
            username: true,
            addresss: true,
          },
        },
      },
      orderBy: {
        uploadedAt: 'desc',
      },
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    return NextResponse.json({ error: '获取视频列表失败' }, { status: 500 });
  }
}
