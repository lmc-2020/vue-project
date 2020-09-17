const getToken = key => {
  let t = sessionStorage.getItem(key);
  return t ? JSON.parse(t) : [];
};

const setToken = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const removeToken = key => {
  sessionStorage.removeItem(key);
};

export { getToken, setToken, removeToken };
