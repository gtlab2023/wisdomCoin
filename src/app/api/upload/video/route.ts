import { NextResponse } from 'next/server';
import { uploadToPinata } from '@/lib/uploadMethods';
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

    const res = await uploadToPinata(file);

    // 返回 Pinata 的响应
    return NextResponse.json(res, { status: 200 });
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
