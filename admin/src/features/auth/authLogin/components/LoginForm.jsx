import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../../contexts/AuthContext";

export default function LoginForm() {
  const { login, loading } = useContext(authContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      // setErrors(err.message || "Login fail");
      // console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 p-8 shadow-lg">
        <h2 className="mb-2 text-center text-2xl font-bold text-white">
          Welcome Back
        </h2>
        <p className="mb-6 text-center text-sm text-slate-400">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
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
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-2xl border border-slate-700 bg-slate-900
            px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-950"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          {/* <div className="flex items-center justify-center gap-2 pt-2 text-sm text-slate-400">
            <p>Create an account?</p>
            <Link
              to="/signup"
              className="font-medium text-white transition hover:text-slate-200 hover:underline"
            >
              Sign Up
            </Link>
          </div> */}
        </form>
      </div>
    </div>
  );
}
