import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
    const { products } = useAppContext();
    const { category } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);

    const searchCategory = categories.find(
        (item) => item.path.toLowerCase() === category.toLowerCase()
    );

    useEffect(() => {
        const result = Array.isArray(products)
            ? products.filter(
                  (product) => product.inStock && product.category.toLowerCase() === category.toLowerCase()
              )
            : [];
        setFilteredProducts(result);
    }, [products, category]);

    return (
        <div className="mt-8 sm:mt-16 flex flex-col">
            {searchCategory && (
                <div className="flex flex-col items-end w-max">
                    <p className="text-lg sm:text-xl md:text-2xl font-medium uppercase">
                        {searchCategory.text}
                    </p>
                    <div className="w-12 sm:w-16 h-0.5 bg-[#c9595a] rounded-full"></div>
                </div>
            )}

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-6 mt-4 sm:mt-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <p>No products found in this category.</p>
                    <Link to="/products" className="mt-3 text-[#c9595a] hover:underline">
                        Browse all products
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ProductCategory;
