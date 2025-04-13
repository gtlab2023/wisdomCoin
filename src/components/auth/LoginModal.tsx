import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            连接钱包
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-6">
          <p className="text-muted-foreground">请选择一个钱包进行连接</p>
          <ConnectButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
