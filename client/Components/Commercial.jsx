import Image from 'next/image'
import React from 'react'

function Commercial() {
    const imagesArray = [
        '/CategoryImages/ResidentialImg/Img1.webp',
        '/CategoryImages/ResidentialImg/Img2.webp',
        '/CategoryImages/ResidentialImg/Img3.webp',
        '/CategoryImages/ResidentialImg/Img4.webp',
        '/CategoryImages/ResidentialImg/Img5.webp',
        '/CategoryImages/ResidentialImg/Img6.webp',

    ]
    return (
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 px-4 my-8' >
            {
                imagesArray.map((e, i) => {
                    return (
                        i % 2 === 0 ?
                            <Image
                                src={e}
                                alt='residentialImages'
                                width={600}
                                height={300}
                                className={`col-span-2 object-cover rounded-md`} 
                                key={i}
                            /> : <Image
                                src={e}
                                alt='residentialImages'
                                width={600}
                                height={300}
                                className='col-span-3 object-cover rounded-md'
                                key={i}
                            />
                    )
                })
            }
        </div>
    )
}

export default Commercial