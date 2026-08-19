import React from 'react';
import { Link } from 'react-router-dom';
import { assets, footerLinks } from '../assets/assets';

const Footer = () => {
    return (
        <footer className="mt-16 border-t border-gray-300 text-gray-500">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10">
                <div>
                    <img src={assets.logo} alt="KenaKata" className="h-10" />
                    <p className="max-w-xs mt-4 text-sm">
                        Fresh groceries delivered to your doorstep. Quality products, unbeatable prices.
                    </p>
                </div>

                <div className="flex flex-wrap gap-16">
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <p className="text-gray-800 font-medium mb-3">{section.title}</p>
                            <ul className="text-sm space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.text}>
                                        {link.url.startsWith('/') ? (
                                            <Link to={link.url} className="hover:text-[#c9595a] transition">
                                                {link.text}
                                            </Link>
                                        ) : (
                                            <a href={link.url} className="hover:text-[#c9595a] transition">
                                                {link.text}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-4 text-center text-sm border-t border-gray-300">
                Copyright {new Date().getFullYear()} © Kenakata. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
