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
    <div className="flex gap-2 flex-col w-96 m-auto py-10">
      <div className=" flex gap-1 flex-col bg-gray-700 w-96 p-4 rounded-md text-white">
        <h1 className=" text-lg font-bold">Login</h1>
        {isFetching && <p>loading...</p>}
        <form
          className="max-w-sm m-auto grid-cols-3 grid gap-2"
          onSubmit={onSubmit}>
          <label htmlFor="email" className="text-right">
            Email Address
          </label>
          <input
            required
            type="email"
            id="email"
            className="text-black col-span-2 px-1"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
          <label htmlFor="password" className="text-right">
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            className="text-black col-span-2 px-1"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
          <div className="col-span-3">
            <input
              type="submit"
              value="Login"
              className="m-auto bg-gray-50 text-gray-900 p-1 rounded font-semibold text-sm px-2"
            />
          </div>
        </form>
        <p className=" text-red-500">{errorMessage}</p>
      </div>
      <p className=" text-sm">
        <Link to="/register" className="font-semibold">
          Create account.
        </Link>{" "}
      </p>
    </div>
  );
};

export default Login;
