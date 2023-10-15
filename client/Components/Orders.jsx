import { fetchOrders } from "@/lib/Utils/Panel";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiUserCirclePlusThin } from "react-icons/pi";

function Orders() {
  const [data, setData] = useState([]);
  const [production, setProduction] = useState("");
  const [shipping, setShipping] = useState("");
  const [delivered, setDelivered] = useState("");
  const [active, setActive] = useState(null);

  const statusDiv = [
    {
      title: "RECENT",
      bgcolor: "bg-blue-600",
      txtcolor: "text-blue-600",

      num: "9",
    },
    {
      title: "PENDING",
      bgcolor: "bg-red-600",
      txtcolor: "text-red-600",

      num: "4",
    },
    {
      title: "SHIPPING",
      bgcolor: "bg-yellow-500",
      txtcolor: "text-yellow-500",

      num: "5",
    },
    {
      title: "COMPLETED",
      bgcolor: "bg-green-600",
      txtcolor: "text-green-600",

      num: "12",
    },
  ];

  async function order() {
    const res = await fetchOrders();
    let array = res.data.orders;
    const reversed = array.reverse();
    console.log(reversed)
    setData(reversed);
  }

  const updateStatus = async (process, oid, message, userEmail) => {
    const res = await axios.put("http://localhost:4000/api/status", {
      process,
      oid,
      message,
      userEmail,
    });
    console.log(res);
  };

  useEffect(() => {
    order();
  }, []);

  return (
    <main className="w-full h-auto  p-2 flex  items-center justify-center flex-col">

      <div className="w-3/4 grid grid-cols-4  font-semibold text-xl gap-4 text-center py-3">
        {statusDiv.map((elem, i) => {
          return (
            <p
              className={`${elem.bgcolor} text-white p-2 rounded-md cursor-pointer hover:opacity-75 relative`}
              key={i}
            >
              {elem.title}
              <span
                className={`text-sm absolute top-1 right-1 ${elem.txtcolor} shadow-lg flex items-center justify-center font-semibold rounded-full p-2 bg-white h-5 w-5`}
              >
                {elem.num}
              </span>
            </p>
          );
        })}
      </div>
      <section className="flex w-full gap-2 ">
        <section className="flex flex-1 h-auto flex-col  overflow-y-scroll border rounded-lg shadow">
          <div className="grid grid-cols-6 items-center justify-items-center h-16 p-3  font-semibold bg-slate-100 border-slate-200 border-t border-b w-full">
            <p>No. </p>
            <p>Product SKU</p>
            <p>User</p>
            <p>Status</p>
            <p>Message</p>
          </div>

          {data &&
            data.map((e, i) => (
              <div
                key={i}
                className={`grid grid-cols-6 h-12 items-center justify-items-center border-transparent hover:border-slate-400 border-l-8 hover:bg-slate-100 ${active == e.oid ? "bg-slate-100 border-slate-400 " : "bg-transparent border-transparent"}`}
                onClick={() => setActive(e.oid)}
              >
                <span className="hover:text-red-500 cursor-pointer">
                  {i + 1}
                </span>
                <span className=" hover:text-red-500 cursor-pointer hover:font-semibold">
                  #{e.sku}
                </span>
                <span className=" hover:text-red-500 cursor-pointer hover:font-semibold">
                  {e.email}
                </span>
                <span
                  className={`${e.status[3].completed
                    ? "text-green-500 bg-green-200"
                    : "text-red-500 bg-red-200"
                    } p-1 text-sm rounded-md hover:opacity-80 cursor-pointer`}
                >
                  {e.status[3].completed ? "Completed" : "Pending"}
                </span>
                <span className=" hover:text-red-500 cursor-pointer hover:font-semibold">
                  {e.message}
                </span>
              </div>
            ))}
        </section>
        <section className={`w-3/12 h-auto bg-slate-100 rounded p-2 flex flex-col gap-1 ${active == null ? "hidden" : "visible"}`}>
          {data &&
            data.map((e, i) => {
              if (e.oid === active) {
                return (
                  <React.Fragment key={i}>
                    <div className={` bg-slate-100 rounded p-1 text-sm  text-slate-600`}>
                      <h2 className="font-semibold text-orange-600 bg-orange-300 p-1 rounded my-1">
                        User Details
                      </h2>
                      <p>Email: {e.email}</p>
                      <p className="max-h-10 overflow-y-scroll">
                        Address: {e.address}
                      </p>
                    </div>
                    <div className="bg-slate-100 rounded p-1 text-sm  text-slate-600">
                      <h2 className="font-semibold text-orange-600 bg-orange-300 p-1 rounded my-1">
                        Order Details
                      </h2>
                      <p>Order Id: {e.oid}</p>
                      <p>Product SKU: {e.sku}</p>
                      <p>Quantity: {e.quantity}</p>
                    </div>
                    <div className="bg-slate-100 rounded p-1 text-sm  text-slate-600">
                      <h2 className="font-semibold text-orange-600 bg-orange-300 p-1 rounded my-1">
                        Payment Details
                      </h2>
                      <p>Payment Id : {e.payment.razorpay_payment_id}</p>
                      <p className="truncate">
                        Payment Signature : {e.payment.razorpay_signature}
                      </p>
                    </div>
                    <div className="bg-slate-100 rounded p-1 text-sm  text-slate-600-1">
                      <h1 className="font-semibold text-blue-600 bg-blue-300 p-1 rounded my-1">
                        Status Update
                      </h1>
                      <p className="opacity-75 text-green-500 mb-2">
                        Current message: {e.message}
                      </p>

                      <div className="flex flex-col gap-2">
                        <div>
                          <h3 className="text-yellow-500 font-semibold">
                            In Production
                          </h3>
                          <span className="flex gap-2">
                            <input
                              type="text"
                              name=""
                              id=""
                              onChange={(e) => setProduction(e.target.value)}
                              className="border w-4/6 rounded-md"
                            />
                            <button
                              className={`${e.status[1].completed
                                ? "text-green-500 bg-green-200"
                                : "text-red-500 bg-red-200"
                                } p-1 text-sm rounded-md hover:opacity-80 cursor-pointer`}
                              onClick={() => {
                                updateStatus(
                                  "production",
                                  e.oid,
                                  production,
                                  e.email
                                );
                                toast.success("Updated Status Successfully!", {
                                  position: "top-right",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: false,
                                  progress: undefined,
                                  theme: "colored",
                                });
                                location.reload();
                              }}
                            >
                              {e.status[1].completed ? "Done" : "Not Done"}
                            </button>
                          </span>
                        </div>
                        <div>
                          <h3 className="text-blue-500 font-semibold">
                            Shipping
                          </h3>
                          <span className="flex gap-2">
                            <input
                              type="text"
                              name=""
                              id=""
                              onChange={(e) => setShipping(e.target.value)}
                              className="border w-4/6 rounded-md"
                            />
                            <button
                              onClick={() => {
                                updateStatus(
                                  "shipping",
                                  e.oid,
                                  shipping,
                                  e.email
                                );
                                toast.success("Updated Status Successfully!", {
                                  position: "top-right",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: false,
                                  progress: undefined,
                                  theme: "colored",
                                });
                                location.reload();
                              }}
                              className={`${e.status[2].completed
                                ? "text-green-500 bg-green-200"
                                : "text-red-500 bg-red-200"
                                } p-1 text-sm rounded-md hover:opacity-80 cursor-pointer`}
                            >
                              {e.status[2].completed ? "Done" : "Not Done"}
                            </button>
                          </span>
                        </div>
                        <div>
                          <h3 className="text-green-500 font-semibold">
                            Delivered
                          </h3>
                          <span className="flex gap-2">
                            <input
                              type="text"
                              name=""
                              id=""
                              onChange={(e) => setDelivered(e.target.value)}
                              className="border w-4/6 rounded-md"
                            />
                            <button
                              onClick={() => {
                                updateStatus(
                                  "delivered",
                                  e.oid,
                                  delivered,
                                  e.email
                                );
                                toast.success("Updated Status Successfully!", {
                                  position: "top-right",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: false,
                                  progress: undefined,
                                  theme: "colored",
                                });
                                location.reload();
                              }}
                              className={`${e.status[3].completed
                                ? "text-green-500 bg-green-200"
                                : "text-red-500 bg-red-200"
                                } p-1 text-sm rounded-md hover:opacity-80 cursor-pointer`}
                            >
                              {e.status[3].completed ? "Done" : "Not Done"}
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              }
            })}
        </section>
      </section>
      <ToastContainer />
    </main>
  );
}

export default Orders;
