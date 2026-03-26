export default function PackageList({ packages, selectedPackageSlug, setSelectedPackageSlug, handleEditClick, handleDeleteClick }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-12 text-center">Select</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Package</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Destination</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {packages.map((pkg) => (
              <tr 
                key={pkg.slug} 
                onClick={() => setSelectedPackageSlug(pkg.slug)}
                className={`transition-colors cursor-pointer ${selectedPackageSlug === pkg.slug ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
              >
                <td className="px-6 py-4 text-center">
                  <input 
                    type="radio" 
                    name="packageSelect" 
                    className="w-4 h-4 text-black focus:ring-black cursor-pointer"
                    checked={selectedPackageSlug === pkg.slug}
                    onChange={() => setSelectedPackageSlug(pkg.slug)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{pkg.title}</div>
                  <div className="text-sm text-gray-500">{pkg.category}</div>
                </td>
                <td className="px-6 py-4 text-gray-700">{pkg.destination}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(pkg);
                      }}
                      className="text-white bg-black hover:bg-gray-800 px-4 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(pkg);
                      }}
                      className="text-white bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
