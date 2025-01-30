'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, LineChart, Shield, Users } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { translations } from '@/lib/i18n/translations';

type TranslationKey = keyof typeof translations.en;

interface Benefit {
  title: TranslationKey;
  description: TranslationKey;
  icon: React.ElementType;
}

const benefits: Benefit[] = [
  {
    title: 'benefits.smart_banking.title',
    description: 'benefits.smart_banking.description',
    icon: Wallet,
  },
  {
    title: 'benefits.growth_analytics.title',
    description: 'benefits.growth_analytics.description',
    icon: LineChart,
  },
  {
    title: 'benefits.secure_platform.title',
    description: 'benefits.secure_platform.description',
    icon: Shield,
  },
  {
    title: 'benefits.expert_support.title',
    description: 'benefits.expert_support.description',
    icon: Users,
  },
];

export default function BenefitsGrid() {
  const { t } = useTranslation();

  return (
    <section className="py-24 gradient-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent sm:text-4xl">
            {t('benefits.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('benefits.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="card-hover border-none">
              <CardHeader>
                <div className="h-12 w-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{t(benefit.title)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t(benefit.description)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}