import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";

let SERVICE_CHARGE = 10;

const Cart = () => {
  const { cart } = useContext(cartContext);
  const [subTotal, setSubTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);

  function handleTotal() {
    let total = 0;
    cart.map((item) => (total = total + item.product.price * item.quantity));
    setSubTotal(total);
  }
  function calculateTax() {
    const tax = parseFloat(((subTotal * 13) / 100).toFixed(2));
    setTaxAmount(tax);
  }
  useEffect(() => {
    handleTotal();
  }, []);
  useEffect(() => {
    calculateTax();
  }, [subTotal]);

  return (
    <div className="pt-navtop dark:bg-darkbg  min-h-screen dark:text-darktext md:flex md:flex-row md:justify-around md:items-start">
      <div className="flex flex-col justify-center items-center md:items-start mx-2">
        <h2 className="font-semibold text-xl mb-5">
          Shopping Cart ({cart.length})
        </h2>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center">
            <p>Shopping Cart is empty</p>
            <Link to="/" className="hover:text-primary">
              add to cart
            </Link>
          </div>
        ) : (
          <div className="">
            {cart.map((item) => {
              return (
                <div className="flex flex-col   gap-5 bg-purple-100 text-black w-full md:w-[600px] mb-2 hover:shadow-sm hover:shadow-white">
                  <div className="flex justify-around items-center px-2">
                    <div className="flex items-center gap-5 max-w-[300px] ">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-[100px] h-[100px] object-contain"
                      />
                      <div>
                        <h2 className="uppercase font-semibold">
                          {item.product.title.slice(0, 30)}
                        </h2>
                        <h2 className="text-slate-500">Size: {item.size}</h2>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-secondary font-semibold">
                        ${item.product.price * item.quantity}
                      </p>
                      <h2 className="text-slate-500">Qty:{item.quantity}</h2>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {cart.length != 0 && (
        <div className="bg-slate-100 text-black flex flex-col items-center md:items-start p-2 mb-3">
          <h2 className="uppercase font-semibold">Order Details:</h2>
          <div className="flex flex-col">
            <div className="flex  justify-between gap-5 text-slate-500">
              <p>SUBTOTAL</p>
              <p>${subTotal.toFixed(2)}</p>
            </div>
            <div className="flex  justify-between gap-5 text-slate-500">
              <p>SERVICE CHARGE</p>
              <p>$10</p>
            </div>
            <div className="flex  justify-between gap-5 text-slate-500">
              <p>TAX</p>
              <p>${taxAmount}</p>
            </div>
            <br />
            <hr />
            <div className="flex justify-between gap-5 text-slate-500 border-t-[1px] border-[#e4e4e4]">
              <p>TOTAL</p>
              <p>${(subTotal + SERVICE_CHARGE + taxAmount).toFixed(2)}</p>
            </div>
            <div className="flex justify-center mt-2">
              <button className="bg-primary text-white w-full px-2 py-1 text-lg">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
