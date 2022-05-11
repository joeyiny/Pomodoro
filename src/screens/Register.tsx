import React, { SyntheticEvent, useState } from "react";

const Register = () => {
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

    await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ displayName: "", email: "", password: "" });
  };

  return (
    <div className="flex gap-2 flex-col w-96 m-auto py-10">
      <div className=" flex gap-1 flex-col bg-gray-700 w-96 p-4 rounded-md text-white">
        <h1 className=" text-lg font-bold">Register</h1>
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
      </div>
    </div>
  );
};

export default Register;
