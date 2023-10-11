import axios from "axios";

export async function PinCode(pincode) {
  const response = await axios.get(
    `https://api.postalpincode.in/pincode/${pincode}`
  );
  return response;
}
