import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Shirt, Sparkles, Snowflake, Sun, CloudRain, Leaf } from 'lucide-react';
import { useState, useEffect } from 'react';
import clothingData from '../data/clothing.json';
import { fetchClothing, NHClothing } from '../services/nookipedia';

const Fashion = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [clothing, setClothing] = useState<NHClothing[]>([]);
    const [loading, setLoading] = useState(true);
    const [usingLocalData, setUsingLocalData] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

    const themes = ["Comfy", "Everyday", "Fairy tale", "Formal", "Goth", "Outdoorsy", "Party", "Sporty", "Theatrical", "Vacation", "Work"];

    useEffect(() => {
        const loadClothing = async () => {
            setLoading(true);
            try {
                // Fetch a mix of items or filter by current season if possible
                // For now, we fetch a broad list or default
                const data = await fetchClothing({ excludedetails: 'false' });
                setClothing(data);
                setUsingLocalData(false);
            } catch (error) {
                console.warn('Failed to fetch from API, falling back to local data:', error);
                setUsingLocalData(true);
                // @ts-ignore
                setClothing(clothingData);
            } finally {
                setLoading(false);
            }
        };

        loadClothing();
    }, []);

    const filteredClothing = clothing.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTheme = selectedTheme ? item.label_themes?.includes(selectedTheme) : true;
        return matchesSearch && matchesTheme;
    });

    const getSeasonIcon = (season: string) => {
        switch (season?.toLowerCase()) {
            case 'summer': return <Sun className="w-4 h-4 text-orange-500" />;
            case 'winter': return <Snowflake className="w-4 h-4 text-blue-400" />;
            case 'spring': return <Leaf className="w-4 h-4 text-green-500" />;
            case 'autumn': return <Leaf className="w-4 h-4 text-red-500" />;
            default: return <Sparkles className="w-4 h-4 text-yellow-500" />;
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
                >
                    Island <span className="text-pink-500">Style</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-600 max-w-2xl mx-auto"
                >
                    Curated looks for every season. Impress Label and express yourself.
                </motion.p>
                {usingLocalData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block bg-yellow-50 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium border border-yellow-200"
                    >
                        Using offline sample data. Add API key for full wardrobe.
                    </motion.div>
                )}
            </div>

            {/* Controls */}
            <div className="space-y-6">
                {/* Search */}
                <div className="flex justify-center">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search wardrobe..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all outline-none shadow-sm"
                        />
                    </div>
                </div>

                {/* Theme Filters */}
                <div className="flex flex-wrap justify-center gap-2">
                    <button
                        onClick={() => setSelectedTheme(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedTheme
                                ? 'bg-gray-900 text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        All Styles
                    </button>
                    {themes.map(theme => (
                        <button
                            key={theme}
                            onClick={() => setSelectedTheme(theme)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTheme === theme
                                    ? 'bg-pink-500 text-white shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            {theme}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredClothing.map((item) => (
                            <motion.div
                                layout
                                key={item.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                            >
                                <div className="aspect-square bg-gray-50 p-6 flex items-center justify-center group-hover:bg-pink-50 transition-colors relative">
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://dodo.ac/np/images/thumb/a/ac/Leaf_NH_Icon.png/120px-Leaf_NH_Icon.png';
                                        }}
                                    />
                                    {item.seasonality && item.seasonality !== 'All year' && (
                                        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm" title={item.seasonality}>
                                            {getSeasonIcon(item.seasonality)}
                                        </div>
                                    )}
                                </div>

                                <div className="p-5">
                                    <h3 className="font-bold text-gray-900 mb-1 truncate">{item.name}</h3>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {item.label_themes?.slice(0, 2).map(theme => (
                                            <span key={theme} className="text-[10px] uppercase tracking-wider font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                                {theme}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="text-sm text-gray-400">
                                            Buy: {item.buy?.toLocaleString()}
                                        </div>
                                        <div className="font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full text-sm">
                                            {item.sell?.toLocaleString()}
                                        </div>
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

export default Fashion;
