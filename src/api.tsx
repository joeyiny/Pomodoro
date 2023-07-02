let serverUrl: string;

if (process.env.NODE_ENV === "production") {
  serverUrl = process.env.REACT_APP_PROD_SERVER!;
} else {
  serverUrl = process.env.REACT_APP_DEV_SERVER!;
}

if (!serverUrl) {
  throw new Error("serverUrl not set in env file");
}

export let fetchUser = async (email: string) => {
  let response = await fetch(`${serverUrl}/user/${email}`);
  console.log(response);
  if (!response.ok) return 404;
  let user = await response.json();
  console.log(user);
  return user;
};
