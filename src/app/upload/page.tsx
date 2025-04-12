'use client';

import React, { useState, useRef, useCallback } from 'react';

// IPFS视频上传组件
const IPFSVideoUploader = () => {
  // 状态管理
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [cid, setCid] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // 引用
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cidInputRef = useRef<HTMLInputElement>(null);

  // 文件大小验证
  const validateFileSize = (file: File) => {
    const maxSize = 10 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      setError('文件大小超过限制，请选择小于10MB的视频文件');
      return false;
    }
    return true;
  };

  // 禁止文件夹上传
  const validateFile = (file: File) => {
    if (file.type === '' || file.size === 160) {
      setError('请选择有效的视频文件');
      return false;
    }
    return true;
  };

  // 文件格式验证
  const validateFileType = (file: File) => {
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!validTypes.includes(file.type)) {
      setError('不支持的文件格式，请选择MP4, WebM或OGG格式的视频文件');
      return false;
    }
    return true;
  };

  // 文件选择处理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log('selectedFile: ', selectedFile);
    if (
      (selectedFile && !validateFileSize(selectedFile)) ||
      (selectedFile && !validateFileType(selectedFile)) ||
      (selectedFile && !validateFile(selectedFile))
    ) {
      setFile(null);
      setFileName('');
      return;
    }
    if (selectedFile && selectedFile.type.includes('video/')) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
      // 创建本地预览URL
      const objectUrl = URL.createObjectURL(selectedFile);
      setVideoUrl(objectUrl);
    } else if (selectedFile) {
      setError('请选择有效的视频文件');
    }
  };

  // 拖放处理
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files[0];

    if (
      (droppedFile && !validateFileSize(droppedFile)) ||
      (droppedFile && !validateFileType(droppedFile)) ||
      (droppedFile && !validateFile(droppedFile))
    ) {
      setFile(null);
      setFileName('');
      return;
    }

    if (droppedFile && droppedFile.type.includes('video/')) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setError('');
      // 创建本地预览URL
      const objectUrl = URL.createObjectURL(droppedFile);
      setVideoUrl(objectUrl);
    } else if (droppedFile) {
      setError('请选择有效的视频文件');
    }
  }, []);

  // 拖放事件处理
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // 上传到IPFS
  const uploadToIPFS = async () => {
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);
      setError('');

      // 实际上传文件
      console.log('开始上传到IPFS...');
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/video', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '上传失败');
      }
      console.log('data: ', data);
      setCid(data.ipfsHash);

      console.log('上传成功，CID:', data.ipfsHash);
      setIsSuccess(true);
    } catch (err) {
      console.error('上传到IPFS时出错:', err);
      if (err instanceof Error) {
        setError(`上传失败: ${err.message}`);
      } else {
        setError('上传失败: 未知错误');
      }
    } finally {
      setIsUploading(true); // 保持进度条显示
    }
  };

  // 重置上传状态
  const resetUpload = () => {
    setFile(null);
    setFileName('');
    setIsUploading(false);
    setUploadProgress(0);
    setCid('');
    setIsSuccess(false);
    setError('');

    // 清理之前创建的对象URL
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
      setVideoUrl('');
    }

    // 重置文件输入
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 复制CID到剪贴板
  const copyCidToClipboard = () => {
    if (cidInputRef.current) {
      cidInputRef.current.select();
      document.execCommand('copy');
      // 也可以使用现代API: navigator.clipboard.writeText(cid)

      // 给用户一些视觉反馈
      const button = document.getElementById('copyButton');
      if (button) {
        setTimeout(() => {
          const originalText = button.innerText;
          button.innerText = '已复制!';
          setTimeout(() => {
            button.innerText = originalText;
          }, 2000);
        }, 2000);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          IPFS视频上传
        </h1>

        {!isSuccess ? (
          <div className="mb-8">
            {/* 上传区域 */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                file ? 'border-green-300 bg-green-50' : 'border-gray-300'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragOver}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="video/*"
                className="hidden"
                id="videoFile"
              />

              {!file ? (
                <label htmlFor="videoFile" className="cursor-pointer block">
                  <div className="text-gray-500 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">
                    点击或拖放视频文件到此处
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    支持MP4, WebM等格式
                  </p>
                </label>
              ) : (
                <div>
                  <div className="text-green-500 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">已选择文件</p>
                  <p className="text-gray-600 text-sm mt-1 break-all">
                    {fileName}
                  </p>

                  {/* 预览视频 */}
                  {videoUrl && (
                    <div className="mt-4 rounded-lg overflow-hidden bg-black">
                      <video
                        src={videoUrl}
                        controls
                        className="w-full h-auto max-h-56"
                        preload="metadata"
                      >
                        您的浏览器不支持视频标签
                      </video>
                    </div>
                  )}

                  <button
                    className="mt-4 text-sm text-red-600 hover:text-red-800"
                    onClick={resetUpload}
                  >
                    选择其他文件
                  </button>
                </div>
              )}
            </div>

            {/* 错误消息 */}
            {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}

            {/* 上传进度 */}
            {isUploading && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>上传进度</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* 上传按钮 */}
            <button
              className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition ${
                file && !isUploading
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={uploadToIPFS}
              disabled={!file || isUploading}
            >
              {isUploading ? '上传中...' : '上传到IPFS'}
            </button>
          </div>
        ) : (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              上传成功
            </h2>

            {/* 视频播放器 */}
            <div className="mb-4 bg-black rounded-lg overflow-hidden">
              <video
                controls
                className="w-full h-auto"
                src={videoUrl}
                preload="metadata"
              >
                您的浏览器不支持视频标签
              </video>
            </div>

            {/* CID和链接 */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">内容标识符 (CID):</p>
              <div className="flex">
                <input
                  ref={cidInputRef}
                  type="text"
                  readOnly
                  className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  value={cid}
                />
                <button
                  id="copyButton"
                  className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium p-2.5 rounded-lg transition"
                  onClick={copyCidToClipboard}
                >
                  复制
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">IPFS链接:</p>
              <a
                href={`https://gateway.pinata.cloud/ipfs/${cid}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {`https://gateway.pinata.cloud/ipfs/${cid}`}
              </a>
            </div>

            <button
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-700 transition"
              onClick={resetUpload}
            >
              上传新视频
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IPFSVideoUploader;
