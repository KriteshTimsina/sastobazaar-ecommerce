import React, { useState } from 'react';

const FAQ = () => {
  const [faqData] = useState([
    {
      question: 'How can I place an order?',
      answer: 'To place an order, browse our products, add items to your cart, and proceed to the checkout page. Follow the simple steps to complete your purchase.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept various payment methods, including credit cards, PayPal, and more. You can choose your preferred payment option during checkout.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Shipping times vary depending on your location and the shipping method you choose. You can find estimated delivery times during the checkout process.',
    },
    {
      question: 'Can I return or exchange a product?',
      answer: 'Yes, you can return or exchange a product within 30 days of purchase, provided it\'s in its original condition. Contact our customer support for assistance.',
    },
    {
      question: 'What if my order is damaged or incorrect?',
      answer: 'If your order arrives damaged or is incorrect, please contact our customer support team, and we will assist you in resolving the issue.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we offer international shipping to many countries. During the checkout process, you can select your country for shipping options and costs.',
    },
    {
      question: 'Is there a warranty on products?',
      answer: 'Many of our products come with a manufacturer\'s warranty. You can find warranty information in the product descriptions or contact our support for details.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking number via email. You can use this number to track the status of your order.',
    },
    {
      question: 'Can I cancel my order?',
      answer: 'You can cancel your order if it has not yet been shipped. Contact our customer support as soon as possible to request a cancellation.',
    },
    {
      question: 'What is your return policy for opened products?',
      answer: 'Opened products can typically be returned within 30 days if they are in resalable condition. Please refer to our return policy for more details.',
    },
    // Add more FAQ items here
  ]);

  // state to manage which FAQ should be display or not
  const [openItems, setOpenItems] = useState(new Array(faqData.length).fill(false));

  const toggleFAQ = (index) => {
    const updatedOpenItems = [...openItems];
    
    // whenever user click on the particular index of the FAQ question we set its value to true
    updatedOpenItems[index] = !updatedOpenItems[index];
    
    setOpenItems(updatedOpenItems);
  };

  // const toggleFAQ = (index) => {
  //   const faqItems = document.querySelectorAll('.faq-item');
  //   faqItems[index].classList.toggle('active');
  // };

  return (
    <div className="max-w-xl mx-auto p-4 pt-navtop">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      {faqData.map((faqItem, index) => (
        <div key={index} className="faq-item border rounded-md mb-4">
          <button
            className="faq-question w-full p-4 text-left font-semibold cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            {faqItem.question}
          </button>
          <div className={`faq-answer p-4 ${openItems[index] ? 'visible' : 'hidden' }`}>
            {faqItem.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
