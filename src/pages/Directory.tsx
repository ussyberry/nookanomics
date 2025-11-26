import { motion } from 'framer-motion';
import { ExternalLink, Book, ShoppingBag } from 'lucide-react';

const RESOURCES = [
    {
        id: 1,
        title: 'Animal Crossing Wiki',
        description: 'The comprehensive encyclopedia for all things Animal Crossing. Find guides, data, and community info.',
        url: 'https://animalcrossing.fandom.com/wiki/Animal_Crossing_Wiki',
        icon: Book,
        color: 'bg-blue-50 text-blue-600'
    },
    {
        id: 2,
        title: 'Nookipedia',
        description: 'A community-driven encyclopedia for the Animal Crossing series, featuring detailed articles and data.',
        url: 'https://nookipedia.com/wiki/Villager/New_Horizons',
        icon: Book,
        color: 'bg-green-50 text-green-600'
    },
    {
        id: 3,
        title: 'Nookazon',
        description: 'The leading marketplace for trading Animal Crossing: New Horizons items, villagers, and services.',
        url: 'https://nookazon.com/',
        icon: ShoppingBag,
        color: 'bg-purple-50 text-purple-600'
    }
];

const Directory = () => {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-4xl font-bold text-green-800">Directory</h1>
                <p className="text-gray-600">Explore our curated collection of essential Animal Crossing resources.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {RESOURCES.map((resource, index) => (
                    <motion.a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 block"
                    >
                        <div className={`h-16 w-16 rounded-2xl mb-6 flex items-center justify-center ${resource.color} group-hover:scale-110 transition-transform`}>
                            <resource.icon className="w-8 h-8" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                                    {resource.title}
                                </h3>
                                <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-colors" />
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {resource.description}
                            </p>
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    );
};

export default Directory;
