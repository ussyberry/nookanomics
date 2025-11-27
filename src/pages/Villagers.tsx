import { motion } from 'framer-motion';
import { Search, Filter, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import villagersData from '../data/villagers.json';
import { fetchVillagers, Villager } from '../services/nookipedia';

const Villagers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [villagers, setVillagers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [usingLocalData, setUsingLocalData] = useState(false);

    useEffect(() => {
        const loadVillagers = async () => {
            try {
                const data = await fetchVillagers();
                // Transform API data to match our component structure
                const transformedData = data.map((v: Villager) => ({
                    name: v.name,
                    species: v.species,
                    personality: v.personality,
                    image: v.nh_details?.image_url || v.image_url,
                    birthday: `${v.birthday_month} ${v.birthday_day}`,
                    catchphrase: v.nh_details?.catchphrase || v.phrase,
                    color: v.nh_details?.fav_colors?.[0] ? getHexColor(v.nh_details.fav_colors[0]) : '#f3f4f6'
                }));
                setVillagers(transformedData);
            } catch (error) {
                console.warn('Failed to fetch from API, falling back to local data:', error);
                setUsingLocalData(true);
                setVillagers(villagersData);
            } finally {
                setLoading(false);
            }
        };

        loadVillagers();
    }, []);

    // Helper to map color names to hex (simplified)
    const getHexColor = (colorName: string) => {
        const colors: Record<string, string> = {
            'Beige': '#F5F5DC',
            'Black': '#4B5563',
            'Blue': '#93C5FD',
            'Brown': '#B45309',
            'Colorful': '#FCD34D',
            'Gray': '#9CA3AF',
            'Green': '#86EFAC',
            'Light blue': '#BAE6FD',
            'Orange': '#FDBA74',
            'Pink': '#F9A8D4',
            'Purple': '#D8B4FE',
            'Red': '#FCA5A5',
            'White': '#F3F4F6',
            'Yellow': '#FDE047'
        };
        return colors[colorName] || '#F3F4F6';
    };

    const filteredVillagers = villagers.filter(villager =>
        villager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        villager.species.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
                >
                    Meet the <span className="text-green-600">Villagers</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-600 max-w-2xl mx-auto"
                >
                    Discover your favorite neighbors from the Animal Crossing universe.
                    Find their personalities, birthdays, and more.
                </motion.p>
            </div>

            {/* Search and Filter Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between"
            >
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name or species..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors font-medium">
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                </button>
            </motion.div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
                </div>
            ) : (
                /* Villagers Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredVillagers.map((villager, index) => (
                        <motion.div
                            key={villager.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (index % 10) }}
                            className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 cursor-pointer"
                        >
                            <div className="relative aspect-square mb-4 rounded-2xl overflow-hidden bg-gray-50 group-hover:bg-green-50 transition-colors">
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                    style={{ backgroundColor: villager.color }}
                                />
                                <img
                                    src={villager.image}
                                    alt={villager.name}
                                    className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://dodo.ac/np/images/thumb/a/ac/Leaf_NH_Icon.png/120px-Leaf_NH_Icon.png';
                                    }}
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-gray-900">{villager.name}</h3>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                        {villager.species}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="text-gray-500">Personality</div>
                                    <div className="font-medium text-gray-900 text-right">{villager.personality}</div>

                                    <div className="text-gray-500">Birthday</div>
                                    <div className="font-medium text-gray-900 text-right">{villager.birthday}</div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500 italic text-center">
                                        "{villager.catchphrase}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Villagers;
