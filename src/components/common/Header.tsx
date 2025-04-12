'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import headerNavLinks from '@/config/headerNavLinks';
import { Profile } from '@/components/web3/profile';
import { AddCourseDialog } from '@/components/web3/AddCourseDialog';
import LanguageSwitcher from './LanguageSwitcher';
export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Index');
  const nav = useTranslations('Navigation');

  return (
    <nav className="flex items-center justify-between p-6">
      <div className="flex items-center space-x-2">
        <span className="text-3xl font-bold">{t('title')}</span>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        {headerNavLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="text-xl font-medium"
          >
            {nav(link.title.toLowerCase())}
          </Link>
        ))}
      </div>
      <div className="flex gap-4">
        <LanguageSwitcher />
        {pathname === '/' ? (
          <Button variant="default" onClick={() => router.push('/courses')}>
            {t('getStarted')}
          </Button>
        ) : (
          <>
            <Profile />
            <AddCourseDialog />
          </>
        )}
      </div>
    </nav>
  );
}
