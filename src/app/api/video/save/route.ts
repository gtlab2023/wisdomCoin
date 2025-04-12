import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export interface ICourseInfo {
  title: string;
  description: string;
  videoUrl: string;
  address: string;
  coverUrl: string;
  price: string;
}
export async function POST(request: Request) {
  try {
    const { title, description, videoUrl, address, coverUrl, price } =
      await request.json();

    // 数据验证
    if (!title || !videoUrl || !address || !coverUrl || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const video = await prisma.video.create({
      data: {
        title,
        description: description || '',
        url: videoUrl,
        coverUrl,
        price,
        authorAddress: address,
        author: {
          connect: {
            addresss: address,
          },
        },
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
