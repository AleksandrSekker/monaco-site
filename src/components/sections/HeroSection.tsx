'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getHero } from '@/lib/sanity/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { heroTranslations } from '@/translations/hero';

interface HeroImage {
  asset: {
    _ref: string;
    _type: 'reference';
    url: string;
  };
  alt?: string;
}

interface HeroData {
  desktopImage?: HeroImage;
  mobileImage?: HeroImage;
}

export default function HeroSection() {
  const { locale } = useLanguage();
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get translations for the current locale, fallback to English
  const t = heroTranslations[locale] || heroTranslations.en;
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await getHero();
        setHeroData({
          desktopImage: data?.desktopImage,
          mobileImage: data?.mobileImage,
        });
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (isLoading) {
    return <div className="min-h-[600px] bg-gray-100" />;
  }

  if (!heroData) {
    return <div className="min-h-[600px] bg-gray-100" />;
  }
  console.log('heroData.desktopImage?.asset?.url', heroData.desktopImage?.asset?.url);
  return (
    <section className="relative min-h-[600px] overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 ">
        {/* Desktop Background */}
        {heroData.desktopImage?.asset?.url && (
          <div className="hidden h-full w-full md:block relative">
            <div className="absolute inset-0 z-10" />
            <Image
              src={heroData.desktopImage.asset.url}
              alt={heroData.desktopImage.alt || 'Monaco Financial Solutions'}
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="100vw"
            />
          </div>
        )}

        {/* Mobile Background */}
        {heroData.mobileImage?.asset?.url ? (
          <div className="block h-full w-full md:hidden relative">
            <div className="absolute inset-0  z-10" />
            <Image
              src={heroData.mobileImage.asset.url}
              alt={heroData.mobileImage.alt || 'Monaco Financial Solutions'}
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="100vw"
            />
          </div>
        ) : (
          heroData.desktopImage?.asset?.url && (
            <div className="block h-full w-full md:hidden relative">
              <div className="absolute inset-0 bg-black/40 z-10" />
              <Image
                src={heroData.desktopImage.asset.url}
                alt={heroData.desktopImage.alt || 'Monaco Financial Solutions'}
                fill
                className="object-cover"
                priority
                quality={85}
                sizes="100vw"
              />
            </div>
          )
        )}
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-start lg:justify-between lg:py-24 lg:px-6">
        {/* Left column - Main content */}
        <div className="max-w-xl space-y-6">
          <p className="text-xs font-semibold tracking-[0.35em] text-white uppercase">{t.tagline}</p>
          <h1 className="text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.title}
            <span className="block text-red-600">{t.highlightedTitle}</span>
          </h1>
          <p className="text-lg leading-relaxed text-white">{t.description}</p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-red-600/30 hover:bg-red-700 transition-colors duration-200"
            >
              {t.cta}
            </a>

            <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                ✓
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-black">{t.guarantee.text}</span>
                <span className="text-[11px] text-black">{t.guarantee.subtext}</span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <p className="pt-4 text-sm text-white">{t.stats}</p>
        </div>

        {/* Right column - Card section */}
        <div className="w-full max-w-md lg:sticky lg:top-24 bg-white rounded-xl mt-5">
          <div className="rounded-xl p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-black">{t.card.title}</h3>
              <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400">
                {t.card.badge}
              </span>
            </div>
            <div className="space-y-4">
              {t.card.cases.map((item, index) => (
                <div key={index} className="border-t border-white/5 pt-4 first:border-0 first:pt-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-black">{item.client}</p>
                      <p className="text-sm text-black">{item.description}</p>
                    </div>
                    <span className={`text-sm text-${item.timeColor}`}>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-black">{t.card.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
