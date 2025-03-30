'use client';

import { useState } from 'react';
import { toast } from 'sonner';
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
// import { Textarea } from "@/components/ui/textarea";
import { useCourseMarket } from '@/hooks/contracts/useCourseMarket';

export function AddCourseDialog() {
  const [web2CourseId, setWeb2CourseId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const { addCourse, isPending } = useCourseMarket();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCourse(web2CourseId, name, BigInt(price));
      toast.success('课程添加成功');
    } catch (error) {
      toast.error('课程添加失败');
      console.error(error);
    }
  };

  return (
    <Dialog>
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
            <Input
              id="web2CourseId"
              value={web2CourseId}
              onChange={(e) => setWeb2CourseId(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              课程名称
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              课程价格
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="picture" className="text-right">
              上传图片
            </Label>
            <Input id="picture" type="file" className="col-span-3"></Input>
          </div>
          {/* <div>
            <Label id="describe">课程描述</Label>
            <Textarea placeholder="Type your message here." />
          </div> */}
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
