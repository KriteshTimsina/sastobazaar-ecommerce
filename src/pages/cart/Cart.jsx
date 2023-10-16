import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/cartContext";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useAuth0 } from "@auth0/auth0-react";

import { getLocalPrice } from "../../utils/common";

let SERVICE_CHARGE = 10;

const Cart = () => {
  const { cart, setCart } = useContext(cartContext);
  const navigate = useNavigate();
  const [subTotal, setSubTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    handleTotal();
  }, [cart]);
  useEffect(() => {
    calculateTax();
  }, [subTotal, cart]);

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart, subTotal, taxAmount } });
  };

  function handleTotal() {
    let total = 0;
    cart.map((item) => (total = total + item.product.price * item.quantity));
    setSubTotal(total);
  }
  function calculateTax() {
    const tax = parseFloat(((subTotal * 13) / 100).toFixed(2));
    setTaxAmount(tax);
  }

  function removeItem(product) {
    const confirmation = confirm(
      `Are you sure you want to remove ${product.title} from cart ?`
    );
    confirmation &&
      setCart((prev) => {
        return prev.filter((item) => item.product.id !== product.id);
      });
    // const newItem = cart.filter((item) => item.product.id !== product.id);
    // setCart(newItem);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <div className="flex justify-around dark:text-darktext dark:bg-darkbg">
      <div className="min-h-screen pt-navtop md:flex md:flex-row md:justify-around md:items-start">
        <div className="flex flex-col items-center justify-center mx-2 md:items-start">
          <div className="flex items-center justify-between w-full mb-1">
            {cart.length !== 0 && (
              <div className="flex justify-between w-full">
                <h2 className="text-xl font-semibold">
                  Shopping Cart ({cart.length})
                </h2>
                <button
                  onClick={clearCart}
                  className="font-semibold cursor-pointer text-primary hover:text-blue-600"
                >
                  clear
                </button>
              </div>
            )}
          </div>
          {cart.length === 0 ? (
            <div className="relative flex flex-col items-center gap-2 dark:bg-darkbg dark:text-darktext">
              <img src="/assets/cart.gif" alt="Empty Cart" />
              <p>Shopping Cart is empty</p>
              <Link
                to="/product"
                className="p-1 text-white transition-all bg-primary hover:scale-105"
              >
                add products
              </Link>
            </div>
          ) : (
            <div>
              {cart.map((item) => {
                return (
                  <div
                    key={item.product.id}
                    className="flex flex-col bg-purple-100 text-black w-full md:w-[600px] mb-2 hover:shadow-sm hover:shadow-white"
                  >
                    <RxCross2
                      className="hover:cursor-pointer"
                      onClick={() => removeItem(item.product)}
                    />
                    <div className="flex items-center justify-around px-2">
                      <div className="flex items-center gap-5 max-w-[300px] ">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-[100px] h-[100px] object-contain"
                        />
                        <div>
                          <h2 className="font-semibold uppercase">
                            {item.product.title.slice(0, 30)}
                          </h2>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center ">
                        <p className="font-semibold text-secondary">
                          Rs. {getLocalPrice(item.product.price * item.quantity).toLocaleString()}
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
        {cart.length !== 0 && (
          <div className="hidden sm:flex bg-slate-100 md:mt-10 text-black dark:bg-darkbg dark:border-[1px] dark:border-[#e4e4e4] dark:text-darktext  flex-col items-center  md:items-start p-2 w-[300px] mx-auto ">
            <h2 className="font-semibold uppercase">Order Details:</h2>

            <div className="flex flex-col">
              <div className="flex justify-between gap-5 text-slate-500">
                <p>SUBTOTAL</p>
                <p>Rs. {parseFloat(getLocalPrice(subTotal).toFixed(2)).toLocaleString()}</p>
              </div>
              <div className="flex justify-between gap-5 text-slate-500">
                <p>SERVICE CHARGE</p>
                <p>Rs. {getLocalPrice(SERVICE_CHARGE).toLocaleString()}</p>
              </div>
              <div className="flex justify-between gap-5 text-slate-500">
                <p>TAX</p>
                <p>Rs. {getLocalPrice(taxAmount).toLocaleString()}</p>
              </div>
              <br />
              <hr />
              <div className="flex justify-between gap-5 text-slate-500 border-t-[1px] border-[#e4e4e4]">
                <p>TOTAL</p>
                <p>Rs. {parseFloat(getLocalPrice(subTotal + SERVICE_CHARGE + taxAmount).toFixed(2)).toLocaleString()}</p>
              </div>
              <div className="flex flex-col justify-center gap-2 mt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full px-2 py-1 text-lg text-white bg-primary"
                >
                  Checkout
                </button>
                <Link
                  to="/product"
                  className="w-full px-2 py-1 text-lg text-center text-white bg-primary"
                >
                  Add More
                </Link>
              </div>
            </div>
          </div>
        )}

        {cart.length != 0 && (
          <div className="fixed bottom-0 left-0 right-0 flex items-center justify-around w-full h-20 sm:hidden bg-slate-50 dark:bg-slate-800">
            <div>
              <p>
                <span className="font-semibold">{cart.length}</span> selected{" "}
              </p>
              <Link to="/product" className="font-semibold text-primary">
                add more
              </Link>
            </div>
            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-300">
              <div className="">
                <p>
                  SUBTOTAL:{" "}
                  <span className="text-secondary">Rs. {parseFloat(getLocalPrice(subTotal).toFixed(2)).toLocaleString()}</span>
                </p>
                <p>
                  ADDITIONAL:{" "}
                  <span className="text-secondary">
                    Rs. {parseFloat(getLocalPrice(SERVICE_CHARGE + taxAmount).toFixed(2)).toLocaleString()}
                  </span>
                </p>
                <p className="font-semibold text-black dark:text-white">
                  TOTAL:
                  <span className="text-secondary">
                    Rs. {parseFloat(getLocalPrice(subTotal + SERVICE_CHARGE + taxAmount).toFixed(2)).toLocaleString()}
                  </span>
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="px-2 py-1 text-lg text-white bg-primary"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
