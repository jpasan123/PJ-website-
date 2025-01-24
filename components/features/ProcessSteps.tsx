'use client';

import { Check, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: 'Register',
    description: 'Create your business account in minutes',
  },
  {
    title: 'Verify',
    description: 'Complete digital verification process',
  },
  {
    title: 'Connect',
    description: 'Link your existing accounts',
  },
  {
    title: 'Start Banking',
    description: 'Access all digital banking features',
  },
];

const ProcessSteps = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Get Started in 4 Simple Steps
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Quick and easy setup process to transform your banking experience
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-center text-gray-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="absolute top-6 left-full h-6 w-6 text-gray-400 hidden md:block -translate-x-1/2" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;