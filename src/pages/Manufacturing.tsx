import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Hammer, TrendingUp, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import recipesData from '../data/recipes.json';
import { fetchRecipes, NHRecipe } from '../services/nookipedia';

const Manufacturing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState<NHRecipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [usingLocalData, setUsingLocalData] = useState(false);
    const [sortBy, setSortBy] = useState<'profit' | 'margin'>('profit');

    useEffect(() => {
        const loadRecipes = async () => {
            setLoading(true);
            try {
                const data = await fetchRecipes();
                setRecipes(data);
                setUsingLocalData(false);
            } catch (error) {
                console.warn('Failed to fetch from API, falling back to local data:', error);
                setUsingLocalData(true);
                // @ts-ignore
                setRecipes(recipesData);
            } finally {
                setLoading(false);
            }
        };

        loadRecipes();
    }, []);

    const calculateProfit = (recipe: NHRecipe) => {
        return recipe.sell - (recipe.material_cost || 0);
    };

    const calculateMargin = (recipe: NHRecipe) => {
        const cost = recipe.material_cost || 1;
        return ((recipe.sell - cost) / cost) * 100;
    };

    const filteredRecipes = recipes
        .filter(recipe =>
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'profit') {
                return calculateProfit(b) - calculateProfit(a);
            } else {
                return calculateMargin(b) - calculateMargin(a);
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
                    DIY <span className="text-orange-600">Manufacturing</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-600 max-w-2xl mx-auto"
                >
                    Optimize your crafting profits. Analyze material costs and maximize returns.
                </motion.p>
                {usingLocalData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block bg-yellow-50 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium border border-yellow-200"
                    >
                        Using offline sample data. Add API key for full recipe catalog.
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
                            placeholder="Search recipes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none shadow-sm"
                        />
                    </div>
                </div>

                {/* Sort */}
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => setSortBy('profit')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${sortBy === 'profit'
                                ? 'bg-orange-600 text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        <TrendingUp className="w-4 h-4 inline mr-1" />
                        Net Profit
                    </button>
                    <button
                        onClick={() => setSortBy('margin')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${sortBy === 'margin'
                                ? 'bg-orange-600 text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        <Package className="w-4 h-4 inline mr-1" />
                        Profit Margin %
                    </button>
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredRecipes.map((recipe) => {
                            const profit = calculateProfit(recipe);
                            const margin = calculateMargin(recipe);

                            return (
                                <motion.div
                                    layout
                                    key={recipe.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                                >
                                    <div className="aspect-square bg-gradient-to-br from-orange-50 to-amber-50 p-8 flex items-center justify-center">
                                        <img
                                            src={recipe.image_url}
                                            alt={recipe.name}
                                            className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://dodo.ac/np/images/thumb/a/ac/Leaf_NH_Icon.png/120px-Leaf_NH_Icon.png';
                                            }}
                                        />
                                    </div>

                                    <div className="p-6">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{recipe.name}</h3>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <Hammer className="w-3 h-3" />
                                                <span>{recipe.materials?.length || 0} materials</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {/* Materials */}
                                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                                <div className="text-xs font-bold text-gray-500 uppercase mb-2">Materials</div>
                                                <div className="space-y-1">
                                                    {recipe.materials?.slice(0, 3).map((mat, idx) => (
                                                        <div key={idx} className="flex justify-between text-sm">
                                                            <span className="text-gray-700">{mat.name}</span>
                                                            <span className="text-gray-500">×{mat.count}</span>
                                                        </div>
                                                    ))}
                                                    {recipe.materials?.length > 3 && (
                                                        <div className="text-xs text-gray-400 italic">
                                                            +{recipe.materials.length - 3} more...
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Economics */}
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                                                    <div className="text-xs font-bold text-red-600 uppercase mb-1">Cost</div>
                                                    <div className="text-lg font-bold text-red-700">
                                                        {recipe.material_cost?.toLocaleString() || 'N/A'}
                                                    </div>
                                                </div>
                                                <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                                                    <div className="text-xs font-bold text-green-600 uppercase mb-1">Sell</div>
                                                    <div className="text-lg font-bold text-green-700">
                                                        {recipe.sell?.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Profit */}
                                            <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-xs font-bold text-orange-600 uppercase">Net Profit</div>
                                                        <div className="text-2xl font-bold text-orange-700">
                                                            {profit.toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xs font-bold text-orange-600 uppercase">Margin</div>
                                                        <div className="text-lg font-bold text-orange-700">
                                                            {margin > 0 ? '+' : ''}{margin.toFixed(0)}%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default Manufacturing;
