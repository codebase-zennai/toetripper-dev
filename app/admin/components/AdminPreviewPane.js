import PackagesCard from '../../packages/components/PackagesCard';

export default function AdminPreviewPane({ previewPackage }) {
  if (previewPackage) {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <h4>Preview</h4>
        </div>
        <div className="w-full">
          <PackagesCard
            title={previewPackage.title}
            description={previewPackage.description}
            imageSrc={previewPackage.imageSrc || '/image.png'}
            href={previewPackage.href || '#'}
            destination={previewPackage.destination}
            cost={previewPackage.cost}
            duration={previewPackage.duration}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 border-dashed text-center text-gray-500 flex flex-col items-center justify-center min-h-[300px]">
      <svg className="w-12 h-12 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      <p className="font-medium text-gray-600">No package selected</p>
      <p className="text-sm mt-1">Select a radio button to view preview</p>
    </div>
  );
}
