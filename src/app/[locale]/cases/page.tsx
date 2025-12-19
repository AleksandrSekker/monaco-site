import { Suspense } from 'react';
import CasesSection from '@/components/sections/CasesSection';
import { CasesSkeleton } from '@/components/ui/skeletons';

export default function CasesPage() {
  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <Suspense fallback={<CasesSkeleton />}>
          <CasesSection />
        </Suspense>
      </div>
    </div>
  );
}
