import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

let SERVICE_CHARGE = 10;

const Cart = () => {
  const { cart, setCart } = useContext(cartContext);
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
  useEffect(() => {
    handleTotal();
  }, []);
  useEffect(() => {
    calculateTax();
  }, [subTotal]);

  return (
    <div className=" flex justify-around dark:text-darktext  dark:bg-darkbg">
      <div className="pt-navtop  min-h-screen  md:flex md:flex-row md:justify-around  md:items-start">
        <div className="flex flex-col justify-center items-center md:items-start mx-2">
          <div className="flex justify-between w-full mb-1 items-center">
            <h2 className="font-semibold text-xl">
              Shopping Cart ({cart.length})
            </h2>
            {cart.length !== 0 && (
              <button
                onClick={clearCart}
                className="font-semibold text-primary cursor-pointer hover:text-blue-600"
              >
                clear
              </button>
            )}
          </div>
          {cart.length === 0 ? (
            <div className="relative flex flex-col items-center dark:bg-darkbg dark:text-darktext">
              <p>Shopping Cart is empty</p>
              <img src="/assets/emptyCart.gif" alt="sdfkjh" width={150} />
              <Link
                to="/"
                className="bg-primary text-white p-1 hover:scale-105 transition-all"
              >
                add to cart
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
                      <div className="flex flex-col justify-center items-center ">
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
        {cart.length !== 0 && (
          <div className="hidden sm:flex bg-slate-100 md:mt-10 text-black dark:bg-darkbg dark:border-[1px] dark:border-[#e4e4e4] dark:text-darktext  flex-col items-center  md:items-start p-2 w-[300px] mx-auto ">
            <h2 className="uppercase font-semibold">Order Details:</h2>

            <div className="flex flex-col">
              <div className="flex  justify-between gap-5 text-slate-500">
                <p>SUBTOTAL</p>
                <p>${subTotal.toFixed(2)}</p>
              </div>
              <div className="flex  justify-between gap-5 text-slate-500">
                <p>SERVICE CHARGE</p>
                <p>${SERVICE_CHARGE}</p>
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
              <div className="flex flex-col gap-2 justify-center mt-2">
                <button className="bg-primary text-white w-full px-2 py-1 text-lg">
                  Checkout
                </button>
                <Link
                  to="/"
                  className="bg-primary text-white text-center w-full px-2 py-1 text-lg"
                >
                  Add More
                </Link>
              </div>
            </div>
          </div>
        )}

        {cart.length != 0 && (
          <div className=" sm:hidden bg-slate-50 dark:bg-slate-800 w-full h-20 fixed bottom-0 right-0 left-0 flex justify-around items-center">
            <div>
              <p>
                <span className="font-semibold">{cart.length}</span> selected{" "}
              </p>
              <Link to="/" className="text-primary font-semibold">
                add more
              </Link>
            </div>
            <div className=" text-slate-500 dark:text-slate-300 flex items-center gap-4">
              <div className="">
                <p>
                  SUBTOTAL:{" "}
                  <span className="text-secondary">${subTotal.toFixed(2)}</span>
                </p>
                <p>
                  ADDITIONAL:{" "}
                  <span className="text-secondary">
                    ${(SERVICE_CHARGE + taxAmount).toFixed(2)}
                  </span>
                </p>
                <p className="font-semibold  text-black dark:text-white">
                  TOTAL:
                  <span className="text-secondary">
                    ${(subTotal + SERVICE_CHARGE + taxAmount).toFixed(2)}
                  </span>
                </p>
              </div>
              <button className="bg-primary text-white px-2 py-1 text-lg">
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
