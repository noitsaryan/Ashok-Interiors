import { UploadProducts } from '@/lib/Utils/Panel';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function NewProducts() {
  const uploadImage = useRef(null);
  const [Title, setTitle] = useState('')
  const [Price, setPrice] = useState()
  const [SKU, setSKU] = useState('')
  const [Description, setDescription] = useState('')
  const [Category, setCategory] = useState('')
  const [ProductImages, setProductImages] = useState([])

  const onSubmit = async (e) => {
    try {
      const data = new FormData();

      for (const image of ProductImages) {
        data.append('images', image);
      }

      const selectedOption = document.querySelector('select[name="category"]').value;
      const response = await axios.post('http://localhost:4000/api/uploadImage', data);
      const files = response.data.uploadedFiles
      console.log(response.data.uploadedFiles)
      const uploadData = await UploadProducts(
        Title,
        Category,
        selectedOption,
        Description,
        SKU,
        Price,
        files
      )

      if (uploadData.data.status == 'ok') {
        toast.success('Product Added Successfully!', {
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
      else if (uploadData.data.errorCode == 404) {
        toast.error('Please fill complete data', {
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
      else if (uploadData.data.errorCode == 403) {
        toast.error('Product already exists!', {
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
    <div className='max-w-xl mx-auto'>
      <div className='flex items-center flex-col justify-center space-y-3'  >
        <input type="text" name='title' required placeholder='Enter Title' className='px-4 py-3 rounded-lg outline-gray-200 w-full' onChange={(e) => setTitle(e.target.value)} />
        <input type="number" name='price' required placeholder='Enter Price' style={{ width: '100%' }} className='px-4 py-3 rounded-lg outline-gray-200' onChange={(e) => setPrice(e.target.value)} />
        <input type="text" name='sku' required placeholder='Enter SKU' style={{ width: '100%' }} className='px-4 py-3 rounded-lg outline-gray-200' onChange={(e) => setSKU(e.target.value)} />
        <input type="text" name='description' required placeholder='Enter Description' style={{ width: '100%' }} className='px-4 py-3 rounded-lg outline-gray-200' onChange={(e) => setDescription(e.target.value)} />
        <input type="text" name='Category' required placeholder='Enter Category' style={{ width: '100%' }} className='px-4 py-3 rounded-lg outline-gray-200' onChange={(e) => setCategory(e.target.value)} />
        <input type="file" hidden multiple name='productImages' ref={uploadImage} className='px-4 py-3 rounded-lg outline-gray-200' accept='image/*' onChange={(e) => { setProductImages(e.target.files) }} />
        <button className='border-2 text-gray-400 border-gray-200 w-full py-3  relative rounded-lg border-dashed focus:' onClick={() => uploadImage.current.click()} > Upload Product  <p className='absolute mr-2 top-1/2 -translate-y-1/2 right-0 bg-Secondary rounded-full px-2 py-[2px] text-white'>
          {
            ProductImages.length
          }
        </p></button>

        <select name='category' className='px-4 py-3 rounded-lg outline-gray-200'>
          <option value='residence' >Residence</option>
          <option value='studio'>Studio</option>
          <option value='commercial'>Commercial</option>
        </select>
        <button onClick={onSubmit} className='bg-gray-200 w-full py-3 rounded-lg'> Add </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default NewProducts;