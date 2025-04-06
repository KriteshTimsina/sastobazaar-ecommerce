'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

const CartButton = () => {
  const [quantity, setQuantity] = useState(0);

  const onIncrement = () => {
    setQuantity(quantity + 1);
  };

  const onDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else if (quantity === 1) {
      setQuantity(0);
    }
  };

  return (
    <Button className="border-primary rounded-full border-2 size-9 hover:w-1/2 group bg-transparent hover:bg-primary  overflow-hidden relative">
      <div
        className={`
          absolute inset-2 flex items-center justify-start 
          transition-all duration-300 transform  px-2
          ${quantity === 0 ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}
        `}
      >
        <span className="hidden group-hover:flex text-sm">Add to cart</span>
      </div>

      <div
        className={`
           hidden 
          absolute inset-2 group-hover:flex  items-center justify-between px-2 pe-5
          transition-all duration-300 transform w-2/3
          ${quantity > 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}
      >
        <span title="Reduce" onClick={onDecrement} className="cursor-pointer z-10">
          <Minus className="w-4 h-4 text-primary group-hover:text-white" />
        </span>
        <span className="text-primary group-hover:text-white font-medium">{quantity}</span>
      </div>

      <span title="Add" onClick={onIncrement} className="absolute right-2 cursor-pointer">
        <Plus className="w-4 h-4 text-primary group-hover:text-white" />
      </span>
    </Button>
  );
};

export default CartButton;
