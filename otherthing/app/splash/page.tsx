'use client'

import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useRouter } from 'next/navigation';
// import { button } from 'daisyui';

function Splash() {
  const [emblaRef] = useEmblaCarousel()

  const router = useRouter();

  const handleClick = () => {
    router.push('/sign-in');
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <h1>Welcome to MediaDash!</h1>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">

            <div className="card bg-base-100 w-[80%] shadow-xl">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes" />
              </figure>
              <div className="card-body">

                <p>Content recommendations just for you! </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>

          </div>
          <div className="embla__slide">

            <div className="card bg-base-100 w-[80%] shadow-xl">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes" />
              </figure>
              <div className="card-body">

                <p>Content recommendations just for you! </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          </div>
          <div className="embla__slide">

              <div className="card bg-base-100 w-[80%] shadow-xl">
                  <figure>
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                      alt="Shoes" />
                  </figure>
                  <div className="card-body">

                    <p>Content recommendations just for you! </p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">Fashion</div>
                      <div className="badge badge-outline">Products</div>
                    </div>
                  </div>
                </div>

          </div>
        </div>
      </div>

            <div data-hs-carousel='{"loadingClasses": "opacity-0"}' className="relative">
            <div className="hs-carousel relative overflow-hidden w-full min-h-64">
              <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
                <div className="hs-carousel-slide">
                  <img src="https://example.com/image1.jpg" alt="First slide" className="w-full h-full object-cover" />
                </div>
                <div className="hs-carousel-slide">
                  <img src="https://example.com/image2.jpg" alt="Second slide" className="w-full h-full object-cover" />
                </div>
                <div className="hs-carousel-slide">
                  <img src="https://example.com/image3.jpg" alt="Third slide" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <button type="button" className="hs-carousel-prev absolute top-1/2 start-4 -translate-y-1/2">
              <span aria-hidden="true">«</span>
              <span className="sr-only">Previous</span>
            </button>
            <button type="button" className="hs-carousel-next absolute top-1/2 end-4 -translate-y-1/2">
              <span className="sr-only">Next</span>
              <span aria-hidden="true">»</span>
            </button>
          </div>



      <button onClick={handleClick}>Get started</button>
      
    </div>
  )
}

export default Splash;