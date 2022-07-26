export let fetchUser = async (email: string) => {
  let response = await fetch(`http://localhost:3000/user/${email}`);
  console.log(response);
  if (!response.ok) return 404;
  let user = await response.json();
  console.log(user);
  return user;
};
