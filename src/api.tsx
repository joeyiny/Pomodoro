if (!process.env.REACT_APP_SERVER) {
  throw new Error("REACT_APP_SERVER .env var not found.");
}

export let fetchUser = async (email: string) => {
  let response = await fetch(`${process.env.REACT_APP_SERVER}/user/${email}`);
  console.log(response);
  if (!response.ok) return 404;
  let user = await response.json();
  console.log(user);
  return user;
};
