import { motion } from 'framer-motion';

const Directory = () => {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-4xl font-bold text-green-800">Directory</h1>
                <p className="text-gray-600">Explore our collection of Animal Crossing resources.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    >
                        <div className="h-40 bg-green-50 rounded-xl mb-4 flex items-center justify-center text-green-300">
                            Placeholder Image
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Resource {i}</h3>
                        <p className="text-gray-500 text-sm">Description of this amazing Animal Crossing resource goes here.</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Directory;
