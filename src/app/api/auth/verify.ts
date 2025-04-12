import { ethers } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

interface VerifyRequest {
  address: string;
  message: string;
  signature: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: '方法不允许',
    });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: '服务器配置错误',
    });
  }

  try {
    const { address, message, signature } = req.body as VerifyRequest;

    // 验证签名
    const recoveredAddress = ethers.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({
        success: false,
        message: '签名验证失败',
      });
    }

    // 生成 JWT token
    const token = jwt.sign(
      {
        address: address.toLowerCase(),
        iat: Math.floor(Date.now() / 1000),
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      token,
      address,
    });
  } catch (error) {
    console.error('验证错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误',
    });
  }
}
