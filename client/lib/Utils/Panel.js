import axios from "axios";

export async function UploadProducts(
  title,
  category,
  parentCategory,
  description,
  sku,
  price,
  productImages
) {
  const res = await axios.post("http://localhost:4000/api/uploadProduct", {
    title,
    category,
    parentCategory,
    description,
    sku,
    price,
    productImages
  });
  return res;
}

export async function listProducts() {
  const res = axios.get("http://localhost:4000/api/product/all");
  return res;
}

export async function fetchByCategory(type) {
  const res = axios.get(`http://localhost:4000/api/product/category/${type}`);
  return res;
}

export async function fetchById(sku) {
  const res = axios.get(`http://localhost:4000/api/product/id/${sku}`);
  return res;
}
export async function fetchOrders() {
  const res = await axios.get('http://localhost:4000/api/orders')
  return res
}
