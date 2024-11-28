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



      <button onClick={handleClick}>Get started</button>
      
    </div>
  )
}

export default Splash;