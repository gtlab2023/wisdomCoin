import * as React from 'react';
import { cn } from '@/lib/utils';
// import { toast } from 'sonner';
import Image from 'next/image';

interface ImageUploadProps extends Omit<React.ComponentProps<'input'>, 'type'> {
  onImageChange?: (imageUrl: string) => void;
  preview?: boolean;
}

function ImageUpload({
  className,
  onImageChange,
  preview = true,
  ...props
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string>();
  const [isUploading, setIsUploading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || '上传失败');
      }

      // toast.success('图片上传成功');
      return data.url;
    } catch (error) {
      // toast.error('图片上传失败');
      console.error('图片上传失败:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        if (preview) {
          const url = URL.createObjectURL(file);
          setPreviewUrl(url);
        }

        const imageUrl = await uploadImage(file);
        onImageChange?.(imageUrl);
      } catch (error) {
        console.log(error);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(undefined);
        }
      }
    }
  };

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="relative w-40">
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
        disabled={isUploading}
        data-slot="image-upload"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className
        )}
        {...props}
      />
      {preview && previewUrl && (
        <div className="mt-2">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="max-h-40 rounded-md object-contain"
          />
        </div>
      )}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="text-sm text-muted-foreground">上传中...</div>
        </div>
      )}
    </div>
  );
}

export { ImageUpload };
