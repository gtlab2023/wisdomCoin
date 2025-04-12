interface OfferingCard {
  title: string;
  gradient: string;
  icon: string;
}

interface FeaturedContent {
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

interface FooterLink {
  href: string;
  label: string;
}

interface FooterSection {
  title: string;
  content?: string;
  links?: FooterLink[];
  contact?: {
    email: string;
    phone: string;
  };
}

export const homeConfig = {
  websiteTitle: 'WisdomSeed',
  hero: {
    title: 'Unlock Knowledge, Earn Rewards',
    description:
      'Unlock tokens, points and NFTs while learning and contributing courses to earn rewards.',
    buttonText: 'Join Now',
  },
  offerings: {
    title: 'Explore Our Offerings',
    cards: [
      {
        title: 'cryptoRewards',
        icon: '₿',
        gradient: 'from-blue-500 to-purple-500',
      },
      {
        title: 'nftRewards',
        icon: '🎨',
        gradient: 'from-purple-500 to-pink-500',
      },
      {
        title: 'learnEarn',
        icon: '📚',
        gradient: 'from-green-500 to-teal-500',
      },
    ] as OfferingCard[],
  },
  featuredContent: {
    title: 'Featured Content',
    items: [
      {
        title: 'blockchain',

        icon: '🔗',
        gradient: 'from-blue-100 to-purple-100',
      },
      {
        title: 'defi',

        icon: '💰',
        gradient: 'from-purple-100 to-pink-100',
      },
    ] as FeaturedContent[],
  },
  footer: {
    sections: [
      {
        title: 'about',
      },
      {
        title: 'quickLinks',
        links: [
          { href: '/', label: 'home' },
          { href: '/courses', label: 'courses' },
          { href: '/articles', label: 'articles' },
          { href: '/rewards', label: 'rewards' },
        ],
      },
      {
        title: 'contact',
        contact: {
          email: 'support@wisdomseed.com',
          phone: '+1 234 567 890',
        },
      },
    ] as FooterSection[],
  },
};
