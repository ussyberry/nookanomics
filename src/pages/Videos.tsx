import { motion } from 'framer-motion';

const Videos = () => {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-4xl font-bold text-green-800">Videos</h1>
                <p className="text-gray-600">Curated Animal Crossing content for your viewing pleasure.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    >
                        <div className="aspect-video bg-gray-100 relative group cursor-pointer">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-green-600 border-b-8 border-b-transparent ml-1" />
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Amazing Island Tour #{i}</h3>
                            <p className="text-gray-500 text-sm">Check out this incredible 5-star island design with unique terraforming.</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Videos;
