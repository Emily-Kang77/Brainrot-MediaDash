const StarRating = () => {
  return (
    <div>
      <div className="rating space-x-1 md:space-x-2">
        <input
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-green-600"
        />
        <input
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-green-600"
          defaultChecked
        />
        <input
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-green-600"
        />
        <input
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-green-600"
        />
        <input
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-green-600"
        />
      </div>
    </div>
  );
};

export default StarRating;
