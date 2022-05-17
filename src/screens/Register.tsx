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
    <div className="flex gap-2 flex-col w-96 m-auto py-10">
      <div className=" flex gap-1 flex-col bg-gray-700 w-96 p-4 rounded-md text-white">
        <h1 className=" text-lg font-bold">Register</h1>
        <p>{isFetching && "Loading..."}</p>
        <form
          className="max-w-sm m-auto grid-cols-3 grid gap-2"
          onSubmit={onSubmit}>
          <label htmlFor="displayName" className="text-right">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            className="text-black col-span-2 px-1"
            value={form.displayName}
            onChange={(e) => updateForm({ displayName: e.target.value })}
          />
          <label htmlFor="email" className="text-right">
            Email Address
          </label>
          <input
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
            type="password"
            id="password"
            className="text-black col-span-2 px-1"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
          <div className="col-span-3">
            <input
              type="submit"
              value="Sign up"
              className="m-auto border bg-gray-200 text-gray-900 p-1 rounded"
            />
          </div>
        </form>
        <p className=" text-red-500">{errorMessage}</p>
      </div>
      <p className=" text-sm">
        <Link to="/login" className="font-semibold">
          I have an account already.
        </Link>{" "}
      </p>
    </div>
  );
};

export default Register;
