import { useSession } from "next-auth/client";
import Skeleton from "react-loading-skeleton";
import useSWR from "swr";
import Head from "next/head";

function Users() {
  const [session, loading] = useSession();
  const { data: users, error } = useSWR(
    !loading && session && session.admin ? "/api/admin/users" : null
  );

  return (
    <>
      <Head>
        <title>Zinger | Users</title>
      </Head>
      <div className="heightFixAdmin bg-gray-100 py-10 md:px-6">
        <div className="max-w-screen-xl mx-auto bg-white  shadow rounded-md my-6">
          <div className="flex flex-col md:p-8  p-6  bg-white gap-2">
            <h1 className="sm:text-2xl text-xl  font-semibold border-b-2 border-gray-200 pb-4 text-gray-700">
              Users
            </h1>
            <div className="space-y-4 overflow-auto flex-grow hideScrollBar">
              {!error && !users ? (
                <Skeleton count={10} />
              ) : (
                <table className="w-full sm:text-base text-sm">
                  <thead>
                    <tr>
                      <th className="text-left w-1/5 py-4 font-semibold">
                        Pic
                      </th>
                      <th className="text-left w-2/5 py-4 px-4 font-semibold">
                        Name
                      </th>
                      <th className="text-left w-2/5 py-4 font-semibold">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="sm:text-sm text-xs">
                    {users?.map((user) => (
                      <tr key={`user-${user?._id}`}>
                        <td className="table_col_img">
                          <img
                            src={user?.image || "/img/profile_pic.svg"}
                            className="object-contain w-10 rounded-sm py-2"
                            alt=""
                          />
                        </td>
                        <td className="table_col px-4">{user?.name}</td>
                        <td className="table_col">{user?.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Users.admin = true;
export default Users;
