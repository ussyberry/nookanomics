import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Loader2, Coins, Fish, Bug } from 'lucide-react';
import { useState, useEffect } from 'react';
import fishData from '../data/fish.json';
import bugsData from '../data/bugs.json';
import { fetchFish, fetchBugs, NHFish, NHBug } from '../services/nookipedia';

type CritterType = 'fish' | 'bugs';
type SortType = 'name' | 'price-high' | 'price-low';

const Critters = () => {
    const [activeTab, setActiveTab] = useState<CritterType>('fish');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<SortType>('price-high');
    const [critters, setCritters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [usingLocalData, setUsingLocalData] = useState(false);

    useEffect(() => {
        const loadCritters = async () => {
            setLoading(true);
            try {
                let data: any[] = [];
                if (activeTab === 'fish') {
                    data = await fetchFish();
                } else {
                    data = await fetchBugs();
                }
                setCritters(data);
                setUsingLocalData(false);
            } catch (error) {
                console.warn('Failed to fetch from API, falling back to local data:', error);
                setUsingLocalData(true);
                setCritters(activeTab === 'fish' ? fishData : bugsData);
            } finally {
                setLoading(false);
            }
        };

        loadCritters();
    }, [activeTab]);

    const getFilteredAndSortedCritters = () => {
        let filtered = critters.filter(critter =>
            critter.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filtered.sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'price-high') return (b.sell_nook || 0) - (a.sell_nook || 0);
            if (sortBy === 'price-low') return (a.sell_nook || 0) - (b.sell_nook || 0);
            return 0;
        });
    };

    const displayedCritters = getFilteredAndSortedCritters();

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
                >
                    Island <span className="text-blue-600">Critterpedia</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-600 max-w-2xl mx-auto"
                >
                    Track the market value of local wildlife.
                    Maximize your bells by catching the most valuable critters.
                </motion.p>
                {usingLocalData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block bg-yellow-50 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium border border-yellow-200"
                    >
                        Using offline sample data. Add API key for full market data.
                    </motion.div>
                )}
            </div>

            {/* Controls Section */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                {/* Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('fish')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'fish'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Fish className="w-4 h-4" />
                        Fish
                    </button>
                    <button
                        onClick={() => setActiveTab('bugs')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'bugs'
                                ? 'bg-white text-green-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Bug className="w-4 h-4" />
                        Bugs
                    </button>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm"
                    />
                </div>

                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortType)}
                    className="px-4 py-2 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm font-medium text-gray-600 cursor-pointer"
                >
                    <option value="price-high">Price: High to Low</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="name">Name</option>
                </select>
            </div>

            {/* Content Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {displayedCritters.map((critter) => (
                            <motion.div
                                layout
                                key={critter.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-gray-50 p-3 rounded-2xl group-hover:bg-blue-50 transition-colors">
                                        <img
                                            src={critter.image_url}
                                            alt={critter.name}
                                            className="w-12 h-12 object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://dodo.ac/np/images/thumb/a/ac/Leaf_NH_Icon.png/120px-Leaf_NH_Icon.png';
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-1 text-yellow-600 font-bold bg-yellow-50 px-3 py-1 rounded-full text-sm">
                                            <Coins className="w-3 h-3" />
                                            {critter.sell_nook?.toLocaleString()}
                                        </div>
                                        {activeTab === 'fish' && critter.sell_cj && (
                                            <span className="text-xs text-gray-400 mt-1">CJ: {critter.sell_cj?.toLocaleString()}</span>
                                        )}
                                        {activeTab === 'bugs' && critter.sell_flick && (
                                            <span className="text-xs text-gray-400 mt-1">Flick: {critter.sell_flick?.toLocaleString()}</span>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2">{critter.name}</h3>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-500">
                                        <span>Location</span>
                                        <span className="font-medium text-gray-900">{critter.location}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>Rarity</span>
                                        <span className="font-medium text-gray-900">{critter.rarity}</span>
                                    </div>
                                    {activeTab === 'fish' && (
                                        <div className="flex justify-between text-gray-500">
                                            <span>Shadow</span>
                                            <span className="font-medium text-gray-900">{critter.shadow_size}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-gray-500">
                                        <span>Season (N)</span>
                                        <span className="font-medium text-gray-900">{critter.north?.months}</span>
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

export default Critters;
