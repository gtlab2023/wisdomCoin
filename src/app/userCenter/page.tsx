'use client';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginModal from '@/components/auth/LoginModal';
import { FiUpload, FiBook, FiGrid, FiLock } from 'react-icons/fi';

const UserCenter = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { address, isConnected } = useAccount();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">个人中心</h1>
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">
            请先连接钱包以访问个人中心
          </p>
          <Button size="lg" onClick={() => setIsLoginModalOpen(true)}>
            一键登录
          </Button>
        </div>
        <LoginModal
          open={isLoginModalOpen}
          onOpenChange={setIsLoginModalOpen}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">个人中心</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">当前钱包：</span>
          <span className="font-mono">{formatAddress(address!)}</span>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FiUpload /> 我的内容
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <FiBook /> 学习记录
          </TabsTrigger>
          <TabsTrigger value="assets" className="flex items-center gap-2">
            <FiGrid /> NFT & 通证
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <FiLock /> 权限管理
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">已上传内容</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 这里添加内容列表组件 */}
              <div className="text-muted-foreground">暂无上传内容</div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="learning">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">学习记录</h2>
            <div className="space-y-4">
              {/* 这里添加学习记录列表组件 */}
              <div className="text-muted-foreground">暂无学习记录</div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="assets">
          <div className="grid gap-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">NFT 资产</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* 这里添加 NFT 展示组件 */}
                <div className="text-muted-foreground">暂无 NFT 资产</div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">通证余额</h2>
              <div className="space-y-4">
                {/* 这里添加通证余额组件 */}
                <div className="text-muted-foreground">暂无通证</div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">权限管理</h2>
            <div className="space-y-4">
              {/* 这里添加权限管理组件 */}
              <div className="text-muted-foreground">暂无特殊权限</div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserCenter;
