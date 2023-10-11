import axios from "axios";

export const newOrder = async (
  oid, payment, sku, quantity, email
) => {
  const res = await axios.post("http://localhost:4000/api/newOrder", {
    oid, payment, sku, quantity, email
  });
  return res;
};

export const setAdminOrder = async (email, userEmail) => {
  const res = await axios.post("/api/addOrderAdmin", {
    email,
    userEmail,
  });
  return res;
};
