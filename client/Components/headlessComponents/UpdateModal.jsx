import { useAppContext } from '@/context/adminStore';
import { fetchById, updateProduct } from '@/lib/Utils/Panel';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function MyModal() {
    let { isOpen, setIsOpen, sku } = useAppContext();
    const [res, setRes] = useState([]);

    // Define state variables for input fields
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [description, setDescription] = useState('');
    const [unit, setUnit] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [packaging, setPackaging] = useState('');
    const [newSKU, setNewSKU] = useState('');
    const [price, setPrice] = useState('');
    const [productImages, setProductImages] = useState([])
    const [extraSpecs, setExtraSpecs] = useState([])
    const [customSpecs, setCustomSpecs] = useState({
        key: "",
        value: ""
    })
    const [specsArray, setSpecsArray] = useState([]);
    const newUpdatedSpecsArray = [...extraSpecs, ...specsArray]
    function closeModal() {
        setIsOpen(false);
    }

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

    const fetchProduct = async (id) => {
        const res = await fetchById(id);
        setRes(res.data.data);

        // Initialize state variables with data from 'res'
        if (res.data.data) {
            setTitle(res.data.data.title);
            setCategory(res.data.data.category);
            setParentCategory(res.data.data.parentCategory);
            setDescription(res.data.data.description);
            setUnit(res.data.data.specification.unit);
            setColor(res.data.data.specification.color);
            setSize(res.data.data.specification.size);
            setPackaging(res.data.data.specification.packaging);
            setNewSKU(res.data.data.sku);
            setPrice(res.data.data.price);
            setProductImages(res.data.data.productImages)
            setExtraSpecs(res.data.data.extraSpecs)
        }
    }

    useEffect(() => {
        fetchProduct(sku);
    }, [sku]);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto w-lg ">
                        <div className="flex min-h-full  items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-8 ">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Update Product
                                    </Dialog.Title>
                                    <div className='w-full space-y-5 py-5 '>
                                        <div className='p-4 border flex items-center gap-4'>
                                            <p>
                                                Title:
                                            </p>
                                            <input
                                                className='w-full p-2 outline-gray-100'
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder='Enter new title'
                                            />
                                        </div>
                                        <div className='p-4 border flex items-center gap-4'>
                                            <p>
                                                Category:
                                            </p>
                                            <input
                                                className='p-2 outline-gray-100'
                                                type="text"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                placeholder='Enter new Category'
                                            />
                                        </div>
                                        <div className='p-4 border flex items-center gap-4'>
                                            <p>
                                                Parent Category:
                                            </p>
                                            <input
                                                className='p-2 outline-gray-100'
                                                type="text"
                                                value={parentCategory}
                                                onChange={(e) => setParentCategory(e.target.value)}
                                                placeholder='Enter new Parent Category'
                                            />
                                        </div>
                                        <div className='p-4 border flex items-center gap-4'>
                                            <p>
                                                Description:
                                            </p>
                                            <textarea
                                                className='w-full p-2 outline-gray-100'
                                                type="text"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder='Enter new description'
                                            />
                                        </div>
                                        <div className='p-4 border flex items-center gap-4'>
                                            <p>
                                                Specification:
                                            </p>
                                            <div className='flex items-start flex-col'>
                                                <div className='flex items-center space-x-2'>
                                                    <p>
                                                        unit:
                                                    </p>
                                                    <input
                                                        type="text"
                                                        placeholder='Enter Material'
                                                        value={unit}
                                                        onChange={(e) => setUnit(e.target.value)}
                                                    />
                                                </div>
                                                <div className='flex items-center space-x-2'>
                                                    <p>
                                                        Color:
                                                    </p>
                                                    <input
                                                        type="text"
                                                        placeholder='Enter Color'
                                                        value={color}
                                                        onChange={(e) => setColor(e.target.value)}
                                                    />
                                                </div>
                                                <div className='flex items-center space-x-2'>
                                                    <p>
                                                        Size:
                                                    </p>
                                                    <input
                                                        type="text"
                                                        placeholder='Enter Size'
                                                        value={size}
                                                        onChange={(e) => setSize(e.target.value)}
                                                    />
                                                </div>
                                                <div className='flex items-center space-x-2'>
                                                    <p>
                                                        Packaging:
                                                    </p>
                                                    <input
                                                        type="text"
                                                        placeholder='Enter Packaging'
                                                        value={packaging}
                                                        onChange={(e) => setPackaging(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-4 border flex items-center gap-4'>
                                            <p>Extra Specs: </p>
                                            <div className='flex flex-col'>
                                                {
                                                    extraSpecs.map((e, i) => {
                                                        return <div className='flex items-center' key={i}>
                                                            <p> {e.key}: </p>
                                                            <input type="text" placeholder="Extra Specs" className='mx-1' value={e.value} />
                                                        </div>
                                                    })
                                                }
                                            </div>
                                            <p> OR </p>
                                            <div className=" p-2 px-5">
                                                <div className=" flex flex-col">
                                                    <div >
                                                        <div className="flex gap-2">
                                                            <span className="flex flex-col">KEY<input type="text" className="border-slate-300 border rounded-md mt-1 p-1" name="key" onChange={customSpecsFunc} value={customSpecs.key} /></span>
                                                            <span className="flex flex-col pl-3">VALUE<input type="text" className="border-slate-300 border rounded-md mt-1 p-1" name="value" onChange={customSpecsFunc} value={customSpecs.value} /></span>

                                                        </div>
                                                        <button className="bg-green-500 rounded-md p-1 px-5 border-green-500 border text-white font-semibold hover:bg-transparent hover:text-green-500 mt-3"
                                                            onClick={() => submitSpecs()}
                                                        >ADD</button>
                                                    </div>
                                                    <div className=" p-8 flex flex-wrap gap-2">
                                                        {
                                                            specsArray.map((elem, i) => <span key={i}
                                                                className=""><span className=""> {i + 1}) {elem.key} : </span> <span>{elem.value}</span>
                                                            </span>)
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-4 border flex items-center gap-4'>
                                            <p>
                                                SKU:
                                            </p>
                                            <input
                                                className='p-2 outline-gray-100'
                                                type="text"
                                                value={newSKU}
                                                onChange={(e) => setNewSKU(e.target.value)}
                                                placeholder='Enter new SKU'
                                            />
                                        </div>
                                        <div className='p-4 border flex items-center gap-4'>
                                            <p>
                                                Price:
                                            </p>
                                            <input
                                                className='p-2 outline-gray-100'
                                                type="text"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                placeholder='Enter new title'
                                            />
                                        </div>
                                        <div className='p-4 border flex items-center gap-4 overflow-x-scroll'>
                                            <p>
                                                Product Images:
                                            </p>
                                            {res?.productImages ? (
                                                res.productImages.map((e, i) => (
                                                    <div key={i} className='bg-cover max-w-[100px]'>
                                                        <Image
                                                            alt='product'
                                                            width={100}
                                                            height={100}
                                                            src={`http://localhost:4000/ProductImages/${e}`}
                                                        />
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No product images available.</p>
                                            )}
                                        </div>
                                        <div>
                                            <button className='bg-green-500 px-4 py-2 text-white rounded-lg my-4 hover-bg-green-800 transition-all '
                                                onClick={
                                                    async () => {
                                                        const res = await updateProduct(
                                                            title,
                                                            category,
                                                            parentCategory,
                                                            description,
                                                            {
                                                                color,
                                                                unit,
                                                                size,
                                                                packaging
                                                            },
                                                            sku,
                                                            price,
                                                            productImages,
                                                            newUpdatedSpecsArray
                                                        )
                                                        if (res.message.acknowledged) {
                                                            toast.success('Product Updated Successfully', {
                                                                position: "top-right",
                                                                autoClose: 5000,
                                                                hideProgressBar: false,
                                                                closeOnClick: true,
                                                                pauseOnHover: true,
                                                                draggable: false,
                                                                progress: undefined,
                                                                theme: "light",
                                                            })
                                                        }
                                                    }
                                                }
                                            >
                                                Update Changes
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <ToastContainer />
        </>
    );
}
