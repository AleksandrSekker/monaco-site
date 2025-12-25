'use client';

import { useRouter } from 'next/navigation';

export default function OfflinePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">You&apos;re Offline</h1>
        <p className="mb-8">Please check your internet connection and try again.</p>
        <button
          onClick={() => router.refresh()}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
