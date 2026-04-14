import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../../../contexts/AuthContext";

export default function SignupForm() {
  const { signup, loading } = useContext(authContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    isActive: true,
  });
  const navigate = useNavigate();

  const handleChange = async e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 p-8 shadow-lg">
        <h2 className="mb-2 text-center text-2xl font-bold text-white">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-700 bg-slate-800
              px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500
              focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-700 bg-slate-800
              px-4 py-3 text-sm text-slate-300 outline-none transition
              focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
            >
              <option value="">Select role</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="data_entry">Data Entry</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              name="isActive"
              type="checkbox"
              value={formData.isActive}
              onChange={e => {
                setFormData({ ...formData, isActive: e.target.checked });
              }}
              className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-white"
            />
            <label htmlFor="isActive" className="text-sm text-slate-300">
              Is Active
            </label>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl border border-slate-700 bg-slate-900
            px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-950"
          >
            {loading ? "Loading" : "Sign Up"}
          </button>

          {/* <div className="flex items-center justify-center gap-2 pt-2 text-sm text-slate-400">
            <p>Have an account?</p>
            <Link
              to="/login"
              className="hover:underline font-medium text-white transition hover:text-slate-200"
            >
              Login
            </Link>
          </div> */}
        </form>
      </div>
    </div>
  );
}
