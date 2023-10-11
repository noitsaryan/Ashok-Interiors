import axios from "axios";

const axiosCredentials = axios.create({
  withCredentials: true
});

export async function registerFunc(name, email, password) {
  const res = await axios.post(`http://localhost:4000/api/register`, {
    name,
    email,
    password,
  });
  return res;
}

export async function loginFunc(email, password) {
  const res = await axiosCredentials.post(`http://localhost:4000/api/login`, {
    email,
    password,
  });
  return res;
}

export async function forgetFunc(email) {
  const res = await axios.post(`http://localhost:4000/api/forget`, {
    email,
  });
  return res;
}

export async function tokenValidate(token, password) {
  const res = await axios.post(`http://localhost:4000/api/validate`, {
    token,
    password,
  });
  return res;
}

export async function getCookie() {
  const res = await axios.get(`http://localhost:4000/api/cookie`, { withCredentials: true });
  return res;
}

export async function addCart( email, sku) {
  const res = await axios.put(`http://localhost:4000/api/cart/add`, {
    email,
    sku,
  });
  return res;
}
export async function removeCart( email, sku) {
  const res = await axios.put(`http://localhost:4000/api/cart/remove`, {
    email,
    sku,
  });
  return res;
}

export async function adminLogin(email, password) {
  const res = await axiosCredentials.post("http://localhost:4000/api/admin-login", {
    email,
    password,
  });
  return res;
}

export async function Logout() {
  const res = await axios.get("http://localhost:4000/api/clearCookie");
  return res;
}

export async function fetchUser(email) {
  const res = await axios.get(`http://localhost:4000/api/user/${email}`);
  return res;
}

export async function sendNotification(sku, email, quantity) {
  const res = await axios.post("http://localhost:4000/api/orderNotification", {
    sku,
    email,
    quantity,
  });
  return res;
}
