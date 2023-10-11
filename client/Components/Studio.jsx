import Image from 'next/image'
import React from 'react'

function Studio() {
    const imageArray = [
        {
          ProjectName: "Lambodara Studios",
          ProjectImage: `/CategoryImages/StudioImages/Img1.webp`,
        },
        {
          ProjectName: "Island City Studios",
          ProjectImage: `/CategoryImages/StudioImages/Img2.webp`,
        },
        {
          ProjectName: "Shankar Mahadevan Home Theatre",
          ProjectImage: `/CategoryImages/StudioImages/Img3.webp`,
        },
        {
          ProjectName: "Sound and Vision Studios",
          ProjectImage: `/CategoryImages/StudioImages/Img4.webp`,
        },
        {
          ProjectName: "Subhash",
          ProjectImage: `/CategoryImages/StudioImages/Img5.webp`,
        },
      ]
    return (
        <div className='flex flex-col items-center w-screen mx-auto my-8 gap-4 px-8 '>
            {
                imageArray.map((e, i) => {
                    return (
                        <div key={i} className={`aspect-video w-full flex items-center flex-col ${ i%2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row' } max-h-96 `}>
                            <Image
                            src={e.ProjectImage}
                            alt='studios'
                            width={500}
                            height={500}
                            className='w-[70%] object-cover rounded-lg'
                            />
                            <div className=''>
                                <h1 className='md:text-4xl text-xl italic font-medium underline mx-8'> { e.ProjectName } </h1>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Studio