import { useState } from 'react';
import { useGetUsersQuery } from '../../redux/user/userApi';
import Loader from '../Loader/Loader';
import Skeleton from '../Loader/Skeleton';

interface UserI {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, isFetching } =
    useGetUsersQuery(currentPage);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  /* ---------------------- Sort user based on their name --------------------- */
  const sortedUsers = [...(data?.data ?? [])].sort((a, b) => {
    if (sortOrder === 'asc') {
      return (a?.first_name ?? '').localeCompare(b?.first_name ?? '');
    } else {
      return (b?.first_name ?? '').localeCompare(a?.first_name ?? '');
    }
  });

  const handleSortToggle = () => {
    setSortOrder((prevSortOrder) =>
      prevSortOrder === 'asc' ? 'desc' : 'asc'
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  console.log(error);

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md my-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-[#667085]">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium ">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-white border-2 border-purple-400 flex items-center p-0.5">
                  <img src="./images/minus.svg" alt="" />
                </div>
                <span className="flex gap-1">
                  User Info
                  <button onClick={handleSortToggle}>
                    {sortOrder === 'asc' ? (
                      <img src="./images/arrow-down.svg" alt="" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                        />
                      </svg>
                    )}
                  </button>
                </span>{' '}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium ">
              About
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium ">
              Status
            </th>

            <th scope="col" className="px-6 py-3 font-medium"></th>
          </tr>
        </thead>
        {isFetching ? (
          <Skeleton />
        ) : (
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 ">
            {sortedUsers.map((user: UserI) => (
              <tr key={user?.id} className="hover:bg-gray-50">
                <th className="flex items-center gap-3 px-6 py-4 font-normal ">
                  <div className="py-2 ">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded-2xl ring-1 ring-purple-500 ring-offset-0 outline-0 bg-transparent text-transparent focus-within:hidden"
                      value="id-1"
                    />
                  </div>
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src={user?.avatar}
                      alt=""
                    />
                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      {user?.first_name}
                    </div>
                    <div className="text-gray-400">{user?.email}</div>
                  </div>
                </th>

                <td className="px-6 py-4">
                  <div className="font-medium text-gray-700">
                    Some Dummy Content{' '}
                  </div>
                  <div className="text-gray-400">
                    {user?.first_name} {user?.last_name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    Customer
                  </span>
                </td>
                <td className="px-6 py-4 w-[80px]">
                  <div className="flex justify-end gap-6">
                    <button>
                      <img src="./images/trash-2.svg" alt="" />
                    </button>
                    <button>
                      <img src="./images/edit-2.svg" alt="" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
        <tfoot className=" text-[#344054] border border-t border-[#EAECF0] ">
          <td colSpan={4} className="px-6 py-3 w-ful ">
            <div className="flex justify-between items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mr-2 rounded-lg cursor-pointer border border-[#D0D5DD] hover:bg-slate-50  transition-colors">
                Previous
              </button>
              <span>
                Page {currentPage} of {data?.total_pages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === data.total_pages}
                className="px-4 py-2  bg-white rounded-lg cursor-pointer border border-[#D0D5DD] hover:bg-slate-50 transition-colors">
                Next
              </button>
            </div>
          </td>
        </tfoot>
      </table>
    </div>
  );
};

export default UserTable;
