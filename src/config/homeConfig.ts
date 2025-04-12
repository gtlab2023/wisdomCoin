interface OfferingCard {
  title: string;
  description: string;
  icon: string;
  gradient: string;
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
        title: 'Crypto Rewards',
        description:
          'Earn crypto for contributing content and promoting the platform.',
        icon: '₿',
        gradient: 'from-blue-500 to-purple-500',
      },
      {
        title: 'NFT Rewards',
        description: 'Complete courses to receive unique NFT rewards.',
        icon: '🎨',
        gradient: 'from-purple-500 to-pink-500',
      },
      {
        title: 'Learn & Earn',
        description:
          'Watch videos and read articles to learn and earn simultaneously.',
        icon: '📚',
        gradient: 'from-green-500 to-teal-500',
      },
    ] as OfferingCard[],
  },
  featuredContent: {
    title: 'Featured Content',
    items: [
      {
        title: 'Blockchain Basics',
        description:
          'Discover the fundamentals of blockchain and its applications in various industries.',
        icon: '🔗',
        gradient: 'from-blue-100 to-purple-100',
      },
      {
        title: 'Decentralized Finance',
        description:
          'Explore the world of decentralized finance and how it is transforming the financial landscape.',
        icon: '💰',
        gradient: 'from-purple-100 to-pink-100',
      },
    ] as FeaturedContent[],
  },
  footer: {
    sections: [
      {
        title: 'WisdomSeed',
        content: 'Empowering education with blockchain technology.',
      },
      {
        title: 'Quick Links',
        links: [
          { href: '/', label: 'Home' },
          { href: '/courses', label: 'Courses' },
          { href: '/articles', label: 'Articles' },
          { href: '/rewards', label: 'Rewards' },
        ],
      },
      {
        title: 'Contact Us',
        contact: {
          email: 'support@wisdomseed.com',
          phone: '+1 234 567 890',
        },
      },
    ] as FooterSection[],
  },
};
