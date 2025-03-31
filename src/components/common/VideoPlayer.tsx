import { useState, useRef } from 'react';
import VideoPlayerProps from '@/interfaces/videoPlayerProps';
export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null); // 创建 ref
  // 这里假设视频URL是通过videoId生成的
  // const videoUrl = `/api/video/${videoId}`; // 替换为实际的视频URL
  const videoUrl =
    'https://videos.pexels.com/video-files/30457635/13052885_1906_1080_30fps.mp4';
  return (
    <div className="w-full">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef} // 绑定 ref
          className="w-full h-full"
          controls
          controlslist="nodownload"
          src={videoUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          您的浏览器不支持视频播放
        </video>
      </div>

      {/* 播放控制 */}
      <div className="mt-4 flex justify-between items-center">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => {
            if (videoRef.current) {
              if (isPlaying) {
                videoRef.current.pause();
              } else {
                videoRef.current.play();
              }
            }
          }}
        >
          {isPlaying ? '暂停' : '播放'}
        </button>
        <div className="text-gray-600">视频ID: {videoId}</div>
      </div>
    </div>
  );
}
