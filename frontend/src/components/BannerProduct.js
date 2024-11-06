import React, { useEffect, useState, useCallback } from 'react';
import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';

import videoBanner from '../assest/banner/video-banner.webp';

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [
        { src: image1, alt: "Description for image 1" },
        { src: videoBanner, alt: "Description for video banner" },
        { src: image2, alt: "Description for image 2" },
        { src: image3, alt: "Description for image 3" },
        { src: image4, alt: "Description for image 4" },
        { src: image5, alt: "Description for image 5" }
    ];

    const mobileImages = [
        { src: image1Mobile, alt: "Description for mobile image 1" },
        { src: image2Mobile, alt: "Description for mobile image 2" },
        { src: image3Mobile, alt: "Description for mobile image 3" },
        { src: image4Mobile, alt: "Description for mobile image 4" },
        { src: image5Mobile, alt: "Description for mobile image 5" }
    ];

    const nextImage = useCallback(() => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1);
        }
    }, [currentImage, desktopImages.length]);

    const preveImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage();
            } else {
                setCurrentImage(0);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImage, desktopImages.length, nextImage]);

    return (
        <div className='container px-4 mx-auto rounded'>
            <div className='relative w-full h-56 md:h-72 bg-slate-200'>

                <div className='absolute z-10 items-center hidden w-full h-full md:flex '>
                    <div className='flex justify-between w-full text-2xl '>
                        <button onClick={preveImage} className='p-1 bg-white rounded-full shadow-md'>
                            <FaAngleLeft />
                        </button>
                        <button onClick={nextImage} className='p-1 bg-white rounded-full shadow-md'>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                {/* Desktop and tablet version */}
                <div className='hidden w-full h-full overflow-hidden md:flex'>
                    {desktopImages.map((image, index) => (
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={image.src} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                            <img src={image.src} alt={image.alt} className='w-full h-full' />
                        </div>
                    ))}
                </div>

                {/* Mobile version */}
                <div className='flex w-full h-full overflow-hidden md:hidden'>
                    {mobileImages.map((image, index) => (
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={image.src} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                            <img src={image.src} alt={image.alt} className='object-cover w-full h-full' />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default BannerProduct;
