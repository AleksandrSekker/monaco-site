'use client';

import { getProcessSteps } from '@/lib/sanity/utils';
import { ProcessStep } from '@/translations/process';
import { useEffect, useState } from 'react';
import { RoundedImage } from './ui/RoundedImage';
import { getLocalizedString } from '@/sanity/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from './ui';
import { processHeaders } from '@/translations/headers';

export default function ProcessSteps() {
  const { locale } = useLanguage();
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProcessSteps = async () => {
      try {
        const data = await getProcessSteps();
        setProcessSteps(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProcessSteps();
  }, [locale]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading process steps</div>;

  return (
    <section id="process" className="border-b border-slate-200 bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <PageHeader translations={processHeaders} className="pb-8" />

        <div className="grid gap-6 grid-cols-1 md:grid-cols-5">
          {processSteps.map((step, index) => (
            <div
              key={step._id}
              className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all hover:shadow-md w-full"
            >
              {/* Image */}
              {step.image?.asset?.url && (
                <div className="mb-3 h-12 w-12">
                  <RoundedImage
                    src={step.image.asset.url}
                    alt={getLocalizedString(step.title?.[locale as string], locale) || `Step ${index + 1}`}
                    size={48}
                    placeholder="blur"
                    blurDataURL={step.image.asset.metadata?.lqip}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}

              {/* Title and description */}
              <h3 className="mb-1 text-sm font-semibold text-slate-900">
                {step.title?.[locale as string] || `Step ${index + 1}`}
              </h3>
              <p className="text-xs text-slate-600">{step.description?.[locale as string] || ''}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
