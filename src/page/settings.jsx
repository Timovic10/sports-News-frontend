import { FaUserCog } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
// import { FaTrashCan } from "react-icons/fa6";
import { useState, useEffect } from "react";
import useAuthStore from "../stores/useAuthStore";
import useArticleStore from "../stores/articleStore";
import { FaCartShopping } from "react-icons/fa6";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function settings() {
  // const [openDel, setCloseDel] = useState(false);
  const { user, logout } = useAuthStore();
  const { fetchArticles, articleStats, fetchStats } = useArticleStore();
  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    fetchArticles();
    fetchStats();
  }, []);

  return (
    <>
      <span className="flex flex-col gap-4">
        <h2 className="text-center text-xl font-semibold dark:text-white">
          Settings
        </h2>
        <p>Manage your profile and prefrences</p>
      </span>

      <section className="mt-8 flex flex-col gap-5 rounded-md p-3 pt-6 pb-4  border border-gray-300 dark:border-gray-100">
        <span className="flex flex-col gap-2">
          <h2 className="flex gap-2 items-center text-xl">
            <img
              src={user?.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-400"
            />{" "}
            Profile Information
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Basic account information
          </p>
        </span>

        <span className="flex flex-col gap-2">
          <p className="text-l">Username</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user?.username}
          </p>
        </span>

        <span className="flex flex-col gap-2">
          <p className="text-l">Account Created</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </span>
      </section>

      <section className="mt-8 flex flex-col gap-5 rounded-md p-3 pt-6 pb-4  border border-gray-300 dark:border-gray-100">
        <h2 className="flex gap-2 items-center text-xl">
          <FaCartShopping /> Articles posted
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={articleStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="mt-8 flex flex-col gap-8 rounded-md p-3 pt-6 pb-4  border border-gray-300 dark:border-gray-100">
        <span className="flex flex-col gap-2">
          <h2 className="flex gap-2 items-center text-xl">
            <FaUserCog /> Account Actions
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your account and data
          </p>
        </span>
        <span className="flex flex-col gap-3">
          <button
            className="text-left text-sm items-center flex gap-2 rounded-md p-3 pt-2 pb-2 border border-gray-300 dark:border-gray-400"
            onClick={handleLogout}
          >
            <LuLogOut /> Sign Out
          </button>
          {/* <button
            onClick={() => setCloseDel(true)}
            className="text-left bg-red-500 text-sm items-center flex gap-2 rounded-md p-3 pt-2 pb-2"
          >
            <FaTrashCan color="red" /> Delete Account
          </button> */}
        </span>
      </section>

      {/* {openDel && (
        <div className="fixed left-0 top-1/2 w-full flex justify-center items-center">
          <div className="flex flex-col gap-3 w-80 max-[426px]:w-full rounded-md text-center bg-black p-4 pt-6 pb-6">
            <h3>Are you Sure?</h3>

            <p className="text-sm">
              This action cannot be undone. This will permanently delete your
              account and remove all your data including orders and your account
              info.
            </p>

            <button className="bg-red-600 text-sm rounded-md p-3 pt-2 pb-2">
              Delete Account
            </button>
            <button
              onClick={() => setCloseDel(false)}
              className="text-sm rounded-sm p-3 pt-2 pb-2 border border-gray-300 dark:border-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}
    </>
  );
}

export default settings;
