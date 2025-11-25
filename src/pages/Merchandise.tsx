import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const Merchandise = () => {
    const products = [
        { id: 1, name: 'Nook Inc. T-Shirt', price: '$25.00', category: 'Apparel' },
        { id: 2, name: 'Leaf Pattern Hoodie', price: '$45.00', category: 'Apparel' },
        { id: 3, name: 'Brewster\'s Coffee Mug', price: '$15.00', category: 'Accessories' },
        { id: 4, name: 'Bell Bag Plushie', price: '$30.00', category: 'Collectibles' },
        { id: 5, name: 'K.K. Slider Cap', price: '$20.00', category: 'Apparel' },
        { id: 6, name: 'Isabelle Pin Set', price: '$12.00', category: 'Accessories' },
    ];

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-4xl font-bold text-green-800">Merchandise</h1>
                <p className="text-gray-600">Official Nookanomics gear for every islander.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, i) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 group"
                    >
                        <div className="h-64 bg-gray-50 relative flex items-center justify-center group-hover:bg-green-50 transition-colors">
                            <ShoppingBag className="w-16 h-16 text-gray-300 group-hover:text-green-400 transition-colors" />
                            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm">
                                {product.category}
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                                <span className="text-green-600 font-bold">{product.price}</span>
                            </div>
                            <button className="w-full mt-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors active:scale-95 transform">
                                Add to Cart
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Merchandise;
