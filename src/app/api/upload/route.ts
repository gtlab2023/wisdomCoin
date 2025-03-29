import { NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 获取上传的文件
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: '没有找到文件' }, { status: 400 });
    }

    // 将文件转换为 Buffer
    if (!(file instanceof File)) {
      return NextResponse.json({ error: '上传的文件无效' }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());

    // 创建 Pinata 所需的 form-data
    const pinataFormData = new FormData();
    pinataFormData.append('file', buffer, {
      filename: file.name,
      contentType: file.type,
    });

    // 可选：添加元数据
    const metadata = JSON.stringify({
      name: file.name,
    });
    pinataFormData.append('pinataMetadata', metadata);

    // 调用 Pinata API
    const pinataResponse = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      pinataFormData,
      {
        maxBodyLength: Infinity,
        headers: {
          ...pinataFormData.getHeaders(),
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },
      }
    );

    // 返回 Pinata 的响应
    return NextResponse.json({
      success: true,
      ipfsHash: pinataResponse.data.IpfsHash,
      pinataUrl: `https://gateway.pinata.cloud/ipfs/${pinataResponse.data.IpfsHash}`,
    });
  } catch (error) {
    console.error('上传到 Pinata 失败:', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json(
      { error: '上传失败', details: errorMessage },
      { status: 500 }
    );
  }
}

// 如果使用 Pages Router，需要配置以接受大文件
export const config = {
  api: {
    bodyParser: false,
  },
};
