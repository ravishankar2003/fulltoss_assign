import React from 'react';
import ProductCard from './ProductCard';

const Cart = ({ cart,  handleRemoveFromCart }) => {
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg">Your cart is empty!</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {cart.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleRemoveFromCart={handleRemoveFromCart}
              inCart={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
