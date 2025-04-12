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

const courseSchema = z.object({
  web2CourseId: z.string().min(1, '课程ID是必填项'),
  name: z.string().min(1, '课程名称是必填项'),
  price: z.string().min(1, '课程价格是必填项'),
  description: z.string().min(1, '课程描述是必填项'),
  coverImage: z.string().min(1, '课程封面是必填项'),
});

type CourseForm = z.infer<typeof courseSchema>;

export function AddCourseDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CourseForm>({
    web2CourseId: '',
    name: '',
    price: '',
    description: '',
    coverImage: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CourseForm, string>>
  >({});
  const { addCourse, isPending } = useCourseMarket();

  const handleInputChange = (field: keyof CourseForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // 清除该字段的错误信息
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 验证表单数据
      const validatedData = courseSchema.parse(formData);

      // 调用合约添加课程
      await addCourse(
        validatedData.web2CourseId,
        validatedData.name,
        BigInt(validatedData.price)
      );

      // 保存到后端
      await axios.post('/api/video/save', validatedData);

      toast.success('课程添加成功');
      setOpen(false);
      // 重置表单
      setFormData({
        web2CourseId: '',
        name: '',
        price: '',
        description: '',
        coverImage: '',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // 处理验证错误
        const newErrors: Partial<Record<keyof CourseForm, string>> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof CourseForm;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
        toast.error('请填写所有必填项');
      } else {
        toast.error('课程添加失败');
        console.error(error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">添加课程</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>添加课程</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="web2CourseId" className="text-right">
              课程ID
            </Label>
            <div className="col-span-3">
              <Input
                id="web2CourseId"
                value={formData.web2CourseId}
                onChange={(e) =>
                  handleInputChange('web2CourseId', e.target.value)
                }
                className={errors.web2CourseId ? 'border-red-500' : ''}
              />
              {errors.web2CourseId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.web2CourseId}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              课程名称
            </Label>
            <div className="col-span-3">
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              课程价格
            </Label>
            <div className="col-span-3">
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="picture" className="text-right">
              上传图片
            </Label>
            <div className="col-span-3">
              <ImageUpload
                className={errors.coverImage ? 'border-red-500' : ''}
                onImageChange={async (imageUrl) => {
                  handleInputChange('coverImage', imageUrl);
                }}
              />
              {errors.coverImage && (
                <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              课程描述
            </Label>
            <div className="col-span-3">
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                className={errors.description ? 'border-red-500' : ''}
                placeholder="请输入课程描述"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
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
