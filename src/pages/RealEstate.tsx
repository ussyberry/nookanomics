import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Home, TrendingUp, Star, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import furnitureData from '../data/furniture.json';
import { fetchFurniture, NHFurniture } from '../services/nookipedia';

const RealEstate = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [furniture, setFurniture] = useState<NHFurniture[]>([]);
    const [loading, setLoading] = useState(true);
    const [usingLocalData, setUsingLocalData] = useState(false);
    const [sortBy, setSortBy] = useState<'hha' | 'price'>('hha');

    useEffect(() => {
        const loadFurniture = async () => {
            setLoading(true);
            try {
                const data = await fetchFurniture();
                setFurniture(data);
                setUsingLocalData(false);
            } catch (error) {
                console.warn('Failed to fetch from API, falling back to local data:', error);
                setUsingLocalData(true);
                // @ts-ignore
                setFurniture(furnitureData);
            } finally {
                setLoading(false);
            }
        };

        loadFurniture();
    }, []);

    const filteredFurniture = furniture
        .filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'hha') {
                return (b.hha_base || 0) - (a.hha_base || 0);
            } else {
                return (b.sell || 0) - (a.sell || 0);
            }
        });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
                >
                    Island <span className="text-blue-600">Real Estate</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-600 max-w-2xl mx-auto"
                >
                    Maximize your HHA score with premium furnishings. Build your dream home's value.
                </motion.p>
                {usingLocalData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block bg-yellow-50 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium border border-yellow-200"
                    >
                        Using offline sample data. Add API key for full catalog.
                    </motion.div>
                )}
            </div>

            {/* Controls */}
            <div className="space-y-4">
                {/* Search */}
                <div className="flex justify-center">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search furniture..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none shadow-sm"
                        />
                    </div>
                </div>

                {/* Sort */}
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => setSortBy('hha')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${sortBy === 'hha'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        <Award className="w-4 h-4 inline mr-1" />
                        HHA Score
                    </button>
                    <button
                        onClick={() => setSortBy('price')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${sortBy === 'price'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        <TrendingUp className="w-4 h-4 inline mr-1" />
                        Market Value
                    </button>
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredFurniture.map((item) => (
                            <motion.div
                                layout
                                key={item.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                            >
                                <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex items-center justify-center relative">
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://dodo.ac/np/images/thumb/a/ac/Leaf_NH_Icon.png/120px-Leaf_NH_Icon.png';
                                        }}
                                    />
                                    {item.lucky && (
                                        <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-current" />
                                            Lucky
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500">{item.category}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {/* HHA Score */}
                                        <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Award className="w-4 h-4 text-blue-600" />
                                                    <span className="text-sm font-medium text-blue-900">HHA Score</span>
                                                </div>
                                                <span className="text-lg font-bold text-blue-600">
                                                    {item.hha_base?.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Pricing */}
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-500">
                                                Buy: {item.buy ? item.buy.toLocaleString() : 'N/A'}
                                            </div>
                                            <div className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                                Sell: {item.sell?.toLocaleString()}
                                            </div>
                                        </div>

                                        {/* Themes */}
                                        {item.themes && item.themes.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {item.themes.map(theme => (
                                                    <span key={theme} className="text-[10px] uppercase tracking-wider font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                                        {theme}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default RealEstate;
