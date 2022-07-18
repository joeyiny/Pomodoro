import React, { SyntheticEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register, isFetching, errorMessage } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    displayName: "",
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

    const newPerson = { ...form };
    register(newPerson)
      .catch((error: Error) => {
        window.alert(error);
      })
      .then((data: any) => {
        console.log(data);
        if (data === "success") {
          setForm({ displayName: "", email: "", password: "" });
          navigate("/login", { replace: true });
        }
      });
  };

  return (
    <div className="flex gap-2 flex-col w-full sm:w-[30rem] m-auto py-10">
      <div className=" flex gap-1 flex-col bg-gray-700 w-full sm:w-[30rem] p-8 sm:rounded-md text-white">
        <div className=" mb-6">
          <h1 className=" text-gray-50 text-2xl font-bold">
            Create a new account.
          </h1>
          <p className=" text-primary font-bold mt-2">{errorMessage}</p>
          <p>{isFetching && "Loading..."}</p>
        </div>
        <form className="flex gap-4 flex-col" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="displayName"
              className="text-left text-base font-semibold text-gray-50 w-full mb-0.5 block">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              className="text-black col-span-2 px-2.5 py-2 rounded bg-gray-50 w-full text-gray-900"
              value={form.displayName}
              onChange={(e) => updateForm({ displayName: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-left text-base font-semibold text-gray-50 w-full mb-0.5 block">
              Email Address
            </label>
            <input
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
              value="Sign up"
              className="bg-primary text-gray-900 w-full rounded font-bold py-2 mt-2 uppercase hover:cursor-pointer "
            />
          </div>
        </form>
        <p className="mt-4 text-sm">
          <Link to="/login" className="font-semibold">
            I have an account already.
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
