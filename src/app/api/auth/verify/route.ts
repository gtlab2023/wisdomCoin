import { verifyMessage } from 'ethers';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({
      success: false,
      message: '方法不允许',
    });
  }

  if (!JWT_SECRET) {
    return NextResponse.json({
      success: false,
      message: '服务器配置错误',
    });
  }

  try {
    const { address, message, signature } = await req.json();

    // 验证签名
    const recoveredAddress = verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({
        code: 401, // Unauthorized
        success: false,
        message: '签名验证失败',
      });
    }

    // 创建或更新用户
    const user = await prisma.user.upsert({
      where: { address: address },
      update: {},
      create: {
        address: address,
        username: `user_${address.toLowerCase().slice(2, 8)}`,
      },
    });

    // 生成 JWT token
    const token = jwt.sign(
      {
        address: address.toLowerCase(),
        userId: user.id,
        iat: Math.floor(Date.now() / 1000),
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      code: 200,
      success: true,
      token,
      address,
    });
  } catch (error) {
    console.error('验证错误:', error);
    return NextResponse.json({
      success: false,
      message: '服务器错误',
    });
  }
}
