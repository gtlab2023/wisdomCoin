import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { title, description, url, address, coverUrl } = await request.json();

    // 数据验证
    if (!title || !url || !address || !coverUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const video = await prisma.video.create({
      data: {
        title,
        description: description || '',
        url,
        username: address, // 暂时使用 address 作为 username
        coverUrl,
        author: address, // 后续使用jwt获取
      },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Failed to save video:', error);
    return NextResponse.json(
      { error: 'Failed to save video' },
      { status: 500 }
    );
  }
}
