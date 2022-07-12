import { SyntheticEvent, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, isFetching, errorMessage } = useContext(AuthContext);
  const location: any = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  let updateForm = (value: any) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  let onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (login)
      login(form).then(() => {
        navigate(location.state?.path || "/", { replace: true });
      });
  };

  return (
    <div className="flex gap-2 flex-col w-[30rem] m-auto py-10">
      <div className=" flex gap-1 flex-col bg-gray-700 w-[30rem] p-8 rounded-md text-white">
        <div className=" mb-6">
          <h1 className="text-gray-50 text-2xl font-bold">
            Log in to your account.
          </h1>
          <p className=" text-primary font-bold mt-2">{errorMessage}</p>
          {isFetching && <p>loading...</p>}
        </div>
        <form className="flex gap-4 flex-col" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="email"
              className="text-left text-base font-semibold text-gray-50 w-full mb-0.5 block">
              Email Address
            </label>
            <input
              required
              type="email"
              id="email"
              className="text-black col-span-2 px-2.5 py-2 rounded bg-gray-50 w-full text-gray-900"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-left text-base font-semibold text-gray-50 w-full mb-0.5 block">
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              className="text-black col-span-2 px-2.5 py-2 rounded bg-gray-50 w-full text-gray-900"
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
            />
          </div>
          <div className="col-span-3">
            <input
              type="submit"
              value="Login"
              className="bg-primary text-gray-900 w-full rounded font-bold py-2 mt-2 uppercase hover:cursor-pointer "
              //m-auto bg-gray-50 text-gray-900 p-1 rounded font-semibold text-sm px-2
            />
          </div>
        </form>
        <p className="mt-4 text-sm">
          Don't have an account yet?{" "}
          <Link to="/register" className="font-semibold text-gray-50">
            Make one here.
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
