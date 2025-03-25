'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { translations } from '@/lib/i18n/translations';

type TranslationKey = keyof typeof translations.en;

interface Testimonial {
  quote: TranslationKey;
  author: TranslationKey;
  position: TranslationKey;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'testimonials.quotes.1.text',
    author: 'testimonials.quotes.1.author',
    position: 'testimonials.quotes.1.position',
    image: 'https://picsum.photos/seed/sarah/64/64'
  },
  {
    quote: 'testimonials.quotes.2.text',
    author: 'testimonials.quotes.2.author',
    position: 'testimonials.quotes.2.position',
    image: 'https://picsum.photos/seed/michael/64/64'
  },
  {
    quote: 'testimonials.quotes.3.text',
    author: 'testimonials.quotes.3.author',
    position: 'testimonials.quotes.3.position',
    image: 'https://picsum.photos/seed/emma/64/64'
  }
];

export default function Testimonials() {
  const { t } = useTranslation();

  return (
    <section className="py-24 gradient-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#6B9B4E] sm:text-4xl">
            {t('testimonials.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('testimonials.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.quote} className="bg-white">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-gray-600 mb-6">{t(testimonial.quote)}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={t(testimonial.author)}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{t(testimonial.author)}</p>
                    <p className="text-sm text-gray-500">{t(testimonial.position)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}