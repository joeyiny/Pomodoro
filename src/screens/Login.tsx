import { SyntheticEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn, login, isFetching } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  let updateForm = (value: any) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  let onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (login)
      login(form).then(() => {
        navigate("/", { replace: true });
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
              className="m-auto border bg-gray-200 text-gray-900 p-1 rounded"
            />
          </div>
        </form>
        <p className=" text-red-500">{responseMessage}</p>
      </div>
    </div>
  );
};

export default Login;
