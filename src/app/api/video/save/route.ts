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
    const existingUser = await prisma.user.findUnique({
      where: { address: address },
    });
    console.log('Existing user:', existingUser, address);
    // 确保用户存在，不存在则创建
    await prisma.user.upsert({
      where: { address: address }, // 修复 address 拼写
      update: {},
      create: {
        // 修复语法错误
        address: address,
        username: `user_${address.toLowerCase().slice(2, 8)}`, // 使用地址的前8位作为用户名
      },
    });

    const video = await prisma.video.create({
      data: {
        title,
        description: description || '',
        url: videoUrl,
        coverUrl,
        price,
        author: {
          connect: {
            address: address,
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
