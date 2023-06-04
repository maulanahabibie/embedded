export const addUserToLocalStorage = (jwt, role) => {
  localStorage.setItem('token', JSON.stringify(jwt));
  localStorage.setItem('role', JSON.stringify(role));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('token');
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('token');
  return JSON.parse(result);
};
export const getUserRole = () => {
  const result = localStorage.getItem('role');
  return JSON.parse(result);
};
