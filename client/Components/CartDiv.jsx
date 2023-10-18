


const CartDiv = ({ price, title, sku, image, parentCategory }) => {
    const {setCheckout} = useAppContext()
    const [value, setValue] = useState(1)
    const deleteFunction = async (key) => {
        const res1 = await getCookie();
        const res = await removeCart(res1.data.value.email, key);
        console.log(res)
        setTimeout(() => {
            location.reload()
        }, 1000)
    }
    return (
        <>
            <section className='my-2 py-4 w-full bg-slate-100 rounded flex justify-between  items-center px-4 '>
                <div className='flex items-start gap-2 flex-col ' >
                    <h2 className='font-semibold text-xl'>{title}</h2>
                    <div className='flex items-center'>
                        <p>Quantity :</p>
                        <div className="border flex gap-3 mx-1 justify-around px-4  rounded-md select-none bg-white">
                            <button onClick={() => setValue((prev) => prev - 1)}>-</button>
                            <p> {value < 1 ? setValue(1) : value} </p>
                            <button onClick={() => setValue((prev) => prev + 1)}>+</button>
                        </div>
                        <h3 className='font-semibold text-lg ml-2'>₹ {price.toLocaleString()}</h3>
                        <p className='text-sm mx-1'> (Inc. of all taxes and charges) </p>
                    </div>
                    <div className='flex items-center gap-2 '>
                        <div className='flex cursor-pointer bg-white border max-w-min px-2 py-1 rounded-md items-center font-regular text-sm hover:opacity-70' onClick={() => { deleteFunction(sku) }}>
                            <BsTrash className=' text-lg text-Secondary  cursor-pointer transition-all' />
                            <p className='mx-1'>Remove</p>
                        </div>
                        <Link href={`/shop/${parentCategory}/${sku}`} className='flex cursor-pointer bg-white border max-w-min px-2 py-1 rounded-md items-center font-regular text-sm hover:opacity-70' onClick={() => { deleteFunction(sku) }} >
                            <AiOutlineLink className=' text-lg text-Secondary  cursor-pointer transition-all' />
                            <p className='mx-1'>Visit</p>
                        </Link>
                    </div>
                </div>
                <div className='aspect-square bg-slate-400 mr-3 overflow-hidden object-cover'>
                    <Image src={`http://localhost:4000/ProductImages/${image}`} width={200} height={200} alt='image' className='object-cover w-28' />
                </div>
            </section>
        </>

    )
}

export default CartDiv