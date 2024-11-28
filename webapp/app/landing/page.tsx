'use client'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useRouter } from 'next/navigation';
import { LANDING_CARDS } from "../consts/landing-cards";
import LandingCard from "../components/landing-card";
// import { button } from 'daisyui';
import Image from 'next/image'
import homeScreenImg from '../../public/homescreen.png'

function Landing() {

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const router = useRouter();

  const handleClick = () => {
    router.push('/sign-in');
  };

  return (
    <div className="flex flex-col items-center h-screen">
        
        <Carousel setApi={setApi}>
        <CarouselContent>
          {LANDING_CARDS.map((card, index) => (
            <CarouselItem key={index}>
              <div className="card bg-base-100 shadow-xl">
                <figure>
                  <Image src={homeScreenImg} alt="Picture of home screen"/>
                </figure>
                <div className="card-body text-center">
                  {card.description}
                </div>
              {/* <div className="w-50">
                <LandingCard key={index} description={card.description} image={card.image}/>
              </div> */}
              </div>
              
            </CarouselItem>


          ))}
        </CarouselContent>
      </Carousel>
        
        <button onClick={handleClick}>Get started</button>
    </div>




  )
}

export default Landing;