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
import { homeConfig } from '@/config/homeConfig';
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gradient-to-r from-orange-100 to-rose-100">
        <h1 className="text-5xl font-bold mb-4">{homeConfig.hero.title}</h1>
        <p className="text-lg mb-8 text-gray-600">
          {homeConfig.hero.description}
        </p>
        <Button size="lg" className="px-8">
          {homeConfig.hero.buttonText}
        </Button>
      </section>

      {/* Offerings Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {homeConfig.offerings.title}
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {homeConfig.offerings.cards.map((card, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`w-24 h-24 mx-auto bg-gradient-to-r ${card.gradient} rounded-full flex items-center justify-center text-white text-4xl`}
                >
                  {card.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          {homeConfig.featuredContent.title}
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {homeConfig.featuredContent.items.map((item, index) => (
            <Card
              key={index}
              className="group cursor-pointer hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div
                  className={`aspect-video mb-4 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center`}
                >
                  <span className="text-6xl">{item.icon}</span>
                </div>
                <CardTitle className="text-xl mb-4 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {homeConfig.footer.sections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              {section.content && (
                <p className="text-gray-400">{section.content}</p>
              )}
              {section.links && (
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {section.contact && (
                <>
                  <p className="text-gray-400">
                    Email: {section.contact.email}
                  </p>
                  <p className="text-gray-400">
                    Phone: {section.contact.phone}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
