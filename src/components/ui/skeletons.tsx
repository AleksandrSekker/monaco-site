export function CasesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
      ))}
    </div>
  );
}
