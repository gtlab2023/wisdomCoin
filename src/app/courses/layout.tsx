import Header from '@/components/common/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
