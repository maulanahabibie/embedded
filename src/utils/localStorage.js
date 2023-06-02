export const addUserToLocalStorage = (jwt) => {
  localStorage.setItem('token', JSON.stringify(jwt));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('token');
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('token');
  return JSON.parse(result);
};
