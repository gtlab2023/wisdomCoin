'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/ui/imageUpload';
import { useCourseMarket } from '@/hooks/contracts/useCourseMarket';
import axios from 'axios';
import { useAccount } from 'wagmi';

// 将表单验证schema移到组件外部
const courseSchema = z.object({
  web2CourseId: z.string().min(1, '课程ID是必填项'),
  name: z.string().min(1, '课程名称是必填项'),
  price: z.string().regex(/^\d+$/, '价格必须是数字').min(1, '课程价格是必填项'),
  description: z.string().min(1, '课程描述是必填项'),
  coverUrl: z.string().url('请输入有效的图片URL').min(1, '课程封面是必填项'),
});

type CourseForm = z.infer<typeof courseSchema>;

// 初始表单数据
const initialFormData: CourseForm = {
  web2CourseId: '',
  name: '',
  price: '',
  description: '',
  coverUrl: '',
};

// 表单字段配置
const formFields = [
  { id: 'web2CourseId', label: '课程ID', type: 'text' },
  { id: 'name', label: '课程名称', type: 'text' },
  { id: 'price', label: '课程价格', type: 'number' },
  { id: 'description', label: '课程描述', type: 'textarea' },
] as const;

export function AddCourseDialog() {
  const [open, setOpen] = useState(false);
  const { address } = useAccount();
  const [formData, setFormData] = useState<CourseForm>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CourseForm, string>>
  >({});
  const { addCourse, isPending } = useCourseMarket();

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleInputChange = (field: keyof CourseForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const saveToDB = async (validatedData: CourseForm) => {
    await axios.post('/api/video/save', {
      title: validatedData.name,
      description: validatedData.description,
      coverUrl: validatedData.coverUrl,
      videoUrl: validatedData.web2CourseId,
      address,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = courseSchema.parse(formData);

      try {
        // 调用合约
        await addCourse(
          validatedData.web2CourseId,
          validatedData.name,
          BigInt(validatedData.price)
        );

        // 保存到数据库
        await saveToDB(validatedData);

        toast.success('课程添加成功');
        setOpen(false);
        resetForm();
      } catch (error) {
        console.error('操作失败:', error);
        toast.error(error instanceof Error ? error.message : '操作失败');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce(
          (acc, err) => ({
            ...acc,
            [err.path[0]]: err.message,
          }),
          {}
        );
        setErrors(newErrors);
        toast.error('请检查表单填写是否正确');
      }
    }
  };

  const renderField = (field: (typeof formFields)[number]) => (
    <div key={field.id} className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={field.id} className="text-right">
        {field.label}
      </Label>
      <div className="col-span-3">
        {field.type === 'textarea' ? (
          <Textarea
            id={field.id}
            value={formData[field.id as keyof CourseForm]}
            onChange={(e) =>
              handleInputChange(field.id as keyof CourseForm, e.target.value)
            }
            className={
              errors[field.id as keyof CourseForm] ? 'border-red-500' : ''
            }
            placeholder={`请输入${field.label}`}
          />
        ) : (
          <Input
            id={field.id}
            type={field.type}
            value={formData[field.id as keyof CourseForm]}
            onChange={(e) =>
              handleInputChange(field.id as keyof CourseForm, e.target.value)
            }
            className={
              errors[field.id as keyof CourseForm] ? 'border-red-500' : ''
            }
          />
        )}
        {errors[field.id as keyof CourseForm] && (
          <p className="text-red-500 text-sm mt-1">
            {errors[field.id as keyof CourseForm]}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" disabled={!address}>
          添加课程
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>添加课程</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {formFields.map(renderField)}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="picture" className="text-right">
              上传图片
            </Label>
            <div className="col-span-3">
              <ImageUpload
                className={errors.coverUrl ? 'border-red-500' : ''}
                onImageChange={(imageUrl) =>
                  handleInputChange('coverUrl', imageUrl)
                }
              />
              {errors.coverUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.coverUrl}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? '添加中...' : '添加'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
