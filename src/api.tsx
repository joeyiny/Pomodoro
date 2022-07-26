export let fetchUser = async (email: string) => {
  let response = await fetch(`http://localhost:3000/user/${email}`);
  let user = await response.json();
  return user;
};
