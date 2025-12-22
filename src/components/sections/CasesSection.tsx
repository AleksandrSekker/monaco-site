'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { getCases } from '@/lib/sanity/utils';
import type { Case, LocaleString, LocaleText } from '@/lib/sanity/types';
import { RoundedImage } from '@/components/ui/RoundedImage';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { casesHeaders } from '@/translations/headers';
import { useLanguage } from '@/contexts/LanguageContext';

type LocalizedContent = LocaleString | LocaleText | string;

const caseItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -4,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
} as const;

function getLocalizedString(content: LocalizedContent, locale: string = 'en'): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if ('_type' in content && (content._type === 'localeString' || content._type === 'localeText')) {
    return content[locale] || content.en || '';
  }
  return '';
}

export default function CasesSection() {
  const router = useRouter();
  const pathname = usePathname();
  const [allCases, setAllCases] = useState<Case[]>([]);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { locale = 'en' } = useLanguage();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const ITEMS_PER_PAGE = 6;

  // Fetch cases
  const fetchCases = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCases(locale);
      setAllCases(data || []);
    } catch (err) {
      console.error('Error fetching cases:', err);
      setError(err instanceof Error ? err : new Error('Failed to load cases'));
    } finally {
      setIsLoading(false);
    }
  }, [locale]);

  // Fetch cases when component mounts
  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  // Set filtered cases
  useEffect(() => {
    const result = [...allCases];
    // Sort by newest by default
    result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    setFilteredCases(result);
  }, [allCases]);

  // Update URL with current page
  useEffect(() => {
    if (typeof window === 'undefined' || currentPage === 1) return;

    const newUrl = `${pathname}?page=${currentPage}`;
    router.replace(newUrl, { scroll: false });
  }, [currentPage, pathname, router]);

  // Handle case selection from URL
  useEffect(() => {
    const caseId = window.location.hash.replace('#', '');
    if (caseId) {
      const selected = allCases.find((c) => c._id === caseId);
      if (selected) setSelectedCase(selected);
    }
  }, [allCases]);

  // Get current items for pagination
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredCases.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCases.length / ITEMS_PER_PAGE);

  // Handle case selection
  const handleCaseSelect = useCallback((caseItem: Case): void => {
    setSelectedCase(caseItem);
    window.history.pushState({}, '', `#${caseItem._id}`);
  }, []); // No dependencies needed as it doesn't use any external values

  // Handle close modal
  const handleCloseModal = useCallback((): void => {
    setSelectedCase(null);
    if (pathname) {
      window.history.pushState({}, '', pathname);
    }
  }, [pathname]);

  // Navigate between cases in modal
  const navigateCase = useCallback(
    (direction: 'prev' | 'next'): void => {
      if (!selectedCase) return;

      const currentIndex = filteredCases.findIndex((c) => c._id === selectedCase._id);
      if (direction === 'next' && currentIndex < filteredCases.length - 1) {
        const newCase = filteredCases[currentIndex + 1];
        if (newCase) {
          setSelectedCase(newCase);
          window.history.pushState({}, '', `#${newCase._id}`);
        }
      } else if (direction === 'prev' && currentIndex > 0) {
        const newCase = filteredCases[currentIndex - 1];
        if (newCase) {
          setSelectedCase(newCase);
          window.history.pushState({}, '', `#${newCase._id}`);
        }
      }
    },
    [filteredCases, selectedCase], // Add dependencies
  );

  // Handle keyboard navigation in modal
  useEffect(() => {
    if (!selectedCase) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredCases.findIndex((c) => c._id === selectedCase._id);
        if (currentIndex < filteredCases.length - 1) {
          navigateCase('next');
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredCases.findIndex((c) => c._id === selectedCase._id);
        if (currentIndex > 0) {
          navigateCase('prev');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCase, filteredCases, navigateCase, handleCloseModal]);

  // Render case items
  const renderCaseItem = (caseItem: Case) => {
    const title = typeof caseItem.title === 'string' ? caseItem.title : getLocalizedString(caseItem.title, locale);
    const description = caseItem.description
      ? typeof caseItem.description === 'string'
        ? caseItem.description
        : getLocalizedString(caseItem.description, locale)
      : '';

    return (
      <div className="group">
        <motion.article
          key={caseItem._id}
          initial="hidden"
          animate="show"
          whileHover="hover"
          variants={caseItemVariants}
          custom={0}
          className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col"
          onClick={() => handleCaseSelect(caseItem)}
        >
          <div className="relative h-36 overflow-hidden p-4">
            {caseItem.featuredImage?.url && (
              <RoundedImage
                src={caseItem.featuredImage.url}
                alt={caseItem.featuredImage.alt || title || 'Case study image'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={caseItem.featuredImage.lqip}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-1.5 group-hover:text-red-600 transition-colors line-clamp-2">
              {title}
            </h3>

            {description && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>}
          </div>
        </motion.article>
      </div>
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {casesHeaders[locale as keyof typeof casesHeaders].title}
          </h1>
          <p className="text-lg text-gray-600">{casesHeaders[locale as keyof typeof casesHeaders].description || ''}</p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="text-center py-10">
            <p className="text-red-500">Error loading cases. Please try again.</p>
            <button onClick={fetchCases} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Retry
            </button>
          </div>
        )}

        {/* Cases Grid */}
        {!isLoading && !error && filteredCases.length > 0 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {currentItems.map((caseItem, index) => (
                  <motion.div
                    key={caseItem._id}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={caseItemVariants}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="h-full"
                  >
                    {renderCaseItem(caseItem)}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Show pages around current page
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg ${
                            currentPage === pageNum
                              ? 'bg-red-600 text-white'
                              : 'border border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Case Study Modal */}
        {selectedCase && (
          <CaseStudyModal
            isOpen={!!selectedCase}
            onClose={handleCloseModal}
            caseItem={selectedCase}
            onNext={() => navigateCase('next')}
            onPrev={() => navigateCase('prev')}
            hasNext={filteredCases.findIndex((c) => c._id === selectedCase._id) < filteredCases.length - 1}
            hasPrev={filteredCases.findIndex((c) => c._id === selectedCase._id) > 0}
            locale={locale}
          />
        )}
      </div>
    </section>
  );
}
