'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import headerNavLinks from '@/config/headerNavLinks';
import { Profile } from '@/components/web3/profile';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between p-6">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">WisdomSeed</span>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        {headerNavLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="text-sm font-medium"
          >
            {link.title}
          </Link>
        ))}
      </div>
      {pathname === '/' ? (
        <Button variant="default" onClick={() => router.push('/courses')}>
          Get Started
        </Button>
      ) : (
        <Profile />
      )}
    </nav>
  );
}
