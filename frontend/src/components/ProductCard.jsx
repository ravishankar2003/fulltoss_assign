import React, { useState } from 'react';

const ProductCard = ({ product, handleAddToCart, handleRemoveFromCart, inCart }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="flex flex-col w-[350px] border shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out bg-white"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`p-4 flex flex-col box-border transition-all duration-300 ${
          hover ? 'h-[330px]' : 'h-[300px]'
        }`}
      >
        <img
          src={product.imageURL}
          alt={product.name}
          className="w-full h-44 object-cover rounded-md"
        />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <div className="flex flex-row justify-between">
          <p className="text-gray-500">₹{product.price}</p>
          {inCart ? (
            <button
              className="bg-red-500 text-white py-1 px-4 mt-2 rounded"
              onClick={() => handleRemoveFromCart(product.id)}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white py-1 px-4 mt-2 rounded"
              onClick={() => handleAddToCart(product.id)}
            >
              Add to Cart
            </button>
          )}
        </div>
        <div
          className={`mt-2 text-sm text-gray-700 overflow-hidden transition-all duration-300 ${
            hover ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {product.description}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
