import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="space-y-12">
            <section className="text-center space-y-6 py-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-extrabold text-green-800 tracking-tight"
                >
                    Welcome to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
                        Nookanomics
                    </span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                >
                    Your premium destination for everything Animal Crossing. Explore our directory, watch curated videos, and join the community.
                </motion.p>
            </section>
        </div>
    );
};

export default Home;
