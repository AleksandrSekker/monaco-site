'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiArrowUp } from 'react-icons/fi';
import { Case } from '@/lib/sanity/types';
import Image from 'next/image';
import { RoundedImage } from '@/components/ui/RoundedImage';
import { getLocalizedString } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import React from 'react';

const backdrop: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const modal: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 400,
    },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseItem: Case | null;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  locale?: string;
}

export function CaseStudyModal({
  isOpen: externalIsOpen = false,
  onClose: externalOnClose,
  caseItem,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  locale = 'en',
}: CaseStudyModalProps) {
  // State hooks at the top
  const [imageLoading, setImageLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = externalOnClose !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalOpen;

  // Handle close with useCallback to prevent unnecessary re-renders
  const handleClose = useCallback(() => {
    if (isControlled && externalOnClose) {
      externalOnClose();
    } else {
      setInternalOpen(false);
    }
  }, [isControlled, externalOnClose]);

  // Handle escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  // Handle scroll to show back to top button
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  // Handle click outside to close
  const handleClickOutside = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose],
  );

  // Don't render anything if not open or no case item
  if (!isOpen || !caseItem) return null;

  interface PortableTextImageValue {
    _type: 'image';
    asset?: {
      _ref: string;
      _type: 'reference';
      url?: string;
    };
    alt?: string;
    caption?: string;
  }

  const portableTextComponents = {
    block: {
      normal: ({ children }: { children?: React.ReactNode }) => <p className="mb-4 text-gray-700">{children}</p>,
      h2: ({ children }: { children?: React.ReactNode }) => (
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>
      ),
      h3: ({ children }: { children?: React.ReactNode }) => (
        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{children}</h3>
      ),
      blockquote: ({ children }: { children?: React.ReactNode }) => (
        <blockquote className="border-l-4 border-red-500 pl-4 italic my-4 text-gray-600">{children}</blockquote>
      ),
    },
    marks: {
      strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-semibold">{children}</strong>,
      em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
    },
    types: {
      image: ({ value }: { value: PortableTextImageValue }) => (
        <div className="my-6">
          {value.asset?.url ? (
            <div className="relative w-full h-96">
              <Image
                src={value.asset.url}
                alt={value.alt || 'Case study image'}
                className="rounded-lg shadow-md object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                priority={false}
              />
            </div>
          ) : null}
          {value.caption && <p className="text-sm text-gray-500 mt-2 text-center">{value.caption}</p>}
        </div>
      ),
    },
  };

  const renderContent = () => {
    // First check if we have longtext content
    if (caseItem?.longtext) {
      try {
        // Get the content for the current locale, fallback to English, then any available content
        const localizedContent =
          caseItem.longtext[locale as keyof typeof caseItem.longtext] ||
          caseItem.longtext.en ||
          caseItem.longtext.fr ||
          caseItem.longtext.ru;

        if (localizedContent && Array.isArray(localizedContent) && localizedContent.length > 0) {
          return <PortableText value={localizedContent} components={portableTextComponents} />;
        }
      } catch (error) {
        console.error('Error rendering longtext content:', error);
      }
    }

    // Only check content if longtext is not available
    if (!caseItem?.longtext && caseItem?.content && Array.isArray(caseItem.content) && caseItem.content.length > 0) {
      return (
        <div className="space-y-4">
          {caseItem.content.map((block, i) => {
            if (block?._type === 'block' && block.children?.[0]?.text) {
              return (
                <div key={i} className="mb-4">
                  {block.children.map((child, childIndex) => (
                    <p key={childIndex} className="text-gray-700">
                      {child.text}
                    </p>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      );
    }

    // If we have a description, show that as a fallback
    if (caseItem?.description) {
      // Check if description is a string or a localized object
      if (typeof caseItem.description === 'string') {
        return <p className="text-gray-700">{caseItem.description}</p>;
      } else {
        const description = getLocalizedString(caseItem.description, locale);
        if (description) {
          return <p className="text-gray-700">{description}</p>;
        }
      }
    }

    // Last resort: show a message that content is being prepared
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 italic">Content is being prepared. Please check back soon.</p>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto modal-content"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={backdrop}
        onClick={handleClickOutside}
      >
        <div className="min-h-screen p-4 flex items-center justify-center">
          <motion.div
            className="relative w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
              <button
                onClick={externalOnClose}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors p-2 -ml-2"
              >
                <FiChevronLeft className="mr-1" /> Back
              </button>
              <h2 className="text-xl font-bold text-gray-900 px-4 text-center flex-1">
                {getLocalizedString(caseItem.title, locale)}
              </h2>
              <button
                onClick={externalOnClose}
                className="text-gray-400 hover:text-gray-500 transition-colors p-2 -mr-2"
                aria-label="Close"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {caseItem.featuredImage && (
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                  {imageLoading && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
                  <RoundedImage
                    src={caseItem.featuredImage.url}
                    alt={getLocalizedString(caseItem.title, locale) || 'Case study'}
                    className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                    variant="service"
                    placeholder="blur"
                    blurDataURL={caseItem.featuredImage.lqip}
                    onLoad={() => setImageLoading(false)}
                  />
                </div>
              )}

              {caseItem.description && (
                <p className="text-lg text-gray-700 mb-6">{getLocalizedString(caseItem.description, locale)}</p>
              )}

              {renderContent()}

              {caseItem.result && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Results</h3>
                  <p className="text-gray-700">{caseItem.result}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-4 border-t border-gray-200">
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  hasPrev ? 'text-red-600 hover:bg-red-50' : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <FiChevronLeft className="mr-1" /> Previous
              </button>

              <button
                onClick={onNext}
                disabled={!hasNext}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  hasNext ? 'text-red-600 hover:bg-red-50' : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                Next <FiChevronRight className="ml-1" />
              </button>
            </div>
          </motion.div>
        </div>

        {showBackToTop && (
          <button
            onClick={externalOnClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <FiArrowUp className="w-5 h-5" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
