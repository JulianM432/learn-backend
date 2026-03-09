export function formatUser(user) {
  const { _id, name, lastName, email, isActive } = user;
  return { _id, name, lastName, email, isActive };
}
