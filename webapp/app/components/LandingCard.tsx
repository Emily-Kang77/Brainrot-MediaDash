import React from 'react'

interface CardProps {
  description: string;
  image: string;
}

const LandingCard: React.FC<CardProps> = ({description, image}) => {
  return (
    <div className="card bg-base-100 shadow-xl w-80">
      <figure>
        <img src={image}/>
      </figure>
      <div className="card-body">
        <p>
          {description}
        </p>
      </div>
    </div>
  )
}

export default LandingCard