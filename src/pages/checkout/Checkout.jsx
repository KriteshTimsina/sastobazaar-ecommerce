import React, { useState } from "react";
import CheckoutItems from "../../components/checkout/CheckoutItems";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getLocalPrice } from "../../utils/common";

const Checkout = () => {
  const { state: items } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("pay");
  const [email, setEmail] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  let SERVICE_CHARGE = 10;

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!email || !email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!cardHolder || !cardHolder.trim()) {
      newErrors.cardHolder = "Card Holder is required";
      valid = false;
    }
    if (paymentMethod === "pay") {
      if (!cardNumber || cardNumber.length !== 16) {
        newErrors.cardNumber = "Invalid card number";
        valid = false;
      }

      if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        newErrors.cardExpiry = "Invalid expiry format";
        valid = false;
      }

      if (!cardCVC || !/^\d{3}$/.test(cardCVC)) {
        newErrors.cardCVC = "Invalid CVC";
        valid = false;
      }
    }

    if (!billingAddress || !billingAddress.trim()) {
      newErrors.billingAddress = "Address is required";
      valid = false;
    }

    if (!billingState) {
      newErrors.billingState = "Select a State";
      valid = false;
    }
    if (!billingZip || !/^\d{5}$/.test(billingZip)) {
      newErrors.billingZip = "Invalid ZIP code";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (validateForm()) navigate("/checkout/success", { state: cardHolder });
  };

  return (
    <div className="pt-navtop dark:bg-darkbg">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium dark:text-white">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <CheckoutItems
            items={items.cart}
            subTotal={items.subTotal}
            tax={items.taxAmount}
          />

          <p className="mt-8 text-lg font-medium dark:text-white">
            Payment Methods
          </p>
          <form className="mt-5 grid gap-6">
            <div className="relative dark:bg-darkSecondary dark:text-gray-400 ">
              <input
                className="peer hidden"
                id="cod"
                type="radio"
                name="payment"
                required
                checked={paymentMethod === "cod"}
                value="cod"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="cod"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5 ">
                  <span className="mt-2 font-semibold ">Cash On Delivery</span>
                  <p className="text-slate-500 text-sm leading-6 ">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="pay"
                type="radio"
                name="payment"
                required
                value="pay"
                checked={paymentMethod === "pay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="pay"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold dark:text-gray-400">
                    Esewa / Phonepay
                  </span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="mt-10 bg-gray-50 dark:bg-darkbg px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium dark:text-white">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium dark:text-white"
            >
              Email
            </label>
            <div className="relative  flex">
              <input
                required
                type="text"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-darkSecondary"
                placeholder="your.email@gmail.com"
              />

              <div className="pointer-events-none absolute z-10 inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>

            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium dark:text-white"
            >
              Card Holder
            </label>

            <div className="relative flex">
              <input
                required
                type="text"
                id="card-holder"
                name="card-holder"
                onChange={(e) => setCardHolder(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-darkSecondary"
                placeholder="Your full name here"
              />

              <div className="pointer-events-none absolute z-10 inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            {errors.cardHolder && (
              <p className="text-red-500">{errors.cardHolder}</p>
            )}

            {paymentMethod === "pay" ? (
              <>
                <label
                  htmlFor="card-no"
                  className="mt-4 mb-2 block text-sm font-medium dark:text-white"
                >
                  Card Details
                </label>
                <div className="flex">
                  <div>
                    <div className="relative  flex-shrink-0">
                      <input
                        required
                        type="text"
                        id="card-no"
                        name="card-no"
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm  dark:bg-darkSecondary outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                      />

                      <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg
                          className="h-4 w-4 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                        </svg>
                      </div>
                    </div>
                    {errors.cardNumber && (
                      <p className="text-red-500">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div>
                    <input
                      required
                      type="text"
                      name="credit-expiry"
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 dark:bg-darkSecondary focus:border-blue-500 focus:ring-blue-500"
                      placeholder="MM/YY"
                    />
                    {errors.cardExpiry && (
                      <p className="text-red-500"> {errors.cardExpiry}</p>
                    )}
                  </div>

                  <div>
                    <input
                      required
                      type="text"
                      name="credit-cvc"
                      onChange={(e) => setCardCVC(e.target.value)}
                      className="w-full flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm dark:bg-darkSecondary outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="CVC"
                    />

                    {errors.cardCVC && (
                      <p className="text-red-500"> {errors.cardCVC}</p>
                    )}
                  </div>
                </div>
              </>
            ) : null}
            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="flex flex-col sm:flex-row ">
              <div>
                <div className="relative flex flex-shrink-0 ">
                  <input
                    required
                    type="text"
                    id="billing-address"
                    name="billing-address"
                    onChange={(e) => setBillingAddress(e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm dark:bg-darkSecondary outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="District"
                  />

                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3 z-10">
                    <img
                      className="h-4 w-4 object-contain"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/209px-Flag_of_Nepal.svg.png"
                      alt=""
                    />
                  </div>
                </div>
                {errors.billingAddress && (
                  <p className="text-red-500"> {errors.billingAddress}</p>
                )}
              </div>

              <div>
                <select
                  required
                  type="text"
                  name="billing-state"
                  onChange={(e) => setBillingState(e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 dark:bg-darkSecondary dark:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select State</option>
                  <option value="1">Koshi Province</option>
                  <option value="2">Madhesh Province</option>
                  <option value="3">Janakpur Province</option>
                  <option value="4">Bagmati Province</option>
                  <option value="5">Lumbini Province</option>
                  <option value="6">Gandaki Province</option>
                  <option value="7">Sudur Paschim Province</option>
                </select>

                {errors.billingState && (
                  <p className="text-red-500">{errors.billingState}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="billing-zip"
                  onChange={(e) => setBillingZip(e.target.value)}
                  className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/2 focus:z-10 dark:bg-darkSecondary focus:border-blue-500 focus:ring-blue-500"
                  placeholder="ZIP"
                />

                {errors.billingZip && (
                  <p className="text-red-500"> {errors.billingZip}</p>
                )}
              </div>
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Subtotal
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Rs. {parseFloat(getLocalPrice(items.subTotal).toFixed(2)).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Service Charges
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Rs. {parseFloat(getLocalPrice(SERVICE_CHARGE).toFixed(2)).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Tax
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Rs. {parseFloat(getLocalPrice(items.taxAmount).toFixed(2)).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Total
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                Rs. {parseFloat(getLocalPrice(items.subTotal + SERVICE_CHARGE + items.taxAmount).toFixed(2)).toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={placeOrder}
            type="submit"
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 dark:bg-primary px-6 py-3 font-medium text-white"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
