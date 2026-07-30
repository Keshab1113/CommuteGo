import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import { ThemeContext } from "../../../context/ThemeContext";
import { toast } from "react-toastify";
import { Loader2, ArrowLeft } from "lucide-react";

const UserEdit = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    isAdmin: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const { authorizationToken } = useAuth();
  const { darkMode } = useContext(ThemeContext);

  const getSingleUserData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const userData = await response.json();
      setData({
        username: userData.username || "",
        email: userData.email || "",
        isAdmin: userData.isAdmin || false,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user data");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("User updated successfully");
        navigate(-1);
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#141313]' : 'bg-gray-50'}`}>
        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${darkMode ? 'bg-[#141313]' : 'bg-gray-50'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-cyan-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="p-8 rounded-3xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 shadow-premium">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Update User</h1>
            <p className="text-sm text-gray-500">Edit user information below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={handleInput}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleInput}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isAdmin"
                id="isAdmin"
                checked={data.isAdmin}
                onChange={handleInput}
                className="w-5 h-5 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
              />
              <label htmlFor="isAdmin" className="text-sm font-medium">Admin Privileges</label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update User"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UserEdit;
