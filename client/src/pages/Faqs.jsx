import React, { useState } from 'react';

const faqs = [
    {
        question: 'What areas do you deliver to?',
        answer: 'We currently deliver across Dhaka. Enter your address at checkout to confirm coverage.',
    },
    {
        question: 'How fast is delivery?',
        answer: 'Most orders arrive within 30-60 minutes, depending on your location and order volume.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept Cash on Delivery (COD) and online payments via card through Stripe.',
    },
    {
        question: 'Can I cancel or modify my order?',
        answer: 'Contact us as soon as possible after placing your order. Once it has been dispatched, changes may not be possible.',
    },
    {
        question: 'What is your return policy?',
        answer: "If you receive a damaged or incorrect item, contact us within 24 hours and we'll make it right.",
    },
];

const Faqs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex((current) => (current === index ? null : index));
    };

    return (
        <div className="mt-10 mb-16 max-w-2xl mx-auto">
            <div className="flex flex-col items-center w-max mx-auto">
                <p className="text-2xl md:text-3xl font-medium uppercase">
                    Frequently Asked <span className="relative text-[#c9595a]">Questions</span>
                </p>
                <div className="w-16 h-0.5 bg-[#c9595a] rounded-full mt-1"></div>
            </div>

            <div className="mt-10 flex flex-col divide-y divide-gray-200 border-t border-b border-gray-200">
                {faqs.map((faq, index) => (
                    <div key={faq.question} className="py-4">
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex items-center justify-between text-left font-medium text-gray-800 cursor-pointer"
                        >
                            {faq.question}
                            <span className="text-[#c9595a] text-xl leading-none">
                                {openIndex === index ? '−' : '+'}
                            </span>
                        </button>
                        {openIndex === index && (
                            <p className="text-gray-500 text-sm mt-3">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faqs;
