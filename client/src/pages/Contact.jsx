import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const onSubmitHandler = (event) => {
        event.preventDefault();
        toast.success("Thanks for reaching out! We'll get back to you soon.");
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="mt-10 mb-16 max-w-2xl mx-auto">
            <div className="flex flex-col items-center w-max mx-auto">
                <p className="text-2xl md:text-3xl font-medium uppercase">
                    Contact <span className="relative text-[#c9595a]">Us</span>
                </p>
                <div className="w-16 h-0.5 bg-[#c9595a] rounded-full mt-1"></div>
            </div>

            <p className="text-center text-gray-500 mt-6">
                Have a question or feedback? Reach out and we'll get back to you as soon as we can.
            </p>

            <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 mt-10">
                <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded p-2 mt-1 outline-[#c9595a]"
                        placeholder="Your name"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        required
                        className="w-full border border-gray-300 rounded p-2 mt-1 outline-[#c9595a]"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        required
                        rows={5}
                        className="w-full border border-gray-300 rounded p-2 mt-1 outline-[#c9595a] resize-none"
                        placeholder="How can we help?"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#c9595a] hover:bg-[#b14c4d] transition text-white rounded-md py-2.5 font-medium cursor-pointer"
                >
                    Send Message
                </button>
            </form>

            <div className="mt-10 text-center text-sm text-gray-500">
                <p>Or email us directly at <a href="mailto:support@kenakata.com" className="text-[#c9595a]">support@kenakata.com</a></p>
            </div>
        </div>
    );
};

export default Contact;
