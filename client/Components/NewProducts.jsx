import { UploadProducts } from "@/lib/Utils/Panel";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiH1 } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewProducts() {
  const uploadImage = useRef(null);
  const [Title, setTitle] = useState("");
  const [Price, setPrice] = useState();
  const [SKU, setSKU] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("");
  const [packaging, setPackaging] = useState("");
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState("");
  const [ProductImages, setProductImages] = useState([]);

  const [customSpecs, setCustomSpecs] = useState({
    key: "",
    value: ""
  })
  const [specsArray, setSpecsArray] = useState([]);
  const customSpecsFunc = (event) => {

    const { name, value } = event.target;
    setCustomSpecs({
      ...customSpecs,
      [name]: value
    })

  }
  const submitSpecs = () => {
    if (customSpecs.key === "" || customSpecs.value === "") {
      alert("Enter the key and value both the pairs")
    }
    else {
      setSpecsArray([
        ...specsArray,
        {
          key: customSpecs.key,
          value: customSpecs.value
        }
      ])
      setCustomSpecs({
        key: "",
        value: ""
      })
    }

  }
  const onSubmit = async () => {
    try {
      const data = new FormData();

      for (const image of ProductImages) {
        data.append("images", image);
      }

      const selectedOption = document.querySelector(
        'select[name="category"]'
      ).value;
      const response = await axios.post(
        "http://localhost:4000/api/uploadImage",
        data
      );
      const files = response.data.uploadedFiles;

      const reversedFiles = files.reverse()

      const specification = {
        color,
        size,
        unit,
        packaging,
      };

      const uploadData = await UploadProducts(
        Title,
        Category,
        selectedOption,
        Description,
        SKU,
        Price,
        reversedFiles,
        specification,
        specsArray
      );
      console.log(uploadData);
      if (uploadData.data.status == "ok") {
        toast.success("Product Added Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        window.location.reload()
      } else if (uploadData.data.errorCode == 404) {
        toast.error("Please fill complete data", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      } else if (uploadData.data.errorCode == 403) {
        toast.error("Product already exists!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="w-full  flex gap-2 ">
      <section className="w-full h-full p-8 bg-slate-50 shadow  border-slate-300 rounded-md border">
        <section className="flex">
          <div className="w-1/2">
            <div className="w-full h-auto p-2 px-5">
              <h2 className="text-slate-700 font-semibold">Product Title</h2>
              <input
                type="text"
                className="p-1 w-full border-slate-300 border rounded-md mt-1"
                name="title"
                required
                placeholder="Enter Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className="text-xs opacity-50 font-semibold">
                Do not exceed more than 25 characters
              </p>
            </div>
            <div className="w-full h-auto  p-2 px-5 grid grid-cols-2 gap-3">
              <span>
                <h2 className="text-slate-700 font-semibold">Category ⓘ</h2>
                <select
                  className="p-1 w-full border-slate-300 border rounded-md mt-1"
                  name="category"
                >
                  <option>Select</option>
                  <option value="residence">Residence</option>
                  <option value="commercial">Commercial</option>
                  <option value="studio">Studio</option>
                </select>
                <p className="text-xs opacity-50 font-semibold"></p>
              </span>
              <span>
                <h2 className="text-slate-700 font-semibold">Sub Category ⓘ</h2>
                <input
                  type="text"
                  className="p-1 w-full border-slate-300 border rounded-md mt-1"
                  name="Category"
                  required
                  placeholder="Enter Category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </span>
            </div>

            <div className="w-full h-auto  p-2 px-5 grid grid-cols-2 gap-3">
              <span>
                <h2 className="text-slate-700 font-semibold">SKU ⓘ</h2>
                <input
                  type="text"
                  className="p-1 w-full border-slate-300 border rounded-md mt-1"
                  name="sku"
                  required
                  placeholder="Enter SKU"
                  onChange={(e) => setSKU(e.target.value)}
                />
              </span>
              <span>
                <h2 className="text-slate-700 font-semibold">Price</h2>
                <p className="p-1 w-full border-slate-300 border rounded-md mt-1 bg-white">
                  ₹{" "}
                  <input
                    type="number"
                    className="bg-transparent"
                    name="price"
                    required
                    placeholder="Enter Price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </p>
              </span>
            </div>
            <div className="w-full h-auto  p-2 px-5 gap-3">
              <span>
                <h2 className="text-slate-700 font-semibold">Description ⓘ</h2>
                <textarea
                  cols="30"
                  rows="10"
                  className="max-h-28  w-full border-slate-300 border rounded-md mt-1"
                  name="Category"
                  required
                  placeholder="Enter Category"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </span>
            </div>
          </div>
          <div className="border-l px-3 w-1/2 p-2 flex flex-col relative">
            <h2 className="text-slate-700 font-semibold">Product Image</h2>
            <div className="h-44 w-full border-5 rounded-lg border-dashed border-2 mt-8 border-slate-300 flex items-center justify-center">
              <input type="file" hidden multiple name='productImages' ref={uploadImage} className='px-4 py-3 rounded-lg outline-gray-200' accept='image/*' onChange={(e) => { setProductImages(e.target.files) }} />

              <button onClick={() => uploadImage.current.click()} className="w-full h-full">
                {" "}
                <p className="font-semibold opacity-60 flex items-center justify-center flex-col"><AiOutlineCloudUpload className="text-5xl text-center " />Upload Your Images</p>


              </button>
            </div>

            <h3 className="mt-3=p-1 w-3/12 opacity-75 text-Secondary font-semibold text-center">
              Total Images: {ProductImages.length}
            </h3>

            <span className="absolute bottom-2 left-3">
              <button onClick={onSubmit} className="bg-Secondary text-white p-2 rounded px-5 hover:opacity-70 transition-all">Upload Product</button>
              <p className="text-xs font-semibold  opacity-70 mt-1">Fill all input fieds before uploading products</p>
            </span>
          </div>
        </section>

        <div className="w-full h-auto p-2 px-5 border">
          <h2 className="font-semibold text-red-400 mb-3">
            Product Specifications ⓘ
          </h2>
          <div className="grid grid-cols-4">
            <div>
              <h3>Product Unit</h3>
              <input
                type="text"
                className="border-slate-300 border rounded-md mt-1 p-1"
                name="Unit"
                required
                placeholder="Enter Unit"
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
            <div>
              <h3>Product Size</h3>
              <input
                type="text"
                className="border-slate-300 border rounded-md mt-1 p-1"
                name="size"
                required
                placeholder="Enter Size"
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div>
              <h3>Product Color</h3>
              <input
                type="text"
                className="border-slate-300 border rounded-md mt-1 p-1"
                name="color"
                required
                placeholder="Enter Color"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div>
              <h3>Product Packaging</h3>
              <input
                type="text"
                className="border-slate-300 border rounded-md mt-1 p-1"
                name="packaging"
                required
                placeholder="Enter Packaging"
                onChange={(e) => setPackaging(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-auto p-2 px-5 border">
          <h2 className="font-semibold text-red-400 mb-3">
            Custom Product Specifications ⓘ
          </h2>
          <div className="w-full flex items-center justify-between">
            <div className="w-2/5">
              <div className="flex gap-2">
                <span className="flex flex-col">KEY<input type="text" className="border-slate-300 border rounded-md mt-1 p-1" name="key" onChange={customSpecsFunc} value={customSpecs.key} /></span>
                <span className="flex flex-col pl-3">VALUE<input type="text" className="border-slate-300 border rounded-md mt-1 p-1" name="value" onChange={customSpecsFunc} value={customSpecs.value} /></span>

              </div>
              <button className="bg-Secondary rounded-md p-1 px-5 border-Secondary border text-white font-semibold hover:bg-transparent hover:text-Secondary mt-3"
                onClick={() => submitSpecs()}
              >ADD</button>
            </div>
            <div className="flex-1 border-l-2 h-full p-8 flex flex-wrap gap-2">
              {
                specsArray.length < 1 ? <h1>No Key value pair is selected yet</h1> : specsArray.map((elem, i) => <span key={i}
                  className="p-2 px-4 bg-red-100 border border-red-300 rounded-full"><span className="border-r-2 border-red-300 pr-2">{elem.key}</span> <span>{elem.value}</span>
                </span>)
              }
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
}

export default NewProducts;
