import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import Header from '@/components/common/Header';
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gradient-to-r from-orange-100 to-rose-100">
        <h1 className="text-5xl font-bold mb-4">
          Unlock Knowledge, Earn Rewards
        </h1>
        <p className="text-lg mb-8 text-gray-600">
          Unlock tokens, points and NFTs while learning and contributing courses
          to earn rewards.
        </p>
        <Button size="lg" className="px-8">
          Join Now
        </Button>
      </section>

      {/* Offerings Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Our Offerings
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Crypto Rewards</CardTitle>
              <CardDescription className="text-gray-600">
                Earn crypto for contributing content and promoting the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl">
                ₿
              </div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>NFT Rewards</CardTitle>
              <CardDescription className="text-gray-600">
                Complete courses to receive unique NFT rewards.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl">
                🎨
              </div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Learn & Earn</CardTitle>
              <CardDescription className="text-gray-600">
                Watch videos and read articles to learn and earn simultaneously.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-4xl">
                📚
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Content
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="group cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-6xl">🔗</span>
              </div>
              <CardTitle className="text-xl mb-4 group-hover:text-blue-600 transition-colors">
                Blockchain Basics
              </CardTitle>
              <CardDescription className="text-gray-600">
                Discover the fundamentals of blockchain and its applications in
                various industries.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="group cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                <span className="text-6xl">💰</span>
              </div>
              <CardTitle className="text-xl mb-4 group-hover:text-blue-600 transition-colors">
                Decentralized Finance
              </CardTitle>
              <CardDescription className="text-gray-600">
                Explore the world of decentralized finance and how it is
                transforming the financial landscape.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">WisdomSeed</h3>
            <p className="text-gray-400">
              Empowering education with blockchain technology.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/rewards"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Rewards
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">Email: support@wisdomseed.com</p>
            <p className="text-gray-400">Phone: +1 234 567 890</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
