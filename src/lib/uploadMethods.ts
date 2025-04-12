import FormData from 'form-data';
import axios from 'axios';

// 上传到 Pinata 的方法
export async function uploadToPinata(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const pinataFormData = new FormData();
  pinataFormData.append('file', buffer, {
    filename: file.name,
    contentType: file.type,
  });

  const metadata = JSON.stringify({
    name: file.name,
  });
  pinataFormData.append('pinataMetadata', metadata);
  let response: { data: Record<string, string> } = { data: {} };
  try {
    response = await axios.post(
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
  } catch (error) {
    console.log(error);
  }

  if (!response.data.IpfsHash) {
    return {
      success: false,
      error: response.data,
    };
  }
  return {
    success: true,
    ipfsHash: response.data.IpfsHash,
    pinataUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
  };
}

// 上传到S3的方法
// todo: 这里的文件名生成逻辑可能需要根据实际需求进行调整
