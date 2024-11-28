'use client'

import React, { useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { SignInButton, SignOutButton } from "@clerk/nextjs";


function Splash() {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className="justify-center">
      <h1>Welcome to MediaDash!</h1>

      <div>Login with email</div>
      <div>Login with Google</div>

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

      <SignInButton mode="modal">
        <button className="btn">Sign In</button>
      </SignInButton>

      <SignOutButton mode="modal">
        <button className="btn">Sign Out</button>
      </SignOutButton>
      
    </div>
  )
}

export default Splash;