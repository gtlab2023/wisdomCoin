import * as React from 'react';
import { cn } from '@/lib/utils';

interface ImageUploadProps extends Omit<React.ComponentProps<'input'>, 'type'> {
  onImageChange?: (file: File) => void;
  preview?: boolean;
}

function ImageUpload({
  className,
  onImageChange,
  preview = true,
  ...props
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string>();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange?.(file);
      if (preview) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
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
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
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
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-40 rounded-md object-contain"
          />
        </div>
      )}
    </div>
  );
}

export { ImageUpload };
