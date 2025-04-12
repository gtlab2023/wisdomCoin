'use client';

import { useRouter } from 'next/navigation';
import { useTransition, useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GlobeIcon } from '@radix-ui/react-icons';

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [locale, setLocale] = useState('en');
  const handleLanguageChange = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    startTransition(() => {
      setLocale(newLocale);
      router.refresh();
    });
  };
  useEffect(() => {
    const savedLocale = document.cookie
      .split('; ')
      .find((row) => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1];
    console.log(savedLocale);
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

  return (
    <Select
      value={locale}
      onValueChange={handleLanguageChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[140px]">
        <GlobeIcon className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="zh-CN">中文</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
}
