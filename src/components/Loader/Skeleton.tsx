const Skeleton = () => {
  return (
    <tbody className="animate-pulse">
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <tr key={i} className="hover:bg-gray-50">
            <th className="flex items-center gap-3 px-6 py-4 font-normal ">
              <div className="py-2 bg-gray-200 animate-pulse rounded-full">
                <div className="h-4 w-4 rounded-2xl ring-1 ring-purple-500 ring-offset-0 outline-0 bg-transparent text-transparent focus-within:hidden"></div>
              </div>
              <div className="relative h-10 w-10">
                <div className="h-full w-full bg-gray-200 animate-pulse rounded-full"></div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-700 bg-gray-200 animate-pulse">
                  Loading...
                </div>
                <div className="text-gray-400 bg-gray-200 animate-pulse">
                  Loading...
                </div>
              </div>
            </th>

            <td className="px-6 py-4 bg-gray-200 animate-pulse">
              {' '}
              <div className="font-medium text-gray-700 bg-gray-200 animate-pulse">
                Loading...
              </div>
              <div className="text-gray-400 bg-gray-200 animate-pulse">
                Loading...
              </div>
            </td>
            <td className="px-6 py-4 bg-gray-200 animate-pulse">
              <div className="inline-flex items-center gap-1 rounded-full bg-gray-200 animate-pulse px-2 py-1 text-xs font-semibold text-gray-200">
                Loading...
              </div>
            </td>
            <td className="px-6 py-4 w-[80px] bg-gray-200 animate-pulse">
              <div className="flex justify-end gap-6">
                <div className="h-5 w-5 bg-gray-200 animate-pulse"></div>
                <div className="h-5 w-5 bg-gray-200 animate-pulse"></div>
              </div>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default Skeleton;
