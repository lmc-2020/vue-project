import axios from "axios";

const req = axios.create({
  baseURL: "/api",
  timeout: 600
});

req.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

req.interceptors.response.use(
  config => config,
  error => Promise.reject(error)
);

const fetch = (url, data, method = "get") => {
  switch (method.toLocaleLowerCase()) {
    case "post":
      return req.post({ url, data });
    case "put":
      return req.put({ url, data });
    default:
      return req({ url, data, method });
  }
};

export default fetch;
